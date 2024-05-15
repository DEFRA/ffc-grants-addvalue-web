const { ALL_QUESTIONS } = require('../config/question-bank')
const { getUrl } = require('../helpers/urls')
const { getOptions } = require('ffc-grants-common-functionality').answerOptions
const { getYarValue } = require('ffc-grants-common-functionality').session
const { getQuestionByKey, allAnswersSelected } = require('ffc-grants-common-functionality').utils


// const getValuesForSidebar = (values, questionAnswers, yarValue, updatedValues) => {
//   let addUpdatedValue
//   let updatedContent

//   values.forEach((thisValue) => {
//     addUpdatedValue = false
//     updatedContent = thisValue.content.map(thisContent => {
//       let formattedSidebarValues = []
//       let formattedValue = ''

//       if (thisContent?.dependentAnswerExceptThese?.length) {
//         const avoidThese = thisContent.dependentAnswerExceptThese

//         questionAnswers.forEach(({ key, value, sidebarFormattedValue }) => {
//           formattedValue = value

//           if (sidebarFormattedValue) {
//             formattedValue = sidebarFormattedValue
//           }

//           if (!avoidThese.includes(key) && yarValue?.includes(value)) {
//             if (updatedValues.length && updatedValues[0].heading === thisValue.heading) {
//               updatedValues[0].content[0].items.push(formattedValue)
//             } else {
//               addUpdatedValue = true
//               formattedSidebarValues.push(formattedValue)
//             }
//           }
//         })
//       } else if (thisContent?.dependentAnswerOnlyThese?.length) {
//         const addThese = thisContent.dependentAnswerOnlyThese

//         questionAnswers.forEach(({ key, value, sidebarFormattedValue }) => {
//           formattedValue = value

//           if (sidebarFormattedValue) {
//             formattedValue = sidebarFormattedValue
//           }

//           if (addThese.includes(key) && yarValue?.includes(value)) {
//             addUpdatedValue = true
//             formattedSidebarValues.push(formattedValue)
//           }
//         })
//       } else {
//         formattedSidebarValues = [].concat(yarValue)
//       }
//       return {
//         ...thisContent,
//         items: formattedSidebarValues
//       }
//     })
//     if (addUpdatedValue) {
//       updatedValues.push({
//         ...thisValue,
//         content: updatedContent
//       })
//     }
//   })

//   return updatedValues
// }

const getDependentSideBar = (sidebar, request) => {
  // sidebar contains values of a previous page

  // const { values, dependentYarKeys, dependentQuestionKeys } = sidebar
  // // for each dependentQuestionKeys
  // let updatedValues = []
  
  // dependentQuestionKeys.forEach((dependentQuestionKey, index) => {
  //   const questionAnswers = getQuestionByKey(dependentQuestionKey, ALL_QUESTIONS).answers
  //   const yarValue = getYarValue(request, dependentYarKeys[index]) || []

  //   updatedValues = getValuesForSidebar(values, questionAnswers, yarValue, updatedValues)
  // })

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
