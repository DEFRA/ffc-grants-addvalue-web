const { crumbToken } = require('./test-helper')

describe('Page: /nature-of-business', () => {
  it('page loads successfully, with all the options', async () => {
    const options = {
      method: 'GET',
      url: `${global.__URLPREFIX__}/nature-of-business`
    }

    const response = await global.__SERVER__.inject(options)
    expect(response.statusCode).toBe(200)
    expect(response.payload).toContain('What is your business?')
    expect(response.payload).toContain('A grower or producer of agricultural, horticultural or forestry agri-products')
    expect(response.payload).toContain('Providing processing services to a primary producer')
    expect(response.payload).toContain('A separate processing business owned by a primary producer')
    expect(response.payload).toContain('None of the above')
  })

  it('no option selected -> show error message', async () => {
    const postOptions = {
      method: 'POST',
      url: `${global.__URLPREFIX__}/nature-of-business`,
      headers: { cookie: 'crumb=' + crumbToken },
      payload: { applicantBusiness: '', crumb: crumbToken }
    }

    const postResponse = await global.__SERVER__.inject(postOptions)
    expect(postResponse.statusCode).toBe(200)
    expect(postResponse.payload).toContain('Select the option that applies to your business')
  })

  it('user selects ineligible option: \'None of the above\' -> display ineligible page', async () => {
    const postOptions = {
      method: 'POST',
      url: `${global.__URLPREFIX__}/nature-of-business`,
      headers: { cookie: 'crumb=' + crumbToken },
      payload: { applicantBusiness: 'None of the above', crumb: crumbToken }
    }

    const postResponse = await global.__SERVER__.inject(postOptions)
    expect(postResponse.payload).toContain('You cannot apply for a grant from this scheme')
  })

  it('user selects eligible option -> store user response and redirect to /legal-status', async () => {
    const postOptions = {
      method: 'POST',
      url: `${global.__URLPREFIX__}/nature-of-business`,
      headers: { cookie: 'crumb=' + crumbToken },
      payload: { applicantBusiness: 'Providing processing services to a primary producer', crumb: crumbToken }
    }

    const postResponse = await global.__SERVER__.inject(postOptions)
    expect(postResponse.statusCode).toBe(302)
    expect(postResponse.headers.location).toBe('legal-status')
  })
})
