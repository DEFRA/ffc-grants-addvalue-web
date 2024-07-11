const { crumbToken } = require('./test-helper')
const { commonFunctionsMock } = require('./../../../session-mock')
describe('Page: /tenancy-length', () => {
  const varList = { tenancy: 'randomData' }

  let valList = {}

  commonFunctionsMock(varList, 'Error', {}, valList)

  it('page loads successfully, with all the options', async () => {
    const options = {
      method: 'GET',
      url: `${global.__URLPREFIX__}/tenancy-length`
    }

    const response = await global.__SERVER__.inject(options)
    expect(response.statusCode).toBe(200)
    expect(response.payload).toContain('Do you have a tenancy agreement for 5 years after the final grant payment?')
    expect(response.payload).toContain('Yes')
    expect(response.payload).toContain('No')
  })

  it('no option selected -> show error message', async () => {
    valList.tenancyLength = {
      error: 'Select yes if the land has a tenancy agreement in place for 5 years after the final grant payment.',
      return: false
    }
    const postOptions = {
      method: 'POST',
      url: `${global.__URLPREFIX__}/tenancy-length`,
      headers: { cookie: 'crumb=' + crumbToken },
      payload: { tenancyLength: '', crumb: crumbToken }
    }

    const postResponse = await global.__SERVER__.inject(postOptions)
    expect(postResponse.statusCode).toBe(200)
    expect(postResponse.payload).toContain('Select yes if the land has a tenancy agreement in place for 5 years after the final grant payment.')
  })

  it('user selects conditional option: \'No\' -> display conditional page', async () => {
    valList.tenancyLength = null
    const postOptions = {
      method: 'POST',
      url: `${global.__URLPREFIX__}/tenancy-length`,
      headers: { cookie: 'crumb=' + crumbToken },
      payload: { tenancyLength: 'No', crumb: crumbToken }
    }

    const postResponse = await global.__SERVER__.inject(postOptions)
    expect(postResponse.statusCode).toBe(302)
    expect(postResponse.headers.location).toBe('tenancy-length-condition')
  })

  it('user at tenancy-length-condition page: \'continue\' -> display smaller-abattoir page', async () => {
    const postOptions = {
      method: 'POST',
      url: `${global.__URLPREFIX__}/tenancy-length-condition`,
      headers: { cookie: 'crumb=' + crumbToken },
      payload: { crumb: crumbToken }
    }

    const postResponse = await global.__SERVER__.inject(postOptions)
    expect(postResponse.statusCode).toBe(302)
    expect(postResponse.headers.location).toBe('smaller-abattoir')
  })

  it('user selects eligible option: \'Yes\' -> store user response and redirect to /system-type', async () => {
    const postOptions = {
      method: 'POST',
      url: `${global.__URLPREFIX__}/tenancy-length`,
      headers: { cookie: 'crumb=' + crumbToken },
      payload: { tenancyLength: 'Yes', crumb: crumbToken }
    }

    const postResponse = await global.__SERVER__.inject(postOptions)
    expect(postResponse.statusCode).toBe(302)
    expect(postResponse.headers.location).toBe('smaller-abattoir')
  })
})
