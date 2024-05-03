const { crumbToken } = require('./test-helper')

const { commonFunctionsMock } = require('../../../session-mock')

describe('Page: /agents-details', () => {
  const varList = { applying: 'Agent' }

  let valList = {}

  commonFunctionsMock(varList, 'Error', {}, valList)

  it('page loads successfully, with all the options', async () => {
    const options = {
      method: 'GET',
      url: `${global.__URLPREFIX__}/agents-details`
    }

    const response = await global.__SERVER__.inject(options)
    expect(response.statusCode).toBe(200)
    expect(response.payload).toContain('Agent’s details')
    expect(response.payload).toContain('First name')
    expect(response.payload).toContain('Last name')
    expect(response.payload).toContain('Business name')
    expect(response.payload).toContain('Email address')
    expect(response.payload).toContain('Mobile number')
    expect(response.payload).toContain('Landline number')
    expect(response.payload).toContain('Business address')
    expect(response.payload).toContain('Town')
    expect(response.payload).toContain('County')
    expect(response.payload).toContain('Postcode')
  })

  it('no option selected -> show error message', async () => {
    valList.firstName = {
      error: 'Enter your first name',
      
      return: false
    }

    valList.lastName = {
      error: 'Enter your last name',
      
      return: false
    }

    valList.businessName = {
      error: 'Enter your business name',
      
      return: false
    }

    valList.emailAddress = {
      error: 'Enter your email address',
      
      return: false
    }

    // valList.confirmEmailAddress = {
    //   error: 'Confirm your email address',
      
    //   return: false
    // }

    // confirm not yet added

    valList.mobileNumber = {
      error: 'Enter a mobile number (if you do not have a mobile, enter your landline number)',
      
      return: false
    }

    valList.landlineNumber = {
      error: 'Enter a landline number (if you do not have a landline, enter your mobile number)',
      
      return: false
    }

    valList.address1 = {
      error: 'Enter your building and street details',
      
      return: false
    }

    // valList.address2 = {
    //   error: 'Enter your address line 2',
      
    //   return: false
    // }

    valList.town = {
      error: 'Enter your town',
      
      return: false
    }

    valList.county = {
      error: 'Select your county',
      return: false
    }

    valList.postcode = {
      error: 'Enter your postcode, like AA1 1AA',
      return: false
    }

    const postOptions = {
      method: 'POST',
      url: `${global.__URLPREFIX__}/agents-details`,
      headers: { cookie: 'crumb=' + crumbToken },
      payload: { agentsDetails: '', crumb: crumbToken }
    }

    const postResponse = await global.__SERVER__.inject(postOptions)
    expect(postResponse.statusCode).toBe(200)
    expect(postResponse.payload).toContain('Enter your first name')
    expect(postResponse.payload).toContain('Enter your last name')
    expect(postResponse.payload).toContain('Enter your business name')
    expect(postResponse.payload).toContain('Enter your email address')
    expect(postResponse.payload).toContain('Enter a landline number (if you do not have a landline, enter your mobile number)')
    expect(postResponse.payload).toContain('Enter your building and street details')
    expect(postResponse.payload).toContain('Enter your town')
    expect(postResponse.payload).toContain('Select your county')
    expect(postResponse.payload).toContain('Enter your postcode, like AA1 1AA')
  })

  it('user came from \'CHECK DETAILS\' page -> display <Back to details> button', async () => {
    varList.reachedCheckDetails = true

    const options = {
      method: 'GET',
      url: `${global.__URLPREFIX__}/agents-details`
    }
    const response = await global.__SERVER__.inject(options)
    expect(response.statusCode).toBe(200)
    expect(response.payload).toContain('Back to details')
  })

  it('validate first name - no digits', async () => {
    valList.firstName = {
      error: 'Name must only include letters, hyphens and apostrophes',
      
      return: false
    }

    const postOptions = {
      method: 'POST',
      url: `${global.__URLPREFIX__}/agents-details`,
      headers: { cookie: 'crumb=' + crumbToken },
      payload: {
        firstName: '123',
        crumb: crumbToken
      }
    }

    const postResponse = await global.__SERVER__.inject(postOptions)
    expect(postResponse.statusCode).toBe(200)
    expect(postResponse.payload).toContain('Name must only include letters, hyphens and apostrophes')
  })

  it('validate last name - no digits', async () => {
    valList.lastName = {
      error: 'Name must only include letters, hyphens and apostrophes',
      
      return: false
    }

    const postOptions = {
      method: 'POST',
      url: `${global.__URLPREFIX__}/agents-details`,
      headers: { cookie: 'crumb=' + crumbToken },
      payload: {
        lastName: '123',
        crumb: crumbToken
      }
    }

    const postResponse = await global.__SERVER__.inject(postOptions)
    expect(postResponse.statusCode).toBe(200)
    expect(postResponse.payload).toContain('Name must only include letters, hyphens and apostrophes')
  })

  it('validate email', async () => {
    valList.emailAddress = {
      error: 'Enter an email address in the correct format, like name@example.com',
      
      return: false
    }

    const postOptions = {
      method: 'POST',
      url: `${global.__URLPREFIX__}/agents-details`,
      headers: { cookie: 'crumb=' + crumbToken },
      payload: {
        emailAddress: 'my@@name.com',
        crumb: crumbToken
      }
    }

    const postResponse = await global.__SERVER__.inject(postOptions)
    expect(postResponse.statusCode).toBe(200)
    expect(postResponse.payload).toContain('Enter an email address in the correct format, like name@example.com')
  })

  it('validate mobile (optional) - at least 10 characters', async () => {
    valList.mobileNumber = {
      error: 'Your mobile number must have at least 10 characters',
      
      return: false
    }

    const postOptions = {
      method: 'POST',
      url: `${global.__URLPREFIX__}/agents-details`,
      headers: { cookie: 'crumb=' + crumbToken },
      payload: {
        mobileNumber: '12345679',
        crumb: crumbToken
      }
    }

    const postResponse = await global.__SERVER__.inject(postOptions)
    expect(postResponse.statusCode).toBe(200)
    expect(postResponse.payload).toContain('Your mobile number must have at least 10 characters')
  })

  it('validate mobile (optional) - correct format', async () => {
    valList.mobileNumber = {
      error: 'Enter a telephone number, like 01632 960 001, 07700 900 982 or +44 0808 157 0192',
      
      return: false
    }

    const postOptions = {
      method: 'POST',
      url: `${global.__URLPREFIX__}/agents-details`,
      headers: { cookie: 'crumb=' + crumbToken },
      payload: {
        mobileNumber: '12345679a0${',
        crumb: crumbToken
      }
    }

    const postResponse = await global.__SERVER__.inject(postOptions)
    expect(postResponse.statusCode).toBe(200)
    expect(postResponse.payload).toContain('Enter a telephone number, like 01632 960 001, 07700 900 982 or +44 0808 157 0192')
  })

  it('validate landline (optional) - at least 10 characters', async () => {
    valList.landlineNumber = {
      error: 'Your landline number must have at least 10 characters',
      
      return: false
    }
    const postOptions = {
      method: 'POST',
      url: `${global.__URLPREFIX__}/agents-details`,
      headers: { cookie: 'crumb=' + crumbToken },
      payload: {
        landlineNumber: '12345679',
        crumb: crumbToken
      }
    }

    const postResponse = await global.__SERVER__.inject(postOptions)
    expect(postResponse.statusCode).toBe(200)
    expect(postResponse.payload).toContain('Your landline number must have at least 10 characters')
  })

  it('validate landline (optional) - correct format', async () => {
    valList.landlineNumber = {
      error: 'Enter a telephone number, like 01632 960 001, 07700 900 982 or +44 0808 157 0192',
      
      return: false
    }

    const postOptions = {
      method: 'POST',
      url: `${global.__URLPREFIX__}/agents-details`,
      headers: { cookie: 'crumb=' + crumbToken },
      payload: {
        landlineNumber: '12345679a0${',
        crumb: crumbToken
      }
    }

    const postResponse = await global.__SERVER__.inject(postOptions)
    expect(postResponse.statusCode).toBe(200)
    expect(postResponse.payload).toContain('Enter a telephone number, like 01632 960 001, 07700 900 982 or +44 0808 157 0192')
  })

  it('if both mobile and landline are missing -> show error message', async () => {
    valList.landlineNumber = {
      error: 'Enter a landline number (if you do not have a landline, enter your mobile number)',
      
      return: false
    }

    const postOptions = {
      method: 'POST',
      url: `${global.__URLPREFIX__}/agents-details`,
      headers: { cookie: 'crumb=' + crumbToken },
      payload: {
        firstName: 'First Name',
        lastName: 'Last Name',
        businessName: 'Business Name',
        emailAddress: 'my@name.com',
        address1: 'Address 1',
        address2: 'Address 2',
        town: 'MyTown',
        county: 'Devon',
        postcode: 'AA1 1AA',
        crumb: crumbToken
      }
    }

    const postResponse = await global.__SERVER__.inject(postOptions)
    expect(postResponse.statusCode).toBe(200)
    expect(postResponse.payload).toContain('Enter a landline number (if you do not have a landline, enter your mobile number)')
  })

  it('validate postcode - valid format', async () => {
    valList.postcode = {
      error: 'Enter a postcode, like AA1 1AA',
      
      return: false
    }
    const postOptions = {
      method: 'POST',
      url: `${global.__URLPREFIX__}/agents-details`,
      headers: { cookie: 'crumb=' + crumbToken },
      payload: {
        postcode: 'aa1aa',
        crumb: crumbToken
      }
    }

    const postResponse = await global.__SERVER__.inject(postOptions)
    expect(postResponse.statusCode).toBe(200)
    expect(postResponse.payload).toContain('Enter a postcode, like AA1 1AA')
  })

  it('store user response and redirect to /applicant-details', async () => {
    valList.firstName = null
    valList.lastName = null
    valList.businessName = null
    valList.emailAddress = null
    // valList.confirmEmailAddress = null
    valList.mobileNumber = null
    valList.landlineNumber = null
    valList.address1 = null
    // valList.address2 = null
    valList.town = null
    valList.county = null
    valList.postcode = null
    
    const postOptions = {
      method: 'POST',
      url: `${global.__URLPREFIX__}/agents-details`,
      headers: { cookie: 'crumb=' + crumbToken },
      payload: {
        firstName: 'First Name',
        lastName: 'Last Name',
        businessName: 'Business Name',
        emailAddress: 'my@name.com',
        mobileNumber: '07700 900 982',
        address1: 'Address 1',
        address2: 'Address 2',
        town: 'MyTown',
        county: 'Devon',
        postcode: 'AA1 1AA',
        crumb: crumbToken
      }
    }

    const postResponse = await global.__SERVER__.inject(postOptions)
    expect(postResponse.statusCode).toBe(302)
    expect(postResponse.headers.location).toBe('applicant-details')
  })
})
