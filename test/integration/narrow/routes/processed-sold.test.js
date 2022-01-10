const { crumbToken } = require('./test-helper')

describe('Page: /processed-sold', () => {
  const varList = { productsComingFrom: 'randomData' }

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
      url: `${global.__URLPREFIX__}/processed-sold`
    }

    const response = await global.__SERVER__.inject(options)
    expect(response.statusCode).toBe(200)
    expect(response.payload).toContain('Where will the processed products be sold?')
    expect(response.payload).toContain('Within 1 mile')
    expect(response.payload).toContain('Within 10 miles')
    expect(response.payload).toContain('Within 50 miles')
    expect(response.payload).toContain('More than 50 miles')
    expect(response.payload).toContain('Outside the UK')
  })

  it('no option selected -> show error message', async () => {
    const postOptions = {
      method: 'POST',
      url: `${global.__URLPREFIX__}/processed-sold`,
      headers: { cookie: 'crumb=' + crumbToken },
      payload: { processedSold: '', crumb: crumbToken }
    }

    const postResponse = await global.__SERVER__.inject(postOptions)
    expect(postResponse.statusCode).toBe(200)
    expect(postResponse.payload).toContain('Select where the processed products will be sold')
  })

  it('user selects any option -> store user response and redirect to /environmental-impact', async () => {
    const postOptions = {
      method: 'POST',
      url: `${global.__URLPREFIX__}/processed-sold`,
      headers: { cookie: 'crumb=' + crumbToken },
      payload: { processedSold: 'Within 50 miles', crumb: crumbToken }
    }

    const postResponse = await global.__SERVER__.inject(postOptions)
    expect(postResponse.statusCode).toBe(302)
    expect(postResponse.headers.location).toBe('environmental-impact')
  })
})
