const { crumbToken } = require('./test-helper')
const { commonFunctionsMock } = require('./../../../session-mock')

describe('Page: /future-customers', () => {
  const varList = { projectImpact: 'randomData' }

  let valList = {}

  commonFunctionsMock(varList, 'Error', {}, valList)

  it('page loads successfully, with all the options', async () => {
    const options = {
      method: 'GET',
      url: `${global.__URLPREFIX__}/future-customers`
    }

    const response = await global.__SERVER__.inject(options)
    expect(response.statusCode).toBe(200)
    expect(response.payload).toContain('Who will your new customers be after the project?')
    expect(response.payload).toContain('Producers or growers')
    expect(response.payload).toContain('Processors')
    expect(response.payload).toContain('Wholesalers')
    expect(response.payload).toContain('Retailers')
    expect(response.payload).toContain('Selling direct to consumers')
    expect(response.payload).toContain('No change')
  })

  it('no option selected -> show error message', async () => {
    valList.futureCustomers = {
      error: 'Select all options that apply',
      return: false
    }
    const postOptions = {
      method: 'POST',
      url: `${global.__URLPREFIX__}/future-customers`,
      headers: { cookie: 'crumb=' + crumbToken },
      payload: { futureCustomers: '', crumb: crumbToken }
    }

    const postResponse = await global.__SERVER__.inject(postOptions)
    expect(postResponse.statusCode).toBe(200)
    expect(postResponse.payload).toContain('Select all options that apply')
  })

  it('user selects a valid customer option together with option: \'No change\' -> display error page', async () => {
    valList.futureCustomers.error = 'You cannot select ‘No change’ and another option'

    const postOptions = {
      method: 'POST',
      url: `${global.__URLPREFIX__}/future-customers`,
      headers: { cookie: 'crumb=' + crumbToken },
      payload: { futureCustomers: ['Processors', 'No change'], crumb: crumbToken }
    }

    const postResponse = await global.__SERVER__.inject(postOptions)
    expect(postResponse.statusCode).toBe(200)
    expect(postResponse.payload).toContain('You cannot select ‘No change’ and another option')
  })

  it('user selects eligible option -> store user response and redirect to /collaboration', async () => {
    valList.futureCustomers = null
    const postOptions = {
      method: 'POST',
      url: `${global.__URLPREFIX__}/future-customers`,
      headers: { cookie: 'crumb=' + crumbToken },
      payload: { futureCustomers: 'Wholesalers', crumb: crumbToken }
    }

    const postResponse = await global.__SERVER__.inject(postOptions)
    expect(postResponse.statusCode).toBe(302)
    expect(postResponse.headers.location).toBe('collaboration')
  })
})
