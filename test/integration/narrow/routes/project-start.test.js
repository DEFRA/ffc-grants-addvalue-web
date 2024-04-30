const { crumbToken } = require('./test-helper')
const { commonFunctionsMock } = require('./../../../session-mock')

describe('Page: /project-start', () => {
  const varList = { planningPermission: 'randomData' }

  let valList = {}

  commonFunctionsMock(varList, 'Error', {}, valList)
  it('page loads successfully, with all the options', async () => {
    const options = {
      method: 'GET',
      url: `${global.__URLPREFIX__}/project-start`
    }

    const response = await global.__SERVER__.inject(options)
    expect(response.statusCode).toBe(200)
    expect(response.payload).toContain('Have you already started work on the project?')
    expect(response.payload).toContain('Yes, preparatory work')
    expect(response.payload).toContain('Yes, we have begun project work')
    expect(response.payload).toContain('No, we have not done any work on this project yet')
  })

  it('no option selected -> show error message', async () => {
    valList.projectStart = {
      error: 'Select the option that applies to your project',
      return: false
    }
    const postOptions = {
      method: 'POST',
      url: `${global.__URLPREFIX__}/project-start`,
      headers: { cookie: 'crumb=' + crumbToken },
      payload: { projectStart: '', crumb: crumbToken }
    }

    const postResponse = await global.__SERVER__.inject(postOptions)
    expect(postResponse.statusCode).toBe(200)
    expect(postResponse.payload).toContain('Select the option that applies to your project')
  })

  it('user selects ineligible option: \'Yes, we have begun project work\' -> display ineligible page', async () => {
    valList.projectStart.error = 'You cannot apply for a grant from this scheme'
    const postOptions = {
      method: 'POST',
      url: `${global.__URLPREFIX__}/project-start`,
      headers: { cookie: 'crumb=' + crumbToken },
      payload: { projectStart: 'Yes, we have begun project work', crumb: crumbToken }
    }

    const postResponse = await global.__SERVER__.inject(postOptions)
    expect(postResponse.payload).toContain('You cannot apply for a grant from this scheme')
  })

  it('user selects eligible option -> store user response and redirect to /tenancy', async () => {
    valList.projectStart = null
    const postOptions = {
      method: 'POST',
      url: `${global.__URLPREFIX__}/project-start`,
      headers: { cookie: 'crumb=' + crumbToken },
      payload: { projectStart: 'Yes, preparatory work', crumb: crumbToken }
    }

    const postResponse = await global.__SERVER__.inject(postOptions)
    expect(postResponse.statusCode).toBe(302)
    expect(postResponse.headers.location).toBe('tenancy')
  })
})
