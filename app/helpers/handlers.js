const { getYarValue, setYarValue } = require('ffc-grants-common-functionality').session
const { getModel } = require('../helpers/models')
const { checkErrors } = require('../helpers/errorSummaryHandlers')
const { getGrantValues } = require('../helpers/grants-info')
const { formatUKCurrency } = require('../helpers/data-formats')
const { SELECT_VARIABLE_TO_REPLACE, DELETE_POSTCODE_CHARS_REGEX } = require('ffc-grants-common-functionality').regex
const { getHtml } = require('../helpers/conditionalHTML')
const { getUrl } = require('../helpers/urls')
const { guardPage } = require('ffc-grants-common-functionality').pageGuard
const { setOptionsLabel } = require('ffc-grants-common-functionality').answerOptions
const { notUniqueSelection, uniqueSelection, getQuestionAnswer } = require('ffc-grants-common-functionality').utils
const { GRANT_PERCENTAGE } = require('../helpers/grant-details')

const senders = require('../messaging/senders')
const createMsg = require('../messaging/create-msg')
const emailFormatting = require('./../messaging/email/process-submission')
const { startPageUrl } = require('../config/server')
const { ALL_QUESTIONS } = require('../config/question-bank')

const getConfirmationId = (guid) => {
  const prefix = 'AV'
  return `${prefix}-${guid.substr(0, 3)}-${guid.substr(3, 3)}`.toUpperCase()
}

const handleConditinalHtmlData = (type, labelData, yarKey, request) => {
  const isMultiInput = type === 'multi-input'
  const label = isMultiInput ? 'sbi' : yarKey
  const fieldValue = isMultiInput ? getYarValue(request, yarKey)?.sbi : getYarValue(request, yarKey)
  return getHtml(label, labelData, fieldValue)
}

const saveValuesToArray = (yarKey, fields) => {
  const result = []

  if (yarKey) {
    fields.forEach(field => {
      if (yarKey[field]) {
        result.push(yarKey[field])
      }
    })
  }

  return result
}

const handlePotentialAmount = (request, maybeEligibleContent, url) => {
  if (url === 'potential-amount' && Number(getYarValue(request, 'projectCost').toString().replace(/,/g, '')) >= 1000000 && getYarValue(request, 'solarPVSystem') === 'Yes'){
    return {
      ...maybeEligibleContent,
      messageContent: 'You may be able to apply for a grant of up to £500,000, based on the estimated cost of £{{_projectCost_}}.',
      additionalSentence: 'The maximum grant you can apply for is £500,000.',
      insertText: { text: 'You cannot apply for funding for a solar PV system if you have requested the maximum funding amount for project items.' },
    }
  } else if (url === 'potential-amount' && Number(getYarValue(request, 'projectCost').toString().replace(/,/g, '')) >= 1000000 && getYarValue(request, 'solarPVSystem') === 'No'){
    return {
      ...maybeEligibleContent,
      messageContent: 'You may be able to apply for grant funding of up to £500,000, based on the estimated project items cost of £{{_projectCost_}}.',
      insertText: { text: 'The maximum grant you can apply for is £500,000.' },
    }
  } else if (url === 'potential-amount' && Number(getYarValue(request, 'projectCost').toString().replace(/,/g, '')) < 1000000 && getYarValue(request, 'solarPVSystem') === 'No'){
    return {
      ...maybeEligibleContent,
      messageContent: `You may be able to apply for grant funding of up to £{{_calculatedGrant_}} (${GRANT_PERCENTAGE}% of £{{_projectCost_}}).`,
    }
  } else if(url === 'potential-amount-solar-details' && getYarValue(request, 'cappedCalculatedSolarGrant') == 100000){
    return {
      ...maybeEligibleContent,
      detailsText: {
        summaryText: 'How is the solar PV system grant funding calculated?',
        html: 'You can apply for a maximum of £100,000 for solar PV system costs.'
      },
    }
  } else if(url === 'potential-amount-solar-details' && getYarValue(request, 'cappedCalculatedSolarGrant') < 100000 && getYarValue(request, 'calculatedGrant') > 400000){
    return {
      ...maybeEligibleContent,
      detailsText: {
        summaryText: 'How is the solar PV system grant funding calculated?',
        html: `The maximum grant you can apply for is £500,000.</br></br>
        As project item costs take priority, you can apply for £{{_cappedCalculatedSolarGrant_}} for solar PV system costs.`
      },
    }
  }
  
  return maybeEligibleContent
}

function replaceVariablesInContent(request, maybeEligibleContent) {
  return {
    ...maybeEligibleContent,
    messageContent: maybeEligibleContent.messageContent.replace(
      SELECT_VARIABLE_TO_REPLACE, (_ignore, additionalYarKeyName) => (
        formatUKCurrency(getYarValue(request, additionalYarKeyName) || 0)
      )
    ),
    detailsText: maybeEligibleContent?.detailsText?.html ?  { 
      ...maybeEligibleContent.detailsText,
      html: maybeEligibleContent.detailsText.html.replace(
        SELECT_VARIABLE_TO_REPLACE, (_ignore, additionalYarKeyName) => (
          formatUKCurrency(getYarValue(request, additionalYarKeyName) || 0)
        )
      )
    } : '',
  }
}

const maybeEligibleGet = async (request, confirmationId, question, url, nextUrl, backUrl, h) => {
  if (question.maybeEligible) {
    let { maybeEligibleContent } = question
    maybeEligibleContent.title = question.title
    let consentOptionalData

    maybeEligibleContent = handlePotentialAmount(request, maybeEligibleContent, url)

    if (url === 'confirm') {
      const consentOptional = getYarValue(request, 'consentOptional')
      consentOptionalData = {
        hiddenInput: {
          id: 'consentMain',
          name: 'consentMain',
          value: 'true',
          type: 'hidden'
        },
        idPrefix: 'consentOptional',
        name: 'consentOptional',
        items: setOptionsLabel(consentOptional,
          [{
            value: 'CONSENT_OPTIONAL',
            text: '(Optional) I consent to being contacted by Defra or a third party about service improvements'
          }]
        )
      }
    }

    if (url === 'confirmation' && getYarValue(request, 'projectResponsibility') === getQuestionAnswer('project-responsibility','project-responsibility-A2', ALL_QUESTIONS)){
      maybeEligibleContent = {
        ...maybeEligibleContent,
        addText: true
      }
    }

    maybeEligibleContent = replaceVariablesInContent(request, maybeEligibleContent)

    if (maybeEligibleContent.reference) {
      if (!getYarValue(request, 'consentMain')) {
        return h.redirect(startPageUrl)
      }
      confirmationId = getConfirmationId(request.yar.id)
      try {
        const overAllScore = getYarValue(request, 'overAllScore')
        const emailData = await emailFormatting({ body: createMsg.getAllDetails(request, confirmationId), overAllScore, correlationId: request.yar.id })
        await senders.sendDesirabilitySubmitted(emailData, request.yar.id) 
        
        // gapi to be updated here?
        // await gapiService.sendDimensionOrMetrics(request, [{
        //   dimensionOrMetric: gapiService.dimensions.CONFIRMATION,
        //   value: confirmationId
        // }, {
        //   dimensionOrMetric: gapiService.dimensions.FINALSCORE,
        //   value: getYarValue(request, 'current-score')
        // },
        // {
        //   dimensionOrMetric: gapiService.metrics.CONFIRMATION,
        //   value: 'TIME'
        // }
        // ])
      } catch (err) {
        console.log('ERROR: ', err)
      }
      maybeEligibleContent = {
        ...maybeEligibleContent,
        reference: {
          ...maybeEligibleContent.reference,
          html: maybeEligibleContent.reference.html.replace(
            SELECT_VARIABLE_TO_REPLACE, (_ignore, confirmatnId) => (
              confirmationId
            )
          )
        }
      }
      request.yar.reset()
    }

    const MAYBE_ELIGIBLE = { ...maybeEligibleContent, consentOptionalData, url, nextUrl, backUrl }
    return h.view('maybe-eligible', MAYBE_ELIGIBLE)
  }

}


const titleCheck = (question, title, url, request) => {
  if (title?.includes('{{_')) {
    question = {
      ...question,
      title: title.replace(SELECT_VARIABLE_TO_REPLACE, (_ignore, additionalYarKeyName) => (
        formatUKCurrency(getYarValue(request, additionalYarKeyName) || 0)
      ))
    }
  }

  return question
}

const pageModelFormat = (data, question, request, conditionalHtml) => {
  return getModel(data, question, request, conditionalHtml)
}

const projectCostPageModel = (data, question, request, conditionalHtml) => {
  if (getYarValue(request, 'solarPVSystem') === getQuestionAnswer('solar-PV-system', 'solar-PV-system-A1', ALL_QUESTIONS)) {
    question.hint.html = question.hint.htmlSolar
  } else {
    question.hint.html = question.hint.htmlNoSolar
  }
  
  return pageModelFormat(data, question, request, conditionalHtml)
}

const handleUrlCases = (url, data, question, request, conditionalHtml, h, backUrl, nextUrl) => {

  let PAGE_MODEL

  switch (url) {
    case 'project-cost':
      PAGE_MODEL = projectCostPageModel(data, question, request, conditionalHtml)
      break

    case 'remaining-costs':
      if(getYarValue(request, 'solarPVSystem') === 'Yes'){
        if(Number(getYarValue(request, 'projectCost').toString().replace(/,/g, '')) >= 1000000){
          question.backUrl = 'potential-amount'
        } else if (getYarValue(request, 'isSolarCappedGreaterThanCalculatedGrant') || getYarValue(request, 'isSolarCapped')){
          question.backUrl = 'potential-amount-solar-details'
        } else {
          question.backUrl = 'potential-amount-solar'
        }
      } else {
        question.backUrl = 'potential-amount'
      }

      PAGE_MODEL = pageModelFormat(data, question, request, conditionalHtml)
      break
    case 'score':
    case 'business-details':
    case 'agents-details':
    case 'applicant-details': {
      let MODEL = getModel(data, question, request, conditionalHtml)
      const reachedCheckDetails = getYarValue(request, 'reachedCheckDetails')

      if (reachedCheckDetails) {
        MODEL = {
          ...MODEL,
          reachedCheckDetails
        }
      }

      return h.view('page', MODEL)
    }

    case 'check-details': {
      setYarValue(request, 'reachedCheckDetails', true)

      const applying = getYarValue(request, 'applying')
      const businessDetails = getYarValue(request, 'businessDetails')
      const agentDetails = getYarValue(request, 'agentsDetails')
      const farmerDetails = getYarValue(request, 'farmerDetails')
  
      const agentContact = saveValuesToArray(agentDetails, ['emailAddress', 'mobileNumber', 'landlineNumber'])
      const agentAddress = saveValuesToArray(agentDetails, ['address1', 'address2', 'town', 'county', 'postcode'])
  
      const farmerContact = saveValuesToArray(farmerDetails, ['emailAddress', 'mobileNumber', 'landlineNumber'])
      const farmerAddress = saveValuesToArray(farmerDetails, ['address1', 'address2', 'town', 'county', 'postcode'])
  
      const MODEL = {
        ...question.pageData,
        backUrl,
        nextUrl,
        applying,
        businessDetails,
        farmerDetails: {
          ...farmerDetails,
          ...(farmerDetails
            ? {
                name: `${farmerDetails.firstName} ${farmerDetails.lastName}`,
                contact: farmerContact.join('<br/>'),
                address: farmerAddress.join('<br/>')
              }
            : {}
          )
        },
        agentDetails: {
          ...agentDetails,
          ...(agentDetails
            ? {
                name: `${agentDetails.firstName} ${agentDetails.lastName}`,
                contact: agentContact.join('<br/>'),
                address: agentAddress.join('<br/>')
              }
            : {}
          )
        }
  
      }
  
      return h.view('check-details', MODEL)
    }

    default:
      PAGE_MODEL = pageModelFormat(data, question, request, conditionalHtml)
      break
  }

  return h.view('page', PAGE_MODEL)

}

const getPage = async (question, request, h) => {
  const { url, backUrl, dependantNextUrl, type, title, yarKey, preValidationKeys, preValidationKeysRule } = question
  const nextUrl = getUrl(dependantNextUrl, question.nextUrl, request)
  const isRedirect = guardPage(request, preValidationKeys, preValidationKeysRule)
  if (isRedirect) {
    return h.redirect(startPageUrl)
  }

  const confirmationId = ''

  if (question.maybeEligible) {
    return maybeEligibleGet(request, confirmationId, question, url, nextUrl, backUrl, h)
  }

  question = titleCheck(question, title, url, request)

  let data = getYarValue(request, yarKey) || null
  if (type === 'multi-answer' && !!data) {
    data = [data].flat()
  }
  let conditionalHtml
  if (question?.conditionalKey && question?.conditionalLabelData) {
    const conditional = yarKey === 'businessDetails' ? yarKey : question.conditionalKey
    conditionalHtml = handleConditinalHtmlData(
      type,
      question.conditionalLabelData,
      conditional,
      request
    )
  }

  return handleUrlCases(url, data, question, request, conditionalHtml, h, backUrl, nextUrl)

}

const multiInputPostHandler = (currentQuestion, request, dataObject, payload, yarKey) => {
  const allFields = currentQuestion.allFields
  allFields.forEach(field => {
    const payloadYarVal = payload[field.yarKey]
      ? payload[field.yarKey].replace(DELETE_POSTCODE_CHARS_REGEX, '').split(/(?=.{3}$)/).join(' ').toUpperCase()
      : ''
    dataObject = {
      ...dataObject,
      [field.yarKey]: (
        (field.yarKey === 'postcode' || field.yarKey === 'projectPostcode')
          ? payloadYarVal
          : payload[field.yarKey] || ''
      ),
      ...field.conditionalKey ? { [field.conditionalKey]: payload[field.conditionalKey] } : {}
    }
  })
  setYarValue(request, yarKey, dataObject)
}



const showPostPage = (currentQuestion, request, h) => {
  const { yarKey, answers, baseUrl, ineligibleContent, nextUrl, dependantNextUrl, title, type } = currentQuestion
  const NOT_ELIGIBLE = { ...ineligibleContent, backUrl: baseUrl }
  const payload = request.payload
  let thisAnswer
  let dataObject
  if (yarKey === 'consentOptional' && !Object.keys(payload).includes(yarKey)) {
    setYarValue(request, yarKey, '')
  }
  for (const [key, value] of Object.entries(payload)) {
    thisAnswer = answers?.find(answer => (answer.value === value))

    if (type !== 'multi-input' && key !== 'secBtn') {
      setYarValue(request, key, key === 'projectPostcode' ? value.replace(DELETE_POSTCODE_CHARS_REGEX, '').split(/(?=.{3}$)/).join(' ').toUpperCase() : value)
    }
  }
  if (type === 'multi-input') {
    multiInputPostHandler(currentQuestion, request, dataObject, payload, yarKey)
  }

  currentQuestion = titleCheck(currentQuestion, title, baseUrl, request)

  const errors = checkErrors(payload, currentQuestion, h, request)
  if (errors) {
    // gapiService.sendValidationDimension(request)
    return errors
  }

  if (thisAnswer?.notEligible ||
      (yarKey === 'projectCost' ? !getGrantValues(payload[Object.keys(payload)[0]], currentQuestion.grantInfo).isEligible : null)
  ) {
    // gapiService.sendEligibilityEvent(request, !!thisAnswer?.notEligible)

    return h.view('not-eligible', NOT_ELIGIBLE)
  } else if (thisAnswer?.redirectUrl) {
    return h.redirect(thisAnswer?.redirectUrl)
  }

  if (yarKey === 'projectCost') {
    const { calculatedGrant, remainingCost } = getGrantValues(payload[Object.keys(payload)[0]], currentQuestion.grantInfo)

    setYarValue(request, 'calculatedGrant', calculatedGrant)
    setYarValue(request, 'remainingCost', remainingCost)

    if(calculatedGrant >= 500000 && getYarValue(request, 'solarPVSystem') === 'Yes'){
      return  h.redirect('/adding-value/potential-amount')
    }
  } else if (yarKey === 'solarPVCost') {
    const calculatedGrant = getYarValue(request, 'calculatedGrant')
    setYarValue(request, 'calculatedSolarGrant', Number(getYarValue(request, 'solarPVCost').toString().replace(/,/g, '')) / 4)

    let calculatedSolarGrant

    if (calculatedGrant > 400000 && calculatedGrant + getYarValue(request, 'calculatedSolarGrant') > 500000){
      calculatedSolarGrant = 500000 - calculatedGrant;
    } else {
      const halfCalculatedSolarGrant = getYarValue(request, 'calculatedSolarGrant')
      if (halfCalculatedSolarGrant >= 100000) {
        calculatedSolarGrant = 100000
      } else {
        calculatedSolarGrant = halfCalculatedSolarGrant
      }
    }

    setYarValue(request, 'cappedCalculatedSolarGrant', calculatedSolarGrant > calculatedGrant ? calculatedGrant  : calculatedSolarGrant)
    const isSolarCapped = getYarValue(request, 'calculatedSolarGrant') > 100000 || (calculatedGrant > 400000 && calculatedGrant + getYarValue(request, 'calculatedSolarGrant') > 500000)
    const isSolarCappedGreaterThanCalculatedGrant = calculatedSolarGrant > calculatedGrant
    const solarPVSystem = getYarValue(request, 'solarPVSystem')

    setYarValue(request, 'isSolarCapped', isSolarCapped)
    setYarValue(request, 'isSolarCappedGreaterThanCalculatedGrant', isSolarCappedGreaterThanCalculatedGrant)

    setYarValue(request, 'totalProjectCost', Number(getYarValue(request, 'solarPVCost').toString().replace(/,/g, '')) + Number(getYarValue(request, 'projectCost').toString().replace(/,/g, '')))
    setYarValue(request, 'totalCalculatedGrant', getYarValue(request, 'cappedCalculatedSolarGrant') + calculatedGrant)
    setYarValue(request, 'remainingCost', getYarValue(request, 'totalProjectCost') - getYarValue(request, 'totalCalculatedGrant'))

    if(solarPVSystem === 'Yes' && (isSolarCappedGreaterThanCalculatedGrant || isSolarCapped)){
      return h.redirect('/adding-value/potential-amount-solar-details')
    }else{
      return h.redirect('/adding-value/potential-amount-solar')
    }
  }

  return h.redirect(getUrl(dependantNextUrl, nextUrl, request, payload.secBtn))
}

const getHandler = (question) => {
  return (request, h) => {
    return getPage(question, request, h)
  }
}

const getPostHandler = (currentQuestion) => {
  return (request, h) => {
    return showPostPage(currentQuestion, request, h)
  }
}

module.exports = {
  getHandler,
  getPostHandler
}
