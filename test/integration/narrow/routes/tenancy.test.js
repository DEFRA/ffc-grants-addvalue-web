const { crumbToken } = require('./test-helper')

const { commonFunctionsMock } = require('./../../../session-mock')

describe('Page: /tenancy', () => {
  const varList = { tenancy: 'randomData' }

  let valList = {}

  commonFunctionsMock(varList, 'Error', {}, valList)

  it('page loads successfully, with all the options', async () => {
    const options = {
      method: 'GET',
      url: `${global.__URLPREFIX__}/tenancy`
    }

    const response = await global.__SERVER__.inject(options)
    expect(response.statusCode).toBe(200)
    expect(response.payload).toContain('Is the planned project on land the business owns?')
    expect(response.payload).toContain('Yes')
    expect(response.payload).toContain('No')
  })

  it('no option selected -> show error message', async () => {
    valList.tenancy = {
      error: 'Select yes if the planned project is on land the business owns',
      return: false
    }
    const postOptions = {
      method: 'POST',
      url: `${global.__URLPREFIX__}/tenancy`,
      headers: { cookie: 'crumb=' + crumbToken },
      payload: { tenancy: '', crumb: crumbToken }
    }

    const postResponse = await global.__SERVER__.inject(postOptions)
    expect(postResponse.statusCode).toBe(200)
    expect(postResponse.payload).toContain('Select yes if the planned project is on land the business owns')
  })

  it('user selects \'Yes\' -> store user response and redirect to /smaller-abattoir', async () => {
    valList.tenancy = null
    const postOptions = {
      method: 'POST',
      url: `${global.__URLPREFIX__}/tenancy`,
      headers: { cookie: 'crumb=' + crumbToken },
      payload: { tenancy: 'Yes', crumb: crumbToken }
    }

    const postResponse = await global.__SERVER__.inject(postOptions)
    expect(postResponse.statusCode).toBe(302)
    expect(postResponse.headers.location).toBe('smaller-abattoir')
  })

  it('user selects \'No\' -> store user response and redirect to /tenancy-length', async () => {
    const postOptions = {
      method: 'POST',
      url: `${global.__URLPREFIX__}/tenancy`,
      headers: { cookie: 'crumb=' + crumbToken },
      payload: { tenancy: 'No', crumb: crumbToken }
    }

    const postResponse = await global.__SERVER__.inject(postOptions)
    expect(postResponse.statusCode).toBe(302)
    expect(postResponse.headers.location).toBe('tenancy-length')
  })
})
