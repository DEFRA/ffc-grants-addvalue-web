const { crumbToken } = require('./test-helper')

const { commonFunctionsMock } = require('./../../../session-mock')

describe('Page: /project-items', () => {
  const varList = { 
    projectStart: 'randomData1', 
    tenancy: 'randomData2',
    smallerAbattoir: 'Yes'
  }

  let valList = {}

  commonFunctionsMock(varList, 'Error', {}, valList)

  it('page loads successfully, with all the options', async () => {
    const options = {
      method: 'GET',
      url: `${global.__URLPREFIX__}/project-items`
    }

    const response = await global.__SERVER__.inject(options)
    expect(response.statusCode).toBe(200)
    expect(response.payload).toContain('What eligible items does your project need?')
    expect(response.payload).toContain('Constructing or improving buildings')
    expect(response.payload).toContain('Processing equipment or machinery')
    expect(response.payload).toContain('Retail facilities')
  })

  it('no option selected -> show error message', async () => {
    valList.projectItems = {
      error: 'Select all the items your project needs',
      return: false
    }
    const postOptions = {
      method: 'POST',
      url: `${global.__URLPREFIX__}/project-items`,
      headers: { cookie: 'crumb=' + crumbToken },
      payload: { projectItems: '', crumb: crumbToken }
    }

    const postResponse = await global.__SERVER__.inject(postOptions)
    expect(postResponse.statusCode).toBe(200)
    expect(postResponse.payload).toContain('Select all the items your project needs')
  })

  it('user selects any number of options -> store user response and redirect to /storage', async () => {
    valList.projectItems = null
    const postOptions = {
      method: 'POST',
      url: `${global.__URLPREFIX__}/project-items`,
      headers: { cookie: 'crumb=' + crumbToken },
      payload: { projectItems: ['Constructing or improving buildings', 'Retail facilities'], crumb: crumbToken }
    }

    const postResponse = await global.__SERVER__.inject(postOptions)
    expect(postResponse.statusCode).toBe(302)
    expect(postResponse.headers.location).toBe('storage')
  })

  // it('page loads with correct back link when solarPVSystem is Yes - /other-farmers', async () => {
  //   varList.smallerAbattoir = 'Yes'
  //   const options = {
  //     method: 'GET',
  //     url: `${global.__URLPREFIX__}/project-items`
  //   }
  //   const response = await global.__SERVER__.inject(options)
  //   expect(response.statusCode).toBe(200)
  //   expect(response.payload).toContain('<a href=\"other-farmers\" class=\"govuk-back-link\">Back</a>')
  // })

  it('page loads with correct back link when smaller-abattoir is No - /smaller-abattoir', async () => {
    varList.smallerAbattoir = 'No'
    const options = {
      method: 'GET',
      url: `${global.__URLPREFIX__}/project-items`
    }
    const response = await global.__SERVER__.inject(options)
    expect(response.statusCode).toBe(200)
    expect(response.payload).toContain('<a href=\"smaller-abattoir" class=\"govuk-back-link\">Back</a>')
  })


})
