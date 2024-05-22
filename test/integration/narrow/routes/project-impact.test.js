const { crumbToken } = require('./test-helper')
const { commonFunctionsMock } = require('./../../../session-mock')

describe('Page: /project-impact', () => {
  const varList = { howAddingValue: 'randomData' }

  let valList = {}

  commonFunctionsMock(varList, 'Error', {}, valList)

  it('page loads successfully, with all the options', async () => {
    const options = {
      method: 'GET',
      url: `${global.__URLPREFIX__}/project-impact`
    }

    const response = await global.__SERVER__.inject(options)
    expect(response.statusCode).toBe(200)
    expect(response.payload).toContain('What impact will this project have?')
    expect(response.payload).toContain('Starting to make added-value products for the first time')
    expect(response.payload).toContain('Increasing volume of added-value products')
    expect(response.payload).toContain('Increasing range of added-value products')
    expect(response.payload).toContain('Allow selling direct to consumer')
    expect(response.payload).toContain('For example, retail and internet sales')
  })

  it('no option selected -> show error message', async () => {
    valList.projectImpact = {
      error: 'Select what impact this project will have',
      return: false
    }
    const postOptions = {
      method: 'POST',
      url: `${global.__URLPREFIX__}/project-impact`,
      headers: { cookie: 'crumb=' + crumbToken },
      payload: { projectImpact: '', crumb: crumbToken }
    }

    const postResponse = await global.__SERVER__.inject(postOptions)
    expect(postResponse.statusCode).toBe(200)
    expect(postResponse.payload).toContain('Select what impact this project will have')
  })

  it('user selects option 1 and option 2 -> show error message', async () => {
    valList.projectImpact.error = `Select either ’Starting to make added-value products for the first time’ or ’Increasing volume’`
    const postOptions = {
      method: 'POST',
      url: `${global.__URLPREFIX__}/project-impact`,
      headers: { cookie: 'crumb=' + crumbToken },
      payload: {
        projectImpact: ['Starting to make added-value products for the first time', 'Increasing volume of added-value products'],
        crumb: crumbToken
      }
    }

    const postResponse = await global.__SERVER__.inject(postOptions)
    expect(postResponse.payload).toContain(`Select either ’Starting to make added-value products for the first time’ or ’Increasing volume’`)
  })

  it('user selects option 1 and option 3 -> show error message', async () => {
    valList.projectImpact.error = `Select either ’Starting to make added-value products for the first time’ or ’Increasing range’`
    const postOptions = {
      method: 'POST',
      url: `${global.__URLPREFIX__}/project-impact`,
      headers: { cookie: 'crumb=' + crumbToken },
      payload: {
        projectImpact: ['Starting to make added-value products for the first time', 'Increasing range of added-value products'],
        crumb: crumbToken
      }
    }

    const postResponse = await global.__SERVER__.inject(postOptions)
    expect(postResponse.payload).toContain(`Select either ’Starting to make added-value products for the first time’ or ’Increasing range’`)
  })

  it('user selects option 1, option 2 and option 3 -> show error message', async () => {
    valList.projectImpact.error = `Select either ’Starting to make added-value products for the first time’ or ’Increasing volume’ and ’Increasing range’`
    const postOptions = {
      method: 'POST',
      url: `${global.__URLPREFIX__}/project-impact`,
      headers: { cookie: 'crumb=' + crumbToken },
      payload: {
        projectImpact: ['Starting to make added-value products for the first time', 'Increasing volume of added-value products',
          'Increasing range of added-value products'],
        crumb: crumbToken
      }
    }

    const postResponse = await global.__SERVER__.inject(postOptions)
    expect(postResponse.payload).toContain(`Select either ’Starting to make added-value products for the first time’ or ’Increasing volume’ and ’Increasing range’`)
  })

  it('user selects option 1, option 2 and option 4 -> show error message', async () => {
    valList.projectImpact.error = `Select either ’Starting to make added-value products for the first time’ or ’Increasing volume’`
    const postOptions = {
      method: 'POST',
      url: `${global.__URLPREFIX__}/project-impact`,
      headers: { cookie: 'crumb=' + crumbToken },
      payload: {
        projectImpact: ['Starting to make added-value products for the first time', 'Increasing volume of added-value products',
          'Allow selling direct to consumer'],
        crumb: crumbToken
      }
    }

    const postResponse = await global.__SERVER__.inject(postOptions)
    expect(postResponse.payload).toContain(`Select either ’Starting to make added-value products for the first time’ or ’Increasing volume’`)
  })

  it('user selects option 1, option 3 and option 4 -> show error message', async () => {
    valList.projectImpact.error = `Select either ’Starting to make added-value products for the first time’ or ’Increasing range’`
    const postOptions = {
      method: 'POST',
      url: `${global.__URLPREFIX__}/project-impact`,
      headers: { cookie: 'crumb=' + crumbToken },
      payload: {
        projectImpact: ['Starting to make added-value products for the first time', 'Increasing range of added-value products',
          'Allow selling direct to consumer'],
        crumb: crumbToken
      }
    }

    const postResponse = await global.__SERVER__.inject(postOptions)
    expect(postResponse.payload).toContain(`Select either ’Starting to make added-value products for the first time’ or ’Increasing range’`)
  })

  it('user selects option 1, option 2, option 3 and option 4 -> show error message', async () => {
    valList.projectImpact.error = `Select either ’Starting to make added-value products for the first time’ or ’Increasing volume’ and ’Increasing range’`
    const postOptions = {
      method: 'POST',
      url: `${global.__URLPREFIX__}/project-impact`,
      headers: { cookie: 'crumb=' + crumbToken },
      payload: {
        projectImpact: ['Starting to make added-value products for the first time', 'Increasing volume of added-value products',
          'Increasing range of added-value products', 'Allow selling direct to consumer'],
        crumb: crumbToken
      }
    }

    const postResponse = await global.__SERVER__.inject(postOptions)
    expect(postResponse.payload).toContain(`Select either ’Starting to make added-value products for the first time’ or ’Increasing volume’ and ’Increasing range’`)
  })

  it('user selects an acceptable combination of options -> store user response and redirect to /mechanisation', async () => {
    valList.projectImpact = null
    const postOptions = {
      method: 'POST',
      url: `${global.__URLPREFIX__}/project-impact`,
      headers: { cookie: 'crumb=' + crumbToken },
      payload: {
        projectImpact: ['Increasing volume of added-value products', 'Allow selling direct to consumer'],
        crumb: crumbToken
      }
    }

    const postResponse = await global.__SERVER__.inject(postOptions)
    expect(postResponse.statusCode).toBe(302)
    expect(postResponse.headers.location).toBe('mechanisation')
  })
})
