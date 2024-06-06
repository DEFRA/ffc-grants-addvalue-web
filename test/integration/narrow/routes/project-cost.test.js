const { crumbToken } = require('./test-helper')
const { commonFunctionsMock } = require('./../../../session-mock')

describe('Page: /project-cost', () => {
  const varList = { 
    storage: 'randomData',
    solarPVSystem: 'Yes' ,
    fruitStorage: 'Yes',
    projectItems: ['random']
  }

  let valList = {}

  const utilsList = {
    'solar-PV-system-A1': 'Yes',
    'solar-PV-system-A2': 'No',
    'project-items-A1': 'Constructing or improving buildings for processing',
    'project-items-A2': 'Processing equipment or machinery',
    'project-items-A3': 'Retail facilities',
    'storage-A1': 'Yes',
    'fruit-storage-A1': 'Yes'
  }

  commonFunctionsMock(varList, null, utilsList, valList)

  it('page loads successfully, with all the options', async () => {
    const options = {
      method: 'GET',
      url: `${global.__URLPREFIX__}/project-cost`
    }

    const response = await global.__SERVER__.inject(options)
    expect(response.statusCode).toBe(200)
    expect(response.payload).toContain('What is the estimated cost of the items?')
    expect(response.payload).toContain('Do not include the solar PV')
    expect(response.payload).toContain('Enter cost of the items, for example 695,000')
  })

  it('page loads successfully, with correct sidebar items', async () => {
    varList.projectItems = ['Constructing or improving buildings for processing', 'Processing equipment or machinery', 'Retail facilities'],
    varList.fruitStorage = 'Yes'

    const options = {
      method: 'GET',
      url: `${global.__URLPREFIX__}/project-cost`
    }

    const response = await global.__SERVER__.inject(options)
    expect(response.statusCode).toBe(200)
    expect(response.payload).toContain('What is the estimated cost of the items?')
    expect(response.payload).toContain('Enter cost of the items, for example 695,000')
    expect(response.payload).toContain('Selected items')
    expect(response.payload).toContain('Constructing or improving buildings for processing')
    expect(response.payload).toContain('Processing equipment or machinery')
    expect(response.payload).toContain('Retail facilities')
    expect(response.payload).toContain('Controlled atmosphere storage for top fruit')
  })

  it('page loads successfully, with all the options', async () => {
    varList.solarPVSystem = 'No'
    const options = {
      method: 'GET',
      url: `${global.__URLPREFIX__}/project-cost`
    }

    const response = await global.__SERVER__.inject(options)
    expect(response.statusCode).toBe(200)
    expect(response.payload).toContain('What is the estimated cost of the items?')
    expect(response.payload).toContain('Do not include VAT')
    expect(response.payload).toContain('Enter cost of the items, for example 695,000')
  })

  it('no value is typed in -> show error message', async () => {
    valList.projectCost = {
      error: 'Enter the estimated cost of the items',
      return: false
    }

    const postOptions = {
      method: 'POST',
      url: `${global.__URLPREFIX__}/project-cost`,
      headers: { cookie: 'crumb=' + crumbToken },
      payload: { projectCost: '', crumb: crumbToken }
    }

    const postResponse = await global.__SERVER__.inject(postOptions)
    expect(postResponse.statusCode).toBe(200)
    expect(postResponse.payload).toContain('Enter the estimated cost of the items')
  })


  it('user types in an invalid value -> display error message', async () => {
    valList.projectCost.error = 'Enter a whole number in correct format'
    const postOptions = {
      method: 'POST',
      url: `${global.__URLPREFIX__}/project-cost`,
      headers: { cookie: 'crumb=' + crumbToken },
      payload: { projectCost: '62500q', crumb: crumbToken }
    }

    const postResponse = await global.__SERVER__.inject(postOptions)
    expect(postResponse.payload).toContain('Enter a whole number in correct format')
  })

  it('user types in a value with more than 10 digits -> display error message', async () => {
    valList.projectCost.error = 'Enter a whole number with a maximum of 7 digits'
    const postOptions = {
      method: 'POST',
      url: `${global.__URLPREFIX__}/project-cost`,
      headers: { cookie: 'crumb=' + crumbToken },
      payload: { projectCost: '11111111111', crumb: crumbToken }
    }

    const postResponse = await global.__SERVER__.inject(postOptions)
    expect(postResponse.payload).toContain('Enter a whole number with a maximum of 7 digits')
  })

  it('user types in any amount less than £10000 -> display ineligible page', async () => {
    valList.projectCost = null
    const postOptions = {
      method: 'POST',
      url: `${global.__URLPREFIX__}/project-cost`,
      headers: { cookie: 'crumb=' + crumbToken },
      payload: { projectCost: '10000', crumb: crumbToken }
    }

    const postResponse = await global.__SERVER__.inject(postOptions)
    expect(postResponse.payload).toContain('You cannot apply for a grant from this scheme')
    expect(postResponse.payload).toContain('The minimum grant you can apply for is £20,000 (50% of £40,000).')
  })

  it('user types in a valid value (eg £62500) -> store user response and redirect to /solar-PV-cost', async () => {
    valList.projectCost = null
    varList.solarPVSystem = 'Yes'
    const postOptions = {
      method: 'POST',
      url: `${global.__URLPREFIX__}/project-cost`,
      headers: { cookie: 'crumb=' + crumbToken },
      payload: { projectCost: '62500', crumb: crumbToken }
    }

    const postResponse = await global.__SERVER__.inject(postOptions)
    expect(postResponse.statusCode).toBe(302)
    expect(postResponse.headers.location).toBe('solar-PV-cost')
  })

  it('user types in a valid value (eg £1000000) -> store user response and redirect to /adding-value/potential-amount', async () => {
    valList.projectCost = null
    varList.solarPVSystem = 'Yes'
    const postOptions = {
      method: 'POST',
      url: `${global.__URLPREFIX__}/project-cost`,
      headers: { cookie: 'crumb=' + crumbToken },
      payload: { projectCost: '1000000', crumb: crumbToken }
    }

    const postResponse = await global.__SERVER__.inject(postOptions)
    expect(postResponse.statusCode).toBe(302)
    expect(postResponse.headers.location).toBe('/adding-value/potential-amount')
  })

  it('user types in a valid value (eg £62500) -> store user response and redirect to /potential-amount', async () => {
    valList.projectCost = null
    varList.solarPVSystem = 'No'
    const postOptions = {
      method: 'POST',
      url: `${global.__URLPREFIX__}/project-cost`,
      headers: { cookie: 'crumb=' + crumbToken },
      payload: { projectCost: '62500', crumb: crumbToken }
    }

    const postResponse = await global.__SERVER__.inject(postOptions)
    expect(postResponse.statusCode).toBe(302)
    expect(postResponse.headers.location).toBe('potential-amount')
  })

  it('page loads with correct back link', async () => {
    const options = {
      method: 'GET',
      url: `${global.__URLPREFIX__}/project-cost`
    }
    const response = await global.__SERVER__.inject(options)
    expect(response.statusCode).toBe(200)
    expect(response.payload).toContain('<a href=\"solar-PV-system\" class=\"govuk-back-link\">Back</a>')
  })
})
