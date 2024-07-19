const emailConfig = require('./config/email')
const spreadsheetConfig = require('./config/spreadsheet')
const { microTurnover, smallTurnover, mediumTurnover, microEmployeesNum, smallEmployeesNum, mediumEmployeesNum } = require('./business-size-constants')
const { ALL_QUESTIONS } = require('../../config/question-bank')
const { getQuestionAnswer } = require('ffc-grants-common-functionality').utils
const { GRANT_PERCENTAGE, GRANT_PERCENTAGE_SOLAR } = require('../../helpers/grant-details')


function getQuestionScoreBand (questions, questionKey) {
  return questions.filter(question => question.key === questionKey).length > 0
    ? questions.find(question => question.key === questionKey).rating.band
    : ''
}

function generateRow (rowNumber, name, value, bold = false) {
  return {
    row: rowNumber,
    values: ['', name, value],
    bold
  }
}

function calculateBusinessSize (employees, turnover) {
  const employeesNum = Number(employees)
  const turnoverNum = Number(turnover)

  if (employeesNum < microEmployeesNum && turnoverNum < microTurnover) { // €2m turnover
    return 'Micro'
  } else if (employeesNum < smallEmployeesNum && turnoverNum < smallTurnover) { // €10m turnover
    return 'Small'
  } else if (employeesNum < mediumEmployeesNum && turnoverNum < mediumTurnover) { // €50m turnover
    return 'Medium'
  } else {
    return 'Large'
  }
}

function addAgentDetailsAddress(agentsDetails) {
  return [
    generateRow(29, 'Agent Address line 1', agentsDetails?.address1 ?? ''),
    generateRow(30, 'Agent Address line 2', agentsDetails?.address2 ?? ''),
    generateRow(32, 'Agent Address line 4 (town)', agentsDetails?.town ?? ''),
    generateRow(33, 'Agent Address line 5 (County)', agentsDetails?.county ?? ''),
    generateRow(34, 'Agent Postcode (use capitals)', agentsDetails?.postcode ?? '')
  ]
}

function addAgentDetails(agentsDetails) {
  return [
    generateRow(26, 'Agent Surname', agentsDetails?.lastName ?? ''),
    generateRow(27, 'Agent Forename', agentsDetails?.firstName ?? ''),
    ...addAgentDetailsAddress(agentsDetails),
    generateRow(35, 'Agent Landline number', agentsDetails?.landlineNumber ?? ''),
    generateRow(36, 'Agent Mobile number', agentsDetails?.mobileNumber ?? ''),
    generateRow(37, 'Agent Email', agentsDetails?.emailAddress ?? ''),
    generateRow(28, 'Agent Business Name', agentsDetails?.businessName ?? '')
  ]
}

function generateExcelFilename (scheme, projectName, businessName, referenceNumber, today) {
  const dateTime = new Intl.DateTimeFormat('en-GB', {
    timeStyle: 'short',
    dateStyle: 'short',
    timeZone: 'Europe/London'
  }).format(today).replace(/\//g, '-')
  return `${scheme}_${projectName}_${businessName}_${referenceNumber}_${dateTime}.xlsx`
}
function getBusinessTypeC53 (businessType) {
  return (businessType.includes('processing')) ? 'processor' : 'producer'
}

function getProjectItems (projectItems, storage) {
  if (storage.includes('Yes')) {
    projectItems.push('Storage Facilities')
  }
  return projectItems.join('|')
}

function generateDoraRows (submission, subScheme, todayStr, today, desirabilityScore) {
  return [
    generateRow(1, 'Field Name', 'Field Value', true),
    generateRow(2, 'FA or OA', 'Outline Application'),
    generateRow(40, 'Scheme', 'Farming Transformation Fund'),
    generateRow(39, 'Sub scheme', subScheme),
    generateRow(43, 'Theme', 'Adding Value'),
    generateRow(90, 'Project type', 'Adding Value'),
    generateRow(41, 'Owner', 'RD'),
    generateRow(341, 'Grant Launch Date', ''),
    generateRow(23, 'Status of applicant', submission.legalStatus),
    generateRow(44, 'Adding Value Project Items', submission.projectItems ? getProjectItems([submission.projectItems].flat(), submission.storage) : ''),
    generateRow(45, 'Location of project (postcode)', submission.farmerDetails.projectPostcode),
    generateRow(376, 'Project Started', submission.projectStart),
    generateRow(342, 'Land owned by Farm', submission.tenancy),
    generateRow(343, 'Tenancy for next 5 years', submission.tenancyLength ?? ''),
    generateRow(53, 'Business type', getBusinessTypeC53(submission.applicantBusiness)),
    generateRow(55, 'Total project expenditure', String(submission.totalProjectCost)),
    generateRow(57, 'Grant rate', '40'),
    generateRow(56, 'Grant amount requested', Math.max(submission.totalCalculatedGrant, submission.calculatedGrant)),
    generateRow(445, 'Solar Cost', submission.solarPVCost ?? ''),
    generateRow(446, 'Solar Grant Amount', String(submission.calculatedSolarGrant)),
    generateRow(527, 'Project items cost', String(submission.projectCost)),
    generateRow(528, 'Project items grant amount ', String(submission.calculatedGrant)),
    generateRow(345, 'Remaining Cost to Farmer', submission.remainingCost),
    generateRow(342, 'Land owned by Farm', submission.tenancy),
    generateRow(343, 'Tenancy for next 5 years', submission.tenancyLength ?? ''),
    generateRow(346, 'Planning Permission Status', submission.planningPermission),
    generateRow(394, 'AV Business Type', submission.applicantBusiness ?? ' '),
    generateRow(49, 'Site of Special Scientific Interest (SSSI)', submission.sSSI ?? ''),
    generateRow(365, 'OA score', desirabilityScore.desirability.overallRating.band),
    generateRow(366, 'Date of OA decision', ''),
    generateRow(395, 'Storage Facilities', submission.storage ? submission.storage.split(',')[0] : ''),
    generateRow(42, 'Project name', submission.businessDetails.projectName),
    generateRow(4, 'Single business identifier (SBI)', submission.businessDetails.sbi || '000000000'), // sbi is '' if not set so use || instead of ??
    generateRow(7, 'Business name', submission.businessDetails.businessName),
    generateRow(367, 'Annual Turnover', submission.businessDetails.businessTurnover),
    generateRow(22, 'Employees', submission.businessDetails.numberEmployees),
    generateRow(20, 'Business size', calculateBusinessSize(submission.businessDetails.numberEmployees, submission.businessDetails.businessTurnover)),
    generateRow(91, 'Are you an AGENT applying on behalf of your customer', submission.applying === 'Agent' ? 'Yes' : 'No'),
    generateRow(5, 'Surname', submission.farmerDetails.lastName),
    generateRow(6, 'Forename', submission.farmerDetails.firstName),
    generateRow(8, 'Address line 1', submission.farmerDetails.address1),
    generateRow(9, 'Address line 2', submission.farmerDetails.address2),
    generateRow(10, 'Address line 3', ''),
    generateRow(11, 'Address line 4 (town)', submission.farmerDetails.town),
    generateRow(12, 'Address line 5 (county)', submission.farmerDetails.county),
    generateRow(13, 'Postcode (use capitals)', submission.farmerDetails.postcode),
    generateRow(16, 'Landline number', submission.farmerDetails.landlineNumber ?? ''),
    generateRow(17, 'Mobile number', submission.farmerDetails.mobileNumber ?? ''),
    generateRow(18, 'Email', submission.farmerDetails.emailAddress),
    generateRow(89, 'Customer Marketing Indicator', submission.consentOptional ? 'Yes' : 'No'),
    generateRow(368, 'Date ready for QC or decision', todayStr),
    generateRow(369, 'Eligibility Reference No.', submission.confirmationId),
    generateRow(94, 'Current location of file', 'NA Automated'),
    generateRow(92, 'RAG rating', 'Green'),
    generateRow(93, 'RAG date reviewed ', todayStr),
    generateRow(54, 'Electronic OA received date ', todayStr),
    generateRow(370, 'Status', 'Pending RPA review'),
    generateRow(85, 'Full Application Submission Date', (new Date(today.setMonth(today.getMonth() + 6))).toLocaleDateString('en-GB')),
    generateRow(375, 'OA percent', String(desirabilityScore.desirability.overallRating.score)),
    ...addAgentDetails(submission.agentsDetails),
    ...doraScoringQuestions(submission)
  ]
}

const doraScoringQuestions = (submission) => {
  return [
    generateRow(386, 'Products To Be Processed', submission.productsProcessed ?? ''),
    generateRow(387, 'How add value to products', submission.howAddingValue ?? ''),
    generateRow(388, 'AV Project Impact', submission.projectImpact ? [submission.projectImpact].flat().join('|') : ''),
    generateRow(389, 'AV Target Customers', [submission.futureCustomers].flat().join('|')),
    generateRow(390, 'AV Farmer Collaborate', submission.collaboration),
    generateRow(393, 'AV Improve Environment', [submission.environmentalImpact].flat().join('|'))
  ]
}
// refactor alongside laying hens version for sonar complexity reduction
function getSpreadsheetDetails (submission, desirabilityScore) {
  const today = new Date()
  const todayStr = today.toLocaleDateString('en-GB')
  const schemeName = 'Adding Value'
  const subScheme = `FTF-${schemeName}`

  return {
    filename: generateExcelFilename(
      subScheme.trim(),
      submission.businessDetails.projectName.trim(),
      submission.businessDetails.businessName.trim(),
      submission.confirmationId.trim(),
      today
    ),
    uploadLocation: `Farming Investment Fund/Farming Transformation Fund/${spreadsheetConfig.uploadEnvironment}/Adding Value/`,
    worksheets: [
      {
        title: 'DORA DATA',
        ...(spreadsheetConfig.protectEnabled ? { protectPassword: spreadsheetConfig.protectPassword } : {}),
        hideEmptyRows: spreadsheetConfig.hideEmptyRows,
        defaultColumnWidth: 30,
        rows: generateDoraRows(submission, subScheme, todayStr, today, desirabilityScore)
        
      }
    ]
  }
}

function getCurrencyFormat (amount) {
  return Number(amount).toLocaleString('en-US', { minimumFractionDigits: 0, style: 'currency', currency: 'GBP' })
}

function getScoreChance (rating) {
  switch (rating.toLowerCase()) {
    case 'strong':
      return 'seems likely to'
    case 'average':
      return 'might'
    default:
      return 'seems unlikely to'
  }
}

function scoreQuestions(submission, desirabilityScore, skipThreeScoringQuestionYes) {
  const isMechanisationYes = submission.mechanisation === getQuestionAnswer('mechanisation', 'mechanisation-A1', ALL_QUESTIONS)
  return {
    scoreDate: new Date().toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' }),
    productsProcessed: skipThreeScoringQuestionYes ? submission.productsProcessed : '',
    productsProcessedScore: skipThreeScoringQuestionYes ? getQuestionScoreBand(desirabilityScore.desirability.questions, 'products-processed') : '',
    howAddingValue: skipThreeScoringQuestionYes ? submission.howAddingValue : '',
    projectImpact: skipThreeScoringQuestionYes ? [submission.projectImpact].join(', ') : '',
    projectImpactScore: skipThreeScoringQuestionYes ? getQuestionScoreBand(desirabilityScore.desirability.questions, 'project-impact') : '',
    futureCustomers: [submission.futureCustomers].flat().join(', '),
    futureCustomersScore: getQuestionScoreBand(desirabilityScore.desirability.questions, 'future-customers'),
    collaboration: submission.collaboration,
    collaborationScore: getQuestionScoreBand(desirabilityScore.desirability.questions, 'collaboration'),
    environmentalImpact: [submission.environmentalImpact].flat().join(', '),
    environmentalImpactScore: getQuestionScoreBand(desirabilityScore.desirability.questions, 'environmental-impact'),
    mechanisation: submission.mechanisation,
    mechanisationScore: isMechanisationYes ? getQuestionScoreBand(desirabilityScore.desirability.questions, 'manual-labour-amount') : 'Weak',
    manualLabour: isMechanisationYes ? submission.manualLabour : 'No',
    isMechanisationYes: isMechanisationYes
  }
}

const businesQuestion = (submission, isAgentEmail) => {

  return {
    firstName: isAgentEmail ? submission.agentsDetails.firstName : submission.farmerDetails.firstName,
    lastName: isAgentEmail ? submission.agentsDetails.lastName : submission.farmerDetails.lastName,
    projectName: submission.businessDetails.projectName,
    businessName: submission.businessDetails.businessName,
    farmerName: submission.farmerDetails.firstName,
    farmerSurname: submission.farmerDetails.lastName,
    farmerEmail: submission.farmerDetails.emailAddress,
    agentName: submission.agentsDetails?.firstName ?? 'N/A',
    agentSurname: submission.agentsDetails?.lastName ?? ' ',
    agentBusinessName: submission.agentsDetails?.businessName ?? 'N/A',
    agentEmail: submission.agentsDetails?.emailAddress ?? 'N/A',
    contactConsent: submission.consentOptional ? 'Yes' : 'No',
    businessType: submission.applicantBusiness
  }
  
}

const eligibilityQuestions = (submission) => {
  const isNotTenancy = submission.tenancy === getQuestionAnswer('tenancy', 'tenancy-A2', ALL_QUESTIONS)
  return {
    projectSubject: submission.projectSubject,
    legalStatus: submission.legalStatus,
    projectPostcode: submission.farmerDetails.projectPostcode,
    location: submission.inEngland ? 'England' : '',
    planningPermission: submission.planningPermission,
    projectStart: submission.projectStart,
    tenancy: submission.tenancy,
    isNotTenancy: isNotTenancy,
    tenancyLength: isNotTenancy ? submission.tenancyLength : '',
  }
}

// same here
function getEmailDetails(submission, desirabilityScore, rpaEmail, isAgentEmail = false) {
  const email = isAgentEmail ? submission.agentsDetails.emailAddress : submission.farmerDetails.emailAddress
  const isSolarPVSystemYes = submission.solarPVSystem === getQuestionAnswer('solar-PV-system', 'solar-PV-system-A1', ALL_QUESTIONS)
  const isFruitStorageTrue = submission.smallerAbattoir === getQuestionAnswer('smaller-abattoir', 'smaller-abattoir-A2', ALL_QUESTIONS)
  const isFruitStarageNo = submission.fruitStorage === getQuestionAnswer('fruit-storage', 'fruit-storage-A2', ALL_QUESTIONS)
  const IsSmallerAbattoirYes = submission.smallerAbattoir === getQuestionAnswer('smaller-abattoir', 'smaller-abattoir-A1', ALL_QUESTIONS)
  const skipThreeScoringQuestionYes = IsSmallerAbattoirYes || (isFruitStorageTrue && isFruitStarageNo)

  return {
    notifyTemplate: emailConfig.notifyTemplate,
    emailAddress: rpaEmail || email,
    details: {
      referenceNumber: submission.confirmationId,
      overallRating: desirabilityScore.desirability.overallRating.band,
      scoreChance: getScoreChance(desirabilityScore.desirability.overallRating.band),
      projectItems: submission.projectItems ? [submission.projectItems].flat().join(', ') : '',
      isFruitStorageTrue: isFruitStorageTrue,
      fruitStorage: isFruitStorageTrue ? submission.fruitStorage : '',
      storage: skipThreeScoringQuestionYes ? submission.storage : '',
      projectCost: getCurrencyFormat(Number(submission.projectCost.toString().replace(/,/g, ''))),
      potentialFunding: getCurrencyFormat(Math.max(submission.totalCalculatedGrant, submission.calculatedGrant)),
      remainingCost: getCurrencyFormat(submission.remainingCost),
      smallerAbattoir: submission.smallerAbattoir,
      IsSmallerAbattoirYes: IsSmallerAbattoirYes,
      otherFarmers: IsSmallerAbattoirYes ? submission.otherFarmers : '',
      skipThreeScoringQuestionYes: skipThreeScoringQuestionYes,
      isSolarPVSystemYes: isSolarPVSystemYes,
      solarPVSystem: submission.solarPVSystem,
      solarGrantRate: isSolarPVSystemYes ? `Up to ${GRANT_PERCENTAGE_SOLAR}%` : '',
      grantRate: `Up to ${GRANT_PERCENTAGE}%`,
      projectCostGrant: getCurrencyFormat(submission.calculatedGrant),
      solarPVCost: isSolarPVSystemYes ? getCurrencyFormat(Number(submission.solarPVCost.toString().replace(/,/g, ''))) : '',
      solarGrant: isSolarPVSystemYes ? getCurrencyFormat(Math.min(submission.calculatedSolarGrant, submission.cappedCalculatedSolarGrant)) : '',
      totalExpenditure: isSolarPVSystemYes ? getCurrencyFormat(submission.totalProjectCost) : '',
      ...eligibilityQuestions(submission),
      ...businesQuestion(submission, isAgentEmail),
      ...scoreQuestions(submission, desirabilityScore, skipThreeScoringQuestionYes)
    }
  }
}
function spreadsheet (submission, desirabilityScore) {
  const data = getSpreadsheetDetails(submission, desirabilityScore)
  return data
}

module.exports = function (submission, desirabilityScore, rating = '') {
  return {
    applicantEmail: getEmailDetails(submission, desirabilityScore, false),
    agentEmail: submission.applying === 'Agent' ? getEmailDetails(submission, desirabilityScore, false, true) : null,
    rpaEmail: spreadsheetConfig.sendEmailToRpa ? getEmailDetails(submission, desirabilityScore, spreadsheetConfig.rpaEmail) : null,
    spreadsheet: spreadsheet(submission, desirabilityScore),
    getScoreChance: getScoreChance(rating)

  }
}
