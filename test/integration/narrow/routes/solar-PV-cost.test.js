const { commonFunctionsMock } = require('../../../session-mock')
const { crumbToken } = require('./test-helper')

describe('Page: /solar-PV-cost', () => {
  let varList = {
    solarPVSystem: 'Yes',
    projectCost: 100000
  }
  let valList = {}
  
  commonFunctionsMock(varList, null, {}, valList)

  it('page loads successfully, with all the options - ', async () => {
    const options = {
      method: 'GET',
      url: `${global.__URLPREFIX__}/solar-PV-cost`
    }

    const response = await global.__SERVER__.inject(options)
    expect(response.statusCode).toBe(200)
    expect(response.payload).toContain('What is the estimated cost of buying and installing the solar PV system?')
  })

  it('no option selected -> show error message  ', async () => {
    valList.solarPVCost = {
      error: 'Enter the estimated cost of buying and installing the solar PV system',
      return: false
    }

    const postOptions = {
      method: 'POST',
      url: `${global.__URLPREFIX__}/solar-PV-cost`,
      headers: { cookie: 'crumb=' + crumbToken },
      payload: { solarPVCost: '', crumb: crumbToken }
    }

    const postResponse = await global.__SERVER__.inject(postOptions)
    expect(postResponse.statusCode).toBe(200)
    expect(postResponse.payload).toContain('Enter the estimated cost of buying and installing the solar PV system')
  })

  it('should return an error message if the number of digits typed exceed 7', async () => {
    valList.solarPVCost = {
      error: 'Enter a whole number with a maximum of 7 digits',
      return: false
    }
    const postOptions = {
      method: 'POST',
      url: `${global.__URLPREFIX__}/solar-PV-cost`,
      payload: { solarPVCost: '12345678', crumb: crumbToken },
      headers: { cookie: 'crumb=' + crumbToken }
    }

    const postResponse = await global.__SERVER__.inject(postOptions)
    expect(postResponse.statusCode).toBe(200)
    expect(postResponse.payload).toContain('Enter a whole number with a maximum of 7 digits')
  })

  it('user selects eligible option -> store user response and redirect to /potential-amount-solar', async () => {
    valList.solarPVCost = false
    varList.projectCost = 50000
    varList.solarPVCost = 40000
    const postOptions = {
      method: 'POST',
      url: `${global.__URLPREFIX__}/solar-PV-cost`,
      headers: { cookie: 'crumb=' + crumbToken },
      payload: { solarPVCost: '40000',  crumb: crumbToken }
    }

    const postResponse = await global.__SERVER__.inject(postOptions)
    expect(postResponse.statusCode).toBe(302)
    expect(postResponse.headers.location).toBe('/adding-value/potential-amount-solar')
  })

  it('user selects eligible option -> store user response and redirect to /potential-amount-solar-details', async () => {
    varList.calculatedGrant = 25000
    varList.calculatedSolarGrant = 100000

    const postOptions = {
      method: 'POST',
      url: `${global.__URLPREFIX__}/solar-PV-cost`,
      headers: { cookie: 'crumb=' + crumbToken },
      payload: { solarPVCost: '1000000',  crumb: crumbToken }
    }

    const postResponse = await global.__SERVER__.inject(postOptions)
    expect(postResponse.statusCode).toBe(302)
    expect(postResponse.headers.location).toBe('/adding-value/potential-amount-solar-details')
  })

  it('user selects eligible option -> store user response and redirect to /potential-amount-solar-details', async () => {
    varList.calculatedGrant = 250000
    varList.calculatedSolarGrant = 100001

    const postOptions = {
      method: 'POST',
      url: `${global.__URLPREFIX__}/solar-PV-cost`,
      headers: { cookie: 'crumb=' + crumbToken },
      payload: { solarPVCost: '800000',  crumb: crumbToken }
    }

    const postResponse = await global.__SERVER__.inject(postOptions)
    expect(postResponse.statusCode).toBe(302)
    expect(postResponse.headers.location).toBe('/adding-value/potential-amount-solar-details')
  })

  it('user selects eligible option -> store user response and redirect to /potential-amount-solar-details', async () => {
    varList.calculatedGrant = 450000
    varList.calculatedSolarGrant = 50001

    const postOptions = {
      method: 'POST',
      url: `${global.__URLPREFIX__}/solar-PV-cost`,
      headers: { cookie: 'crumb=' + crumbToken },
      payload: { solarPVCost: '800000',  crumb: crumbToken }
    }

    const postResponse = await global.__SERVER__.inject(postOptions)
    expect(postResponse.statusCode).toBe(302)
    expect(postResponse.headers.location).toBe('/adding-value/potential-amount-solar-details')
  })

  it('page loads with correct back link - /project-cost', async () => {
    const options = {
      method: 'GET',
      url: `${global.__URLPREFIX__}/solar-PV-cost`,
    }
    const response = await global.__SERVER__.inject(options)
    expect(response.statusCode).toBe(200)
    expect(response.payload).toContain('<a href=\"project-cost\" class=\"govuk-back-link\">Back</a>')
  })
})
