const createMsg = require('../messaging/create-msg')
const { getUserScore } = require('../messaging/application')
const { ALL_QUESTIONS } = require('../config/question-bank')
const { getYarValue, setYarValue } = require('ffc-grants-common-functionality').session
const { addSummaryRow } = require('../helpers/score-helpers')

const { desirability } = require('./../messaging/scoring/create-desirability-msg')

const urlPrefix = require('../config/server').urlPrefix

const viewTemplate = 'score'
const currentPath = `${urlPrefix}/${viewTemplate}`
const nextPath = `${urlPrefix}/business-details`

function createModel (data, request) {
  const previousPath = `${urlPrefix}/environmental-impact`

  return {
    backLink: previousPath,
    formActionPage: currentPath,
    ...data
  }
}

module.exports = [{
  method: 'GET',
  path: currentPath,
  options: {
    log: {
      collect: true
    }
  },
  handler: async (request, h, err) => {
    try {
      console.log('Getting Desirability Answers .....')
      const msgDataToSend = createMsg.getDesirabilityAnswers(request)
      if (!msgDataToSend) {
        throw new Error('no data available for score.')
      }
      console.log('Sending scoring message .....', msgDataToSend)
      // Always re-calculate our score before rendering this page

      const formatAnswersForScoring = desirability(msgDataToSend)
      // Poll for backend for results from scoring algorithm
      // If msgData is null then 500 page will be triggered when trying to access object below
      const msgData = await getUserScore(formatAnswersForScoring, request.yar.id)

      setYarValue(request, 'overAllScore', msgData)

      const howAddingValueQuestion = ALL_QUESTIONS.find(question => question.key === 'how-adding-value')
      const matrixQuestionRating = msgData.desirability.questions[0].rating
      const howAddingValueQuestionObj = addSummaryRow(howAddingValueQuestion, matrixQuestionRating, request)
      console.log('msgData', msgData)
      if (msgData) {
        msgData.desirability.questions.push(howAddingValueQuestionObj)
        const questions = msgData.desirability.questions.map(desirabilityQuestion => {

          // if (desirabilityQuestion.url === 'manual-labour-amount' && getYarValue(request, 'manualLabour') === null) {
          //   console.log(`Don't show manual labour if it is skipped`)
          // } else {
          const bankQuestion = ALL_QUESTIONS.filter(bankQuestionD => bankQuestionD.key === desirabilityQuestion.key)[0]
          desirabilityQuestion.title = bankQuestion?.score?.title ?? bankQuestion.title
          desirabilityQuestion.desc = bankQuestion.desc ?? ''
          desirabilityQuestion.url = `${urlPrefix}/${bankQuestion.url}`
          desirabilityQuestion.order = bankQuestion.order
          desirabilityQuestion.unit = bankQuestion?.unit
          desirabilityQuestion.pageTitle = bankQuestion.pageTitle
          desirabilityQuestion.fundingPriorities = bankQuestion.fundingPriorities
          return desirabilityQuestion
          // }
        })

        let scoreChance
        switch (msgData.desirability.overallRating.band.toLowerCase()) {
          case 'strong':
            scoreChance = 'seems likely to'
            break
          case 'average':
            scoreChance = 'might'
            break
          default:
            scoreChance = 'seems unlikely to'
            break
        }

        setYarValue(request, 'current-score', msgData.desirability.overallRating.band)
        // await gapiService.sendDimensionOrMetrics(request, [{
        //   dimensionOrMetric: gapiService.dimensions.SCORE,
        //   value: msgData.desirability.overallRating.band
        // },
        // {
        //   dimensionOrMetric: gapiService.metrics.SCORE,
        //   value: 'TIME'
        // }])
        return h.view(viewTemplate, createModel({
          titleText: msgData.desirability.overallRating.band,
          scoreData: msgData,
          questions: questions.sort((a, b) => a.order - b.order),
          scoreChance: scoreChance
        }, request))
      } else {
        throw new Error('Score not received.')
      }
    } catch (error) {
      request.log(error)
    }
    request.log(err)
    return h.view('500')
  }
},
{
  method: 'POST',
  path: currentPath,
  handler: (request, h) => {
    request.yar.set('score-calculated', true)
    return h.redirect(nextPath)
  }
}]
