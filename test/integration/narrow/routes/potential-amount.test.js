const { commonFunctionsMock } = require('../../../session-mock')
const { crumbToken } = require('./test-helper')

const utilsList = {
  'solar-PV-system-A1': 'Yes',
  'solar-PV-system-A1': 'No'
}

describe('Page: /potential-amount', () => {
  const varList = {
    projectCost: 100000,
    calculatedGrant: 40000,
    solarPVSystem: 'No',
  }
  let eligiblePageText = 'You may be able to apply for grant funding of up to £40,000 (40% of £100,000).'

  commonFunctionsMock(varList, undefined, utilsList, {})
  
  it('page loads successfully, with all the Eligible options when project cost < 1250000', async () => {
    const options = {
      method: 'GET',
      url: `${global.__URLPREFIX__}/potential-amount`
    }

    const response = await global.__SERVER__.inject(options)
    expect(response.statusCode).toBe(200)
    expect(response.payload).toContain('Potential grant funding')
    expect(response.payload).toContain(eligiblePageText)
  })

  it('page loads successfully, with all the Eligible options when project cost > 750000', async () => {
    varList.projectCost= 1000000
    varList.calculatedGrant= 300000
    const options = {
      method: 'GET',
      url: `${global.__URLPREFIX__}/potential-amount`
    }

    const response = await global.__SERVER__.inject(options)
    expect(response.statusCode).toBe(200)
    expect(response.payload).toContain('Potential grant funding')
    expect(response.payload).toContain('You may be able to apply for grant funding of up to £300,000, based on the estimated project items cost of £1,000,000.')
    expect(response.payload).toContain('There’s no guarantee the project will receive a grant.')
  })

  it('page loads successfully, with all the Eligible options when project cost >= 1000000', async () => {
    varList.solarPVSystem = 'Yes'
    varList.projectCost= 750000
    varList.calculatedGrant= 300000
    const options = {
      method: 'GET',
      url: `${global.__URLPREFIX__}/potential-amount`
    }

    const response = await global.__SERVER__.inject(options)
    expect(response.statusCode).toBe(200)
    expect(response.payload).toContain('Potential grant funding')
    expect(response.payload).toContain('You may be able to apply for a grant of up to £300,000, based on the estimated cost of £750,000.')
    expect(response.payload).toContain('There’s no guarantee the project will receive a grant.')
  })

  it('page loads with correct back link', async () => {
    const options = {
      method: 'GET',
      url: `${global.__URLPREFIX__}/potential-amount`
    }
    const response = await global.__SERVER__.inject(options)
    expect(response.statusCode).toBe(200)
    expect(response.payload).toContain('<a href=\"project-cost\" class=\"govuk-back-link\"')
  })
})
