const { ADDRESS_REGEX } = require('ffc-grants-common-functionality/lib/regex')

const {
  CURRENCY_FORMAT,
  CHARS_MAX_10,
  CHARS_MIN_10,
  CHARS_MAX_100,
  POSTCODE_REGEX,
  WHOLE_NUMBER_REGEX,
  SBI_REGEX,
  NAME_ONLY_REGEX,
  PHONE_REGEX,
  EMAIL_REGEX,
  MIN_3_LETTERS,
  MIN_2_LETTERS_TO_USE_SPECIAL_CHARACTER,
  ONLY_TEXT_REGEX
} = require('ffc-grants-common-functionality').regex

const { LIST_COUNTIES } = require('ffc-grants-common-functionality').counties

const {
  MIN_GRANT,
  MAX_GRANT,
  GRANT_PERCENTAGE,
  GRANT_PERCENTAGE_SOLAR
} = require('../helpers/grant-details')

/**
 * ----------------------------------------------------------------
 * list of yarKeys not bound to an answer, calculated separately
 * -  calculatedGrant
 * -  remainingCost
 *
 * Mainly to replace the value of a previously stored input
 * Format: {{_VALUE_}}
 * eg: question.title: 'Can you pay £{{_storedYarKey_}}'
 * ----------------------------------------------------------------
 */

/**
 * ----------------------------------------------------------------
 * question type = single-answer, boolean ,input, multiinput, mullti-answer
 *
 *
 * ----------------------------------------------------------------
 */

/**
 * multi-input validation schema
 *
 *  type: 'multi-input',
    allFields: [
      {
        ...
        validate: [
          {
            type: 'NOT_EMPTY',
            error: 'Error message'
          },
          {
            type: 'REGEX',
            error: 'Error message',
            regex: SAVED_REGEX
          },
          {
            type: 'MIN_MAX',
            error: 'Error message',
            min: MINIMUM,
            max: MAXIMUM
          }
        ]
      }
    ]
 */

const questionBank = {
  grantScheme: {
    key: 'FFC002',
    name: 'Adding Value'
  },
  sections: [
    {
      name: 'eligibility',
      title: 'Eligibility',
      questions: [
        {
          key: 'nature-of-business',
          order: 10,
          title: 'What is your business?',
          pageTitle: '',
          backUrl: 'start',
          nextUrl: 'legal-status',
          url: 'nature-of-business',
          baseUrl: 'nature-of-business',
          type: 'single-answer',
          fundingPriorities: '',
          minAnswerCount: 1,
          ga: [{ journeyStart: true }],
          hint: {
            text: 'Select one option'
          },
          ineligibleContent: {
            messageContent: `
            <span>This grant is for businesses who:</span>
            <ul class="govuk-body">
              <li>are agricultural or horticultural growers or producers</li>
              <li>are a business processing agricultural or horticultural products that is at least 50% owned by agricultural or horticultural producers</li>
              <li>produce wild venison products as part of woodland management</li>
            </ul>`,
            messageLink: {
              url: 'https://www.gov.uk/topic/farming-food-grants-payments/rural-grants-payments',
              title: 'See other grants you may be eligible for'
            }
          },
          validate: [
            {
              type: 'NOT_EMPTY',
              error: 'Select the option that applies to your business'
            }
          ],
          sidebar: {
            values: [{
              heading: 'Eligibility',
              content: [{
                para: 'This grant is for businesses who:',
                items: [
                  'are agricultural or horticultural growers or producers',
                  `are a business processing agricultural or horticultural products that is at least 50% owned by agricultural or horticultural producers`,
                  'produce wild venison products as part of woodland management'
                ]
              }]
            }]
          },
          validations: [],
          answers: [
            {
              key: 'nature-of-business-A1',
              value: 'A grower or producer of agricultural or horticultural produce',
              hint: {
                text: 'For example, arable or livestock farmer, fruit producer, salad grower'
              }
            },
            {
              key: 'nature-of-business-A2',
              value: `A business processing agricultural or horticultural products that is at least 50% owned by agricultural or horticultural producers`,
              hint: {
                text: 'For example, a cheese production business owned by a group of farmers'
              }
            },
            {
              key: 'nature-of-business-A3',
              value: 'A woodland manager processing wild venison products'
            },
            {
              value: 'divider'
            },
            {
              key: 'nature-of-business-A4',
              value: 'None of the above',
              notEligible: true
            }
          ],
          yarKey: 'applicantBusiness'
        },
        {
          key: 'legal-status',
          order: 20,
          title: 'What is the legal status of the business?',
          pageTitle: '',
          backUrl: 'nature-of-business',
          nextUrl: 'country',
          url: 'legal-status',
          baseUrl: 'legal-status',
          preValidationKeys: ['applicantBusiness'],
          ineligibleContent: {
            messageContent: 'Your business does not have an eligible legal status.',
            details: {
              summaryText: 'Who is eligible',
              html: `<ul class="govuk-list govuk-list--bullet">
                <li>Sole trader</li>
                <li>Partnership</li>
                <li>Limited company</li>
                <li>Charity</li>
                <li>Trust</li>
                <li>Limited liability partnership</li>
                <li>Community interest company</li>
                <li>Limited partnership</li>
                <li>Industrial and provident society</li>
                <li>Co-operative society (Co-Op)</li>
                <li>Community benefit society (BenCom)</li>
                </ul>`
            },
            messageLink: {
              url: 'https://www.gov.uk/topic/farming-food-grants-payments/rural-grants-payments',
              title: 'See other grants you may be eligible for'
            },
            warning: {
              text: 'Other types of business may be supported in future schemes',
              iconFallbackText: 'Warning'
            }
          },
          fundingPriorities: '',
          type: 'single-answer',
          minAnswerCount: 1,
          sidebar: {
            values: [{
              heading: 'Eligibility',
              content: [{
                para: 'Public organisations and local authorities cannot apply for this grant.',
                items: []
              }]
            }]
          },
          validate: [
            {
              type: 'NOT_EMPTY',
              error: 'Select the legal status of the business'
            }
          ],
          answers: [
            {
              key: 'legal-status-A1',
              value: 'Sole trader'
            },
            {
              key: 'legal-status-A2',
              value: 'Partnership'
            },
            {
              key: 'legal-status-A3',
              value: 'Limited company'
            },
            {
              key: 'legal-status-A4',
              value: 'Charity'
            },
            {
              key: 'legal-status-A5',
              value: 'Trust'
            },
            {
              key: 'legal-status-A6',
              value: 'Limited liability partnership'
            },
            {
              key: 'legal-status-A7',
              value: 'Community interest company'
            },
            {
              key: 'legal-status-A8',
              value: 'Limited partnership'
            },
            {
              key: 'legal-status-A9',
              value: 'Industrial and provident society'
            },
            {
              key: 'legal-status-A10',
              value: 'Co-operative society (Co-Op)'
            },
            {
              key: 'legal-status-A11',
              value: 'Community benefit society (BenCom)'
            },
            {
              value: 'divider'
            },
            {
              key: 'legal-status-A12',
              value: 'None of the above',
              notEligible: true
            }
          ],
          errorMessage: {
            text: ''
          },
          yarKey: 'legalStatus'
        },
        {
          key: 'country',
          order: 30,
          title: 'Is the planned project in England?',
          hint: {
            text: 'The site where the work will happen'
          },
          classes: 'govuk-radios--inline govuk-fieldset__legend--l',
          pageTitle: '',
          backUrl: 'legal-status',
          nextUrl: 'planning-permission',
          url: 'country',
          baseUrl: 'country',
          preValidationKeys: ['legalStatus'],
          ineligibleContent: {
            messageContent: 'This grant is only for projects in England.',
            insertText: { text: 'Scotland, Wales and Northern Ireland have other grants available.' },
            messageLink: {
              url: '',
              title: ''
            }
          },
          fundingPriorities: '',
          type: 'single-answer',
          minAnswerCount: 1,
          sidebar: {
            values: [{
              heading: 'Eligibility',
              content: [{
                para: `This grant is only for projects in England.
                
                Scotland, Wales and Northern Ireland have other grants available.`
              }]
            }]
          },
          validate: [
            {
              type: 'NOT_EMPTY',
              error: 'Select yes if the project is in England'
            }
          ],
          answers: [
            {
              key: 'country-A1',
              conditional: true,
              value: 'Yes'
            },
            {
              key: 'country-A2',
              value: 'No',
              notEligible: true
            }
          ],
          yarKey: 'inEngland'
        },
        {
          key: 'planning-permission',
          order: 40,
          title: 'Does the project have planning permission?',
          pageTitle: '',
          url: 'planning-permission',
          baseUrl: 'planning-permission',
          backUrl: 'country',
          nextUrl: 'project-start',
          preValidationKeys: ['inEngland'],
          ineligibleContent: {
            messageContent: 'Any planning permission must be in place by 31 May 2025.',
            messageLink: {
              url: 'https://www.gov.uk/topic/farming-food-grants-payments/rural-grants-payments',
              title: 'See other grants you may be eligible for'
            }
          },
          fundingPriorities: 'Improving Adding Value',
          type: 'single-answer',
          minAnswerCount: 1,
          sidebar: {
            values: [{
              heading: 'Eligibility',
              content: [{
                para: `You must have secured planning permission before you submit a full application.
                
                Any planning permission must be in place by 31 May 2025.`
              }]
            }]
          },
          validate: [
            {
              type: 'NOT_EMPTY',
              error: 'Select when the project will have planning permission'
            }
          ],
          answers: [
            {
              key: 'planning-permission-A1',
              value: 'Not needed'
            },
            {
              key: 'planning-permission-A2',
              value: 'Secured'
            },
            {
              key: 'planning-permission-A3',
              value: 'Should be in place by the time I make my full application',
              redirectUrl: 'planning-required-condition'
            },
            {
              key: 'planning-permission-A4',
              value: 'Will not be in place by the time I make my full application',
              notEligible: true
            }
          ],
          yarKey: 'planningPermission'
        },
        {
          key: 'planning-required-condition',
          order: 91,
          url: 'planning-required-condition',
          backUrl: 'planning-permission',
          nextUrl: 'project-start',
          maybeEligible: true,
          preValidationKeys: ['planningPermission'],
          maybeEligibleContent: {
            messageHeader: 'You may be able to apply for this grant',
            messageContent: 'Any planning permission must be in place by 31 January 2024.'
          }
        },
        {
          key: 'project-start',
          order: 50,
          title: 'Have you already started work on the project?',
          pageTitle: '',
          url: 'project-start',
          baseUrl: 'project-start',
          backUrlObject: {
            dependentQuestionYarKey: 'planningPermission',
            dependentAnswerKeysArray: ['planning-permission-A3'],
            urlOptions: {
              thenUrl: '/adding-value/planning-required-condition',
              elseUrl: '/adding-value/planning-permission'
            }
          },
          nextUrl: 'tenancy',
          preValidationKeys: ['planningPermission'],
          ineligibleContent: {
            messageContent: 'You cannot apply for a grant if you have already started work on the project.',
            insertText: { text: 'Starting the project or committing to any costs (such as placing orders) before you receive a funding agreement invalidates your application.' },
            messageLink: {
              url: 'https://www.gov.uk/government/collections/rural-payments-and-grants',
              title: 'See other grants you may be eligible for'
            }
          },
          fundingPriorities: '',
          type: 'single-answer',
          minAnswerCount: 1,
          sidebar: {
            values: [{
              heading: 'Eligibility',
              content: [{
                para: `
                You will invalidate your application if you start the project or commit to any costs (such as placing orders) before you receive a funding agreement.
                
                Before you start the project, you can:`,
                items: [
                  'get quotes from suppliers',
                  'apply for planning permission (this can take a long time)'
                ]
              }]
            }]
          },
          validate: [
            {
              type: 'NOT_EMPTY',
              error: 'Select the option that applies to your project'
            }
          ],
          answers: [
            {
              key: 'project-start-A1',
              value: 'Yes, preparatory work',
              hint: {
                text: 'For example, quotes from suppliers, applying for planning permission'
              }
            },
            {
              key: 'project-start-A2',
              value: 'Yes, we have begun project work',
              hint: {
                text: 'For example, started construction work, signing contracts, placing orders'
              },
              notEligible: true
            },
            {
              key: 'project-start-A3',
              value: 'No, we have not done any work on this project yet'
            }
          ],
          yarKey: 'projectStart'
        },
        {
          key: 'tenancy',
          order: 60,
          title: 'Is the planned project on land the business owns?',
          hint: {
            text: 'The site where the work will happen'
          },
          pageTitle: '',
          url: 'tenancy',
          baseUrl: 'tenancy',
          backUrl: 'project-start',
          nextUrl: 'smaller-abattoir',
          preValidationKeys: ['projectStart'],
          fundingPriorities: '',
          type: 'single-answer',
          minAnswerCount: 1,
          classes: 'govuk-radios--inline govuk-fieldset__legend--l',
          sidebar: {
            values: [{
              heading: 'Eligibility',
              content: [{
                para: 'If you are a tenant, you have the option to ask your landlord to underwrite your agreement.'
              }]
            }]
          },
          validate: [
            {
              type: 'NOT_EMPTY',
              error: 'Select yes if the planned project is on land the business owns'
            }
          ],
          answers: [
            {
              key: 'tenancy-A1',
              value: 'Yes'
            },
            {
              key: 'tenancy-A2',
              value: 'No',
              redirectUrl: 'project-responsibility'
            }
          ],
          yarKey: 'tenancy'
        },
        {
          key: 'project-responsibility',
          order: 65,
          title: 'Will you take full responsibility for your project?',
          hint: {
            html: `If you are on a short tenancy, you can ask your landlord to underwrite your agreement. This means they will take over your agreement if your tenancy ends. For example, your landlord could pass the agreed 
            project to the new tenant.<br/><br/>
            This approach is optional and we will only ask for details at full application.`
          },
          pageTitle: '',
          url: 'project-responsibility',
          baseUrl: 'project-responsibility',
          backUrl: 'tenancy',
          nextUrl: 'smaller-abattoir',
          // preValidationObject: {
          //   preValidationKeys: ['tenancy'],
          //   preValidationAnswer: ['tenancy-A2'],
          //   preValidationRule: 'AND',
          //   preValidationUrls: ['tenancy']
          // },
          fundingPriorities: '',
          type: 'single-answer',
          minAnswercount: 1,
          sidebar: {
            values: [
              {
                heading: 'Eligibility',
                content: [
                  {
                    para: 'You must complete your project and keep the grant-funded items fit for purpose for 5 years after the date you receive your final grant payment.',
                    items: []
                  }
                ],
              }
            ]
          },
          validate: [
            {
              type: 'NOT_EMPTY',
              error: 'Select yes if you will take full responsibility for your project'
            }
          ],
          answers: [
            {
              key: 'project-responsibility-A1',
              value: 'Yes, I plan to take full responsibility for my project'
            },
            {
              key: 'project-responsibility-A2',
              value: 'No, I plan to ask my landlord to underwrite my agreement'
            }
          ],
          yarKey: 'projectResponsibility'
        },
        {
          key: 'smaller-abattoir',
          order: 67,
          title: 'Do you want to build a new smaller abattoir?',
          pageTitle: '',
          hint: {
            html: `
              <p>A smaller abattoir is a:</p>
              <ul class="govuk-list--bullet">
                <li>red meat abattoir that processes up to 10,000 livestock units each year</li>
                <li>poultry abattoir that slaughters up to 500,000 birds each year</li>
              </ul>`
          },
          url: 'smaller-abattoir',
          baseUrl: 'smaller-abattoir',
          backUrlObject: {
            dependentQuestionYarKey: 'tenancy',
            dependentAnswerKeysArray: ['tenancy-A1'],
            urlOptions: {
              thenUrl: 'tenancy',
              elseUrl: 'project-responsibility'
            }
          },
          nextUrl: 'other-farmers',
          // preValidationObject: {
          //   preValidationKeys: ['tenancy', 'projectResponsibility'],
          //   preValidationAnswer: ['tenancy-A1', 'project-responsibility-A1', 'project-responsibility-A2'],
          //   preValidationRule: 'OR',
          //   preValidationUrls: ['tenancy', 'project-responsibility']
          // },
          type: 'single-answer',
          minAnswerCount: 1,
          classes: 'govuk-radios--inline govuk-fieldset__legend--l',
          validate: [
            {
              type: 'NOT_EMPTY',
              error: 'Select yes if you want to build a new smaller abattoir'
            }
          ],
          answers: [
            {
              key: 'smaller-abattoir-A1',
              value: 'Yes',
              yarKeysReset: ['fruitStorage']
            },
            {
              key: 'smaller-abattoir-A2',
              value: 'No',
              redirectUrl: 'fruit-storage',
              yarKeysReset: ['otherFarmers']
            }
          ],
          yarKey: 'smallerAbattoir'
        },
        {
          key: 'fruit-storage',
          order: 70,
          title: 'Do you want to build new controlled atmosphere storage for top fruit?',
          hint: {
            text: 'Fruit that grows on trees, for example apples, pears, quinces, medlars, plums, peaches, apricots and cherries'
          },
          url: 'fruit-storage',
          baseUrl: 'fruit-storage',
          backUrl: 'smaller-abattoir',
          nextUrl: 'solar-PV-system',
          preValidationKeys: [],
          type: 'single-answer',
          minAnswerCount: 1,
          classes: 'govuk-radios--inline govuk-fieldset__legend--l',
          validate: [
            {
              type: 'NOT_EMPTY',
              error: 'Select yes if you want to build new controlled atmosphere storage for top fruit'
            }
          ],
          answers: [
            {
              key: 'fruit-storage-A1',
              value: 'Yes',
              yarKeysReset: ['projectItems']
            },
            {
              key: 'fruit-storage-A2',
              value: 'No',
              redirectUrl: 'project-items'
            }
          ],
          yarKey: 'fruitStorage'
        },
        
        {
          key: 'other-farmers',
          order: 68,
          title: 'Will this abattoir provide services to other farmers?',
          pageTitle: '',
          hint: {
            text: `For example, farmers pay you to slaughter their livestock`
          },
          url: 'other-farmers',
          baseUrl: 'other-farmers',
          backUrl: 'smaller-abattoir',
          nextUrl: 'project-items',
          // preValidationObject: {
          //   preValidationKeys: ['smallerAbattoir'],
          //   preValidationAnswer: ['smaller-abattoir-A1'],
          //   preValidationRule: 'AND',
          //   preValidationUrls: ['smaller-abattoir']
          // }, 
          eliminationAnswerKeys: '',
          fundingPriorities: '',
          type: 'single-answer',
          minAnswerCount: 1,
          classes: 'govuk-radios--inline govuk-fieldset__legend--l',
          ineligibleContent: {
            messageContent: 'You must provide some abattoir services to other farmers if you are building a new smaller abattoir with this grant.',
            messageLink: {
              url: 'https://www.gov.uk/topic/farming-food-grants-payments/rural-grants-payments',
              title: 'See other grants you may be eligible for'
            }
          },
          sidebar: {
            values: [{
              heading: 'Eligibility',
              content: [{
                para: 'You must provide some abattoir services to other farmers.',
                items: []
              }]
            }]
          },
          validate: [
            {
              type: 'NOT_EMPTY',
              error: 'Select yes if this abattoir will provide services to other farmers'
            }
          ],
          answers: [
            {
              key: 'other-farmers-A1',
              value: 'Yes'
            },
            {
              key: 'other-farmers-A2',
              value: 'No',
              notEligible: true
            }
          ],
          yarKey: 'otherFarmers'
        },
        {
          key: 'project-items',
          order: 80,
          title: 'What eligible items does your project need?',
          pageTitle: '',
          hint: {
            html: `
            Storage facilities will only be funded as part of a bigger project and cannot be more than ${GRANT_PERCENTAGE}% of the total grant funding.<br/><br/>
            Select all the items your project needs
          `
          },
          url: 'project-items',
          baseUrl: 'project-items',
          backUrlObject: {
            dependentQuestionYarKey: 'smallerAbattoir',
            dependentAnswerKeysArray: ['smaller-abattoir-A1'],
            urlOptions: {
              thenUrl: 'other-farmers',
              elseUrl: 'fruit-storage'
            }
          },
          nextUrl: 'storage',
          fundingPriorities: '',
          //To add otherFarmers later as well 
          preValidationKeys: ['projectStart', 'tenancy', 'smallerAbattoir'],
          type: 'multi-answer',
          minAnswerCount: 1,
          validate: [
            {
              type: 'NOT_EMPTY',
              error: 'Select all the items your project needs'
            }
          ],
          ineligibleContent: {
            messageContent: `
            This grant is for:
            <ul class="govuk-list govuk-list--bullet">
              <li>constructing or improving buildings for processing</li>
              <li>processing equipment or machinery</li>
              <li>retail facilities</li>
            </ul>
            `,
            messageLink: {
              url: 'https://www.gov.uk/topic/farming-food-grants-payments/rural-grants-payments',
              title: 'See other grants you may be eligible for'
            }
          },
          answers: [
            {
              key: 'project-items-A1',
              value: 'Constructing or improving buildings for processing',
              hint: {
                text: 'For example, a new building for cheese making, extending an existing building to install a new meat-cutting and packing line'
              }
            },
            {
              key: 'project-items-A2',
              value: 'Processing equipment or machinery',
              hint: {
                text: 'For example, equipment and machinery for pasteurising and bottling milk, a meat cutting and packing line or vegetable washing and packing'
              }
            },
            {
              key: 'project-items-A3',
              value: 'Retail facilities',
              hint: {
                text: 'For example, shops or display cabinets'
              }
            },
            {
              value: 'divider'
            },
            {
              key: 'project-items-A4',
              value: 'None of the above',
              notEligible: true
            }
          ],
          yarKey: 'projectItems'
        },
        {
          key: 'storage',
          order: 81,
          title: 'Does your project also need storage facilities?',
          pageTitle: '',
          url: 'storage',
          baseUrl: 'storage',
          backUrl: 'project-items',
          nextUrl: 'solar-PV-system',
          preValidationKeys: ['projectItems'],
          hint: {
            text: 'For example, cold stores or controlled atmosphere storage'
          },
          warning: {
            text: `Storage facilities cannot be more than ${GRANT_PERCENTAGE}% of the total grant funding.`,
            iconFallbackText: 'Warning'
          },
          fundingPriorities: '',
          type: 'single-answer',
          minAnswerCount: 1,
          validate: [
            {
              type: 'NOT_EMPTY',
              error: 'Select yes if you will need storage facilities'
            }
          ],
          answers: [
            {
              key: 'storage-A1',
              value: 'Yes, we will need storage facilities',
              sidebarFormattedValue: 'Storage facilities'
            },
            {
              key: 'storage-A2',
              value: 'No, we do not need storage facilities'
            }
          ],
          yarKey: 'storage'
        },
        {
          key: 'solar-PV-system',
          order: 250,
          title: 'Will you buy a solar PV system with this grant?',
          url: 'solar-PV-system',
          baseUrl: 'solar-PV-system',
          backUrlObject: {
            dependentQuestionYarKey: 'fruitStorage',
            dependentAnswerKeysArray: ['fruit-storage-A1'],
            urlOptions: {
              thenUrl: 'fruit-storage',
              elseUrl: 'storage',
              nonDependentUrl: 'storage'
            }
          },
          nextUrl: 'project-cost',
          // preValidationKeys: ['storage'],
          hint: {
            html: `You have the option to buy and install a solar PV system with this grant.</br></br>
            The solar PV panels must be installed on the roof of an existing or new building related to your project.</br></br>
            You cannot buy a solar PV system with this grant if:
            <ul class="govuk-list govuk-list--bullet">
              <li>the building’s roof only faces north or is heavily shaded</li>
              <li>you are only buying portable items</li>
            </ul>`,
          },
          sidebar: {
            values: [{
              heading: 'Eligibility',
              content: [{
                para: 'You do not have to buy and install a solar PV system to be eligible for this grant.',
              }]
            }]
          },
          type: 'single-answer',
          minAnswerCount: 1,
          classes: 'govuk-radios--inline govuk-fieldset__legend--l',
          validate: [
            {
              type: 'NOT_EMPTY',
              error: 'Select yes if you will buy a solar PV system with this grant'
            }
          ],
          answers: [
            {
              key: 'solar-PV-system-A1',
              value: 'Yes'
            },
            {
              key: 'solar-PV-system-A2',
              value: 'No'
            }
          ],
          yarKey: 'solarPVSystem'
        },
        {
          key: 'project-cost',
          order: 90,
          pageTitle: '',
          url: 'project-cost',
          baseUrl: 'project-cost',
          backUrl: 'solar-PV-system',
          dependantNextUrl: {
            dependentQuestionYarKey: 'solarPVSystem',
            dependentAnswerKeysArray: ['solar-PV-system-A1'],
            urlOptions: {
              thenUrl: 'solar-PV-cost',
              elseUrl: 'potential-amount'
            }
          },
          // preValidationKeys: ['storage'],
          classes: 'govuk-input--width-10',
          id: 'projectCost',
          name: 'projectCost',
          prefix: { text: '£' },
          type: 'input',
          grantInfo: {
            info: 'projectCost',
            minGrant: MIN_GRANT,
            maxGrant: MAX_GRANT,
            grantPercentage: GRANT_PERCENTAGE,
            cappedGrant: true
          },
          label: {
            text: 'What is the total estimated cost of the items?',
            classes: 'govuk-label--l',
            isPageHeading: true
          },
          hint: {
            htmlSolar: `
            Do not include the solar PV system costs 
            or VAT<br/><br/>
            Enter cost of the items, for example 695,000`,
            htmlNoSolar: `
            Do not include VAT<br/><br/>
            Enter cost of the items, for example 695,000`
          },
          sidebar: {
            values: [{
              heading: 'Selected items',
              content: [{
                items: []
              }]
            }],
            dependentQuestionKeys: ['projectItems', 'fruitStorage', 'storage']
          },
          eliminationAnswerKeys: '',
          ineligibleContent: {
            messageContent: `The minimum grant you can apply for is £20,000 (${GRANT_PERCENTAGE}% of £40,000).`,
            messageLink: {
              url: 'https://www.gov.uk/topic/farming-food-grants-payments/rural-grants-payments',
              title: 'See other grants you may be eligible for'
            }
          },
          validate: [
            {
              type: 'NOT_EMPTY',
              error: 'Enter the estimated cost of the items'
            },
            {
              type: 'REGEX',
              regex: /^[0-9,]+$/,
              error: 'Enter a whole number with a maximum of 7 digits'
            },
            {
              type: 'REGEX',
              regex: /^(0*[1-9][0-9]*(,\d{3})*)$/,
              error: 'Enter a whole number with a maximum of 7 digits'
            },
            {
              type: 'MIN_MAX',
              min: 1,
              max: 9999999,
              error: 'Enter a whole number with a maximum of 7 digits'
            }
          ],
          answers: [],
          yarKey: 'projectCost'
        },
        {
          key: 'potential-amount',
          order: 105,
          url: 'potential-amount',
          backUrl: 'project-cost',
          nextUrl: 'remaining-costs',
          preValidationKeys: ['projectCost'],
          maybeEligible: true,
          maybeEligibleContent: {
            messageHeader: 'Potential grant funding',
            messageContent: 'You may be able to apply for a grant of up to £{{_calculatedGrant_}}, based on the estimated cost of £{{_projectCost_}}.',
            warning: {
              text: 'There’s no guarantee the project will receive a grant.',
              iconFallbackText: 'Warning'
            }
          }
        },
        {
          key: 'solar-PV-cost',
          order: 110,
          classes: 'govuk-input--width-10',
          url: 'solar-PV-cost',
          baseUrl: 'solar-PV-cost',
          backUrl: 'project-cost',
          nextUrl: 'potential-amount-solar',
          // preValidationKeys: ['projectCost'],
          type: 'input',
          prefix: {
            text: '£'
          },
          grantInfo: {
            minGrant: 0,
            maxGrant: 100000,
            grantPercentage: GRANT_PERCENTAGE_SOLAR,
            cappedGrant: true
          },
          id: 'solarPVCost',
          label: {
            text: 'What is the estimated cost of buying and installing the solar PV system?',
            classes: 'govuk-label--l',
            isPageHeading: true,
            for: 'solarPVCost'
          },
          hint: {
            html: `
                  <p>Enter solar PV system costs, for example 135,000</p>`
          },
          validate: [
            {
              type: 'NOT_EMPTY',
              error: 'Enter the estimated cost of buying and installing the solar PV system'
            },
            {
              type: 'REGEX',
              regex: /^[0-9,]+$/,
              error: 'Enter a whole number with a maximum of 7 digits'
            },
            {
              type: 'REGEX',
              regex: /^(0*[1-9][0-9]*(,\d{3})*)$/,
              error: 'Enter a whole number with a maximum of 7 digits'
            },
            {
              type: 'MIN_MAX',
              min: 1,
              max: 9999999,
              error: 'Enter a whole number with a maximum of 7 digits'
            }
          ],
          yarKey: 'solarPVCost'
        },
        {
          key: 'potential-amount-solar',
          order: 105,
          url: 'potential-amount-solar',
          backUrl: 'solar-PV-cost',
          nextUrl: 'remaining-costs',
          preValidationKeys: ['solarPVCost'],
          maybeEligible: true,
          maybeEligibleContent: {
            messageHeader: 'Potential grant funding',
            messageContent: `You may be able to apply for a grant of up to £{{_totalCalculatedGrant_}}, based on the total estimated cost of £{{_totalProjectCost_}}.
            <div class="govuk-list">
              <p class="govuk-body">This grant amount combines:</p>
              <ul class="govuk-list--bullet">
                <li>£{{_calculatedGrant_}} for building costs (${GRANT_PERCENTAGE}% of £{{_projectCost_}})</li>
                <li>£{{_calculatedSolarGrant_}} for solar PV system costs (${GRANT_PERCENTAGE_SOLAR}% of £{{_solarPVCost_}})</li>
              </ul>
            </div>
          `,
            warning: {
              text: 'There’s no guarantee the project will receive a grant.',
              iconFallbackText: 'Warning'
            }
          }
        },
        {
          key: 'potential-amount-solar-details',
          order: 105,
          url: 'potential-amount-solar-details',
          backUrl: 'solar-PV-cost',
          nextUrl: 'remaining-costs',
          preValidationKeys: ['solarPVCost'],
          maybeEligible: true,
          maybeEligibleContent: {
            messageHeader: 'Potential grant funding',
            messageContent: `You may be able to apply for a grant of up to £{{_totalCalculatedGrant_}}, based on the total estimated cost of £{{_totalProjectCost_}}.
            <div class="govuk-list">
              <p class="govuk-body">This grant amount combines:</p>
              <ul class="govuk-list--bullet">
                <li>£{{_calculatedGrant_}} for project costs (${GRANT_PERCENTAGE}% of £{{_projectCost_}})</li>
                <li>£{{_cappedCalculatedSolarGrant_}} for solar PV system costs</li>
              </ul>
            </div>
          `,
            detailsText: {
              summaryText: 'How is the solar PV system grant funding calculated?',
              html: `The grant funding for a solar PV system cannot be more 
            than the grant funding for your project costs.<br/><br/>
            As your project grant funding is £{{_calculatedGrant_}}, you can apply for £{{_cappedCalculatedSolarGrant_}} for solar PV system costs.`
            },
            warning: {
              text: 'There’s no guarantee the project will receive a grant.',
              iconFallbackText: 'Warning'
            }
          }
        },
        {
          key: 'remaining-costs',
          order: 110,
          title: 'Can you pay the remaining costs of £{{_remainingCost_}}?',
          pageTitle: '',
          url: 'remaining-costs',
          baseUrl: 'remaining-costs',
          backUrl: 'potential-amount',
          dependantNextUrl: {
            dependentQuestionYarKey: 'fruitStorage', 
            dependentAnswerKeysArray: ['fruit-storage-A1'],
            urlOptions: {
              thenUrl: 'mechanisation',
              elseUrl: 'produce-processed',
              nonDependentUrl: 'produce-processed'
            }   
          },
          eliminationAnswerKeys: '',
          ineligibleContent: {
            messageContent: `You cannot use public money (for example, grant funding from government or local authorities) towards the project costs.
            <br/><br/>You also cannot use money from a producer organisation under the Fresh Fruit and Vegetable Aid Scheme.`,
            insertText: {
              html: `For example, you can use:
              <ul class="govuk-list--bullet">
                <li>loans</li>
                <li>overdrafts</li>
                <li>delinked payments</li>
              </ul>`
            },
            messageLink: {
              url: 'https://www.gov.uk/government/collections/rural-payments-and-grants',
              title: 'See other grants you may be eligible for'
            }
          },
          fundingPriorities: '',
          type: 'single-answer',
          classes: 'govuk-radios--inline govuk-fieldset__legend--l',
          minAnswerCount: 1,
          sidebar: {
            values: [
              {
                heading: 'Eligibility',
                content: [{
                  para: `You cannot use public money (for example, grant funding from government or local authorities) towards the project costs.
                  
                  You also cannot use money from a producer organisation under the Fresh Fruit and Vegetable Aid Scheme.
                  
                  For example, you can use:`,
                  items: [
                    'loans',
                    'overdrafts',
                    'delinked payments'
                  ]
                }]
              }
            ]
          },
          validate: [
            {
              type: 'NOT_EMPTY',
              error: 'Select yes if you can pay the remaining costs'
            }
          ],
          answers: [
            {
              key: 'remaining-costs-A1',
              value: 'Yes'

            },
            {
              key: 'remaining-costs-A2',
              value: 'No',
              notEligible: true
            }
          ],
          yarKey: 'canPayRemainingCost'
        },
        {
          key: 'products-processed',
          order: 120,
          title: 'What type of produce is being processed?',
          pageTitle: '',
          hint: {
            text: 'Select one option'
          },
          url: 'produce-processed',
          baseUrl: 'produce-processed',
          backUrl: 'remaining-costs',
          nextUrl: 'how-adding-value',
          preValidationKeys: ['canPayRemainingCost'],
          score: {
            isScore: true,
            isDisplay: true,
            title: 'Produce processed'
          },
          ineligibleContent: {
            messageContent: '',
            insertText: { text: '' },
            messageLink: {
              url: '',
              title: ''
            }
          },
          sidebar: {
            values: [{
              heading: 'Funding priorities',
              content: [{
                para: 'RPA wants to fund projects that create and expand processing capacity to provide more English-grown food and products for consumers to buy.',
                items: []
              }]
            }]
          },
          fundingPriorities: 'Create and expand processing capacity to provide more English-grown food for consumers to buy',
          type: 'single-answer',
          classes: 'govuk-fieldset__legend--l',
          minAnswerCount: 1,
          validate: [
            {
              type: 'NOT_EMPTY',
              error: 'Select what type of produce is being processed'
            }
          ],
          answers: [
            {
              key: 'products-processed-A1',
              value: 'Arable produce',
              hint: {
                text: 'For example, crushing of oilseeds, rolling or flaking of grains as food ingredients'
              }
            },
            {
              key: 'products-processed-A2',
              value: 'Wild venison meat produce',
              hint: {
                text: 'For example, culling, processing and packing wild venison meat'
              }
            },
            {
              key: 'products-processed-A3',
              value: 'Dairy or meat produce',
              hint: {
                text: 'For example, processing and bottling milk or slaughtering, cutting, processing and packing meat'
              }
            },
            {
              key: 'products-processed-A4',
              value: 'Fibre produce',
              hint: {
                text: 'For example, processing animal hides and leather, processing fibres such as flax and hemp'
              }
            },
            {
              key: 'products-processed-A5',
              value: 'Fodder produce',
              hint: {
                text: 'For example, processing and repacking hay and straw for specialist markets or retail sale'
              }
            },
            {
              key: 'products-processed-A6',
              value: 'Horticultural produce',
              hint: {
                text: 'For example, grading and packing of soft fruit, washing and packing vegetables, packing salad crops'
              }
            },
            {
              key: 'products-processed-A7',
              value: 'Non-edible produce',
              hint: {
                text: 'For example, processing and packing ornamental flowers and bulbs after harvesting'
              }
            }
          ],
          yarKey: 'productsProcessed'
        },
        {
          key: 'how-adding-value',
          order: 130,
          title: 'How will this project add value to the produce?',
          pageTitle: '',
          url: 'how-adding-value',
          baseUrl: 'how-adding-value',
          backUrl: 'produce-processed',
          nextUrl: 'project-impact',
          score: {
            isScore: true,
            isDisplay: true,
            title: 'Adding value'
          },
          hint: {
            text: 'Select the main option that applies'
          },
          eliminationAnswerKeys: '',
          preValidationKeys: ['productsProcessed'],
          ineligibleContent: {
            messageContent: '',
            insertText: { text: '' },
            messageLink: {
              url: '',
              title: ''
            }
          },
          sidebar: {
            values: [{
              heading: 'Funding priorities',
              content: [{
                para: 'RPA wants to fund projects that:',
                items: [
                  'improve processing and supply chains',
                  'grow your business']
              }]
            }]
          },
          fundingPriorities: 'Improve processing and supply chains<br/><br/>Grow your business',
          type: 'single-answer',
          classes: 'govuk-radios--inline govuk-fieldset__legend--l',
          minAnswerCount: 1,
          validate: [
            {
              type: 'NOT_EMPTY',
              error: 'Select how this project will add value to the produce'
            }
          ],
          answers: [
            {
              key: 'how-adding-value-A1',
              value: 'Introducing a new product to your farm',
              hint: {
                text: 'For example, slaughtering, cut and packed meat, yogurt to cheese, brewing or distilling'
              }
            },
            {
              key: 'how-adding-value-A2',
              value: 'Grading or sorting produce',
              hint: {
                text: 'For example, washing and grading vegetables, egg grading, optical grading of top fruit'
              }
            },
            {
              key: 'how-adding-value-A3',
              value: 'Packing produce',
              hint: {
                text: 'For example, packing top fruit, bagging vegetables, bottling wine'
              }
            },
            {
              key: 'how-adding-value-A5',
              value: 'New retail facility to sell direct to consumers'
            }
          ],
          yarKey: 'howAddingValue'
        },
        {
          key: 'project-impact',
          order: 140,
          title: 'What impact will this project have?',
          pageTitle: '',
          url: 'project-impact',
          baseUrl: 'project-impact',
          backUrl: 'how-adding-value',
          nextUrl: 'mechanisation',
          score: {
            isScore: true,
            isDisplay: true,
            title: 'Project impact'
          },
          hint: {
            html: `
            <p>Select all that apply</p>`
          },
          eliminationAnswerKeys: '',
          preValidationKeys: ['howAddingValue'],
          ineligibleContent: {},
          ga: [
            { dimension: 'cm2', value: { type: 'journey-time' } }
          ],
          sidebar: {
            values: [{
              heading: 'Funding priorities',
              content: [{
                para: 'RPA wants to fund projects that:',
                items: ['improve processing and supply chains',
                  'grow your business']
              }]
            }]
          },
          fundingPriorities: 'Improve processing and supply chains<br/><br/>Grow your business',
          type: 'multi-answer',
          minAnswerCount: 1,
          validate: [
            {
              type: 'NOT_EMPTY',
              error: 'Select what impact this project will have'
            },
            {
              type: 'COMBINATION_ANSWER',
              error: '',
              combinationErrorsList: [['project-impact-A2', 'project-impact-A1'], ['project-impact-A3', 'project-impact-A1'],
              ['project-impact-A3', 'project-impact-A2', 'project-impact-A1'], ['project-impact-A2', 'project-impact-A4', 'project-impact-A1'],
              ['project-impact-A3', 'project-impact-A4', 'project-impact-A1'], ['project-impact-A3', 'project-impact-A2', 'project-impact-A4', 'project-impact-A1']],
              combinationObject: {
                questionKey: 'project-impact',
                combinationAnswerKeys: ['project-impact-A1', 'project-impact-A4']
              }
            }
          ],
          answers: [
            {
              key: 'project-impact-A3',
              value: 'Increasing range of added-value products'
            },
            {
              key: 'project-impact-A2',
              value: 'Increasing volume of added-value products'
            },
            {
              key: 'project-impact-A4',
              value: 'Allow selling direct to consumer',
              hint: {
                text: 'For example, retail and internet sales'
              }
            },
            {
              key: 'project-impact-A1',
              value: 'Starting to make added-value products for the first time',
              hint: {
                text: 'This only applies if you do not currently make added-value products'
              }
            }
          ],
          yarKey: 'projectImpact'
        },
        {
          key: 'mechanisation',
          order: 132,
          title: 'Will this project use any mechanisation instead of manual labour?',
          pageTitle: '',
          hint: {
            text: 'For example, a fruit grading and sorting machine that does the work of 2 farm labourers'
          },
          url: 'mechanisation',
          baseUrl: 'mechanisation',
          backUrlObject: {
            dependentQuestionYarKey: 'fruitStorage',
            dependentAnswerKeysArray: ['fruit-storage-A1'],
            urlOptions: {
              thenUrl: 'remaining-costs',
              elseUrl: 'project-impact',
              nonDependentUrl: 'project-impact'
            }
          },
          nextUrl: 'future-customers',
          // preValidationKeys: ['projectImpact', 'canPayRemainingCost'],
          // preValidationObject: {
          //   preValidationKeys: ['projectImpact', 'canPayRemainingCost'],
          //   preValidationAnswer: ['project-impact-A1', 'project-impact-A2', 'project-impact-A3', 'project-impact-A4', 'remaining-costs-A1'],
          //   preValidationRule: 'OR',
          //   preValidationUrls: ['project-impact', 'remaining-costs']
          // },
          score: {
            isScore: true,
            isDisplay: true,
            title: 'Mechanisation'
          },
          eliminationAnswerKeys: '',
          fundingPriorities: '',
          type: 'single-answer',
          classes: 'govuk-radios--inline govuk-fieldset__legend--l',
          minAnswerCount: 1,
          sidebar: {
            values: [
              {
                heading: 'Funding priorities',
                content: [{
                  para: 'RPA wants to fund projects that use mechanisation instead of manual labour due to the shortage of workers.',
                  items: []
                }]
              }
            ]
          },
          validate: [
            {
              type: 'NOT_EMPTY',
              error: 'Select yes if this project will use any mechanisation instead of manual labour'
            }
          ],
          answers: [
            {
              key: 'mechanisation-A1',
              value: 'Yes',
              redirectUrl: 'manual-labour-amount'

            },
            {
              key: 'mechanisation-A2',
              value: 'No',
              yarKeysReset: ['manualLabour']
            }
          ],
          yarKey: 'mechanisation'
        },
        {
          key: 'manual-labour-amount',
          order: 150,
          title: 'How much manual labour will the mechanisation be equal to?',
          pageTitle: '',
          hint: {
            text: 'Based on your current staff numbers'
          },
          url: 'manual-labour-amount',
          baseUrl: 'manual-labour-amount',
          backUrl: 'mechanisation',
          nextUrl: 'future-customers',
          score: {
            isScore: true,
            isDisplay: true,
            title: 'Manual Labour'
          },
          eliminationAnswerKeys: '',
          preValidationKeys: ['mechanisation'],
          ineligibleContent: {},
          ga: [
            { dimension: 'cm2', value: { type: 'journey-time' } }
          ],
          sidebar: {
            values: [{
              heading: 'Funding priorities',
              content: [{
                para: 'RPA wants to fund projects that use mechanisation of manual labour due to the shortage of workers.',
                items: []
              }]
            }]
          },
          fundingPriorities: 'RPA wants to fund projects that use mechanisation of manual labour due to the shortage of workers.',
          type: 'single-answer',
          minAnswerCount: 1,
          validate: [
            {
              type: 'NOT_EMPTY',
              error: 'Select how much manual labour the mechanisation will be equal to'
            }
          ],
          answers: [
            {
              key: 'manual-labour-amount-A1',
              value: 'Up to 5% of workforce'
            },
            {
              key: 'manual-labour-amount-A2',
              value: 'Between 5% and 10%'
            },
            {
              key: 'manual-labour-amount-A3',
              value: 'More than 10%'
            }
          ],
          yarKey: 'manualLabour'
        },
        {
          key: 'future-customers',
          order: 160,
          title: 'Who will your new customers be after this project?',
          pageTitle: '',
          url: 'future-customers',
          baseUrl: 'future-customers',
          backUrlObject: {
            dependentQuestionYarKey: 'mechanisation',
            dependentAnswerKeysArray: ['mechanisation-A1'],
            urlOptions: {
              thenUrl: 'manual-labour-amount',
              elseUrl: 'mechanisation'
            }
          },
          nextUrl: 'collaboration',
          preValidationKeys: ['mechanisation'],
          eliminationAnswerKeys: '',
          score: {
            isScore: true,
            isDisplay: true,
            title: 'New customers'
          },
          hint: {
            html: `For example, you will now sell directly to retailers 
                  <br/><br/>Select all that apply`
          },
          ineligibleContent: {
            messageContent: '',
            insertText: { text: '' },
            messageLink: {
              url: '',
              title: ''
            }
          },
          sidebar: {
            values: [{
              heading: 'Funding priorities',
              content: [{
                para: 'RPA wants to fund projects that:',
                items: ['improve processing and supply chains',
                  'grow your business']
              }]
            }]
          },
          fundingPriorities: 'Improve processing and supply chains<br/><br/>Grow your business',
          type: 'multi-answer',
          minAnswerCount: 1,
          validate: [
            {
              type: 'NOT_EMPTY',
              error: 'Select who your new customers will be after this project'
            },
            {
              type: 'STANDALONE_ANSWER',
              error: 'You cannot select that combination of options',
              standaloneObject: {
                questionKey: 'future-customers',
                answerKey: 'future-customers-A5'
              }
            }
          ],
          answers: [
            {
              key: 'future-customers-A1',
              value: 'Processors'
            },
            {
              key: 'future-customers-A2',
              value: 'Wholesalers'
            },
            {
              key: 'future-customers-A3',
              value: 'Retailers'
            },
            {
              key: 'future-customers-A4',
              value: 'Selling direct to consumers'
            },
            {
              value: 'divider'
            },
            {
              key: 'future-customers-A5',
              value: 'No change'
            }
          ],
          yarKey: 'futureCustomers'
        },
        {
          key: 'collaboration',
          order: 170,
          title: 'Will you work in partnership or collaborate with other farmers or producers?',
          hint: {
            text: 'For example, in a formal partnership or contract supply arrangement for raw materials'
          },
          classes: 'govuk-radios--inline govuk-fieldset__legend--l',
          pageTitle: '',
          url: 'collaboration',
          baseUrl: 'collaboration',
          backUrl: 'future-customers',
          nextUrl: 'environmental-impact',
          score: {
            isScore: true,
            isDisplay: true,
            title: 'Collaboration'
          },
          eliminationAnswerKeys: '',
          preValidationKeys: ['futureCustomers'],
          ineligibleContent: {
            messageContent: '',
            insertText: { text: '' },
            messageLink: {
              url: '',
              title: ''
            }
          },
          sidebar: {
            values: [{
              heading: 'Funding priorities',
              content: [{
                para: 'RPA wants to fund projects that:',
                items: ['improve processing and supply chains', 'encourage collaboration and partnerships']
              }]
            }]
          },
          fundingPriorities: 'Improve processing and supply chains<br/><br/>Encourage collaboration and partnerships',
          type: 'single-answer',
          minAnswerCount: 1,
          validate: [
            {
              type: 'NOT_EMPTY',
              error: 'Select yes if you will work in partnership or collaborate with other farmers or producers'
            }
          ],
          answers: [
            {
              key: 'collaboration-A1',
              value: 'Yes'
            },
            {
              key: 'collaboration-A2',
              value: 'No'
            }
          ],
          yarKey: 'collaboration'
        },
        {
          key: 'environmental-impact',
          order: 200,
          title: 'How will this project improve the environment?',
          pageTitle: '',
          url: 'environmental-impact',
          baseUrl: 'environmental-impact',
          backUrl: 'collaboration',
          nextUrl: 'score',
          score: {
            isScore: true,
            isDisplay: true,
            title: 'Environmental impact'
          },
          hint: {
            text: 'Select all that apply'
          },
          eliminationAnswerKeys: '',
          preValidationKeys: ['collaboration'],
          ineligibleContent: {
            messageContent: '',
            insertText: { text: '' },
            messageLink: {
              url: '',
              title: ''
            }
          },
          sidebar: {
            values: [{
              heading: 'Funding priorities',
              content: [{
                para: 'RPA wants to fund projects that improve the environment.',
                items: []
              }]
            }]
          },
          fundingPriorities: 'Improve the environment',
          type: 'multi-answer',
          minAnswerCount: 1,
          validate: [
            {
              type: 'NOT_EMPTY',
              error: 'Select how this project will improve the environment'
            },
            {
              type: 'STANDALONE_ANSWER',
              error: 'You cannot select that combination of options',
              standaloneObject: {
                questionKey: 'environmental-impact',
                answerKey: 'environmental-impact-A7'
              }
            }
          ],
          answers: [
            {
              key: 'environmental-impact-A1',
              value: 'Renewable energy',
              hint: {
                text: 'For example, majority of energy for the project is generated on site'
              }
            },
            {
              key: 'environmental-impact-A2',
              value: 'Energy efficiency',
              hint: {
                text: 'For example, using variable speed motors or heat exchangers'
              }
            },
            {
              key: 'environmental-impact-A3',
              value: 'Water efficiency',
              hint: {
                text: 'For example, majority of water for the project is harvested or recycled on site'
              }
            },
            {
              key: 'environmental-impact-A4',
              value: 'Waste efficiency',
              hint: {
                text: 'For example, majority of the project waste is recycled or reused instead of going to landfill'
              }
            },
            {
              key: 'environmental-impact-A5',
              value: 'Sustainable packaging measures',
              hint: {
                text: 'For example, removing unnecessary packaging, replacing plastic packaging'
              }
            },
            {
              key: 'environmental-impact-A6',
              value: 'Reduce harmful emissions or pollutants',
              hint: {
                text: 'For example, reducing pollutants in waste water'
              }
            },
            {
              value: 'divider'
            },
            {
              key: 'environmental-impact-A7',
              value: 'My project will not improve the environment'
            }
          ],
          yarKey: 'environmentalImpact'
        },

        /// ////// ***************** After Score  ************************************/////////////////////
        {
          key: 'business-details',
          order: 180,
          title: 'Business details',
          pageTitle: 'Crops',
          url: 'business-details',
          baseUrl: 'business-details',
          backUrl: 'score',
          nextUrl: 'applying',
          preValidationKeys: ['current-score'],
          ga: [
            { dimension: 'cd2', value: { type: 'score' } },
            { dimension: 'cm1', value: { type: 'journey-time' } }
          ],
          eliminationAnswerKeys: '',
          ineligibleContent: {},
          fundingPriorities: '',
          type: 'multi-input',
          minAnswerCount: '',
          maxAnswerCount: '',
          allFields: [
            {
              yarKey: 'projectName',
              type: 'text',
              classes: 'govuk-input--width-20',
              label: {
                text: 'Project name',
                classes: 'govuk-label'
              },
              hint: {
                text: 'For example, Browns Hill Farm vegetable washing and sorting project'
              },
              validate: [
                {
                  type: 'NOT_EMPTY',
                  error: 'Enter a project name'
                },
                {
                  type: 'MIN_MAX_CHARS',
                  min: 0,
                  max: 30,
                  error: 'Project name must be 30 characters or fewer'
                },
                {
                  type: 'REGEX',
                  regex: NAME_ONLY_REGEX,
                  error: 'Project name must only include letters, hyphens, spaces and apostrophes'
                }
              ]
            },
            {
              yarKey: 'businessName',
              type: 'text',
              classes: 'govuk-input--width-20',
              label: {
                text: 'Business name',
                classes: 'govuk-label'
              },
              hint: {
                text: 'If you’re registered on the Rural Payments system, enter business name as registered'
              },
              validate: [
                {
                  type: 'NOT_EMPTY',
                  error: 'Enter a business name'
                },
                {
                  type: 'MIN_MAX_CHARS',
                  min: 0,
                  max: 30,
                  error: 'Business name must be 30 characters or fewer'
                },
                {
                  type: 'REGEX',
                  regex: NAME_ONLY_REGEX,
                  error: 'Business name must only include letters, hyphens, spaces and apostrophes'
                }
              ]
            },
            {
              yarKey: 'numberEmployees',
              type: 'number',
              classes: 'govuk-input--width-10',
              label: {
                text: 'Number of employees',
                classes: 'govuk-label'
              },
              hint: {
                text: 'Full-time employees, including the owner'
              },
              validate: [
                {
                  type: 'NOT_EMPTY',
                  error: 'Enter the number of employees'
                },
                {
                  type: 'REGEX',
                  regex: WHOLE_NUMBER_REGEX,
                  error: 'Number of employees must be a whole number, like 305'
                },
                {
                  type: 'MIN_MAX',
                  min: 1,
                  max: 9999999,
                  error: 'Number must be between 1-9999999'
                }
              ]
            },
            {
              yarKey: 'businessTurnover',
              type: 'number',
              classes: 'govuk-input--width-10',
              prefix: {
                text: '£'
              },
              label: {
                text: 'Annual Business turnover (£)',
                classes: 'govuk-label'
              },
              validate: [
                {
                  type: 'NOT_EMPTY',
                  error: 'Enter the business turnover'
                },
                {
                  type: 'REGEX',
                  regex: WHOLE_NUMBER_REGEX,
                  error: 'Enter your annual business turnover, in pounds'
                },
                {
                  type: 'MIN_MAX',
                  min: 0,
                  max: 999999999,
                  error: 'Number must be between 1-999999999'
                }
              ]
            },
            {
              yarKey: 'sbi',
              type: 'text',
              title: 'Single Business Identifier (SBI) (Optional)',
              classes: 'govuk-input govuk-input--width-10',
              label: {
                text: 'Single Business Identifier (SBI) (Optional)',
                classes: 'govuk-label'
              },
              hint: {
                html: 'If you do not have an SBI, you will need to get one for full application'
              },
              validate: [
                {
                  type: 'REGEX',
                  regex: SBI_REGEX,
                  error: 'SBI number must have 9 characters, like 011115678'
                }

              ],
              answers: []
            }
          ],
          yarKey: 'businessDetails'
        },
        {
          key: 'applying',
          order: 190,
          title: 'Who is applying for this grant?',
          pageTitle: '',
          url: 'applying',
          baseUrl: 'applying',
          backUrl: 'business-details',
          preValidationKeys: ['businessDetails'],
          eliminationAnswerKeys: '',
          fundingPriorities: '',
          type: 'single-answer',
          classes: 'govuk-radios govuk-fieldset__legend--l',
          minAnswerCount: 1,
          validate: [
            {
              type: 'NOT_EMPTY',
              error: 'Select who is applying for this grant'
            }
          ],
          answers: [
            {
              key: 'applying-A1',
              value: 'Applicant',
              redirectUrl: 'applicant-details'
            },
            {
              key: 'applying-A2',
              value: 'Agent',
              redirectUrl: 'agents-details'
            }
          ],
          yarKey: 'applying'
        },
        {
          key: 'farmer-details',
          order: 200,
          title: 'Applicant’s details',
          pageTitle: '',
          url: 'applicant-details',
          baseUrl: 'applicant-details',
          nextUrl: 'check-details',
          preValidationKeys: ['applying'],
          eliminationAnswerKeys: '',
          backUrlObject: {
            dependentQuestionYarKey: 'applying',
            dependentAnswerKeysArray: ['applying-A2'],
            urlOptions: {
              thenUrl: 'agents-details',
              elseUrl: 'applying'
            }
          },
          fundingPriorities: '',
          type: 'multi-input',
          minAnswerCount: '',
          maxAnswerCount: '',
          ga: [{ dimension: 'cd3', value: { type: 'yar', key: 'applying' } }],
          allFields: [
            {
              yarKey: 'firstName',
              type: 'text',
              classes: 'govuk-input--width-20',
              label: {
                text: 'First name',
                classes: 'govuk-label'
              },
              validate: [
                {
                  type: 'NOT_EMPTY',
                  error: 'Enter your first name'
                },
                // {
                //   type: 'REGEX',
                //   regex: MIN_2_LETTERS_TO_USE_SPECIAL_CHARACTER,
                //   error: 'First name must include letters'
                // },
                {
                  type: 'REGEX',
                  regex: NAME_ONLY_REGEX,
                  error: 'First name must only include letters, hyphens and apostrophes'
                },
                {
                  type: 'MIN_MAX_CHARS',
                  min: 0,
                  max: 30,
                  error: 'First name must be 30 characters or fewer'
                }
              ]
            },
            {
              yarKey: 'lastName',
              type: 'text',
              endFieldset: 'true',
              classes: 'govuk-input--width-20',
              label: {
                text: 'Last name',
                classes: 'govuk-label'
              },
              validate: [
                {
                  type: 'NOT_EMPTY',
                  error: 'Enter your last name'
                },
                // {
                //   type: 'REGEX',
                //   regex: MIN_2_LETTERS_TO_USE_SPECIAL_CHARACTER,
                //   error: 'Last name must include letters'
                // },
                {
                  type: 'REGEX',
                  regex: NAME_ONLY_REGEX,
                  error: 'Last name must only include letters, hyphens and apostrophes'
                },
                {
                  type: 'MIN_MAX_CHARS',
                  min: 0,
                  max: 30,
                  error: 'Last name must be 30 characters or fewer'
                }
              ]
            },
            {
              yarKey: 'emailAddress',
              type: 'email',
              classes: 'govuk-input--width-20',
              label: {
                text: 'Email address',
                classes: 'govuk-label'
              },
              hint: {
                text: 'We will only use this to send you a confirmation'
              },
              validate: [
                {
                  type: 'NOT_EMPTY',
                  error: 'Enter your email address'
                },
                {
                  type: 'REGEX',
                  regex: EMAIL_REGEX,
                  error: 'Enter an email address in the correct format, like name@example.com'
                }
              ]
            },
            {
              yarKey: 'confirmEmailAddress',
              type: 'email',
              classes: 'govuk-input--width-20',
              label: {
                text: 'Confirm email address',
                classes: 'govuk-label'
              },
              validate: [
                {
                  type: 'NOT_EMPTY',
                  error: 'Confirm your email address'
                },
                {
                  type: 'CONFIRMATION_ANSWER',
                  fieldsToCampare: ['emailAddress', 'confirmEmailAddress'],
                  error: 'Enter an email address that matches'
                }
              ]
            },
            {
              yarKey: 'mobileNumber',
              type: 'tel',
              classes: 'govuk-input--width-10',
              label: {
                text: 'Mobile number',
                classes: 'govuk-label'
              },
              hint: {
                text: 'We will only use this to contact you about your application'
              },
              validate: [
                {
                  type: 'NOT_EMPTY',
                  error: 'Enter a mobile number (if you do not have a mobile, enter your landline number)',
                  extraFieldsToCheck: ['landlineNumber']
                },
                {
                  type: 'REGEX',
                  regex: CHARS_MIN_10,
                  error: 'Your mobile number must have at least 10 characters'
                },
                {
                  type: 'REGEX',
                  regex: PHONE_REGEX,
                  error: 'Enter a telephone number, like 01632 960 001, 07700 900 982 or +44 0808 157 0192'
                }
              ]
            },
            {
              yarKey: 'landlineNumber',
              endFieldset: 'true',
              type: 'tel',
              classes: 'govuk-input--width-10',
              label: {
                text: 'Landline number',
                classes: 'govuk-label'
              },
              hint: {
                text: 'We will only use this to contact you about your application'
              },
              validate: [
                {
                  type: 'NOT_EMPTY',
                  error: 'Enter a landline number (if you do not have a landline, enter your mobile number)',
                  extraFieldsToCheck: ['mobileNumber']
                },
                {
                  type: 'REGEX',
                  regex: CHARS_MIN_10,
                  error: 'Your landline number must have at least 10 characters'
                },
                {
                  type: 'REGEX',
                  regex: PHONE_REGEX,
                  error: 'Enter a telephone number, like 01632 960 001, 07700 900 982 or +44 0808 157 0192'
                }
              ]
            },
            {
              type: 'sub-heading',
              text: 'Business address'
            },
            {
              yarKey: 'address1',
              type: 'text',
              classes: 'govuk-input--width-20',
              label: {
                html: 'Address line 1',
                classes: 'govuk-label'
              },
              validate: [
                {
                  type: 'NOT_EMPTY',
                  error: 'Enter your address line 1'
                },
                {
                  type: 'REGEX',
                  regex: ADDRESS_REGEX,
                  error: 'Address must only include letters, numbers, hyphens and apostrophes'
                },
                {
                  type: 'REGEX',
                  regex: MIN_3_LETTERS,
                  error: 'Address must include at least 3 letters'
                },
              ]
            },
            {
              yarKey: 'address2',
              type: 'text',
              classes: 'govuk-input--width-20',
              label: {
                html: 'Address line 2 (optional)',
                classes: 'govuk-label'
              },
              validate: [
                {
                  type: 'REGEX',
                  regex: ADDRESS_REGEX,
                  error: 'Address must only include letters, numbers, hyphens and apostrophes'
                },
                {
                  type: 'REGEX',
                  regex: MIN_3_LETTERS,
                  error: 'Address must include at least 3 letters'
                },
              ]
            },
            {
              yarKey: 'town',
              type: 'text',
              classes: 'govuk-input--width-10',
              label: {
                text: 'Town',
                classes: 'govuk-label'
              },
              validate: [
                {
                  type: 'NOT_EMPTY',
                  error: 'Enter your town'
                },
                {
                  type: 'REGEX',
                  regex: MIN_2_LETTERS_TO_USE_SPECIAL_CHARACTER,
                  error: 'Town must include letters'
                },
                {
                  type: 'REGEX',
                  regex: ONLY_TEXT_REGEX,
                  error: 'Town must only include letters, hyphens and spaces'
                },
              ]
            },
            {
              yarKey: 'county',
              type: 'select',
              classes: 'govuk-input--width-10',
              label: {
                text: 'County',
                classes: 'govuk-label'
              },
              answers: [
                ...LIST_COUNTIES
              ],
              validate: [
                {
                  type: 'NOT_EMPTY',
                  error: 'Select your county'
                }
              ]
            },
            {
              yarKey: 'postcode',
              type: 'text',
              classes: 'govuk-input--width-5',
              label: {
                text: 'Business postcode',
                classes: 'govuk-label'
              },
              validate: [
                {
                  type: 'NOT_EMPTY',
                  error: 'Enter your business postcode, like AA1 1AA'
                },
                {
                  type: 'REGEX',
                  regex: POSTCODE_REGEX,
                  error: 'Enter a business postcode, like AA1 1AA'
                }
              ]
            },
            {
              yarKey: 'projectPostcode',
              type: 'text',
              endFieldset: 'true',
              classes: 'govuk-input--width-5',
              label: {
                text: 'Project postcode',
                classes: 'govuk-label'
              },
              hint: {
                text: 'The site postcode where the work will happen'
              },
              validate: [
                {
                  type: 'NOT_EMPTY',
                  error: 'Enter your project postcode, like AA1 1AA'
                },
                {
                  type: 'REGEX',
                  regex: POSTCODE_REGEX,
                  error: 'Enter a project postcode, like AA1 1AA'
                }
              ]
            }
          ],
          yarKey: 'farmerDetails'

        },
        {
          key: 'agents-details',
          order: 202,
          title: 'Agent’s details',
          pageTitle: '',
          url: 'agents-details',
          baseUrl: 'agents-details',
          backUrl: 'applying',
          nextUrl: 'applicant-details',
          summaryPageUrl: 'check-details',
          preValidationKeys: ['applying'],
          eliminationAnswerKeys: '',
          ineligibleContent: {},
          fundingPriorities: '',
          type: 'multi-input',
          minAnswerCount: '',
          maxAnswerCount: '',
          allFields: [
            {
              yarKey: 'firstName',
              type: 'text',
              classes: 'govuk-input--width-20',
              label: {
                text: 'First name',
                classes: 'govuk-label'
              },
              validate: [
                {
                  type: 'NOT_EMPTY',
                  error: 'Enter your first name'
                },
                // {
                //   type: 'REGEX',
                //   regex: MIN_2_LETTERS_TO_USE_SPECIAL_CHARACTER,
                //   error: 'First name must include letters'
                // },
                {
                  type: 'REGEX',
                  regex: NAME_ONLY_REGEX,
                  error: 'First name must only include letters, hyphens and apostrophes'
                },
                {
                  type: 'MIN_MAX_CHARS',
                  min: 0,
                  max: 30,
                  error: 'First name must be 30 characters or fewer'
                }
              ]
            },
            {
              yarKey: 'lastName',
              type: 'text',
              classes: 'govuk-input--width-20',
              label: {
                text: 'Last name',
                classes: 'govuk-label'
              },
              validate: [
                {
                  type: 'NOT_EMPTY',
                  error: 'Enter your last name'
                },
                // {
                //   type: 'REGEX',
                //   regex: MIN_2_LETTERS_TO_USE_SPECIAL_CHARACTER,
                //   error: 'First name must include letters'
                // },
                {
                  type: 'REGEX',
                  regex: NAME_ONLY_REGEX,
                  error: 'First name must only include letters, hyphens and apostrophes'
                },
                {
                  type: 'MIN_MAX_CHARS',
                  min: 0,
                  max: 30,
                  error: 'First name must be 30 characters or fewer'
                }
              ]
            },
            {
              yarKey: 'businessName',
              type: 'text',
              endFieldset: 'true',
              classes: 'govuk-input--width-20',
              label: {
                text: 'Business name',
                classes: 'govuk-label'
              },
              validate: [
                {
                  type: 'NOT_EMPTY',
                  error: 'Enter your business name'
                },
                {
                  type: 'MIN_MAX_CHARS',
                  min: 0,
                  max: 30,
                  error: 'Business name must be 30 characters or fewer'
                }
              ]
            },
            {
              yarKey: 'emailAddress',
              type: 'email',
              classes: 'govuk-input--width-20',
              label: {
                text: 'Email address',
                classes: 'govuk-label'
              },
              hint: {
                text: 'We will only use this to send you a confirmation'
              },
              validate: [
                {
                  type: 'NOT_EMPTY',
                  error: 'Enter your email address'
                },
                {
                  type: 'REGEX',
                  regex: EMAIL_REGEX,
                  error: 'Enter an email address in the correct format, like name@example.com'
                }
              ]
            },
            {
              yarKey: 'confirmEmailAddress',
              type: 'email',
              classes: 'govuk-input--width-20',
              label: {
                text: 'Confirm email address',
                classes: 'govuk-label'
              },
              validate: [
                {
                  type: 'NOT_EMPTY',
                  error: 'Confirm your email address'
                },
                {
                  type: 'CONFIRMATION_ANSWER',
                  fieldsToCampare: ['emailAddress', 'confirmEmailAddress'],
                  error: 'Enter an email address that matches'
                }
              ]
            },
            {
              yarKey: 'mobileNumber',
              type: 'tel',
              classes: 'govuk-input--width-10',
              label: {
                text: 'Mobile number',
                classes: 'govuk-label'
              },
              hint: {
                text: 'We will only use this to contact you about your application'
              },
              validate: [
                {
                  type: 'NOT_EMPTY',
                  error: 'Enter a mobile number (if you do not have a mobile, enter your landline number)',
                  extraFieldsToCheck: ['landlineNumber']
                },
                {
                  type: 'REGEX',
                  regex: CHARS_MIN_10,
                  error: 'Your mobile number must have at least 10 characters'
                },
                {
                  type: 'REGEX',
                  regex: PHONE_REGEX,
                  error: 'Enter a telephone number, like 01632 960 001, 07700 900 982 or +44 0808 157 0192'
                }
              ]
            },
            {
              yarKey: 'landlineNumber',
              type: 'tel',
              endFieldset: 'true',
              classes: 'govuk-input--width-10',
              label: {
                text: 'Landline number',
                classes: 'govuk-label'
              },
              hint: {
                text: 'We will only use this to contact you about your application'
              },
              validate: [
                {
                  type: 'NOT_EMPTY',
                  error: 'Enter a landline number (if you do not have a landline, enter your mobile number)',
                  extraFieldsToCheck: ['mobileNumber']
                },
                {
                  type: 'REGEX',
                  regex: CHARS_MIN_10,
                  error: 'Your landline number must have at least 10 characters'
                },
                {
                  type: 'REGEX',
                  regex: PHONE_REGEX,
                  error: 'Enter a telephone number, like 01632 960 001, 07700 900 982 or +44 0808 157 0192'
                }
              ]
            },
            {
              type: 'sub-heading',
              text: 'Business address'
            },
            {
              yarKey: 'address1',
              type: 'text',
              classes: 'govuk-input--width-20',
              label: {
                html: 'Address line 1',
                classes: 'govuk-label'
              },
              validate: [
                {
                  type: 'NOT_EMPTY',
                  error: 'Enter your address line 1'
                },
                {
                  type: 'REGEX',
                  regex: ADDRESS_REGEX,
                  error: 'Address must only include letters, numbers, hyphens and apostrophes'
                },
                {
                  type: 'REGEX',
                  regex: MIN_3_LETTERS,
                  error: 'Address must include at least 3 letters'
                },
              ]
            },
            {
              yarKey: 'address2',
              type: 'text',
              classes: 'govuk-input--width-20',
              label: {
                html: 'Address line 2 (optional)',
                classes: 'govuk-label'
              },
              validate: [
                {
                  type: 'REGEX',
                  regex: ADDRESS_REGEX,
                  error: 'Address must only include letters, numbers, hyphens and apostrophes'
                },
                {
                  type: 'REGEX',
                  regex: MIN_3_LETTERS,
                  error: 'Address must include at least 3 letters'
                },
              ]
            },
            {
              yarKey: 'town',
              type: 'text',
              classes: 'govuk-input--width-10',
              label: {
                text: 'Town',
                classes: 'govuk-label'
              },
              validate: [
                {
                  type: 'NOT_EMPTY',
                  error: 'Enter your town'
                },
                {
                  type: 'REGEX',
                  regex: MIN_2_LETTERS_TO_USE_SPECIAL_CHARACTER,
                  error: 'Town must include letters'
                },
                {
                  type: 'REGEX',
                  regex: ONLY_TEXT_REGEX,
                  error: 'Town must only include letters, hyphens and spaces'
                }
              ]
            },
            {
              yarKey: 'county',
              type: 'select',
              classes: 'govuk-input--width-10',
              label: {
                text: 'County',
                classes: 'govuk-label'
              },
              answers: [
                ...LIST_COUNTIES
              ],
              validate: [
                {
                  type: 'NOT_EMPTY',
                  error: 'Select your county'
                }
              ]
            },
            {
              yarKey: 'postcode',
              type: 'text',
              endFieldset: 'true',
              classes: 'govuk-input--width-5',
              label: {
                text: 'Postcode',
                classes: 'govuk-label'
              },
              validate: [
                {
                  type: 'NOT_EMPTY',
                  error: 'Enter your postcode, like AA1 1AA'
                },
                {
                  type: 'REGEX',
                  regex: POSTCODE_REGEX,
                  error: 'Enter a postcode, like AA1 1AA'
                }
              ]
            }
          ],
          yarKey: 'agentsDetails'

        },
        {
          key: 'check-details',
          order: 210,
          title: 'Check your details',
          pageTitle: 'Check details',
          url: 'check-details',
          backUrl: 'applicant-details',
          nextUrl: 'confirm',
          preValidationKeys: ['applying'],
          eliminationAnswerKeys: '',
          ineligibleContent: {},
          pageData: {
            businessDetailsLink: 'business-details',
            agentDetailsLink: 'agents-details',
            farmerDetailsLink: 'applicant-details'
          },
          fundingPriorities: '',
          type: '',
          minAnswerCount: 1,
          answers: []
        },
        {
          key: 'confirm',
          title: 'Confirm and send',
          order: 220,
          url: 'confirm',
          backUrl: 'check-details',
          nextUrl: 'confirmation',
          preValidationKeys: ['farmerDetails'],
          preValidationKeysRule: { condition: 'ANY' },
          maybeEligible: true,
          maybeEligibleContent: {
            messageHeader: 'Confirm and send',
            messageContent: `
              I confirm that, to the best of my knowledge, the details I have provided are correct.<br/><br/>
              I understand the score was based on the answers I provided.<br/><br/>
              I am aware the information I submit will be checked.<br/><br/>
              I am happy to be contacted by Defra and RPA (or a third-party on their behalf) about my application.
              <h2 class="govuk-heading-m">Improving our schemes</h2>
              As we develop new services we get feedback from farmers and agents.<br/><br/>
              You may be contacted by us or a third party that we work with.`
          },
          answers: [
            {
              key: 'consentOptional',
              value: 'CONSENT_OPTIONAL'
            }
          ],
          yarKey: 'consentOptional'
        },
        {
          key: 'reference-number',
          order: 230,
          title: 'Details submitted',
          pageTitle: '',
          url: 'confirmation',
          baseUrl: 'confirmation',
          preValidationKeys: ['consentOptional'],
          ga: [
            { dimension: 'cd2', value: { type: 'score' } },
            { dimension: 'cd5', value: { type: 'confirmationId' } },
            { dimension: 'cm1', value: { type: 'journey-time' } }
          ],
          maybeEligible: true,
          maybeEligibleContent: {
            reference: {
              titleText: 'Details submitted',
              html: 'Your reference number<br><strong>{{_confirmationId_}}</strong>',
              surveyLink: process.env.SURVEY_LINK
            },
            messageContent: `We have sent you a confirmation email with a record of your answers.<br/><br/>
            If you do not get an email within 72 hours, please call the RPA helpline and follow the options for the Farming Investment Fund scheme.
            {{_extraText_}}
            <h1 class="govuk-heading-m">RPA helpline</h1>
            <h2 class="govuk-heading-s">Telephone</h2>
            Telephone: 0300 0200 301<br/>
            Monday to Friday, 9am to 5pm (except public holidays)<br/>
            <p><a class="govuk-link" target="_blank" href="https://www.gov.uk/call-charges" rel="noopener noreferrer">Find out about call charges</a></p>
            <h2 class="govuk-heading-s">Email</h2>
            <a class="govuk-link" title="Send email to RPA" target="_blank" rel="noopener noreferrer" href="mailto:ftf@rpa.gov.uk">FTF@rpa.gov.uk</a><br/><br/>
            <h2 class="govuk-heading-m">What happens next</h2>
            <ol class="govuk-list govuk-list--number">
              <li>The RPA will contact you when the full application period opens. They will tell you if your project scored well enough to get the full application form. </li>
              <li>If you submit an application, the RPA will assess it against other projects and value for money. You will not automatically get a grant. The grant is expected to be highly competitive and you are competing against other projects.</li>
              <li>If your application is successful, you’ll be sent a funding agreement and can begin work on the project.</li>
            </ol>
            `,
            warning: {
              text: 'You must not start the project'
            },
            extraMessageContent: `
            <p>Starting the project or committing to any costs (such as placing orders) before you receive a funding agreement will invalidate your application.</p> 
            <p>Before you start the project, you can:</p>
            <ul class="govuk-list--bullet">
              <li>get quotes from suppliers</li>
              <li>apply for planning permission</li>
            </ul>
            <p class="govuk-body"><a class="govuk-link" href="${process.env.SURVEY_LINK}" target="_blank" rel="noopener noreferrer">What do you think of this service?</a></p>
            `,
            addText: false,
            conditionalInsertText: {
              text: `If you want your landlord to underwrite your project, you should agree this with them before you begin your full application. Your landlord will need to complete a form at full application. This will confirm that they agree to take over your project, including conditions in your Grant Funding Agreement, if your tenancy ends.`
            },
          },
        }
      ]
    }
  ]
}

const ALL_QUESTIONS = []
questionBank.sections.forEach(({ questions }) => {
  ALL_QUESTIONS.push(...questions)
})
const ALL_URLS = []
ALL_QUESTIONS.forEach(item => ALL_URLS.push(item.url))

const YAR_KEYS = ['remainingCost', 'calculatedGrant']
ALL_QUESTIONS.forEach(item => YAR_KEYS.push(item.yarKey))
module.exports = {
  questionBank,
  ALL_QUESTIONS,
  YAR_KEYS,
  ALL_URLS
}
