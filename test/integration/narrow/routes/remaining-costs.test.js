const { crumbToken } = require('./test-helper')

const { commonFunctionsMock } = require('./../../../session-mock')

describe('Page: /remaining-costs', () => {
  const varList = { 
    totalCalculatedGrant: 66000,
    totalProjectCost: 240000,
    calculatedGrant: 16000,
    projectCost: 40000,
    calculatedSolarGrant: 50000,
    solarProjectCost: 200000,
    solarPVCost: 200000,
    remainingCost:174000,
    isSolarCappedGreaterThanCalculatedGrant: false,
    isSolarCapped: false,
    solarPVSystem: 'No'

  }

  let valList = {}

  commonFunctionsMock(varList, null , {}, valList)

  it('page loads successfully, with all the options', async () => {
    const options = {
      method: 'GET',
      url: `${global.__URLPREFIX__}/remaining-costs`
    }

    const response = await global.__SERVER__.inject(options)
    expect(response.statusCode).toBe(200)
    expect(response.payload).toContain('Can you pay the remaining costs of £174,000')
    expect(response.payload).toContain('Yes')
    expect(response.payload).toContain('No')
  })

  it('no option selected -> show error message', async () => {
    valList.canPayRemainingCost = {
      error: 'Select yes if you can pay the remaining costs without using any other grant money',
      return: false
    }
    const postOptions = {
      method: 'POST',
      url: `${global.__URLPREFIX__}/remaining-costs`,
      headers: { cookie: 'crumb=' + crumbToken },
      payload: { canPayRemainingCost: '', crumb: crumbToken }
    }

    const postResponse = await global.__SERVER__.inject(postOptions)
    expect(postResponse.statusCode).toBe(200)
    expect(postResponse.payload).toContain('Select yes if you can pay the remaining costs without using any other grant money')
  })

  it('user selects ineligible option: \'No\' -> display ineligible page', async () => {
    valList.canPayRemainingCost.error = 'You cannot apply for a grant from this scheme'
    const postOptions = {
      method: 'POST',
      url: `${global.__URLPREFIX__}/remaining-costs`,
      headers: { cookie: 'crumb=' + crumbToken },
      payload: { canPayRemainingCost: 'No', crumb: crumbToken }
    }

    const postResponse = await global.__SERVER__.inject(postOptions)
    expect(postResponse.payload).toContain('You cannot apply for a grant from this scheme')
  })

  it('user selects eligible option: \'Yes\' -> store user response and redirect to /produce-processed', async () => {
    valList.canPayRemainingCost = null
    const postOptions = {
      method: 'POST',
      url: `${global.__URLPREFIX__}/remaining-costs`,
      headers: { cookie: 'crumb=' + crumbToken },
      payload: { canPayRemainingCost: 'Yes', crumb: crumbToken }
    }

    const postResponse = await global.__SERVER__.inject(postOptions)
    expect(postResponse.statusCode).toBe(302)
    expect(postResponse.headers.location).toBe('produce-processed')
  })
  it('page loads with correct back link when solar-pv-system is /No', async () => {
    const options = {
      method: 'GET',
      url: `${global.__URLPREFIX__}/remaining-costs`
    }
    const response = await global.__SERVER__.inject(options)
    expect(response.statusCode).toBe(200)
    expect(response.payload).toContain('<a href=\"potential-amount\" class=\"govuk-back-link\">Back</a>')
  })

  it('page loads with correct back link when solar-pv-system is /Yes', async () => {
    varList.isSolarCappedGreaterThanCalculatedGrant = true,
    varList.solarPVSystem = 'Yes'
    const options = {
      method: 'GET',
      url: `${global.__URLPREFIX__}/remaining-costs`
    }
    const response = await global.__SERVER__.inject(options)
    expect(response.statusCode).toBe(200)
    expect(response.payload).toContain('<a href=\"potential-amount-solar-details\" class=\"govuk-back-link\">Back</a>')
  })
  it('page loads with correct back link when solar-pv-system is /Yes', async () => {
    varList.isSolarCappedGreaterThanCalculatedGrant = false,
    varList.projectCost = 100000,
    varList.solarPVCost= 50000
    varList.solarPVSystem = 'Yes'
    const options = {
      method: 'GET',
      url: `${global.__URLPREFIX__}/remaining-costs`
    }
    const response = await global.__SERVER__.inject(options)
    expect(response.statusCode).toBe(200)
    expect(response.payload).toContain('<a href=\"potential-amount-solar\" class=\"govuk-back-link\">Back</a>')
  })

  it('page loads with correct back link when solar-pv-system is /Yes and projectCost is 1 million or greater.', async () => {
    varList.isSolarCappedGreaterThanCalculatedGrant = false,
    varList.projectCost = 1000000,
    varList.solarPVSystem = 'Yes'
    const options = {
      method: 'GET',
      url: `${global.__URLPREFIX__}/remaining-costs`
    }
    const response = await global.__SERVER__.inject(options)
    expect(response.statusCode).toBe(200)
    expect(response.payload).toContain('<a href=\"potential-amount\" class=\"govuk-back-link\">Back</a>')
  })
})
