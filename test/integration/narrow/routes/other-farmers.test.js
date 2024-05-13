const { crumbToken } = require('./test-helper')

const { commonFunctionsMock } = require('./../../../session-mock')

describe('Page: /other-farmers', () => {
  const varList = {}
  let valList = {}

  commonFunctionsMock(varList, 'Error', {}, valList)

  it('page loads successfully, with all the options', async () => {
    const options = {
      method: 'GET',
      url: `${global.__URLPREFIX__}/other-farmers`
    }

    const response = await global.__SERVER__.inject(options)
    expect(response.statusCode).toBe(200)
    expect(response.payload).toContain('Will this abattoir provide services to other farmers?')
    expect(response.payload).toContain('For example, farmers pay you to slaughter their livestock')
    expect(response.payload).toContain('Yes')
    expect(response.payload).toContain('No')
  })

  it('no option selected -> show error message', async () => {
    valList.otherFarmers = {
      error: 'Select yes if this abattoir will provide services to other farmers',
      return: false
    }

    const postOptions = {
      method: 'POST',
      url: `${global.__URLPREFIX__}/other-farmers`,
      headers: { cookie: 'crumb=' + crumbToken },
      payload: { otherFarmers: '', crumb: crumbToken }
    }

    const postResponse = await global.__SERVER__.inject(postOptions)
    expect(postResponse.statusCode).toBe(200)
    expect(postResponse.payload).toContain('Select yes if this abattoir will provide services to other farmers')
  })

  it('user selects \'Yes\' -> store user response and redirect to /project-items', async () => {
    valList.otherFarmers = null
    
    const postOptions = {
      method: 'POST',
      url: `${global.__URLPREFIX__}/other-farmers`,
      headers: { cookie: 'crumb=' + crumbToken },
      payload: { otherFarmers: 'Yes', crumb: crumbToken }
    }

    const postResponse = await global.__SERVER__.inject(postOptions)
    expect(postResponse.statusCode).toBe(302)
    expect(postResponse.headers.location).toBe('project-items')
  })

  it('user selects \'No\' -> display ineligible page', async () => {    
    const postOptions = {
      method: 'POST',
      url: `${global.__URLPREFIX__}/other-farmers`,
      headers: { cookie: 'crumb=' + crumbToken },
      payload: { otherFarmers: 'No', crumb: crumbToken }
    }

    const postResponse = await global.__SERVER__.inject(postOptions)
    expect(postResponse.payload).toContain('You cannot apply for a grant from this scheme')
    expect(postResponse.payload).toContain('You must provide some abattoir services to other farmers if you are building a new smaller abattoir with this grant.')
  })

  it('page loads with correct back link - /smaller-abattoir', async () => {    
    const options = {
      method: 'GET',
      url: `${global.__URLPREFIX__}/other-farmers`
    }

    const response = await global.__SERVER__.inject(options)
    expect(response.statusCode).toBe(200)
    expect(response.payload).toContain('<a href=\"smaller-abattoir\" class=\"govuk-back-link\">Back</a>')
  })
})
