const { sendDesirabilitySubmitted } = require('./senders')
const createMsg = require('./create-submission-msg')
const appInsights = require('../services/app-insights')

module.exports = async function (msg) {
  try {
    const { body: submissionDetails, correlationId, overAllScore } = msg

    // Get details from cache regarding desirability score
    console.log('[ MADE IT TO DETAILS ]', submissionDetails)
    const msgOut = createMsg(submissionDetails, overAllScore)

    await sendDesirabilitySubmitted(msgOut, correlationId)
  } catch (err) {
    console.error(`[ERROR][UNABLE TO PROCESS CONTACT DETAILS RECEIVER MESSAGE][${err}]`)
    appInsights.logException(err, msg?.correlationId)
  }
}
