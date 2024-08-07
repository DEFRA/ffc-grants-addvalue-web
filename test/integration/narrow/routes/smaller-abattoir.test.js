const { crumbToken } = require('./test-helper')

const { commonFunctionsMock } = require('./../../../session-mock')

describe('Page: /smaller-abattoir', () => {
  const varList = {}
  let valList = {}

  commonFunctionsMock(varList, 'Error', {}, valList)

  it('page loads successfully, with all the options', async () => {
    const options = {
      method: 'GET',
      url: `${global.__URLPREFIX__}/smaller-abattoir`
    }

    const response = await global.__SERVER__.inject(options)
    expect(response.statusCode).toBe(200)
    expect(response.payload).toContain('Do you want to build a new smaller abattoir?')
    expect(response.payload).toContain('A smaller abattoir is a:')
    expect(response.payload).toContain('red meat abattoir that processes up to 10,000 livestock units each year')
    expect(response.payload).toContain('poultry abattoir that slaughters up to 500,000 birds each year')
    expect(response.payload).toContain('Yes')
    expect(response.payload).toContain('No')
  })

  it('no option selected -> show error message', async () => {
    valList.smallerAbattoir = {
      error: 'Select yes if you want to build a new smaller abattoir',
      return: false
    }

    const postOptions = {
      method: 'POST',
      url: `${global.__URLPREFIX__}/smaller-abattoir`,
      headers: { cookie: 'crumb=' + crumbToken },
      payload: { smallerAbattoir: '', crumb: crumbToken }
    }

    const postResponse = await global.__SERVER__.inject(postOptions)
    expect(postResponse.statusCode).toBe(200)
    expect(postResponse.payload).toContain('Select yes if you want to build a new smaller abattoir')
  })

  it('user selects \'Yes\' -> store user response and redirect to /other-farmers', async () => {
    valList.smallerAbattoir = null
    
    const postOptions = {
      method: 'POST',
      url: `${global.__URLPREFIX__}/smaller-abattoir`,
      headers: { cookie: 'crumb=' + crumbToken },
      payload: { smallerAbattoir: 'Yes', crumb: crumbToken }
    }

    const postResponse = await global.__SERVER__.inject(postOptions)
    expect(postResponse.statusCode).toBe(302)
    expect(postResponse.headers.location).toBe('other-farmers')
  })

  it('user selects \'No\' -> store user response and redirect to /fruit-storage', async () => {    
    const postOptions = {
      method: 'POST',
      url: `${global.__URLPREFIX__}/smaller-abattoir`,
      headers: { cookie: 'crumb=' + crumbToken },
      payload: { smallerAbattoir: 'No', crumb: crumbToken }
    }

    const postResponse = await global.__SERVER__.inject(postOptions)
    expect(postResponse.statusCode).toBe(302)
    expect(postResponse.headers.location).toBe('fruit-storage')
  })

  it('page loads with correct back link - /tenancy-length-condition - if user selected \'Yes\' on /tenancy', async () => {
    varList.tenancy = "Yes"
    
    const options = {
      method: 'GET',
      url: `${global.__URLPREFIX__}/smaller-abattoir`
    }

    const response = await global.__SERVER__.inject(options)
    expect(response.statusCode).toBe(200)
    expect(response.payload).toContain('<a href=\"tenancy-length-condition\" class=\"govuk-back-link\">Back</a>')
  })

  it('page loads with correct back link - /tenancy-length - if user selected \'No\' on /tenancy', async () => {
    varList.tenancy = "No"
    varList.tenancyLength = "Yes"
    
    const options = {
      method: 'GET',
      url: `${global.__URLPREFIX__}/smaller-abattoir`
    }
    
    const response = await global.__SERVER__.inject(options)
    expect(response.statusCode).toBe(200)
    expect(response.payload).toContain('<a href=\"tenancy-length\" class=\"govuk-back-link\">Back</a>')
  })
})
