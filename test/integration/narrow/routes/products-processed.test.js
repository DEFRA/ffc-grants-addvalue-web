const { crumbToken } = require('./test-helper')

const { commonFunctionsMock } = require('./../../../session-mock')

describe('Page: /produce-processed', () => {
  const varList = { canPayRemainingCost: 'randomData' }

  let valList = {}

  commonFunctionsMock(varList, 'Error', {}, valList)

  it('page loads successfully, with all the options', async () => {
    const options = {
      method: 'GET',
      url: `${global.__URLPREFIX__}/produce-processed`
    }

    const response = await global.__SERVER__.inject(options)
    expect(response.statusCode).toBe(200)
    expect(response.payload).toContain('What type of produce is being processed?')
    expect(response.payload).toContain('Arable produce')
    expect(response.payload).toContain('Wild venison meat produce')
    expect(response.payload).toContain('Dairy or meat produce')
    expect(response.payload).toContain('Fibre produce')
    expect(response.payload).toContain('Fodder produce')
    expect(response.payload).toContain('Horticultural produce')
    expect(response.payload).toContain('Non-edible produce')
  })

  it('no option selected -> show error message', async () => {
    valList.productsProcessed = {
      error: 'Select what type of produce is being processed',
      return: false
    }

    const postOptions = {
      method: 'POST',
      url: `${global.__URLPREFIX__}/produce-processed`,
      headers: { cookie: 'crumb=' + crumbToken },
      payload: { productsProcessed: '', crumb: crumbToken }
    }

    const postResponse = await global.__SERVER__.inject(postOptions)
    expect(postResponse.statusCode).toBe(200)
    expect(postResponse.payload).toContain('Select what type of produce is being processed')
  })

  it('user selects an option -> store user response and redirect to /how-adding-value', async () => {
    valList.productsProcessed = null
    const postOptions = {
      method: 'POST',
      url: `${global.__URLPREFIX__}/produce-processed`,
      headers: { cookie: 'crumb=' + crumbToken },
      payload: { productsProcessed: 'Horticultural produce', crumb: crumbToken }
    }

    const postResponse = await global.__SERVER__.inject(postOptions)
    expect(postResponse.statusCode).toBe(302)
    expect(postResponse.headers.location).toBe('how-adding-value')
  })
})
