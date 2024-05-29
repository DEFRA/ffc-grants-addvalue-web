const { crumbToken } = require('./test-helper')

const { commonFunctionsMock } = require('../../../session-mock')

describe('Page: /fruit-storage', () => {
  const varList = {
    smallerAbattoir: 'No'
  }
  let valList = {}

  commonFunctionsMock(varList, 'Error', {}, valList)

  it('page loads successfully, with all the options', async () => {
    const options = {
      method: 'GET',
      url: `${global.__URLPREFIX__}/fruit-storage`
    }

    const response = await global.__SERVER__.inject(options)
    expect(response.statusCode).toBe(200)
    expect(response.payload).toContain('Do you want to build new controlled atmosphere storage for top fruit?')
    expect(response.payload).toContain('Yes')
    expect(response.payload).toContain('No')
  })

  it('no option selected -> show error message', async () => {
    valList.fruitStorage = {
      error: 'Select yes if you want to build new controlled atmosphere storage for top fruit',
      return: false
    }

    const postOptions = {
      method: 'POST',
      url: `${global.__URLPREFIX__}/fruit-storage`,
      headers: { cookie: 'crumb=' + crumbToken },
      payload: { fruitStorage: '', crumb: crumbToken }
    }

    const postResponse = await global.__SERVER__.inject(postOptions)
    expect(postResponse.statusCode).toBe(200)
    expect(postResponse.payload).toContain('Select yes if you want to build new controlled atmosphere storage for top fruit')
  })

  it('user selects \'Yes\' -> store user response and redirect to /solar-PV-system', async () => {
    valList.fruitStorage = null
    
    const postOptions = {
      method: 'POST',
      url: `${global.__URLPREFIX__}/fruit-storage`,
      headers: { cookie: 'crumb=' + crumbToken },
      payload: { fruitStorage: 'Yes', crumb: crumbToken }
    }

    const postResponse = await global.__SERVER__.inject(postOptions)
    expect(postResponse.statusCode).toBe(302)
    expect(postResponse.headers.location).toBe('solar-PV-system')
  })

  it('user selects \'No\' -> store user response and redirect to /project-items', async () => {    
    const postOptions = {
      method: 'POST',
      url: `${global.__URLPREFIX__}/fruit-storage`,
      headers: { cookie: 'crumb=' + crumbToken },
      payload: { fruitStorage: 'No', crumb: crumbToken }
    }

    const postResponse = await global.__SERVER__.inject(postOptions)
    expect(postResponse.statusCode).toBe(302)
    expect(postResponse.headers.location).toBe('project-items')
  })

  it('page loads with correct back link - /smaller-abattoir', async () => {
    const options = {
      method: 'GET',
      url: `${global.__URLPREFIX__}/fruit-storage`
    }
    
    const response = await global.__SERVER__.inject(options)
    expect(response.statusCode).toBe(200)
    expect(response.payload).toContain('<a href=\"smaller-abattoir\" class=\"govuk-back-link\">Back</a>')
  })
})
