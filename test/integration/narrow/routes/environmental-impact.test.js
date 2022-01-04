const { crumbToken } = require('./test-helper')

describe('Page: /environmental-impact', () => {
  const varList = { processedSold: 'randomData' }

  jest.mock('../../../../app/helpers/session', () => ({
    setYarValue: (request, key, value) => null,
    getYarValue: (request, key) => {
      if (varList[key]) return varList[key]
      else return 'Error'
    }
  }))

  it('page loads successfully, with all the options', async () => {
    const options = {
      method: 'GET',
      url: `${global.__URLPREFIX__}/environmental-impact`
    }

    const response = await global.__SERVER__.inject(options)
    expect(response.statusCode).toBe(200)
    expect(response.payload).toContain('How will the project improve the environment?')
    expect(response.payload).toContain('Renewable energy')
    expect(response.payload).toContain('Energy efficiency')
    expect(response.payload).toContain('Water efficiency')
    expect(response.payload).toContain('Waste efficiency')
    expect(response.payload).toContain('Remove single-use plastics')
    expect(response.payload).toContain('Reduce harmful emissions or pollutants')
    expect(response.payload).toContain('My project will not improve the environment')
  })

  it('no option selected -> show error message', async () => {
    const postOptions = {
      method: 'POST',
      url: `${global.__URLPREFIX__}/environmental-impact`,
      headers: { cookie: 'crumb=' + crumbToken },
      payload: { environmentalImpact: '', crumb: crumbToken }
    }

    const postResponse = await global.__SERVER__.inject(postOptions)
    expect(postResponse.statusCode).toBe(200)
    expect(postResponse.payload).toContain('Select up to 2 options')
  })

  it('user selects more than 2 options -> show error message', async () => {
    const postOptions = {
      method: 'POST',
      url: `${global.__URLPREFIX__}/environmental-impact`,
      headers: { cookie: 'crumb=' + crumbToken },
      payload: {
        environmentalImpact: ['Renewable energy', 'Water efficiency', 'Remove single-use plastics'],
        crumb: crumbToken
      }
    }

    const postResponse = await global.__SERVER__.inject(postOptions)
    expect(postResponse.payload).toContain('Select up to 2 options')
  })

  it('user selects max 2 options -> store user response and redirect to /score', async () => {
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
