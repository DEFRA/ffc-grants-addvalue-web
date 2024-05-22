const { commonFunctionsMock } = require('../../../session-mock')
const { crumbToken } = require('./test-helper')
const { GRANT_PERCENTAGE } = require('../../../../app/helpers/grant-details')

describe('Page: /potential-amount-solar-details', () => {
  const varList = {
    totalCalculatedGrant: 75000,
    totalProjectCost: 240000,
    calculatedGrant: 37500,
    projectCost: 75000,
    cappedCalculatedSolarGrant: 37500,
    solarPVCost: 165000
  }

  commonFunctionsMock(varList, undefined)
  
  // when calculatedGrant greater than calculatedSolarGrant 
  it('page loads successfully, with all the Eligible options', async () => {
    const options = {
      method: 'GET',
      url: `${global.__URLPREFIX__}/potential-amount-solar-details`
    }

    const response = await global.__SERVER__.inject(options)
    expect(response.statusCode).toBe(200)
    expect(response.payload).toContain('Potential grant funding')
    expect(response.payload).toContain('You may be able to apply for a grant of up to £75,000, based on the total estimated cost of £240,000.')
    expect(response.payload).toContain('This grant amount combines:')
    expect(response.payload).toContain('£37,500 for project costs (50% of £75,000)')
    expect(response.payload).toContain('£37,500 for solar PV system costs')
    expect(response.payload).toContain('How is the solar PV system grant funding calculated?')
    expect(response.payload).toContain('As your project grant funding is £37,500, you can apply for £37,500 for solar PV system costs.')
    expect(response.payload).toContain('There’s no guarantee the project will receive a grant.')
  })

  it('page loads successfully, with all the Eligible options', async () => {
    varList.totalCalculatedGrant = 500000
    varList.totalProjectCost = 1250000
    varList.calculatedGrant = 450000
    varList.projectCost = 900000
    varList.cappedCalculatedSolarGrant = 50000
    varList.solarPVCost = 350000
    const options = {
      method: 'GET',
      url: `${global.__URLPREFIX__}/potential-amount-solar-details`
    }

    const response = await global.__SERVER__.inject(options)
    expect(response.statusCode).toBe(200)
    expect(response.payload).toContain('Potential grant funding')
    expect(response.payload).toContain('You may be able to apply for a grant of up to £500,000, based on the total estimated cost of £1,250,000.')
    expect(response.payload).toContain('This grant amount combines:')
    expect(response.payload).toContain('£450,000 for project costs (50% of £900,000)')
    expect(response.payload).toContain('£50,000 for solar PV system costs')
    expect(response.payload).toContain('How is the solar PV system grant funding calculated?')
    expect(response.payload).toContain('The maximum grant you can apply for is £500,000.')
    expect(response.payload).toContain('There’s no guarantee the project will receive a grant.')
  })

  it('page loads successfully, with all the Eligible options', async () => {
    varList.totalCalculatedGrant = 375000
    varList.totalProjectCost = 1000000
    varList.calculatedGrant = 275000
    varList.projectCost = 550000
    varList.cappedCalculatedSolarGrant = 100000
    varList.solarPVCost = 450000
    const options = {
      method: 'GET',
      url: `${global.__URLPREFIX__}/potential-amount-solar-details`
    }

    const response = await global.__SERVER__.inject(options)
    expect(response.statusCode).toBe(200)
    expect(response.payload).toContain('Potential grant funding')
    expect(response.payload).toContain('You may be able to apply for a grant of up to £375,000, based on the total estimated cost of £1,000,000.')
    expect(response.payload).toContain('This grant amount combines:')
    expect(response.payload).toContain('£275,000 for project costs (50% of £550,000)')
    expect(response.payload).toContain('£100,000 for solar PV system costs')
    expect(response.payload).toContain('How is the solar PV system grant funding calculated?')
    expect(response.payload).toContain('You can apply for a maximum of £100,000 for solar PV system costs.')
    expect(response.payload).toContain('There’s no guarantee the project will receive a grant.')
  })

  it('should redirect to /remaining-costs when user press continue', async () => {
    const postOptions = {
      method: 'POST',
      url: `${global.__URLPREFIX__}/potential-amount-solar-details`,
      headers: { cookie: 'crumb=' + crumbToken },
      payload: { crumb: crumbToken }
    }

    const postResponse = await global.__SERVER__.inject(postOptions)
    expect(postResponse.statusCode).toBe(302)
    expect(postResponse.headers.location).toBe('remaining-costs')
  })

  it('page loads with correct back link', async () => {
    const options = {
      method: 'GET',
      url: `${global.__URLPREFIX__}/potential-amount-solar-details`
    }

    const response = await global.__SERVER__.inject(options)
    expect(response.statusCode).toBe(200)
    expect(response.payload).toContain('<a href=\"solar-PV-cost" class=\"govuk-back-link\"')
  })
})
