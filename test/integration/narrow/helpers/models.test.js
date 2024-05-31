
jest.mock('../../../../app/helpers/urls')
const { getUrl } = require('../../../../app/helpers/urls')

jest.mock('ffc-grants-common-functionality')
const { getYarValue } = require('ffc-grants-common-functionality').session
const { allAnswersSelected } = require('ffc-grants-common-functionality').utils

describe('Models', () => {
  const question = {
    type: 'mock_type',
    backUrl: 'mock_back_url',
    key: 'mock_key',
    answers: [{
      value: 'mock_answer_value',
      hint: 'hint',
      text: 'answer_text'
    }],
    sidebar: {
      values: [{
        heading: 'Eligibility',
        content: [{
          para: `This grant is for pig, beef or dairy farmers.
          
          Poultry, arable-only, contractors and horticultural growers are not currently eligible.`
        }]
      }]
    },
    score: '123',
    warning: {
      text: 'Other types of business may be supported in future schemes',
      iconFallbackText: 'Warning'
    }
  }

  const { getModel } = require('../../../../app/helpers/models')

  test('inspect getModel() - full value', () => {
    expect(getModel([], question, {})).toEqual({
      type: 'mock_type',
      key: 'mock_key',
      title: undefined,
      backUrl: undefined,
    //   hint: undefined,
      items: undefined,
      sideBarText: {
        values: [
          expect.objectContaining({ heading: 'Eligibility' })
        ]
      },
      warning: {
        text: 'Other types of business may be supported in future schemes',
        iconFallbackText: 'Warning'
      },
    //   reachedCheckDetails: false,
    //   reachedEvidenceSummary: false,
      diaplaySecondryBtn: false
    })
  })

  test('inspect getModel().title', () => {
    expect(getModel([], question, {})).toEqual(
      expect.objectContaining({
        type: 'mock_type',
        key: 'mock_key',
        title: undefined
      })
    )

    question.label = { text: 'mock_label_text' }
    expect(getModel([], question, {})).toEqual(
      expect.objectContaining({
        type: 'mock_type',
        key: 'mock_key',
        title: 'mock_label_text'
      })
    )

    question.title = 'mock_title'
    expect(getModel([], question, {})).toEqual(
      expect.objectContaining({
        type: 'mock_type',
        key: 'mock_key',
        title: 'mock_title'
      })
    )
  })

  test('inspect getModel().backUrl', () => { // TODO: Refactor this
    getYarValue.mockReturnValueOnce('mock-value')
    getYarValue.mockReturnValueOnce('mock-value')
    getYarValue.mockReturnValueOnce(undefined)
    getYarValue.mockReturnValueOnce('mock-value')

    getUrl.mockReturnValueOnce('remaining-costs')
    getUrl.mockReturnValueOnce('tenancy')
    getUrl.mockReturnValueOnce('tenancy')

    expect(getModel([], question, {}).backUrl).toBeNull()
    expect(getModel([], question, {}).backUrl).toEqual('tenancy')
  })

  test('inspect getModel().warningDetails', () => {
    question.warningCondition = {
      dependentWarningQuestionKey: 'mock_key',
      dependentWarningAnswerKeysArray: {},
      warning: {
        text: 'mock_warning_text',
        iconFallbackText: 'mock_warning'
      }
    }

    allAnswersSelected.mockReturnValueOnce(true)

    expect(getModel([], question, {}).warning).toEqual({
      text: 'mock_warning_text',
      iconFallbackText: 'mock_warning'
    })
  })

  test('Test sidebar in getModel when no yar key value', () => {
    const questionForSidebar = {
      type: 'mock_type',
      backUrl: 'mock_back_url',
      key: 'mock_key',
      answers: [{
        value: 'mock_answer_value',
        hint: 'hint',
        text: 'answer_text'
      }],
      sidebar: {
        mainHeading: 'Your project items',
        values: [
          {
            heading: 'Store',
            content: [{
              para: '',
              items: [],
              dependentAnswerExceptThese: []
            }]
          },
          {
            heading: 'Cover',
            content: [{
              para: '',
              items: [],
              dependentAnswerExceptThese: []
            }]
          }],
        prefixSufix: [{
          linkedPrefix: 'Increase: ',
          linkedSufix: 'm³'
        }],
        linkedQuestionkey: ['serviceable-capacity-increase-additional'],
        dependentQuestionKeys: ['storage-type', 'cover-type']
      },
      score: '123',
      warning: {
        text: 'Other types of business may be supported in future schemes',
        iconFallbackText: 'Warning'
      }
    }

    getYarValue.mockReturnValueOnce('mock-value')
    getYarValue.mockReturnValueOnce('mock-value')
    getYarValue.mockReturnValueOnce(undefined)
    getYarValue.mockReturnValueOnce(undefined)

    expect(getModel([], questionForSidebar, {})).toEqual({
      type: 'mock_type',
      key: 'mock_key',
      title: undefined,
      backUrl: undefined,
      showSidebar: undefined,
    //   hint: undefined,
      items: undefined,
      sideBarText: {
        dependentQuestionKeys: [
          'storage-type', 'cover-type'
        ],
        linkedQuestionkey: ['serviceable-capacity-increase-additional'],
        mainHeading: 'Your project items',
        prefixSufix: [
          {
            linkedPrefix: 'Increase: ',
            linkedSufix: 'm³'
          }
        ],
        values: [
          {
            content: [{
              dependentAnswerExceptThese: [],
              items: ["mock-value", "mock-value"],
              para: ''
            }],
            heading: 'Store'
          },
          {
            content: [
              {
                dependentAnswerExceptThese: [],
                items: [],
                para: ''
              }

            ],
            heading: 'Cover'
          }
        ]
      },
      warning: {
        text: 'Other types of business may be supported in future schemes',
        iconFallbackText: 'Warning'
      },
    //   reachedCheckDetails: false,
    //   reachedEvidenceSummary: false,
      diaplaySecondryBtn: undefined
    })
  })

  
})
