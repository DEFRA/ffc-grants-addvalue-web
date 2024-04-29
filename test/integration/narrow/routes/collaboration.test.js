const { crumbToken } = require('./test-helper')
const { commonFunctionsMock } = require('./../../../session-mock')

describe('Page: /collaboration', () => {
  const varList = { futureCustomers: 'randomData' }

  let valList = {}
  commonFunctionsMock(varList, 'Error', {}, valList)

  it('page loads successfully, with all the options', async () => {
    const options = {
      method: 'GET',
      url: `${global.__URLPREFIX__}/collaboration`
    }

    const response = await global.__SERVER__.inject(options)
    expect(response.statusCode).toBe(200)
    expect(response.payload).toContain('Will you work in partnership or collaborate with other farmers or producers?')
    expect(response.payload).toContain('Yes')
    expect(response.payload).toContain('No')
  })

  it('no option selected -> show error message', async () => {
    valList.collaboration = {
      error: 'Select yes if you will be buying materials from other farmers',
      return: false
    }
    const postOptions = {
      method: 'POST',
      url: `${global.__URLPREFIX__}/collaboration`,
      headers: { cookie: 'crumb=' + crumbToken },
      payload: { collaboration: '', crumb: crumbToken }
    }

    const postResponse = await global.__SERVER__.inject(postOptions)
    expect(postResponse.statusCode).toBe(200)
    expect(postResponse.payload).toContain('Select yes if you will be buying materials from other farmers')
  })

  it('user selects any option [Yes | No] -> store user response and redirect to /environmental-impact', async () => {
    valList.collaboration = null
    const postOptions = {
      method: 'POST',
      url: `${global.__URLPREFIX__}/collaboration`,
      headers: { cookie: 'crumb=' + crumbToken },
      payload: { collaboration: 'Yes', crumb: crumbToken }
    }

    const postResponse = await global.__SERVER__.inject(postOptions)
    expect(postResponse.statusCode).toBe(302)
    expect(postResponse.headers.location).toBe('environmental-impact')
  })
})
