const grantSchemeConfig = require('./config/grant-scheme')
const { desirabilityQuestions: questionContent, desirabilityInputQuestionMapping } = require('./content-mapping')
const desirabilityQuestions = ['otherFarmers', 'fruitStorage', 'productsProcessed', 'howAddingValue', 'projectImpact', 'manualLabour',
  'futureCustomers', 'collaboration', 'productsComingFrom', 'processedSold', 'environmentalImpact']
  
function getUserAnswer (answers, userInput) {
  if (answers) {
    return [userInput].flat().map(answer =>
      ({ key: Object.keys(answers).find(key => answers[key] === answer), value: answer }))
  } else {
    return [{ key: null, value: userInput }]
  }
}

function getDesirabilityDetails (questionKey, userInput) {
  const content = questionContent[questionKey]
  return {
    key: content[0].key,
    answers: content.map(({ key, title, answers }) => ({
      key,
      title,
      input: getUserAnswer(answers, userInput[desirabilityInputQuestionMapping[key]])
    })),
    rating: {
      score: null,
      band: null,
      importance: null
    }
  }
}

function desirability (userInput) {
  const key = 'ADDVAL01'
  const validKeys = desirabilityQuestions
  const grantScheme = grantSchemeConfig.filter(g => g.key === key)[0]
  const answeredQuestions = []
  validKeys.forEach(questionKey => {
    if (userInput[questionKey]) {
      answeredQuestions.push(getDesirabilityDetails(questionKey, userInput))
    }
  })
  return {
    grantScheme: {
      key: grantScheme.key,
      name: grantScheme.name
    },
    desirability: {
      questions: answeredQuestions,
      overallRating: {
        score: null,
        band: null
      }
    }
  }
}

module.exports = { desirability, getUserAnswer }
