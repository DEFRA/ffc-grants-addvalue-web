const { getModel } = require('../helpers/models')
const { getHtml } = require('../helpers/conditionalHTML')
const { ALL_QUESTIONS } = require('../config/question-bank')
const { getYarValue } = require('ffc-grants-common-functionality').session
const { getQuestionAnswer } = require('ffc-grants-common-functionality').utils
const { validateAnswerField, checkInputError } = require('ffc-grants-common-functionality').errorHelpers

const customiseErrorText = (value, currentQuestion, errorList, h, request) => {
  const { yarKey, type, conditionalKey, conditionalLabelData } = currentQuestion
  let conditionalHtml

  if (conditionalKey) {
    const conditionalFieldError = errorList.find(thisErrorHref => thisErrorHref.href.includes(conditionalKey))?.text
    const conditionalFieldValue = (type === 'multi-input') ? getYarValue(request, yarKey)[conditionalKey] : getYarValue(request, conditionalKey)
    conditionalHtml = getHtml(conditionalKey, conditionalLabelData, conditionalFieldValue, conditionalFieldError)
  }
  const baseModel = getModel(value, currentQuestion, request, conditionalHtml)

  if (type === 'multi-input') {
    const baseModelItems = baseModel.items.map(thisItem => {
      const matchingErrorHref = errorList.find(thisErrorHref => thisErrorHref.href.includes(thisItem.id))

      if (matchingErrorHref) {
        return {
          ...thisItem,
          errorMessage: { text: matchingErrorHref.text }
        }
      }
      return thisItem
    })
    baseModel.items = [
      ...baseModelItems
    ]
  } else {
    baseModel.items = {
      ...baseModel.items,
      ...(errorList[0].href.includes(yarKey) ? { errorMessage: { text: errorList[0].text } } : {})
    }
  }
  const modelWithErrors = {
    ...baseModel,
    errorList
  }
  return h.view('page', modelWithErrors)
}

const checkErrors = (payload, currentQuestion, h, request) => {
  const { yarKey, answers, validate } = currentQuestion
  const conditionalAnswer = answers?.find(answer => answer.conditional)
  const errorHrefList = []
  let isconditionalAnswer
  let placeholderInputError
  if (currentQuestion.type === 'multi-input') {
    const { allFields } = currentQuestion

    allFields.forEach(
      ({ yarKey: inputYarKey, validate: inputValidate, answers: inputAnswers }) => {
        isconditionalAnswer = inputAnswers?.find(answer => answer.conditional)?.value === payload[inputYarKey]

        if (inputValidate) {
          placeholderInputError = checkInputError(inputValidate, isconditionalAnswer, payload, inputYarKey, ALL_QUESTIONS)

          if (placeholderInputError) {
            errorHrefList.push({
              text: placeholderInputError.error,
              href: `#${placeholderInputError.dependentKey ?? inputYarKey}`
            })
          }
        }
      }
    )

    if (errorHrefList.length > 0) {
      return customiseErrorText(payload, currentQuestion, errorHrefList, h, request)
    }
  }
  if (Object.keys(payload).length === 0 && currentQuestion.type) {
    placeholderInputError = validate.find(
      ({ type, dependentKey, ...details }) => (validateAnswerField(payload[yarKey], type, details, payload, ALL_QUESTIONS) === false))

    errorHrefList.push({
      text: placeholderInputError.error,
      href: `#${placeholderInputError.dependentKey ?? yarKey}`
    })
    return customiseErrorText('', currentQuestion, errorHrefList, h, request)
  }

  const payloadValue = typeof payload[yarKey] === 'string' ? payload[yarKey].trim() : payload[yarKey]
  isconditionalAnswer = payload[yarKey]?.includes(conditionalAnswer?.value)
  if (validate) {
    placeholderInputError = checkInputError(validate, isconditionalAnswer, payload, yarKey, ALL_QUESTIONS)

    if (placeholderInputError?.type === 'COMBINATION_ANSWER' && placeholderInputError?.combinationErrorsList?.length > 0) {
      const selectedAnswer = payload[yarKey]
      let errorText
      const {
        combinationErrorsList,
        combinationObject: {
          questionKey
        }
      } = placeholderInputError

      combinationErrorsList.forEach((error, index) => {
        if (selectedAnswer.length === error.length) {
          if (selectedAnswer.every((answer, idx) => answer === getQuestionAnswer(questionKey, error[idx], ALL_QUESTIONS))) {
            if (index === 0 || index === 3) {
              errorText = "Select either 'Starting to make added-value products for the first time' or 'Increasing volume'"
            } else if (index === 1 || index === 4) {
              errorText = "Select either 'Starting to make added-value products for the first time' or 'Increasing range'"
            } else if (index === 2 || index === 5) {
              errorText = "Select either 'Starting to make added-value products for the first time' or 'Increasing volume' and 'Increasing range'"
            } 
            errorHrefList.push({
              text: errorText,
              href: `#${placeholderInputError.dependentKey ?? yarKey}`
            })
          }
        }
      })

    } else if (placeholderInputError) {
      errorHrefList.push({
        text: placeholderInputError.error,
        href: `#${placeholderInputError.dependentKey ?? yarKey}`
      })
    }
  }

  if (errorHrefList.length > 0) {
    return customiseErrorText(payloadValue, currentQuestion, errorHrefList, h, request)
  }
}

module.exports = {
  customiseErrorText,
  checkErrors
}
