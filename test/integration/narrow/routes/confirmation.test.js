const { crumbToken } = require('./test-helper')

const { commonFunctionsMock } = require('./../../../session-mock')
const senders = require('../../../../app/messaging/senders')

describe('Reference number page', () => {
  const varList = { farmerDetails: 'someValue', agentDetails: 'someValue', projectResponsibility: '' }
  let valList = {}

  const utilsList = {
    'fruit-storage-A1': 'Yes'
  }
    
  commonFunctionsMock(varList, 'Error', utilsList, valList)
  
  it('page loads successfully, with all the options', async () => {
    const options = {
      method: 'GET',
      url: `${global.__URLPREFIX__}/confirmation`,
      headers: {
        cookie: 'crumb=' + crumbToken,
        referer: 'localhost/check-details'
      }
    }

    jest.spyOn(senders, 'sendDesirabilitySubmitted').mockImplementationOnce(() => Promise.resolve(true))

    const response = await global.__SERVER__.inject(options)
    expect(response.statusCode).toBe(200)
    expect(response.payload).toContain('Details submitted')
    expect(response.payload).toContain('We have sent you a confirmation email with a record of your answers.')
    expect(response.payload).toContain('What happens next')
    expect(response.payload).toContain('You must not start the project.')
    expect(response.payload).toContain('Starting the project or committing to any costs (such as placing orders) before you receive a funding agreement will invalidate your application.')
    expect(response.payload).toContain('get quotes from suppliers')
    expect(response.payload).toContain('apply for planning permission')
    expect(response.payload).toContain('What do you think of this service?')
    expect(response.payload).toContain('If your application is successful, you’ll be sent a funding agreement and can begin work on the project.')
  })

  it('page loads successfully, with all the options when /fruit-storage answer is "Yes"', async () => {
    varList.fruitStorage = 'Yes'
    const options = {
      method: 'GET',
      url: `${global.__URLPREFIX__}/confirmation`,
      headers: {
        cookie: 'crumb=' + crumbToken,
        referer: 'localhost/check-details'
      }
    }

    jest.spyOn(senders, 'sendDesirabilitySubmitted').mockImplementationOnce(() => Promise.resolve(true))

    const response = await global.__SERVER__.inject(options)
    expect(response.statusCode).toBe(200)
    expect(response.payload).toContain('Details submitted')
    expect(response.payload).toContain('We have sent you a confirmation email with a record of your answers.')
    expect(response.payload).toContain('If you do not get an email within 72 hours, please call the RPA helpline and follow the options for the Farming Investment Fund scheme.')
    expect(response.payload).toContain('You can <a class="govuk-link" href="start">check if you can apply for another Adding Value project</a> in addition to top fruit storage.')
    expect(response.payload).toContain('What happens next')
    expect(response.payload).toContain('You must not start the project.')
    expect(response.payload).toContain('Starting the project or committing to any costs (such as placing orders) before you receive a funding agreement will invalidate your application.')
    expect(response.payload).toContain('get quotes from suppliers')
    expect(response.payload).toContain('apply for planning permission')
    expect(response.payload).toContain('What do you think of this service?')
    expect(response.payload).toContain('If your application is successful, you’ll be sent a funding agreement and can begin work on the project.')
  })

  it('page loads successfully, with all the options', async () => {
    const options = {
      method: 'GET',
      url: `${global.__URLPREFIX__}/confirmation`,
      headers: {
        cookie: 'crumb=' + crumbToken,
        referer: 'localhost/check-details'
      }
    }

    jest.spyOn(senders, 'sendDesirabilitySubmitted').mockImplementationOnce(() => Promise.resolve(true))

    const response = await global.__SERVER__.inject(options)
    expect(response.statusCode).toBe(200)
    expect(response.payload).toContain('Details submitted')
    expect(response.payload).toContain('We have sent you a confirmation email with a record of your answers.')
    expect(response.payload).toContain('What happens next')
    expect(response.payload).toContain('You must not start the project.')
    expect(response.payload).toContain('Starting the project or committing to any costs (such as placing orders) before you receive a funding agreement will invalidate your application.')
    expect(response.payload).toContain('get quotes from suppliers')
    expect(response.payload).toContain('apply for planning permission')
    expect(response.payload).toContain('What do you think of this service?')
    expect(response.payload).toContain('If your application is successful, you’ll be sent a funding agreement and can begin work on the project.')
  })

  // it('consent is not given -> redirect to /adding-value/start', async () => {
  //   varList.consentMain = null
  //   const getOtions = {
  //     method: 'GET',
  //     url: `${global.__URLPREFIX__}/confirmation`
  //   }
  //   const getResponse = await global.__SERVER__.inject(getOtions)
  //   expect(getResponse.statusCode).toBe(302)
  //   expect(getResponse.headers.location).toBe(`${global.__URLPREFIX__}/start`)
  // })
})
