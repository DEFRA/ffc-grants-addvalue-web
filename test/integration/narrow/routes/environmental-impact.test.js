const { crumbToken } = require('./test-helper')

const { commonFunctionsMock } = require('./../../../session-mock')

describe('Page: /environmental-impact', () => {
  const varList = { collaboration: 'randomData' }

  let valList = {}
  commonFunctionsMock(varList, 'Error', {}, valList)

  it('page loads successfully, with all the options', async () => {
    const options = {
      method: 'GET',
      url: `${global.__URLPREFIX__}/environmental-impact`
    }

    const response = await global.__SERVER__.inject(options)
    expect(response.statusCode).toBe(200)
    expect(response.payload).toContain('How will this project improve the environment?')
    expect(response.payload).toContain('Renewable energy')
    expect(response.payload).toContain('Energy efficiency')
    expect(response.payload).toContain('Water efficiency')
    expect(response.payload).toContain('Waste efficiency')
    expect(response.payload).toContain('Sustainable packaging measures')
    expect(response.payload).toContain('Reduce harmful emissions or pollutants')
    expect(response.payload).toContain('My project will not improve the environment')
  })

  it('no option selected -> show error message', async () => {
    valList.environmentalImpact = {
      error: 'Select all options that apply',
      return: false
    }
    const postOptions = {
      method: 'POST',
      url: `${global.__URLPREFIX__}/environmental-impact`,
      headers: { cookie: 'crumb=' + crumbToken },
      payload: { environmentalImpact: '', crumb: crumbToken }
    }

    const postResponse = await global.__SERVER__.inject(postOptions)
    expect(postResponse.statusCode).toBe(200)
    expect(postResponse.payload).toContain('Select all options that apply')
  })

  it('user selects OR option with others -> show error message', async () => {
    valList.environmentalImpact.error = 'You cannot select that combination of options'
    
    const postOptions = {
      method: 'POST',
      url: `${global.__URLPREFIX__}/environmental-impact`,
      headers: { cookie: 'crumb=' + crumbToken },
      payload: {
        environmentalImpact: ['My project will not improve the environment', 'Energy efficiency'],
        crumb: crumbToken
      }
    }

    const postResponse = await global.__SERVER__.inject(postOptions)
    expect(postResponse.payload).toContain('You cannot select that combination of options')
  })

  it('user selects options -> store user response and redirect to /score', async () => {
    valList.environmentalImpact = null
    const postOptions = {
      method: 'POST',
      url: `${global.__URLPREFIX__}/environmental-impact`,
      headers: { cookie: 'crumb=' + crumbToken },
      payload: { environmentalImpact: 'Energy efficiency', crumb: crumbToken }
    }

    const postResponse = await global.__SERVER__.inject(postOptions)
    expect(postResponse.statusCode).toBe(302)
    expect(postResponse.headers.location).toBe('score')
  })
})
