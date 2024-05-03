const { crumbToken } = require('./test-helper')
const { commonFunctionsMock } = require('./../../../session-mock')

describe('confirm page', () => {
  const varList = { farmerDetails: 'someValue', contractorsDetails: 'someValue' }

  commonFunctionsMock(varList, 'Error')
  
  it('page loads successfully, with all the options', async () => {
    const options = {
      method: 'GET',
      url: `${global.__URLPREFIX__}/confirm`,
      headers: {
        cookie: 'crumb=' + crumbToken,
        referer: 'localhost/check-details'
      }
    }

    const response = await global.__SERVER__.inject(options)
    expect(response.statusCode).toBe(200)
    expect(response.payload).toContain('Confirm and send')
    expect(response.payload).toContain('I confirm that, to the best of my knowledge, the details I have provided are correct.')
    expect(response.payload).toContain('I understand the score was based on the answers I provided.')
    expect(response.payload).toContain('I am aware the information I submit will be checked.')
    expect(response.payload).toContain('I am happy to be contacted by Defra and RPA (or a third-party on their behalf) about my application.')
    expect(response.payload).toContain('Improving our schemes')
    expect(response.payload).toContain('As we develop new services we get feedback from farmers and agents.')
    expect(response.payload).toContain('You may be contacted by us or a third party that we work with.')
  })

  it('store user response and redirect to /confirmation', async () => {
    const postOptions = {
      method: 'POST',
      url: `${global.__URLPREFIX__}/confirm`,
      payload: { consentOptional: 'some conscent', crumb: crumbToken },
      headers: { cookie: 'crumb=' + crumbToken }
    }

    const postResponse = await global.__SERVER__.inject(postOptions)
    expect(postResponse.statusCode).toBe(302)
    expect(postResponse.headers.location).toBe('confirmation')
  })
})
