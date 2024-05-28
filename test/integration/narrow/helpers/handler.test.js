jest.mock('ffc-grants-common-functionality', () => ({
        pageGuard: {
            guardPage: (request, h, page, next) => true
        },
        session: {
            getYarValue: jest.fn()
        },
        regex: {
            PROJECT_COST_REGEX: /^[1-9]\d*$/,
            SELECT_VARIABLE_TO_REPLACE: /{{_(.+?)_}}/ig,
            DELETE_POSTCODE_CHARS_REGEX: /[)(.\s-]*/g,
            MIN_2_LETTERS_TO_USE_SPECIAL_CHARACTER: /^[a-zA-Z]{2}.*/,
            NAME_ONLY_REGEX: /^[a-zA-Z,' -]*$/,
            EMAIL_REGEX: /^\w+([.-](\w+))*@[a-zA-Z0-9]+([_-][a-zA-Z0-9]+)*(\.[a-zA-Z]{2,5})+$/,
            CHARS_MIN_10: /^.{10,}$/,
            PHONE_REGEX: /^\+?[0-9[\s()\]-]{10,}$/,
            ADDRESS_REGEX: /^[a-zA-Z0-9' -]*$/,
            MIN_3_LETTERS: /^(.*[a-zA-Z]){3,}.*$/,
            ONLY_TEXT_REGEX: /^[a-zA-Z\s-]+$/,
            POSTCODE_REGEX: /^\s*[a-z]{1,2}\d[a-z\d]?\s*\d[a-z]{2}\s*$/i,
            WHOLE_NUMBER_REGEX: /^\d+$/,
            SBI_REGEX: /^(\d{9})$/,
            CURRENCY_FORMAT: /^(\d+|\d{1,3}(,\d{3})+)$/,
            CHARS_MAX_10: /^.{1,10}$/,
            CHARS_MIN_10: /^.{10,}$/,
            CHARS_MAX_100: /^.{0,100}$/,
        },
        counties: {
            LIST_COUNTIES: ['Derbyshire', 'Leicestershire', 'Lincolnshire', 'Northamptonshire', 'Nottinghamshire', 'Rutland']
        },
        answerOptions: {
            getOptions: jest.fn()
        },
        utils: {
            getQuestionByKey: jest.fn(),
            allAnswersSelected: jest.fn()
        },
        errorHelpers: {
            validateAnswerField: jest.fn(),
            checkInputError: jest.fn()
        }
    })
)

const { getHandler } = require('./../../../../app/helpers/handlers')

// mini test for isRedirect
describe('Handler tests', () => {

    let question
    let mockH

    test('Should redirect if pageGuard says so', async () => {

        mockH = {redirect: jest.fn() }

        question = {
            url: 'planning-permission',
            title: 'mock-title'
        }

        await getHandler(question)({}, mockH)
        expect(mockH.redirect).toBeCalledWith('/adding-value/start')


    })
})