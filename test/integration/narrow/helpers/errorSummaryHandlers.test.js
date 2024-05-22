describe('Get & Post Handlers', () => {
    jest.mock('ffc-grants-common-functionality', () => {
      const original = jest.requireActual('ffc-grants-common-functionality')
      return {
        ...original,
        session: {
          getYarValue: jest.fn()
        },
        errorHelpers: {
          checkInputError: jest.fn(),
          validateAnswerField: jest.fn()
        },
        utils: {
          getQuestionAnswer: jest.fn()
        }
        
      }
    })
    const { session, errorHelpers, utils } = require('ffc-grants-common-functionality')
  
    jest.mock('../../../../app/helpers/conditionalHTML')
    const { getHtml } = require('../../../../app/helpers/conditionalHTML')
  
    jest.mock('../../../../app/helpers/models')
    const { getModel } = require('../../../../app/helpers/models')
  
    const {
      customiseErrorText, checkErrors
    } = require('../../../../app/helpers/errorSummaryHandlers')
  
    let mockH
  
    test('check customiseErrorText()', () => {
      mockH = { view: jest.fn() }
      session.getYarValue.mockReturnValue('mock-yar-value')
      getHtml.mockReturnValue('mock-html')
      getModel.mockReturnValue({ items: ['item1', 'item2'] })
  
      let currentQuestion = {
        yarKey: 'mock-yarKey',
        type: 'multi-input',
        conditionalKey: 'mock-condKey'
      }
      let errorList = [{ href: 'mock-yarKey', text: 'mock-href-text' }]
      customiseErrorText('mock-value', currentQuestion, errorList, mockH, {})
      expect(mockH.view).toHaveBeenCalledWith(
        'page',
        {
          items: ['item1', 'item2'],
          errorList: [{
            href: 'mock-yarKey',
            text: 'mock-href-text'
          }]
        })
  
      getModel.mockReturnValue({ items: { item1: 'item1', item2: 'item2' } })
      currentQuestion = {
        ...currentQuestion,
        type: 'mock-type'
      }
      mockH.view.mockClear()
      customiseErrorText('mock-value', currentQuestion, errorList, mockH, {})
      expect(mockH.view).toHaveBeenCalledWith(
        'page',
        {
          items: {
            item1: 'item1',
            item2: 'item2',
            errorMessage: { text: 'mock-href-text' }
          },
          errorList: [{
            href: 'mock-yarKey',
            text: 'mock-href-text'
          }]
        }
      )
  
      getModel.mockReturnValue({ items: { item1: 'item1', item2: 'item2' } })
      errorList = [{ href: 'mock-another-yarKey', text: 'mock-another-href-text' }]
      mockH.view.mockClear()
      customiseErrorText('mock-value', currentQuestion, errorList, mockH, {})
      expect(mockH.view).toHaveBeenCalledWith(
        'page',
        {
          items: { item1: 'item1', item2: 'item2' },
          errorList: [{
            href: 'mock-another-yarKey',
            text: 'mock-another-href-text'
          }]
        }
      )
    })

    test('check checkErrors - volume', (() => {
      mockH = { view: jest.fn() }
      let mockInputError = {
        type: 'COMBINATION_ANSWER',
        error: '',
        combinationErrorsList: [['project-impact-A1', 'project-impact-A2'], ['project-impact-A1', 'project-impact-A3'],
        ['project-impact-A1', 'project-impact-A2', 'project-impact-A3'], ['project-impact-A1', 'project-impact-A2', 'project-impact-A4'],
        ['project-impact-A1', 'project-impact-A3', 'project-impact-A4'], ['project-impact-A1', 'project-impact-A2', 'project-impact-A3', 'project-impact-A4']],
        combinationObject: {
          questionKey: 'project-impact',
          combinationAnswerKeys: ['project-impact-A1', 'project-impact-A4']
        }
      }
      

      session.getYarValue.mockReturnValue('mock-yar-value')
      errorHelpers.checkInputError.mockReturnValue(mockInputError)
      utils.getQuestionAnswer.mockReturnValueOnce('Starting to make added-value products for the first time')
      utils.getQuestionAnswer.mockReturnValueOnce('Increasing volume of added-value products')


      getHtml.mockReturnValue('mock-html')
      getModel.mockReturnValue({ items: ['item1', 'item2'] })

      let payload = {
        projectImpact: ['Starting to make added-value products for the first time', 'Increasing volume of added-value products'],
      }

      let currentQuestion = {
        type: 'sup',
        validate: [
          {
            type: 'NOT_EMPTY',
            error: 'Select what impact this project will have'
          },
          {
            type: 'COMBINATION_ANSWER',
            error: '',
            combinationErrorsList: [['project-impact-A1', 'project-impact-A2'], ['project-impact-A1', 'project-impact-A3'],
            ['project-impact-A1', 'project-impact-A2', 'project-impact-A3'], ['project-impact-A1', 'project-impact-A2', 'project-impact-A4'],
            ['project-impact-A1', 'project-impact-A3', 'project-impact-A4'], ['project-impact-A1', 'project-impact-A2', 'project-impact-A3', 'project-impact-A4']],
            combinationObject: {
              questionKey: 'project-impact',
              combinationAnswerKeys: ['project-impact-A1', 'project-impact-A4']
            }
          }
        ],
        answers: [
          {
            key: 'project-impact-A3',
            value: 'Increasing range of added-value products'
          },
          {
            key: 'project-impact-A2',
            value: 'Increasing volume of added-value products'
          },
          {
            key: 'project-impact-A4',
            value: 'Allow selling direct to consumer',
            hint: {
              text: 'For example, retail and internet sales'
            }
          },
          {
            key: 'project-impact-A1',
            value: 'Starting to make added-value products for the first time',
            hint: {
              text: 'This only applies if you do not currently make added-value products'
            }
          }
        ],
        yarKey: 'projectImpact'
      }

      checkErrors(payload, currentQuestion, mockH, {})

      expect(mockH.view).toHaveBeenCalledWith("page", {"errorList": [{"href": "#projectImpact", "text": "Select either 'Starting to make added-value products for the first time' or 'Increasing volume'"}], "items": {"0": "item1", "1": "item2", "errorMessage": {"text": "Select either 'Starting to make added-value products for the first time' or 'Increasing volume'"}}})


    }))

    test('check checkErrors - range', (() => {
      mockH = { view: jest.fn() }
      let mockInputError = {
        type: 'COMBINATION_ANSWER',
        error: '',
        combinationErrorsList: [['project-impact-A1', 'project-impact-A2'], ['project-impact-A1', 'project-impact-A3'],
        ['project-impact-A1', 'project-impact-A2', 'project-impact-A3'], ['project-impact-A1', 'project-impact-A2', 'project-impact-A4'],
        ['project-impact-A1', 'project-impact-A3', 'project-impact-A4'], ['project-impact-A1', 'project-impact-A2', 'project-impact-A3', 'project-impact-A4']],
        combinationObject: {
          questionKey: 'project-impact',
          combinationAnswerKeys: ['project-impact-A1', 'project-impact-A4']
        }
      }
      

      session.getYarValue.mockReturnValue('mock-yar-value')
      errorHelpers.checkInputError.mockReturnValue(mockInputError)
      utils.getQuestionAnswer.mockReturnValueOnce('Starting to make added-value products for the first time')
      utils.getQuestionAnswer.mockReturnValueOnce(null)
      utils.getQuestionAnswer.mockReturnValueOnce('Starting to make added-value products for the first time')
      utils.getQuestionAnswer.mockReturnValueOnce('Increasing range of added-value products')


      getHtml.mockReturnValue('mock-html')
      getModel.mockReturnValue({ items: ['item1', 'item2'] })

      let payload = {
        projectImpact: ['Starting to make added-value products for the first time', 'Increasing range of added-value products'],
      }

      let currentQuestion = {
        type: 'sup',
        validate: [
          {
            type: 'NOT_EMPTY',
            error: 'Select what impact this project will have'
          },
          {
            type: 'COMBINATION_ANSWER',
            error: '',
            combinationErrorsList: [['project-impact-A1', 'project-impact-A2'], ['project-impact-A1', 'project-impact-A3'],
            ['project-impact-A1', 'project-impact-A2', 'project-impact-A3'], ['project-impact-A1', 'project-impact-A2', 'project-impact-A4'],
            ['project-impact-A1', 'project-impact-A3', 'project-impact-A4'], ['project-impact-A1', 'project-impact-A2', 'project-impact-A3', 'project-impact-A4']],
            combinationObject: {
              questionKey: 'project-impact',
              combinationAnswerKeys: ['project-impact-A1', 'project-impact-A4']
            }
          }
        ],
        answers: [
          {
            key: 'project-impact-A3',
            value: 'Increasing range of added-value products'
          },
          {
            key: 'project-impact-A2',
            value: 'Increasing volume of added-value products'
          },
          {
            key: 'project-impact-A4',
            value: 'Allow selling direct to consumer',
            hint: {
              text: 'For example, retail and internet sales'
            }
          },
          {
            key: 'project-impact-A1',
            value: 'Starting to make added-value products for the first time',
            hint: {
              text: 'This only applies if you do not currently make added-value products'
            }
          }
        ],
        yarKey: 'projectImpact'
      }

      checkErrors(payload, currentQuestion, mockH, {})

      expect(mockH.view).toHaveBeenCalledWith("page", {"errorList": [{"href": "#projectImpact", "text": "Select either 'Starting to make added-value products for the first time' or 'Increasing range'"}], "items": {"0": "item1", "1": "item2", "errorMessage": {"text": "Select either 'Starting to make added-value products for the first time' or 'Increasing range'"}}})


    }))

    test('check checkErrors - both', (() => {
      mockH = { view: jest.fn() }
      let mockInputError = {
        type: 'COMBINATION_ANSWER',
        error: '',
        combinationErrorsList: [['project-impact-A1', 'project-impact-A2'], ['project-impact-A1', 'project-impact-A3'],
        ['project-impact-A1', 'project-impact-A2', 'project-impact-A3'], ['project-impact-A1', 'project-impact-A2', 'project-impact-A4'],
        ['project-impact-A1', 'project-impact-A3', 'project-impact-A4'], ['project-impact-A1', 'project-impact-A2', 'project-impact-A3', 'project-impact-A4']],
        combinationObject: {
          questionKey: 'project-impact',
          combinationAnswerKeys: ['project-impact-A1', 'project-impact-A4']
        }
      }
      

      session.getYarValue.mockReturnValue('mock-yar-value')
      errorHelpers.checkInputError.mockReturnValue(mockInputError)
      utils.getQuestionAnswer.mockReturnValueOnce('Starting to make added-value products for the first time')
      utils.getQuestionAnswer.mockReturnValueOnce('Increasing volume of added-value products')
      utils.getQuestionAnswer.mockReturnValueOnce('Increasing range of added-value products')
      utils.getQuestionAnswer.mockReturnValueOnce('Allow selling direct to consumer')



      getHtml.mockReturnValue('mock-html')
      getModel.mockReturnValue({ items: ['item1', 'item2'] })

      let payload = {
        projectImpact: ['Starting to make added-value products for the first time', 'Increasing volume of added-value products', 'Increasing range of added-value products', 'Allow selling direct to consumer'],
      }

      let currentQuestion = {
        type: 'sup',
        validate: [
          {
            type: 'NOT_EMPTY',
            error: 'Select what impact this project will have'
          },
          {
            type: 'COMBINATION_ANSWER',
            error: '',
            combinationErrorsList: [['project-impact-A1', 'project-impact-A2'], ['project-impact-A1', 'project-impact-A3'],
            ['project-impact-A1', 'project-impact-A2', 'project-impact-A3'], ['project-impact-A1', 'project-impact-A2', 'project-impact-A4'],
            ['project-impact-A1', 'project-impact-A3', 'project-impact-A4'], ['project-impact-A1', 'project-impact-A2', 'project-impact-A3', 'project-impact-A4']],
            combinationObject: {
              questionKey: 'project-impact',
              combinationAnswerKeys: ['project-impact-A1', 'project-impact-A4']
            }
          }
        ],
        answers: [
          {
            key: 'project-impact-A3',
            value: 'Increasing range of added-value products'
          },
          {
            key: 'project-impact-A2',
            value: 'Increasing volume of added-value products'
          },
          {
            key: 'project-impact-A4',
            value: 'Allow selling direct to consumer',
            hint: {
              text: 'For example, retail and internet sales'
            }
          },
          {
            key: 'project-impact-A1',
            value: 'Starting to make added-value products for the first time',
            hint: {
              text: 'This only applies if you do not currently make added-value products'
            }
          }
        ],
        yarKey: 'projectImpact'
      }

      checkErrors(payload, currentQuestion, mockH, {})

      expect(mockH.view).toHaveBeenCalledWith("page", {"errorList": [{"href": "#projectImpact", "text": "Select either 'Starting to make added-value products for the first time' or 'Increasing volume' and 'Increasing range'"}], "items": {"0": "item1", "1": "item2", "errorMessage": {"text": "Select either 'Starting to make added-value products for the first time' or 'Increasing volume' and 'Increasing range'"}}})


    }))
})
  