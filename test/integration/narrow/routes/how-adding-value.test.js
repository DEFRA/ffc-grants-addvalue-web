const { crumbToken } = require('./test-helper')
const { commonFunctionsMock } = require('./../../../session-mock')

describe('Page: /how-adding-value', () => {
  const varList = { productsProcessed: 'randomData' }

  let valList = {}

  commonFunctionsMock(varList, 'Error', {}, valList)

  it('page loads successfully, with all the options', async () => {
    const options = {
      method: 'GET',
      url: `${global.__URLPREFIX__}/how-adding-value`
    }

    const response = await global.__SERVER__.inject(options)
    expect(response.statusCode).toBe(200)
    expect(response.payload).toContain('How will your project add value to the produce?')
    expect(response.payload).toContain('Creating a new product')
    expect(response.payload).toContain('Grading or sorting produce')
    expect(response.payload).toContain('Packing produce')
    expect(response.payload).toContain('New retail facility to sell direct to consumers')
  })

  it('no option selected -> show error message', async () => {
    valList.howAddingValue = {
      error: 'Select how you will add value to the produce',
      return: false
    }
    const postOptions = {
      method: 'POST',
      url: `${global.__URLPREFIX__}/how-adding-value`,
      headers: { cookie: 'crumb=' + crumbToken },
      payload: { howAddingValue: '', crumb: crumbToken }
    }

    const postResponse = await global.__SERVER__.inject(postOptions)
    expect(postResponse.statusCode).toBe(200)
    expect(postResponse.payload).toContain('Select how you will add value to the produce')
  })

  it('user selects an option -> store user response and redirect to /project-impact', async () => {
    valList.howAddingValue = null
    const postOptions = {
      method: 'POST',
      url: `${global.__URLPREFIX__}/how-adding-value`,
      headers: { cookie: 'crumb=' + crumbToken },
      payload: { howAddingValue: 'Grading or sorting produce', crumb: crumbToken }
    }

    const postResponse = await global.__SERVER__.inject(postOptions)
    expect(postResponse.statusCode).toBe(302)
    expect(postResponse.headers.location).toBe('project-impact')
  })
})
