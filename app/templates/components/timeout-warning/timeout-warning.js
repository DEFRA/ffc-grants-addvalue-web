const dialogPolyfill = require('dialog-polyfill')

const REDIRECT_MESSAGE = 'You are about to be redirected.'
const EXTRA_TEXT = ' We do this to keep your information secure.'

class TimeoutWarning {
  constructor ($module) {

    this.$module = $module
    this.$lastFocusedEl = null
    this.$closeButton = $module.querySelector('.js-dialog-close')
    this.$cancelButton = $module.querySelector('.js-dialog-cancel')
    this.overLayClass = 'govuk-timeout-warning-overlay'
    this.$fallBackElement = document.querySelector('.govuk-timeout-warning-fallback')
    this.timers = []
    // UI countdown timer specific markup
    this.$countdown = $module.querySelector('.timer')
    this.$accessibleCountdown = $module.querySelector('.at-timer')
    // UI countdown specific settings
    this.idleMinutesBeforeTimeOut = $module.getAttribute('data-minutes-idle-timeout') ? $module.getAttribute('data-minutes-idle-timeout') : 20
    this.timeOutRedirectUrl = $module.getAttribute('data-url-redirect') ? $module.getAttribute('data-url-redirect') : 'timeout'
    this.minutesTimeOutModalVisible = $module.getAttribute('data-minutes-modal-visible') ? $module.getAttribute('data-minutes-modal-visible') : 5
    this.timeUserLastInteractedWithPage = ''
  }

  // initialise comnponent
  init() {
    // check for module
    if (!this.$module) {
      return
    }

    // Check that dialog element has native or polyfill support
    if (!this.dialogSupported()) {
      return
    }

    // Start watching for idleness
    this.countIdleTime()
    this.$closeButton.addEventListener('click', this.closeDialog.bind(this))
    this.$module.addEventListener('keydown', this.escClose.bind(this))

    // Debugging tip: This event doesn't kick in in Chrome if you have Inspector panel open and have clicked on it
    // as it is now the active element. Click on the window to make it active before moving to another tab.
    window.addEventListener('focus', this.checkIfShouldHaveTimedOut.bind(this))
  }

  // Check if browser supports native dialog element or can use polyfill
  dialogSupported() {
    console.log('WORK GOD DAMMIT')

    if (typeof HTMLDialogElement === 'function') {
      // Native dialog is supported by browser
      return true
    } else {
      // Native dialog is not supported by browser so use polyfill
      try {
        dialogPolyfill.registerDialog(this.$module)
        return true
      } catch (error) {
        // Doesn't support polyfill (IE8) - display fallback element
        this.$fallBackElement.classList.add('govuk-!-display-block')
        return false
      }
    }
  }

  // Count idle time (user not interacting with page)
  // Reset idle time counter when user interacts with the page
  // If user is idle for specified time period, open timeout warning as dialog
  countIdleTime() {
    let idleTime
    const milliSecondsBeforeTimeOut = this.idleMinutesBeforeTimeOut * 60000

    // reset the timer when page reloads
    window.onload = resetIdleTime.bind(this)

    function resetIdleTime () {
      // As page reloads, reset idle time
      clearTimeout(idleTime)

      // Start new idle time
      idleTime = setTimeout(this.openDialog.bind(this), milliSecondsBeforeTimeOut)

      // TO DO - Step A of client/server interaction
      // Set last interactive time on server by periodically ping server
      // with AJAX when user interacts with client side
      // See setLastActiveTimeOnServer()
      if (window.localStorage) {
        window.localStorage.setItem('timeUserLastInteractedWithPage', new Date())
      }
    }
  }

  openDialog() {
    // TO DO - Step B of client/server interaction
    // GET last interactive time from server before showing warning
    // User could be interacting with site in 2nd tab
    // Update time left accordingly
    if (!this.isDialogOpen()) {
      document.querySelector('body').classList.add(this.overLayClass)
      this.saveLastFocusedEl()
      this.makePageContentInert()
      this.$module.showModal()

      this.startUiCountdown()
    }
  }

  // Starts a UI countdown timer. If timer is not cancelled before 0
  // reached + 4 seconds grace period, user is redirected.
  startUiCountdown() {
    this.clearTimers() // Clear any other modal timers that might have been running
    const $module = this
    const $countdown = this.$countdown
    const $accessibleCountdown = this.$accessibleCountdown
    const minutes = this.minutesTimeOutModalVisible
    const timerRunOnce = false
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream
    const timers = this.timers

    const seconds = 60 * minutes

    $countdown.innerHTML = `${minutes} minute${minutes > 1 ? 's' : ''}`
    this.runTimer(seconds, timers, iOS, timerRunOnce, $accessibleCountdown, $module, $countdown)
  }

  saveLastFocusedEl() {
    this.$lastFocusedEl = document.activeElement
    if (!this.$lastFocusedEl || this.$lastFocusedEl === document.body) {
      this.$lastFocusedEl = null
    } else if (document.querySelector) {
      this.$lastFocusedEl = document.querySelector(':focus')
    }
  }

  // Set focus back on last focused el when modal closed
  setFocusOnLastFocusedEl() {
    if (this.$lastFocusedEl) {
      window.setTimeout(function () {
        this.$lastFocusedEl.focus()
      }, 0)
    }
  }

  // Set page content to inert to indicate to screenreaders it's inactive
  // NB: This will look for #content for toggling inert state
  makePageContentInert() {
    if (document.querySelector('#content')) {
      document.querySelector('#content').inert = true
      document.querySelector('#content').setAttribute('aria-hidden', 'true')
    }
  }

  // Make page content active when modal is not open
  // NB: This will look for #content for toggling inert state
  removeInertFromPageContent() {
    if (document.querySelector('#content')) {
      document.querySelector('#content').inert = false
      document.querySelector('#content').setAttribute('aria-hidden', 'false')
    }
  }

  isDialogOpen() {
    return this.$module.open
  }

  closeDialog() {
    if (this.isDialogOpen()) {
      document.querySelector('body').classList.remove(this.overLayClass)
      this.$module.close()
      this.setFocusOnLastFocusedEl()
      this.removeInertFromPageContent()
      window.location.reload()

      this.clearTimers()
    }
  }

  // Clears modal timer
  clearTimers() {
    for (const timer of this.timers) {
      clearTimeout(timer)
    }
  }

  disableBackButtonWhenOpen() {
    window.addEventListener('popstate', function () {
      if (this.isDialogOpen()) {
        this.closeDialog()
      } else {
        window.history.go(-1)
      }
    })
  }

  // Close modal when ESC pressed
  escClose(event) {
    // get the target element
    if (this.isDialogOpen() && event.keyCode === 27) {
      this.closeDialog()
    }
  }

  // Do a timestamp comparison with server when the page regains focus to check
  // if the user should have been timed out already.
  // This could happen but because the computer went to sleep, the browser crashed etc.
  checkIfShouldHaveTimedOut() {
    if (window.localStorage) {
      // TO DO - client/server interaction
      // GET last interactive time from server before timing out user
      // to ensure that user hasn’t interacted with site in another tab

      // If less time than data-minutes-idle-timeout left, call this.openDialog.bind(this)
      const timeUserLastInteractedWithPage = new Date(window.localStorage.getItem('timeUserLastInteractedWithPage'))

      const seconds = Math.abs((timeUserLastInteractedWithPage - new Date()) / 1000)

      // TO DO: use both idlemin and timemodalvisible
      if (seconds > this.idleMinutesBeforeTimeOut * 60) {
        this.redirect.bind(this)
      }
    }
  }
  redirect() {
    window.location.replace(this.timeOutRedirectUrl)
  }
  // Example function for sending last active time of user to server
  setLastActiveTimeOnServer() {
    return 0
  }

  getSpanForNumber(time, isMinute) {
    const pluralText = (time > 1 ? 's' : '')
    const timeText = (isMinute === true ? 'minute' : 'second')
    if (isMinute) {
      return time > 0 ? `<span class="tabular-numbers">${time}</span> ${timeText}${pluralText}` : ' '
    } else {
      return time >= 1 ? `<span class="tabular-numbers">${time}</span> ${timeText}${pluralText}` : ' '
    }
  }

  getAtText (minLeftText, secondsLeft, secLeftText, minutesLeft) {
    const atMinutesText = minutesLeft > 0 ? `${minutesLeft} minute${minLeftText}` : '';
    const atSecondsText = secondsLeft >= 1 ? ` ${secondsLeft} second${secLeftText}` : '';
    let atText = 'We will reset your answers if you do not respond in ' + atMinutesText
    if (atSecondsText) {
      if (minutesLeft > 0) {
        atText += ' and'
      }
      atText += atSecondsText + '.'
    } else {
      atText += '.'
    }
    return atText
  }

  runTimer(seconds, timers, iOS, timerRunOnce, $accessibleCountdown, $module, $countdown) {
    const minutesLeft = parseInt(seconds / 60, 5)
    const secondsLeft = parseInt(seconds % 60, 10)
    const timerExpired = minutesLeft < 1 && secondsLeft < 1
    const minLeftText = (minutesLeft > 1 ? 's' : '')
    const secLeftText = (secondsLeft > 1 ? 's' : '')
    const minutesText = this.getSpanForNumber(minutesLeft, true)
    const secondsText = this.getSpanForNumber(secondsLeft, false)
    // Below string will get read out by screen readers every time the timeout refreshes (every 15 secs. See below).
    // Please add additional information in the modal body content or in below extraText which will get announced to AT the first time the time out opens
    const text = `We will reset your answers if you do not respond in ${minutesText} ${secondsText}.`
    const atText = this.getAtText(minLeftText, secondsLeft, secLeftText, minutesLeft)

    if (timerExpired) {
      $accessibleCountdown.innerHTML = $countdown.innerHTML = REDIRECT_MESSAGE
      setTimeout($module.redirect.bind($module), 4000)
    } else {
      seconds--
      $countdown.innerHTML = text + EXTRA_TEXT
      if (minutesLeft < 1 && secondsLeft < 20) {
        $accessibleCountdown.setAttribute('aria-live', 'assertive')
      }
      if (!timerRunOnce) {
        // Read out the extra content only once. Don't read out on iOS VoiceOver which stalls on the longer text
        $accessibleCountdown.innerHTML = iOS ? atText : (atText + EXTRA_TEXT)
        timerRunOnce = true
      } else if (secondsLeft % 15 === 0) {
        // Update screen reader friendly content every 15 secs
        $accessibleCountdown.innerHTML = atText
      }
      // JS doesn't allow resetting timers globally so timers need to be retained for resetting.
      timers.push(setTimeout(() => this.runTimer(seconds, timers, iOS, timerRunOnce, $accessibleCountdown, $module, $countdown), 1000))
    }
  }
}

module.exports = TimeoutWarning
