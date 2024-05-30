const { crumbToken } = require('./test-helper')
const { commonFunctionsMock } = require('./../../../session-mock')

describe('Page: /mechanisation', () => {
  const varList = {}
  let valList = {}

  commonFunctionsMock(varList, 'Error', {}, valList)

  it('page loads successfully, with all the options', async () => {
    const options = {
      method: 'GET',
      url: `${global.__URLPREFIX__}/mechanisation`
    }

    const response = await global.__SERVER__.inject(options)
    expect(response.statusCode).toBe(200)
    expect(response.payload).toContain('Will this project use any mechanisation instead of manual labour?')
    expect(response.payload).toContain('For example, a fruit grading and sorting machine that does the work of 2 farm labourers')
    expect(response.payload).toContain('Yes')
    expect(response.payload).toContain('No')
  })

  it('no option selected -> show error message', async () => {
    valList.mechanisation = {
      error: 'Select yes if this project will use any mechanisation instead of manual labour',
      return: false
    }
    
    const postOptions = {
      method: 'POST',
      url: `${global.__URLPREFIX__}/mechanisation`,
      headers: { cookie: 'crumb=' + crumbToken },
      payload: { mechanisation: '', crumb: crumbToken }
    }

    const postResponse = await global.__SERVER__.inject(postOptions)
    expect(postResponse.statusCode).toBe(200)
    expect(postResponse.payload).toContain('Select yes if this project will use any mechanisation instead of manual labour')
  })

  it('user selects \'Yes\' -> store user response and redirect to /manual-labour-amount', async () => {
    valList.mechanisation = null
    
    const postOptions = {
      method: 'POST',
      url: `${global.__URLPREFIX__}/mechanisation`,
      headers: { cookie: 'crumb=' + crumbToken },
      payload: { mechanisation: 'Yes', crumb: crumbToken }
    }

    const postResponse = await global.__SERVER__.inject(postOptions)
    expect(postResponse.statusCode).toBe(302)
    expect(postResponse.headers.location).toBe('manual-labour-amount')
  })

  it('user selects \'No\' -> store user response and redirect to /future-customers', async () => {    
    const postOptions = {
      method: 'POST',
      url: `${global.__URLPREFIX__}/mechanisation`,
      headers: { cookie: 'crumb=' + crumbToken },
      payload: { mechanisation: 'No', crumb: crumbToken }
    }

    const postResponse = await global.__SERVER__.inject(postOptions)
    expect(postResponse.statusCode).toBe(302)
    expect(postResponse.headers.location).toBe('future-customers')
  })

  it('page loads with correct back link when the user answered "Yes" on /smaller-abattoir', async () => {
    varList.smallerAbattoir = 'Yes'
    
    const options = {
      method: 'GET',
      url: `${global.__URLPREFIX__}/mechanisation`
    }
    const response = await global.__SERVER__.inject(options)
    expect(response.statusCode).toBe(200)
    expect(response.payload).toContain('<a href=\"project-impact\" class=\"govuk-back-link\">Back</a>')
  })

  xit('page loads with correct back link when the user answered "No" on /smaller-abattoir', async () => {
    varList.smallerAbattoir = 'No'
        
    const options = {
      method: 'GET',
      url: `${global.__URLPREFIX__}/mechanisation`
    }
    const response = await global.__SERVER__.inject(options)
    expect(response.statusCode).toBe(200)
    expect(response.payload).toContain('<a href=\"remaining-costs\" class=\"govuk-back-link\">Back</a>')
  })
})
