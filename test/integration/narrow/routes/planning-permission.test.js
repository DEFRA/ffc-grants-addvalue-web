const { crumbToken } = require('./test-helper')
const { commonFunctionsMock } = require('./../../../session-mock')

describe('Page: /planning-permission', () => {
  const varList = { inEngland: 'randomData' }

  let valList = {}

  commonFunctionsMock(varList, 'Error', {}, valList)

  it('page loads successfully, with all the options', async () => {
    const options = {
      method: 'GET',
      url: `${global.__URLPREFIX__}/planning-permission`
    }

    const response = await global.__SERVER__.inject(options)
    expect(response.statusCode).toBe(200)
    expect(response.payload).toContain('Does the project have planning permission?')
    expect(response.payload).toContain('Not needed')
    expect(response.payload).toContain('Secured')
    expect(response.payload).toContain('Should be in place by the time I make my full application')
    expect(response.payload).toContain('Will not be in place by the time I make my full application')
  })

  it('no option selected -> show error message', async () => {
    valList.planningPermission = {
      error: 'Select when the project will have planning permission',
      return: false
    }
    const postOptions = {
      method: 'POST',
      url: `${global.__URLPREFIX__}/planning-permission`,
      headers: { cookie: 'crumb=' + crumbToken },
      payload: { planningPermission: '', crumb: crumbToken }
    }

    const postResponse = await global.__SERVER__.inject(postOptions)
    expect(postResponse.statusCode).toBe(200)
    expect(postResponse.payload).toContain('Select when the project will have planning permission')
  })

  it('user selects ineligible option: \'Will not be in place by the time I make my full application\' -> display ineligible page', async () => {
    valList.planningPermission.error = 'You cannot apply for a grant from this scheme'
    const postOptions = {
      method: 'POST',
      url: `${global.__URLPREFIX__}/planning-permission`,
      headers: { cookie: 'crumb=' + crumbToken },
      payload: { planningPermission: 'Will not be in place by the time I make my full application', crumb: crumbToken }
    }

    const postResponse = await global.__SERVER__.inject(postOptions)
    expect(postResponse.payload).toContain('You cannot apply for a grant from this scheme')
  })

  it('user selects conditional option: \'Should be in place by the time I make my full application\' -> display conditional page', async () => {
    valList.planningPermission = null
    const postOptions = {
      method: 'POST',
      url: `${global.__URLPREFIX__}/planning-permission`,
      headers: { cookie: 'crumb=' + crumbToken },
      payload: { planningPermission: 'Should be in place by the time I make my full application', crumb: crumbToken }
    }

    const postResponse = await global.__SERVER__.inject(postOptions)
    expect(postResponse.statusCode).toBe(302)
    expect(postResponse.headers.location).toBe('planning-required-condition')
  })

  it('user selects eligible option [Not needed | Secured]-> store user response and redirect to /project-start', async () => {
    const postOptions = {
      method: 'POST',
      url: `${global.__URLPREFIX__}/planning-permission`,
      headers: { cookie: 'crumb=' + crumbToken },
      payload: { planningPermission: 'Secured', crumb: crumbToken }
    }

    const postResponse = await global.__SERVER__.inject(postOptions)
    expect(postResponse.statusCode).toBe(302)
    expect(postResponse.headers.location).toBe('project-start')
  })
})
