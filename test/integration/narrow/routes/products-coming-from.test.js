const { crumbToken } = require('./test-helper')

describe('Page: /products-coming-from', () => {
  const varList = { collaboration: 'randomData' }

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
      url: `${global.__URLPREFIX__}/products-coming-from`
    }

    const response = await global.__SERVER__.inject(options)
    expect(response.statusCode).toBe(200)
    expect(response.payload).toContain('Where are the primary products coming from?')
    expect(response.payload).toContain('Within 1 mile')
    expect(response.payload).toContain('Within 10 miles')
    expect(response.payload).toContain('Within 50 miles')
    expect(response.payload).toContain('More than 50 miles')
    expect(response.payload).toContain('From outside the UK')
  })

  it('no option selected -> show error message', async () => {
    const postOptions = {
      method: 'POST',
      url: `${global.__URLPREFIX__}/products-coming-from`,
      headers: { cookie: 'crumb=' + crumbToken },
      payload: { productsComingFrom: '', crumb: crumbToken }
    }

    const postResponse = await global.__SERVER__.inject(postOptions)
    expect(postResponse.statusCode).toBe(200)
    expect(postResponse.payload).toContain('Select where the primary products are coming from')
  })

  it('user selects any option -> store user response and redirect to /processed-sold', async () => {
    const postOptions = {
      method: 'POST',
      url: `${global.__URLPREFIX__}/products-coming-from`,
      headers: { cookie: 'crumb=' + crumbToken },
      payload: { productsComingFrom: 'Within 1 mile', crumb: crumbToken }
    }

    const postResponse = await global.__SERVER__.inject(postOptions)
    expect(postResponse.statusCode).toBe(302)
    expect(postResponse.headers.location).toBe('processed-sold')
  })
})
