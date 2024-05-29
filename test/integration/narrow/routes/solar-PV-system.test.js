const { commonFunctionsMock } = require('../../../session-mock')
const { crumbToken } = require('./test-helper')

describe('Page: /solar-PV-system', () => {
  let varList = {
    smallerAbattoir: 'No',
    fruitStorage: null
  }
  let valList = {}
  
  commonFunctionsMock(varList, undefined, {}, valList)

  it('page loads successfully, with all the options', async () => {
    const options = {
      method: 'GET',
      url: `${global.__URLPREFIX__}/solar-PV-system`
    }

    const response = await global.__SERVER__.inject(options)
    expect(response.statusCode).toBe(200)
    expect(response.payload).toContain('Will you buy a solar PV system with this grant?')
    expect(response.payload).toContain('Yes')
    expect(response.payload).toContain('No')
  })

  it('no option selected -> show error message', async () => {
    valList['NOT_EMPTY'] = {
      error: 'Select yes if you will buy a solar PV system with this grant',
      return: false
    }
    
    const postOptions = {
      method: 'POST',
      url: `${global.__URLPREFIX__}/solar-PV-system`,
      headers: { cookie: 'crumb=' + crumbToken },
      payload: { crumb: crumbToken }
    }

    const postResponse = await global.__SERVER__.inject(postOptions)
    expect(postResponse.statusCode).toBe(200)
    expect(postResponse.payload).toContain('Select yes if you will buy a solar PV system with this grant')
  })

  it('user selects eligible option -> store user response and redirect to /project-cost', async () => {
    const postOptions = {
      method: 'POST',
      url: `${global.__URLPREFIX__}/solar-PV-system`,
      headers: { cookie: 'crumb=' + crumbToken },
      payload: { solarPVSystem: 'Yes',  crumb: crumbToken }
    }

    const postResponse = await global.__SERVER__.inject(postOptions)
    expect(postResponse.statusCode).toBe(302)
    expect(postResponse.headers.location).toBe('project-cost')
  })

  it('page loads with correct back link - /storage', async () => {
    varList.smallerAbattoir = 'Yes'
    const options = {
      method: 'GET',
      url: `${global.__URLPREFIX__}/solar-PV-system`
    }
    const response = await global.__SERVER__.inject(options)
    expect(response.statusCode).toBe(200)
    expect(response.payload).toContain('<a href=\"storage" class=\"govuk-back-link\">Back</a>')
  })

  it('page loads with correct back link - /storage', async () => {
    varList.smallerAbattoir = 'No',
    varList.fruitStorage = 'No'
    const options = {
      method: 'GET',
      url: `${global.__URLPREFIX__}/solar-PV-system`
    }
    const response = await global.__SERVER__.inject(options)
    expect(response.statusCode).toBe(200)
    expect(response.payload).toContain('<a href=\"storage\" class=\"govuk-back-link\">Back</a>')
  })

  it('page loads with correct back link - /fruit-storage', async () => {
    varList.smallerAbattoir = 'No',
    varList.fruitStorage = 'Yes'
    const options = {
      method: 'GET',
      url: `${global.__URLPREFIX__}/solar-PV-system`
    }
    const response = await global.__SERVER__.inject(options)
    expect(response.statusCode).toBe(200)
    expect(response.payload).toContain('<a href=\"fruit-storage\" class=\"govuk-back-link\">Back</a>')
  })
})
