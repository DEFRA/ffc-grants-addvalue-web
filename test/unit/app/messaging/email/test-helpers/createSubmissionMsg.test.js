const agentSubmission = require('./submission-agent.json')
const farmerSubmission = require('./submission-farmer.json')
const fruitStorageSubmission = require('./submission-fruit-storage.json')
const desirabilityScore = require('./desirability-score.json')
const { commonFunctionsMock } = require('./../../../../../session-mock')

describe('Create submission message', () => {
  const mockPassword = 'mock-pwd'

  const varList = {}
  const utilsList = {
    'solar-PV-system-A1': 'Yes',
    'smaller-abattoir-A2': 'No',
    'fruit-storage-A2': 'No',
    'smaller-abattoir-A1': 'Yes',
    'tenancy-A2': 'No',
    'mechanisation-A1': 'Yes'
  }
  commonFunctionsMock(varList, undefined, utilsList, {})


  jest.mock('../../../../../../app/messaging/email/config/email', () => ({
    notifyTemplate: 'mock-template'
  }))
  jest.mock('../../../../../../app/messaging/email/config/spreadsheet', () => {
    return {
      hideEmptyRows: true,
      protectEnabled: true,
      sendEmailToRpa: true,
      rpaEmail: 'FTF@rpa.gov.uk',
      protectPassword: mockPassword
    }
  })

  const createMsg = require('../../../../../../app/messaging/email/create-submission-msg')

  beforeEach(() => {
    jest.resetModules()
  })

  test('Farmer submission generates correct message payload', () => {
    const msg = createMsg(farmerSubmission, desirabilityScore)

    expect(msg).toHaveProperty('agentEmail')
    expect(msg).toHaveProperty('applicantEmail')
    expect(msg).toHaveProperty('rpaEmail')
    expect(msg).toHaveProperty('spreadsheet')
    expect(msg.applicantEmail.emailAddress).toBe(farmerSubmission.farmerDetails.emailAddress)
    expect(msg.rpaEmail.emailAddress).toBe('FTF@rpa.gov.uk')
    expect(msg.agentEmail).toBe(null)
  })

  test('fruit storage submission generates correct message payload', () => {
    const msg = createMsg(fruitStorageSubmission, desirabilityScore)

    expect(msg).toHaveProperty('agentEmail')
    expect(msg).toHaveProperty('applicantEmail')
    expect(msg).toHaveProperty('rpaEmail')
    expect(msg).toHaveProperty('spreadsheet')
    expect(msg.applicantEmail.emailAddress).toBe(fruitStorageSubmission.farmerDetails.emailAddress)
    expect(msg.rpaEmail.emailAddress).toBe('FTF@rpa.gov.uk')
    expect(msg.agentEmail).toBe(null)
  })

  test('Farmer submission generates message payload without RPA email when config is Flase', () => {
    jest.mock('../../../../../../app/messaging/email/config/spreadsheet', () => ({
      hideEmptyRows: true,
      protectEnabled: false,
      sendEmailToRpa: false,
      protectPassword: mockPassword
    }))

    // farmerSubmission.applicantType = ['Beef (including calf rearing)', 'Dairy (including calf rearing)']

    const msg = createMsg(farmerSubmission, desirabilityScore)
    expect(msg).toHaveProperty('agentEmail')
    expect(msg).toHaveProperty('applicantEmail')
    expect(msg).toHaveProperty('rpaEmail')
    expect(msg).toHaveProperty('spreadsheet')
    expect(msg.applicantEmail.emailAddress).toBe(farmerSubmission.farmerDetails.emailAddress)
    expect(msg.rpaEmail.emailAddress).toBeFalsy
    expect(msg.agentEmail).toBe(null)
  })
  test('Email part of message should have correct properties', () => {
    // farmerSubmission.applicantType = 'Dairy (including calf rearing)'
    
    const msg = createMsg(farmerSubmission, desirabilityScore)

    expect(msg.applicantEmail).toHaveProperty('notifyTemplate')
    expect(msg.applicantEmail).toHaveProperty('emailAddress')
    expect(msg.applicantEmail).toHaveProperty('details')
    expect(msg.applicantEmail.details).toHaveProperty(
      'firstName', 'lastName', 'referenceNumber', 'overallRating', 'legalStatus',
      'location', 'landOwnership', 'tenancyAgreement', 'project',
      'technology', 'itemsCost', 'potentialFunding', 'remainingCost',
      'projectStarted', 'planningPermission', 'projectName', 'businessName',
      'farmerName', 'farmerSurname', 'agentName', 'agentSurname', 'farmerEmail', 'agentEmail',
      'contactConsent', 'scoreDate', 'projectCost', 'productsProcessed', 'storage', 'howAddingValue',
      'mechanisation', 'projectItems', 'collaboration', 'productsProcessed', 'environmentalImpact', 'futureCustomers',
      'projectImpact', 'smallerAbattoir', 'fruitStorage'
    )
  })
  test('Under 10 employees results in micro business definition', () => {
    farmerSubmission.businessDetails.numberEmployees = 1
    farmerSubmission.businessDetails.businessTurnover = 1
    const msg = createMsg(farmerSubmission, desirabilityScore)

    expect(msg.spreadsheet.worksheets[0].rows.find(r => r.row === 20).values[2]).toBe('Micro')
  })

  test('planning permission to Approved', () => {
    farmerSubmission.planningPermission = 'Secured'
    const msg = createMsg(farmerSubmission, desirabilityScore)

    expect(msg.spreadsheet.worksheets[0].rows.find(r => r.row === 346).values[2]).toBe('Approved')
  })

  test('Under 50 employees results in small business definition', () => {
    farmerSubmission.businessDetails.numberEmployees = 10
    farmerSubmission.businessDetails.businessTurnover = 2500000
    const msg = createMsg(farmerSubmission, desirabilityScore)

    expect(msg.spreadsheet.worksheets[0].rows.find(r => r.row === 20).values[2]).toBe('Small')
  })

  test('Under 250 employees results in medium business definition', () => {
    farmerSubmission.businessDetails.numberEmployees = 50
    farmerSubmission.businessDetails.businessTurnover = 10250000
    const msg = createMsg(farmerSubmission, desirabilityScore)

    expect(msg.spreadsheet.worksheets[0].rows.find(r => r.row === 20).values[2]).toBe('Medium')
  })

  test('Over 250 employees results in large business definition', () => {
    farmerSubmission.businessDetails.numberEmployees = 250
    farmerSubmission.businessDetails.businessTurnover = 50500000
    const msg = createMsg(farmerSubmission, desirabilityScore)

    expect(msg.spreadsheet.worksheets[0].rows.find(r => r.row === 20).values[2]).toBe('Large')
  })

  test('Agent submission generates correct message payload', () => {
    jest.mock('../../../../../../app/messaging/email/config/spreadsheet', () => ({
      hideEmptyRows: true,
      protectEnabled: true,
      sendEmailToRpa: true,
      protectPassword: mockPassword
    }))
    const msg = createMsg(agentSubmission, desirabilityScore)

    expect(msg).toHaveProperty('agentEmail')
    expect(msg).toHaveProperty('applicantEmail')
    expect(msg).toHaveProperty('rpaEmail')
    expect(msg).toHaveProperty('spreadsheet')
    expect(msg.agentEmail.emailAddress).toBe(agentSubmission.agentsDetails.emailAddress)
    expect(msg.applicantEmail.emailAddress).toBe(agentSubmission.farmerDetails.emailAddress)
    expect(msg.rpaEmail.emailAddress).toBe('FTF@rpa.gov.uk')
  })

  test('Spreadsheet part of message should have correct properties', () => {
    agentSubmission.environmentalImpact = 'None of the above'
    const msg = createMsg(agentSubmission, desirabilityScore)

    expect(msg.spreadsheet).toHaveProperty('filename')
    expect(msg.spreadsheet).toHaveProperty('uploadLocation')
    expect(msg.spreadsheet).toHaveProperty('worksheets')
    expect(msg.spreadsheet.worksheets.length).toBe(1)
    expect(msg.spreadsheet.worksheets[0]).toHaveProperty('title')
    expect(msg.spreadsheet.worksheets[0]).toHaveProperty('hideEmptyRows')
    expect(msg.spreadsheet.worksheets[0]).toHaveProperty('defaultColumnWidth')
    expect(msg.spreadsheet.worksheets[0]).toHaveProperty('protectPassword')
    expect(msg.spreadsheet.worksheets[0]).toHaveProperty('rows')
    expect(msg.spreadsheet.worksheets[0].rows.length).toBe(76)
})

  test('Protect password property should not be set if config is false', () => {
    jest.mock('../../../../../../app/messaging/email/config/spreadsheet', () => ({
      hideEmptyRows: true,
      protectEnabled: false,
      sendEmailToRpa: false,
      protectPassword: mockPassword
    }))
    const createSubmissionMsg = require('../../../../../../app/messaging/email/create-submission-msg')
    const msg = createSubmissionMsg(agentSubmission, desirabilityScore)
    expect(msg.spreadsheet.worksheets[0]).not.toHaveProperty('protectPassword')
  })

  test('getscorechance function', () => {
    let msg = createMsg(farmerSubmission, desirabilityScore, 'strong')
    expect(msg.getScoreChance).toBe('seems likely to')

    msg = createMsg(farmerSubmission, desirabilityScore)
    expect(msg.getScoreChance).toBe('seems unlikely to')
  })
})
