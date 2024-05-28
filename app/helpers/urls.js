const urlPrefix = require('../config/server').urlPrefix
const { getYarValue } = require('ffc-grants-common-functionality').session
const { ALL_QUESTIONS } = require('../config/question-bank')

const findDependentQuestion = (
  dependentQuestionYarKey,
  dependentAnswerKeysArray,
  dependentAnswer
) => {
  return ALL_QUESTIONS.find((thisQuestion) => {
    const hasMatchingAnswer = thisQuestion.answers?.some((answer) => {
      return (
        dependentAnswer &&
        dependentAnswerKeysArray.includes(answer.key) &&
        dependentAnswer.includes(answer.value)
      )
    })
    return thisQuestion.yarKey === dependentQuestionYarKey && hasMatchingAnswer
  })
}

const getUrl = (urlObject, url, request, secBtn) => {
  const scorePath = `${urlPrefix}/score`
  const chekDetailsPath = `${urlPrefix}/check-details`
  const secBtnPath = secBtn === 'Back to score' ? scorePath : chekDetailsPath

  if (!urlObject) {
    return secBtn ? secBtnPath : url
  }
  const { dependentQuestionYarKey, dependentAnswerKeysArray, urlOptions,  } = urlObject
  const { thenUrl, elseUrl, nonDependentUrl } = urlOptions

  const dependentAnswer = getYarValue(request, dependentQuestionYarKey)
  const selectThenUrl = findDependentQuestion(dependentQuestionYarKey, dependentAnswerKeysArray, dependentAnswer)
  const selectedElseUrl = dependentAnswer ? elseUrl : nonDependentUrl
  return selectThenUrl ? thenUrl : selectedElseUrl
}

module.exports = {
  getUrl
}
