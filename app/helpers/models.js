const { ALL_QUESTIONS } = require('../config/question-bank')
const { getUrl } = require('../helpers/urls')
const { getOptions } = require('ffc-grants-common-functionality').answerOptions
const { getYarValue } = require('ffc-grants-common-functionality').session
const { getQuestionByKey, allAnswersSelected } = require('ffc-grants-common-functionality').utils

const getDependentSideBar = (sidebar, request) => {

  return {
    ...sidebar,
    values: updatedValues
  }
}

const getBackUrl = (hasScore, backUrlObject, backUrl, request) => {
  const url = getUrl(backUrlObject, backUrl, request)
  return hasScore && (url === 'remaining-costs') ? null : url
}

const getModel = (data, question, request, conditionalHtml = '') => {
  let { type, backUrl, key, backUrlObject, sidebar, title, score, label, warning, warningCondition } = question
  const hasScore = !!getYarValue(request, 'current-score')

  title = title ?? label?.text

  const sideBarText = (sidebar?.dependentYarKeys)
    ? getDependentSideBar(sidebar, request)
    : sidebar

  let warningDetails
  if (warningCondition) {
    const { dependentWarningQuestionKey, dependentWarningAnswerKeysArray } = warningCondition
    if (allAnswersSelected(request, dependentWarningQuestionKey, dependentWarningAnswerKeysArray, ALL_QUESTIONS)) {
      warningDetails = warningCondition.warning
    }
  } else if (warning) {
    warningDetails = warning
  }

  return {
    type,
    key,
    title,
    backUrl: getBackUrl(hasScore, backUrlObject, backUrl, request),
    items: getOptions(data, question, conditionalHtml, request),
    sideBarText,
    ...(warningDetails ? ({ warning: warningDetails }) : {}),
    diaplaySecondryBtn: hasScore && score?.isDisplay
  }
}

module.exports = {
  getModel
}
