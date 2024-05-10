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
    expect(response.payload).toContain('<a href=\"solar-PV-cost" class=\"govuk-back-link\" id=\"linkBack\">Back</a>')
  })
})
