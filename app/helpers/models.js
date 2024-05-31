const { getQuestionAnswer } = require('ffc-grants-common-functionality/lib/utils')
const { ALL_QUESTIONS } = require('../config/question-bank')
const { getUrl } = require('../helpers/urls')
const { getOptions } = require('ffc-grants-common-functionality').answerOptions
const { getYarValue } = require('ffc-grants-common-functionality').session
const { getQuestionByKey, allAnswersSelected } = require('ffc-grants-common-functionality').utils

const getDependentSideBar = (sidebar, request) => {
  const { values, dependentQuestionKeys } = sidebar;
  let items = []

  dependentQuestionKeys.forEach((dependentQuestionKey) => {
    switch (dependentQuestionKey) {
      case 'fruitStorage':
       if(getYarValue(request, 'fruitStorage') === getQuestionAnswer('fruit-storage', 'fruit-storage-A1', ALL_QUESTIONS)) {
          items.push('Controlled atmosphere storage for top fruit')
       }
        break;
      case 'storage':
          if(getYarValue(request, 'storage') === getQuestionAnswer('storage', 'storage-A1', ALL_QUESTIONS)) {
             items.push('Storage facilities')
          }
           break;
      default:
        const selectedAnswers = getYarValue(request, dependentQuestionKey);
        if (selectedAnswers) {
          items = items.concat(Array.isArray(selectedAnswers) ? selectedAnswers : [selectedAnswers]);
        }
        break;
    }
  });

  values[0].content[0].items = items

  return {
    ...sidebar,
    values: [...values]
  };
};

const getBackUrl = (hasScore, backUrlObject, backUrl, request) => {
  const url = getUrl(backUrlObject, backUrl, request)
  return hasScore && (url === 'remaining-costs') ? null : url
}

const getModel = (data, question, request, conditionalHtml = '') => {
  let { type, backUrl, key, backUrlObject, sidebar, title, score, label, warning, warningCondition } = question
  const hasScore = !!getYarValue(request, 'current-score')

  title = title ?? label?.text

  const sideBarText = (sidebar?.dependentQuestionKeys)
    ? getDependentSideBar(sidebar, request)
    : sidebar

    console.log("SIDE", sideBarText)
    const showSidebar = sidebar?.showSidebar

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
    showSidebar,
    ...(warningDetails ? ({ warning: warningDetails }) : {}),
    diaplaySecondryBtn: hasScore && score?.isDisplay
  }
}

module.exports = {
  getModel
}
