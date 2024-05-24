const scoreData = require('../../../data/score-data')
const { commonFunctionsMock } = require('../../../session-mock')

const varList = {
	'current-score': 'wer',
  environmentalImpact: 'wer',
  mechanisation: 'No',
  otherFarmers: null
}

const utilsList = {
	'mechanisation-A1': 'Yes',
	'mechanisation-A2': 'No',
	'manual-labour-amount-A1': 'Up to 5',
	'manual-labour-amount-A2': '5 to 10',
	'manual-labour-amount-A3': '!0 and up'
}


commonFunctionsMock(varList, 'Error', utilsList, {})

describe('Score page', () => {
	let crumCookie
	const { getCookieHeader, getCrumbCookie, crumbToken } = require('./test-helper')

	const newSender = require('../../../../app/messaging/application')
	const createMsg = require('../../../../app/messaging/create-msg')
	// const gapiService = require('../../../../app/services/gapi-service')
	// const sendGAEvent = jest.spyOn(gapiService, 'sendGAEvent').mockImplementation(() => {
	// 		Promise.resolve()
	// 	})
	const getDesirabilityAnswersSpy = jest.spyOn(createMsg, 'getDesirabilityAnswers').mockImplementation(() => {
		return {
			test: 'test'
		}
	})
	const getUserScoreSpy = jest.spyOn(newSender, 'getUserScore').mockImplementation(() => {
		Promise.resolve(scoreData)
	})

	beforeEach(async () => {
		jest.mock('../../../../app/messaging')
		jest.mock('../../../../app/messaging/senders')
		jest.mock('ffc-messaging')
	})
	afterEach(async () => {
		jest.clearAllMocks()
	})

	it('should load page with error unhandled response from scoring service', async () => {
		const options = {
			method: 'GET',
			url: `${global.__URLPREFIX__}/score`
		}

		const response = await global.__SERVER__.inject(options)
		expect(response.statusCode).toBe(200)
		const header = getCookieHeader(response)
		expect(header.length).toBe(2)
		crumCookie = getCrumbCookie(response)
		expect(response.result).toContain(crumCookie[ 1 ])
	})

	it('should load page with error when wrong response from scoring service', async () => {
		const options = {
			method: 'GET',
			url: `${global.__URLPREFIX__}/score`
		}

		jest.spyOn(newSender, 'getUserScore').mockImplementationOnce(() => {
			return { desirability: null };
		})
		const response = await global.__SERVER__.inject(options)
		expect(response.statusCode).toBe(200)
		const header = getCookieHeader(response)
		expect(header.length).toBe(2)
		crumCookie = getCrumbCookie(response)
		expect(response.result).toContain(crumCookie[ 1 ])
	})

	it('should load page with error when can\'t connect scoring service', async () => {
		const options = {
			method: 'GET',
			url: `${global.__URLPREFIX__}/score`
		}

		jest.spyOn(newSender, 'getUserScore').mockImplementationOnce(() => {
			throw new Error('can\'t reach')
		})
		const response = await global.__SERVER__.inject(options)
		expect(response.statusCode).toBe(200)
		const header = getCookieHeader(response)
		expect(header.length).toBe(2)
		crumCookie = getCrumbCookie(response)
		expect(response.result).toContain(crumCookie[ 1 ])
	})

	it('should load page with error getScore return null', async () => {
		const options = {
			method: 'GET',
			url: `${global.__URLPREFIX__}/score`
		}

		jest.spyOn(newSender, 'getUserScore').mockImplementationOnce(() => {
			return null
		})
		const response = await global.__SERVER__.inject(options)
		expect(response.statusCode).toBe(200)
		const header = getCookieHeader(response)
		expect(header.length).toBe(2)
		crumCookie = getCrumbCookie(response)
		expect(response.result).toContain(crumCookie[ 1 ])
	})

	it('should load page with success Strong', async () => {
		// jest.mock('@hapi/wreck')
		const options = {
			method: 'GET',
			url: `${global.__URLPREFIX__}/score`
		}

		jest.spyOn(newSender, 'getUserScore').mockImplementationOnce(() => {
			console.log('Spy: STRONG', JSON.stringify(scoreData));
			return scoreData;
		})

		const response = await global.__SERVER__.inject(options)
		expect(response.statusCode).toBe(200)
		const header = getCookieHeader(response)
		expect(header.length).toBe(2)
		crumCookie = getCrumbCookie(response)
		expect(response.result).toContain(crumCookie[ 1 ])
		const responseScoreMessage = 'This means your project seems likely to be successful.'
		expect(response.payload).toContain(responseScoreMessage)
		expect(getDesirabilityAnswersSpy).toHaveBeenCalledTimes(1)
		expect(getUserScoreSpy).toHaveBeenCalledTimes(1)
	})
	it('should load page with success Average', async () => {
		varList.mechanisation = 'Yes'
		varList.otherFarmers = 'hi'
		const options = {
			method: 'GET',
			url: `${global.__URLPREFIX__}/score`
		}
		scoreData.desirability.overallRating.band = 'Average'

		jest.spyOn(newSender, 'getUserScore').mockImplementationOnce(() => {
			// console.log('Spy: Average', JSON.stringify(scoreData));
			return scoreData;
		})

		const response = await global.__SERVER__.inject(options)
		expect(response.statusCode).toBe(200)
		const header = getCookieHeader(response)
		expect(header.length).toBe(2)
		crumCookie = getCrumbCookie(response)
		expect(response.result).toContain(crumCookie[ 1 ])
		const responseScoreMessage = 'This means your project might be successful.'
		expect(response.payload).toContain(responseScoreMessage)
		expect(getDesirabilityAnswersSpy).toHaveBeenCalledTimes(1)
		expect(getUserScoreSpy).toHaveBeenCalledTimes(1)
	})
	it('should load page with sucess Weak', async () => {
		const options = {
			method: 'GET',
			url: `${global.__URLPREFIX__}/score`
		}
		scoreData.desirability.overallRating.band = 'Weak'

		jest.spyOn(newSender, 'getUserScore').mockImplementationOnce(() => {
			// console.log('Spy: WEAK', JSON.stringify(scoreData));
			return scoreData;
		})
		const response = await global.__SERVER__.inject(options)
		expect(response.statusCode).toBe(200)
		const header = getCookieHeader(response)
		expect(header.length).toBe(2)
		crumCookie = getCrumbCookie(response)
		expect(response.result).toContain(crumCookie[ 1 ])
		const responseScoreMessage = 'This means your project seems unlikely to be successful.'
		expect(response.payload).toContain(responseScoreMessage)
		expect(getDesirabilityAnswersSpy).toHaveBeenCalledTimes(1)
		expect(getUserScoreSpy).toHaveBeenCalledTimes(1)
	})

	it('should load page if scoring fails', async () => {
		const options = {
			method: 'GET',
			url: `${global.__URLPREFIX__}/score`
		}
		scoreData.desirability.overallRating.band = 'Weak'

		jest.spyOn(newSender, 'getUserScore').mockImplementationOnce(() => { throw new Error('error') })

		const response = await global.__SERVER__.inject(options)
		expect(response.statusCode).toBe(200)

	})

	it('should load page if scoring null', async () => {
		const options = {
			method: 'GET',
			url: `${global.__URLPREFIX__}/score`
		}
		scoreData.desirability.overallRating.band = 'Weak'

		jest.spyOn(newSender, 'getUserScore').mockImplementationOnce(() => { return null })

		const response = await global.__SERVER__.inject(options)
		expect(response.statusCode).toBe(200)
	})

	it('redirects to project business details page', async () => {
		const postOptions = {
			method: 'POST',
			url: `${global.__URLPREFIX__}/score`,
			payload: { crumb: crumbToken },
			headers: {
				cookie: 'crumb=' + crumbToken
			}
		}

		const postResponse = await global.__SERVER__.inject(postOptions)
		expect(postResponse.statusCode).toBe(302)
		expect(postResponse.headers.location).toBe(`/adding-value/business-details`)
	})
	//  commented out as because of prevalidation key is not set yet.
	// it('redirects to start if no current score or introducing-innovation', async () => {
	// 	varList[ 'current-score' ] = null
    //     varList.introducingInnovation = null

	// 	const postOptions = {
	// 		method: 'GET',
	// 		url: `${global.__URLPREFIX__}/score`
	// 	}

	// 	const postResponse = await global.__SERVER__.inject(postOptions)
	// 	expect(postResponse.statusCode).toBe(302)
	// 	expect(postResponse.headers.location).toBe(`${global.__URLPREFIX__}/start`)
	// }) 
})
