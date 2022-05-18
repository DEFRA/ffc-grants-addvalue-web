const { startPageUrl } = require('../../../../app/config/server')

describe('Page Guard', () => {
  const OLD_ENV = process.env

  beforeEach(async () => {
    jest.resetModules()
    process.env = { ...OLD_ENV }
  })

  afterEach(() => {
    process.env = OLD_ENV
  })

  it('shoud redirect to start page if the site is decommissioned', async () => {
    process.env.SERVICE_END_DATE = '2021/02/17'
    process.env.SERVICE_END_TIME = '23:59:58'
    
    const getOptions = {
      method: 'GET',
      url: `${global.__URLPREFIX__}/nature-of-business`
    }

    const getResponse = await global.__SERVER__.inject(getOptions)

    expect(getResponse.statusCode).toBe(302)
    expect(getResponse.headers.location).toBe(startPageUrl)
  })

  it('should redirect to start page if the user skip journey question', async () => {
    const getOptions = {
      method: 'GET',
      url: `${global.__URLPREFIX__}/project-items`
    }

    const response = await global.__SERVER__.inject(getOptions)
    expect(response.statusCode).toBe(302)
    expect(response.headers.location).toBe(startPageUrl)
  })
})
