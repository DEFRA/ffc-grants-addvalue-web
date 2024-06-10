
const msgData = {
  grantScheme: {
    key: 'ADDVAL01',
    name: 'Adding Value Grant'
  },
  desirability: {
    questions: [
      {
        key: 'fruit-storage',
        answers: [
          {
            key: 'fruit-storage',
            title: 'Store the fruit pls',
            input: [
              {
                key: 'fruit-storage-A1',
                value: 'Here'
              }
            ]
          }
        ],
        rating: {
          score: 4,
          band: 'Strong',
          importance: null
        }
      },
      {
        key: 'other-farmers',
        answers: [
          {
            key: 'other-farmers',
            title: 'Who are these farmers? where do they come from?',
            input: [
              {
                key: 'other-farmers-A1',
                value: 'Here'
              }
            ]
          }
        ],
        rating: {
          score: 4,
          band: 'Strong',
          importance: null
        }
      },
      {
        key: 'products-processed',
        answers: [
          {
            key: 'products-processed',
            title: 'What type of produce is being processed?',
            input: [
              {
                key: 'products-processed-A1',
                value: 'Arable crops'
              }
            ]
          }
        ],
        rating: {
          score: 4,
          band: 'Strong',
          importance: null
        }
      },
      {
        key: 'how-adding-value',
        answers: [
          {
            key: 'how-adding-value',
            title: 'How will you add value to the products?',
            input: [
              {
                key: 'how-adding-value-A1',
                value: 'Processing or preparing primary product'
              }
            ]
          }
        ],
        rating: {
          score: 0.8,
          band: 'Strong',
          importance: null
        }
      },
      {
        key: 'project-impact',
        answers: [
          {
            key: 'project-impact',
            title: 'What impact will the project have?',
            input: [
              {
                key: 'project-impact-A1',
                value: 'Diversifying into creating added-value products'
              }
            ]
          }
        ],
        rating: {
          score: 1.6,
          band: 'Strong',
          importance: null
        }
      },
      {
        key: 'manual-labour-amount',
        answers: [
          {
            key: 'manual-albour-amount',
            title: 'What be the manual labour?',
            input: [
              {
                key: 'manual-labour-amount-A1',
                value: 'Up to 5'
              }
            ]
          }
        ],
        rating: {
          score: 4,
          band: 'Strong',
          importance: null
        }
      },
      {
        key: 'future-customers',
        answers: [
          {
            key: 'future-customers',
            title: 'Who are your current customers?',
            input: [
              {
                key: 'future-customers-A1',
                value: 'Processors'
              },
              {
                key: 'future-customers-A2',
                value: 'Wholesalers'
              }
            ]
          }
        ],
        rating: {
          score: 4,
          band: 'Strong',
          importance: null
        }
      },
      {
        key: 'collaboration',
        answers: [
          {
            key: 'collaboration',
            title: 'Who are your current customers?',
            input: [
              {
                key: 'collaboration-A1',
                value: 'Yes'
              }
            ]
          }
        ],
        rating: {
          score: 4,
          band: 'Strong',
          importance: null
        }
      },
      {
        key: 'environmental-impact',
        answers: [
          {
            key: 'environmental-impact',
            title: 'How will the project improve the environment?',
            input: [
              {
                key: 'environmental-impact-A1',
                value: 'Energy efficiency'
              },
              {
                key: 'environmental-impact-A2',
                value: 'Water efficiency'
              }
            ]
          }
        ],
        rating: {
          score: 0.8,
          band: 'Strong',
          importance: null
        }
      }
    ],
    overallRating: {
      score: 19,
      band: 'Strong'
    }
  },
  questionMapping: {
    productsProcessed: 'produce-processed',
    howAddingValue: 'how-adding-value',
    projectImpact: 'project-impact',
    currentCustomers: 'current-customers',
    futureCustomers: 'future-customers',
    collaboration: 'collaboration',
    environmentalImpact: 'environmental-impact'
  }
}
module.exports = msgData
