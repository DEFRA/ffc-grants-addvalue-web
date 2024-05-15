const { crumbToken } = require('./test-helper')
const { commonFunctionsMock } = require('./../../../session-mock')

describe('Page: /future-customers', () => {
  const utilsList = {
    'mechanisation-A1': 'Yes',
    'mechanisation-A2': 'No',
  }

  const varList = { mechanisation: 'Yes' }

  let valList = {}

  commonFunctionsMock(varList, 'Error', {}, valList)

  it('page loads successfully, with all the options', async () => {
    const options = {
      method: 'GET',
      url: `${global.__URLPREFIX__}/future-customers`
    }

    const response = await global.__SERVER__.inject(options)
    expect(response.statusCode).toBe(200)
    expect(response.payload).toContain('Who will your new customers be after this project?')
    expect(response.payload).toContain('Processors')
    expect(response.payload).toContain('Wholesalers')
    expect(response.payload).toContain('Retailers')
    expect(response.payload).toContain('Selling direct to consumers')
    expect(response.payload).toContain('No change')
  })

  it('no option selected -> show error message', async () => {
    valList.futureCustomers = {
      error: 'Select who your new customers will be after this project',
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
    expect(postResponse.payload).toContain('Select who your new customers will be after this project')
  })

  it('user selects a valid customer option together with option: \'No change\' -> display error page', async () => {
    valList.futureCustomers.error = 'You cannot select that combination of options'

    const postOptions = {
      method: 'POST',
      url: `${global.__URLPREFIX__}/future-customers`,
      headers: { cookie: 'crumb=' + crumbToken },
      payload: { futureCustomers: ['Processors', 'No change'], crumb: crumbToken }
    }

    const postResponse = await global.__SERVER__.inject(postOptions)
    expect(postResponse.statusCode).toBe(200)
    expect(postResponse.payload).toContain('You cannot select that combination of options')
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


  xit('page loads with correct back link when the user anwered "Yes" on /mechanisation', async () => {
    varList.mechanisation = 'Yes'
    const options = {
      method: 'GET',
      url: `${global.__URLPREFIX__}/future-customers`
    }
    const response = await global.__SERVER__.inject(options)
    expect(response.statusCode).toBe(200)
    expect(response.payload).toContain('<a href=\"manual-labour-amount\" class=\"govuk-back-link\">Back</a>')
  })

  it('page loads with correct back link when the user anwered "No" on /mechanisation', async () => {
    varList.mechanisation = 'No'
    const options = {
      method: 'GET',
      url: `${global.__URLPREFIX__}/future-customers`
    }
    const response = await global.__SERVER__.inject(options)
    expect(response.statusCode).toBe(200)
    expect(response.payload).toContain('<a href=\"mechanisation\" class=\"govuk-back-link\">Back</a>')
  })
})
