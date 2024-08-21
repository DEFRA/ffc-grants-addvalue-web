const { commonFunctionsMock } = require('../../../session-mock')
const { crumbToken } = require('./test-helper')
const { GRANT_PERCENTAGE } = require('../../../../app/helpers/grant-details')

describe('Page: /potential-amount-solar-details', () => {
  const varList = {
    calculatedGrant: 30000, // 40 * projectCostValue / 100 = 30000
    solarPVCost: 165000,
    projectCost: 75000,
    
    totalProjectCost: 240000, // solarPVCost + projectCost
    cappedCalculatedSolarGrant: 30000,
    totalCalculatedGrant: 60000 // cappedCalculatedSolarGrant + calculatedGrant
  }

  commonFunctionsMock(varList, undefined)
  

  describe('All Eligible options', () => {
    
    it('Both calculated solar grant and calculated grant below thresholds - no caps used', async () => {
      const options = {
        method: 'GET',
        url: `${global.__URLPREFIX__}/potential-amount-solar-details`
      }
  
      const response = await global.__SERVER__.inject(options)
      expect(response.statusCode).toBe(200)
      expect(response.payload).toContain('Potential grant funding')
      expect(response.payload).toContain('You may be able to apply for a grant of up to £60,000, based on the total estimated cost of £240,000.')
      expect(response.payload).toContain('This grant amount combines:')
      expect(response.payload).toContain('£30,000 for project costs (40% of £75,000)')
      expect(response.payload).toContain('£30,000 for solar PV system costs')
      expect(response.payload).toContain('How is the solar PV system grant funding calculated?')
      expect(response.payload).toContain('As your project grant funding is £30,000, you can apply for £30,000 for solar PV system costs.')
      expect(response.payload).toContain('There’s no guarantee the project will receive a grant.')
    })
  
    it('Calculated solar grant below threshold and calculated grant above threshold - project cost capped at £300,000', async () => {
      // Inputted/Derived values
      varList.calculatedGrant = 480000 // 40 * projectCostValue / 100 = 480000
      varList.solarPVCost = 350000
      varList.projectCost = 1200000

      // Calculated values
      varList.totalProjectCost = 1550000  // solarPVCost + projectCost
      varList.cappedCalculatedSolarGrant = 87500
      varList.totalCalculatedGrant = 567500 // cappedCalculatedSolarGrant + calculatedGrant
      const options = {
        method: 'GET',
        url: `${global.__URLPREFIX__}/potential-amount-solar-details`
      }
  
      const response = await global.__SERVER__.inject(options)
      expect(response.statusCode).toBe(200)
      expect(response.payload).toContain('Potential grant funding')
      expect(response.payload).toContain('You may be able to apply for a grant of up to £567,500, based on the total estimated cost of £1,550,000.')
      expect(response.payload).toContain('This grant amount combines:')
      expect(response.payload).toContain('£480,000 for project costs (40% of £1,200,000)')
      expect(response.payload).toContain('£87,500 for solar PV system costs')
      expect(response.payload).toContain('How is the solar PV system grant funding calculated?')
      expect(response.payload).toContain('You can apply for a maximum of £300,000 for project costs.')
      expect(response.payload).toContain('There’s no guarantee the project will receive a grant.')
    })
  
    it('Calculated solar grant at threshold and calculated grant below threshold - project solar PV system costs capped at £100,000', async () => {
      // Inputted/Derived values
      varList.calculatedGrant = 275000 // 40 * projectCostValue / 100 = 275000
      varList.solarPVCost = 450000
      varList.projectCost = 550000

      // Calculated values
      varList.totalProjectCost = 1000000 // solarPVCost + projectCost
      varList.cappedCalculatedSolarGrant = 100000
      varList.totalCalculatedGrant = 375000 // cappedCalculatedSolarGrant + calculatedGrant
      const options = {
        method: 'GET',
        url: `${global.__URLPREFIX__}/potential-amount-solar-details`
      }
  
      const response = await global.__SERVER__.inject(options)
      expect(response.statusCode).toBe(200)
      expect(response.payload).toContain('Potential grant funding')
      expect(response.payload).toContain('You may be able to apply for a grant of up to £375,000, based on the total estimated cost of £1,000,000.')
      expect(response.payload).toContain('This grant amount combines:')
      expect(response.payload).toContain('£275,000 for project costs (40% of £550,000)')
      expect(response.payload).toContain('£100,000 for solar PV system costs')
      expect(response.payload).toContain('How is the solar PV system grant funding calculated?')
      expect(response.payload).toContain('You can apply for a maximum of £100,000 for solar PV system costs.')
      expect(response.payload).toContain('There’s no guarantee the project will receive a grant.')
    })  

    it('Calculated solar grant at threshold and calculated grant above threshold - project costs capped at £300,000 and project solar PV system costs capped at £100,000', async () => {
      // Inputted/Derived values
      varList.calculatedGrant = 310000 // 40 * projectCostValue / 100 = 310000
      varList.solarPVCost = 450000
      varList.projectCost = 775000

      // Calculated values
      varList.totalProjectCost = 1225000 // solarPVCost + projectCost
      varList.cappedCalculatedSolarGrant = 100000
      varList.totalCalculatedGrant = 410000 // cappedCalculatedSolarGrant + calculatedGrant
      const options = {
        method: 'GET',
        url: `${global.__URLPREFIX__}/potential-amount-solar-details`
      }
  
      const response = await global.__SERVER__.inject(options)
      expect(response.statusCode).toBe(200)
      expect(response.payload).toContain('Potential grant funding')
      expect(response.payload).toContain('You may be able to apply for a grant of up to £410,000, based on the total estimated cost of £1,225,000.')
      expect(response.payload).toContain('This grant amount combines:')
      expect(response.payload).toContain('£310,000 for project costs (40% of £775,000)')
      expect(response.payload).toContain('You can apply for a maximum of £300,000 for project costs.')
      expect(response.payload).toContain('£100,000 for solar PV system costs')
      expect(response.payload).toContain('How is the solar PV system grant funding calculated?')
      expect(response.payload).toContain('You can apply for a maximum of £100,000 for solar PV system costs.')
      expect(response.payload).toContain('There’s no guarantee the project will receive a grant.')
    })
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
