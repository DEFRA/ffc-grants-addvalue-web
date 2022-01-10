const { crumbToken } = require('./test-helper')

describe('Page: /products-processed', () => {
  const varList = { canPayRemainingCost: 'randomData' }

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
      url: `${global.__URLPREFIX__}/products-processed`
    }

    const response = await global.__SERVER__.inject(options)
    expect(response.statusCode).toBe(200)
    expect(response.payload).toContain('What type of products are being processed?')
    expect(response.payload).toContain('Arable products')
    expect(response.payload).toContain('Horticultural products')
    expect(response.payload).toContain('Dairy or meat products')
    expect(response.payload).toContain('Forestry products')
    expect(response.payload).toContain('Fodder products')
    expect(response.payload).toContain('Non-edible products')
    expect(response.payload).toContain('Fibre products')
  })

  it('no option selected -> show error message', async () => {
    const postOptions = {
      method: 'POST',
      url: `${global.__URLPREFIX__}/products-processed`,
      headers: { cookie: 'crumb=' + crumbToken },
      payload: { productsProcessed: '', crumb: crumbToken }
    }

    const postResponse = await global.__SERVER__.inject(postOptions)
    expect(postResponse.statusCode).toBe(200)
    expect(postResponse.payload).toContain('Select the type of products being processed')
  })

  it('user selects an option -> store user response and redirect to /how-adding-value', async () => {
    const postOptions = {
      method: 'POST',
      url: `${global.__URLPREFIX__}/products-processed`,
      headers: { cookie: 'crumb=' + crumbToken },
      payload: { productsProcessed: 'Horticultural products', crumb: crumbToken }
    }

    const postResponse = await global.__SERVER__.inject(postOptions)
    expect(postResponse.statusCode).toBe(302)
    expect(postResponse.headers.location).toBe('how-adding-value')
  })
})
