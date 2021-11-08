const {
  CURRENCY_FORMAT,
  CHARS_MAX_10,
  DIGITS_MAX_7,
  CHARS_MIN_10,
  POSTCODE_REGEX,
  NUMBER_REGEX,
  NAME_ONLY_REGEX,
  PHONE_REGEX,
  EMAIL_REGEX
} = require('../helpers/regex')

const { LIST_COUNTIES } = require('../helpers/all-counties')

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
          nextUrl: 'business-location',
          url: 'nature-of-business',
          baseUrl: 'nature-of-business',
          type: 'single-answer',
          fundingPriorities: '',
          minAnswerCount: 1,
          ga: { dimension: '', value: '' },
          ineligibleContent: {
            messageContent: `
            <span>This grant is for businesses who:</span>
            <ul class="govuk-body">
              <li>are agricultural, horticultural or forestry producers (primary producers)'</li>
              <li>provide processing services to a primary producer</li>
              <li>are a separate processing business 100% owned by a primary producer</li>
            </ul>`,
            messageLink: {
              url: 'https://www.gov.uk/topic/farming-food-grants-payments/rural-grants-payments',
              title: 'See other grants you may be eligible for.'
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
                  'are agricultural, horticultural or forestry producers (primary producers)',
                  'provide processing services to a primary producer',
                  'are a separate processing business 100% owned by a primary producer'
                ]
              }]
            }]
          },
          validations: [
            {
              type: '',
              error: '',
              regEx: '',
              dependentAnswerKey: ''
            }
          ],
          answers: [
            {
              key: 'nature-of-business-A1',
              value: 'An agricultural, horticultural or forestry business (a primary producer)',
              hint: {
                text: 'For example, arable or livestock farmer, growing trees, fruit producer, salad grower'
              }
            },
            {
              key: 'nature-of-business-A2',
              value: 'Providing processing services to a primary producer',
              hint: {
                text: 'For example, vegetable washing, mobile livestock slaughter services'
              }
            },
            {
              key: 'nature-of-business-A3',
              value: 'A separate processing business 100% owned by a primary producer',
              hint: {
                text: 'For example, cheese processing business owned by a dairy farmer'
              }
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
          key: 'business-location',
          order: 15,
          title: 'Is your business in England?',
          pageTitle: '',
          backUrl: 'nature-of-business',
          nextUrl: 'legal-status',
          classes: 'govuk-radios--inline govuk-fieldset__legend--l',
          url: 'business-location',
          baseUrl: 'business-location',
          ineligibleContent: {
            messageContent: 'This grant is only for businesses registered in England.',
            insertText: { text: 'Scotland, Wales and Northern Ireland have other grants available.' }
          },
          fundingPriorities: '',
          type: 'single-answer',
          minAnswerCount: 1,
          sidebar: {
            values: [{
              heading: 'Eligibility',
              content: [{
                para: 'This grant is only for businesses registered in England. \n \n Scotland, Wales and Northern Ireland have other grants available.',
                items: []
              }]
            }]
          },
          validate: [
            {
              type: 'NOT_EMPTY',
              error: 'Select yes if the business is in England'
            }
          ],
          answers: [
            {
              key: 'business-location-A1',
              value: 'Yes'
            },
            {
              key: 'business-location-A2',
              value: 'No',
              notEligible: true
            }
          ],
          yarKey: 'businessLocation'
        },
        {
          key: 'legal-status',
          order: 20,
          title: 'What is the legal status of the business?',
          pageTitle: '',
          backUrl: 'business-location',
          nextUrl: 'country',
          url: 'legal-status',
          baseUrl: 'legal-status',
          ineligibleContent: {
            messageContent: 'Your business does not have an eligible legal status.',
            details: {
              summaryText: 'Who is eligible',
              html: '<ul class="govuk-list govuk-list--bullet"><li>Sole trader</li><li>Partnership</li><li>Limited company</li><li>Charity</li><li>Trust</li><li>Limited liability partnership</li><li>Community interest company</li><li>Limited partnership</li><li>Industrial and provident society</li><li>Co-operative society (Co-Op)</li><li>Community benefit society (BenCom)</li></ul>'
            },
            messageLink: {
              url: 'https://www.gov.uk/topic/farming-food-grants-payments/rural-grants-payments',
              title: 'See other grants you may be eligible for.'
            },
            warning: {
              text: 'Other types of business may be supported in future schemes',
              iconFallbackText: 'Warning'
            }
          },
          fundingPriorities: '',
          type: 'single-answer',
          minAnswerCount: 1,
          ga: { dimension: '', value: '' },
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
          ga: { dimension: '', value: '' },
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
          ineligibleContent: {
            messageContent: 'Any planning permission must be in place by 31 December 2022.',
            messageLink: {
              url: 'https://www.gov.uk/topic/farming-food-grants-payments/rural-grants-payments',
              title: 'See other grants you may be eligible for.'
            }
          },
          fundingPriorities: 'Improving Adding Value',
          type: 'single-answer',
          minAnswerCount: 1,
          ga: { dimension: '', value: '' },
          sidebar: {
            values: [{
              heading: 'Eligibility',
              content: [{
                para: 'Any planning permission must be in place by 31 December 2022.'
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
              value: 'Should be in place by 31 December 2022',
              redirectUrl: 'planning-required-condition'
            },
            {
              key: 'planning-permission-A4',
              value: 'Will not be in place by 31 December 2022',
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
          maybeEligibleContent: {
            messageHeader: 'You may be able to apply for a grant from this scheme',
            messageContent: 'Any planning permission must be in place by 31 December 2022.'
          }
        },
        {
          key: 'project-location-owned-rented',
          order: 40,
          title: 'Is the project location site owned or rented by applicant?',
          pageTitle: '',
          url: 'project-location-owned-rented',
          baseUrl: 'project-location-owned-rented',
          backUrl: 'planning-permission',
          nextUrl: 'project-start',
          ineligibleContent: {
            messageContent: 'The land must be owned by the applicant, or there must be a tenancy in place to at least 2026, before the project starts.',
            messageLink: {
              url: 'https://www.gov.uk/topic/farming-food-grants-payments/rural-grants-payments',
              title: 'See other grants you may be eligible for.'
            }
          },
          fundingPriorities: 'Improving Adding Value',
          type: 'single-answer',
          minAnswerCount: 1,
          ga: { dimension: '', value: '' },
          sidebar:
          {
            heading: 'Eligibility',
            para: 'The land must be owned by the applicant, or there must be a tenancy in place to at least 2026, before the project starts.',
            items: []
          },
          validate: [
            {
              type: 'NOT_EMPTY',
              error: 'Select when the project will have planning permission'
            }
          ],
          answers: [
            {
              key: 'project-location-owned-rented-A1',
              value: 'Owned'
            },
            {
              key: 'project-location-owned-rented-A2',
              value: 'A Long term lease (to at least 2026) is, or will be, in place before the project starts'
            },
            {
              key: 'project-location-owned-rented-A4',
              value: 'A long-term lease will not be in place before project start',
              notEligible: true
            }
          ],
          yarKey: 'projectLocationOwnedRented'
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
          ineligibleContent: {
            messageContent: 'You cannot apply for a grant if you have already started work on the project.',
            insertText: { text: 'Starting the project or committing to any costs (such as placing orders) before you receive a funding agreement invalidates your application.' },
            messageLink: {
              url: 'https://www.gov.uk/government/collections/rural-payments-and-grants',
              title: 'See other grants you may be eligible for.'
            }
          },
          fundingPriorities: '',
          type: 'single-answer',
          minAnswerCount: 1,
          ga: { dimension: '', value: '' },
          sidebar: {
            values: [{
              heading: 'Eligibility',
              content: [{
                para: `
                You will invalidate your application if you start the project or commit to any costs (such as placing orders) before you receive a funding agreement.
                
                Before you start the project, you can:`,
                items: [
                  'get quotes from suppliers',
                  'apply for planning permission (this can take a long time)',
                  'apply for licences'
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
          nextUrl: 'project-items',
          fundingPriorities: '',
          type: 'single-answer',
          minAnswerCount: 1,
          ga: { dimension: '', value: '' },
          sidebar: {
            values: [{
              heading: 'Eligibility',
              content: [{
                para: 'The land must be owned or have a tenancy in place until 2027 before starting the project.'
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
              redirectUrl: 'tenancy-length'
            },
            {
              key: 'tenancy-A3',
              value: 'Not applicable - I’m a mobile contractor'
            }
          ],
          yarKey: 'tenancy'
        },
        {
          key: 'tenancy-length',
          order: 70,
          title: 'Do you have a tenancy agreement until 2027 or after?',
          pageTitle: '',
          url: 'tenancy-length',
          baseUrl: 'tenancy-length',
          backUrl: 'tenancy',
          preValidationKeys: ['tenancy'],
          nextUrl: 'project-items',
          eliminationAnswerKeys: '',
          fundingPriorities: '',
          type: 'single-answer',
          minAnswerCount: 1,
          classes: 'govuk-radios--inline govuk-fieldset__legend--l',
          sidebar: {
            values: [{
              heading: 'Eligibility',
              content: [{
                para: 'The land must be owned or have a tenancy in place until 2027 before starting the project.',
                items: []
              }]
            }]
          },
          validate: [
            {
              type: 'NOT_EMPTY',
              error: 'Select yes if the land has a tenancy agreement in place until 2027 or after'
            }
          ],
          answers: [
            {
              key: 'tenancy-length-A1',
              value: 'Yes'
            },
            {
              key: 'tenancy-length-A2',
              value: 'No',
              redirectUrl: 'tenancy-length-condition'
            }
          ],
          yarKey: 'tenancyLength'
        },
        {
          key: 'tenancy-length-condition',
          title: 'You may be able to apply for a grant from this scheme',
          order: 75,
          url: 'tenancy-length-condition',
          backUrl: 'tenancy',
          preValidationKeys: ['tenancyLength'],
          nextUrl: 'project-items',
          maybeEligible: true,
          maybeEligibleContent: {
            messageHeader: 'You may be able to apply for a grant from this scheme',
            messageContent: 'You will need to extend your tenancy agreement before you can complete a full application.'
          }
        },
        {
          key: 'project-items',
          order: 80,
          title: 'What eligible items does your project need?',
          pageTitle: '',
          hint: {
            text: 'Select all the items your project needs'
          },
          url: 'project-items',
          baseUrl: 'project-items',
          backUrl: 'tenancy',
          nextUrl: 'project-cost',
          fundingPriorities: '',
          type: 'multi-answer',
          minAnswerCount: 1,
          ga: { dimension: '', value: '' },
          validate: [
            {
              type: 'NOT_EMPTY',
              error: 'Select all the items your project needs'
            }
          ],
          answers: [
            {
              key: 'project-items-A1',
              value: 'Processing equipment or machinery',
              hint: {
                text: 'For example, equipment for milk pasteurising or vegetable washing, packing machinery'
              }
            },
            {
              key: 'project-items-A2',
              value: 'Controlled-atmosphere storage',
              hint: {
                text: 'Monitoring and controlling the temperature and humidity of products'
              }
            },
            {
              key: 'project-items-A3',
              value: 'Dynamic controlled-atmosphere storage',
              hint: {
                text: 'Monitoring and controlling gases produced by or changes in the products, as well as temperature and humidity'
              }
            },
            {
              key: 'project-items-A4',
              value: 'Constructing or improving buildings',
              hint: {
                text: 'For example, a new building for cheese making, extending an existing building to install a new meat-cutting and packing line'
              }
            },
            {
              key: 'project-items-A5',
              value: 'Specialist vehicles',
              hint: {
                text: 'For example, forklift trucks, refrigerated vans or lorries'
              }
            },
            {
              key: 'project-items-A6',
              value: 'Retail facilities',
              hint: {
                text: 'For example, farm shops'
              }
            }
          ],
          yarKey: 'projectItems'
        },
        {
          key: 'project-cost',
          order: 90,
          pageTitle: '',
          url: 'project-cost',
          baseUrl: 'project-cost',
          backUrl: 'project-items',
          nextUrl: 'potential-amount',
          classes: 'govuk-input--width-10',
          id: 'projectCost',
          name: 'projectCost',
          prefix: { text: '£' },
          type: 'input',
          grantInfo: {
            minGrant: 35000,
            maxGrant: 500000,
            grantPercentage: 40,
            cappedGrant: true
          },
          label: {
            text: 'What is the total estimated cost of the items?',
            classes: 'govuk-label--l',
            isPageHeading: true
          },
          hint: {
            html: `
              You can only apply for a grant of up to 40% of the estimated costs.
              <br/>The minimum grant you can apply for this project is £35,000 (40% of £87,500).
              <br/>The maximum grant is £500,000.
              <br/><br/>Do not include VAT.
              <br/><br/>Enter amount, for example 95,000`
          },
          eliminationAnswerKeys: '',
          ineligibleContent: {
            messageContent: 'You can only apply for a grant of up to 40% of the estimated costs.',
            insertText: { text: 'The minimum grant you can apply for is £35,000 (40% of £87,500). The maximum grant is £500,000.' },
            messageLink: {
              url: 'https://www.gov.uk/topic/farming-food-grants-payments/rural-grants-payments',
              title: 'See other grants you may be eligible for.'
            }
          },
          sidebar: {
            values: [
              {
                heading: 'Selected items',
                content: [{
                  para: '',
                  items: []
                }]
              }
            ],
            dependentYarKey: 'projectItems',
            dependentQuestionKey: 'project-items'

          },
          validate: [
            {
              type: 'NOT_EMPTY',
              error: 'Enter the estimated cost for the items'
            },
            {
              type: 'REGEX',
              regex: CURRENCY_FORMAT,
              error: 'Enter a whole number in correct format'
            },
            {
              type: 'REGEX',
              regex: CHARS_MAX_10,
              error: 'Enter a whole number with a maximum of 10 digits'
            }
          ],
          answers: [],
          yarKey: 'projectCost'
        },
        {
          key: 'potential-amount',
          order: 91,
          url: 'potential-amount',
          backUrl: 'project-cost',
          nextUrl: 'remaining-costs',
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
          key: 'remaining-costs',
          order: 110,
          title: 'Can you pay the remaining costs of £{{_remainingCost_}}?',
          pageTitle: '',
          url: 'remaining-costs',
          baseUrl: 'remaining-costs',
          backUrl: 'project-cost',
          nextUrl: 'project-impact',
          eliminationAnswerKeys: '',
          ineligibleContent: {
            messageContent: `You cannot use public money (for example, grant funding from government or local authorities) towards the project costs.
            <br/><br/>You also cannot use money from a producer organisation under the Fresh Fruit and Vegetable Aid Scheme.`,
            insertText: {
              html: `You can use:
              <ul>
              <li>loans</li>
              <li>overdrafts</li>
              <li>the Basic Payment Scheme</li>
              <li> agri-environment schemes such as the Countryside Stewardship Scheme</li>
              </ul>`
            },
            messageLink: {
              url: 'https://www.gov.uk/government/collections/rural-payments-and-grants',
              title: 'See other grants you may be eligible for.'
            }
          },
          fundingPriorities: '',
          type: 'single-answer',
          classes: 'govuk-radios--inline govuk-fieldset__legend--l',
          minAnswerCount: 1,
          ga: { dimension: '', value: '' },
          sidebar: {
            values: [
              {
                heading: 'Eligibility',
                content: [{
                  para: `You cannot use public money (for example, grant funding from government or local authorities) towards the project costs.
                  
                  You also cannot use money from a producer organisation under the Fresh Fruit and Vegetable Aid Scheme.
                  
                  You can use:`,
                  items: [
                    'loans',
                    'overdrafts',
                    'the Basic Payment Scheme',
                    'agri-environment schemes such as the Countryside Stewardship Scheme'
                  ]
                }]
              }
            ]
          },
          validate: [
            {
              type: 'NOT_EMPTY',
              error: 'Select yes if you can pay the remaining costs without using any other grant money'
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
          key: 'project-impact',
          order: 120,
          title: 'What impact will the project have?',
          pageTitle: '',
          url: 'project-impact',
          baseUrl: 'project-impact',
          backUrl: 'remaining-costs',
          nextUrl: 'business-impact',
          eliminationAnswerKeys: '',
          ineligibleContent: {
            messageContent: '',
            insertText: { text: '' },
            messageLink: {
              url: '',
              title: ''
            }
          },
          sidebar: {
            heading: 'Funding priorities',
            para: 'RPA wants to fund projects that:',
            items: [
              'Improve processing and supply chains',
              'Grow your business']
          },
          fundingPriorities: '',
          type: 'single-answer',
          classes: 'govuk-radios--inline govuk-fieldset__legend--l',
          minAnswerCount: 1,
          ga: { dimension: '', value: '' },
          validate: [
            {
              type: 'NOT_EMPTY',
              error: 'Select yes if the project directly impacts a Site of Special Scientific Interest'
            }
          ],
          answers: [
            {
              key: 'project-impact-A1',
              value: 'Enables creation of new added-value products for the applicant business'
            },
            {
              key: 'project-impact-A2',
              value: 'Increases volume of existing added-value products for the applicant business'
            },
            {
              value: 'divider'
            },
            {
              key: 'project-impact-A3',
              value: 'None of the above'
            }
          ],
          yarKey: 'project-impact'
        },
        {
          key: 'business-impact',
          order: 130,
          title: 'What growth impact will the project have on your business?',
          pageTitle: '',
          url: 'business-impact',
          nextUrl: 'market-impacts',
          baseUrl: 'business-impact',
          backUrl: 'project-impact',
          hint: {
            html: '<br>Select one option<br>'
          },
          validate: [
            {
              type: 'NOT_EMPTY',
              error: 'Select one option to describe the project impact'
            }
          ],
          eliminationAnswerKeys: '',
          ineligibleContent: {
            messageContent: '',
            insertText: { text: '' },
            messageLink: {
              url: '',
              title: ''
            }
          },
          fundingPriorities: '<ul><li>improve Adding Value</li><li>improve the environment</li><li>introduce innovation</li></ul>',
          type: 'single-answer',
          minAnswerCount: 1,
          ga: { dimension: '', value: '' },
          sidebar:
          {
            heading: 'Funding priorities',
            para: 'RPA wants to fund projects that:',
            items: ['improve addvalue', 'improve the environment', 'introduce innovation']
          },
          validations: [
            {
              type: '',
              error: '',
              regEx: '',
              dependentAnswerKey: ''
            }
          ],
          answers: [
            {
              key: 'business-impact-A1',
              value: 'Increased productivity'
            },
            {
              key: 'business-impact-A2',
              value: 'Increased profits'
            },
            {
              key: 'business-impact-A3',
              value: 'Increased jobs'
            },
            {
              key: 'business-impact-A4',
              value: 'Introduces innovative equipment or processes new to the business '
            },
            {
              key: 'business-impact-A5',
              value: 'Introduces added-value processing as entirely new business activity'
            },
            {
              value: 'divider'
            },
            {
              key: 'business-impact-A6',
              value: 'none of the above'
            }
          ],
          yarKey: 'businessImpact'
        },
        {
          key: 'market-impacts',
          order: 140,
          pageTitle: '',
          title: 'What impact will the project have on your markets?',
          url: 'market-impacts',
          baseUrl: 'market-impacts',
          backUrl: 'business-impact',
          nextUrl: 'supply-chain-impacts',
          type: 'single-answer',
          eliminationAnswerKeys: '',
          ineligibleContent: {
            messageContent: '',
            insertText: { text: '' },
            messageLink: {
              url: '',
              title: ''
            }
          },
          fundingPriorities: '',
          ga: { dimension: '', value: '' },
          sidebar:
          {
            heading: 'Funding priorities',
            para: 'RPA wants to fund projects that:',
            items: ['improve addvalue', 'improve the environment']
          },
          validate: {
          },
          validations: [
            {
              type: '',
              error: '',
              regEx: '',
              dependentAnswerKey: ''
            }
          ],
          answers: [
            {
              key: 'market-impacts-A1',
              value: 'Expands existing routes to market'
            },
            {
              key: 'market-impacts-A2',
              value: 'Opens new Wholesale routes to market'
            },
            {
              key: 'market-impacts-A3',
              value: 'Opens new Retail routes to market'
            },
            {
              key: 'market-impacts-A4',
              value: 'Introduces exporting'
            },
            {
              key: 'market-impacts-A5',
              value: 'Increases exports'
            },
            {
              value: 'divider'
            },
            {
              key: 'market-impacts-A6',
              value: 'none of the above'
            }
          ],
          yarKey: 'marketImpacts'
        },
        {
          key: 'supply-chain-impacts',
          order: 150,
          pageTitle: '',
          title: 'What impact will the project have on supply chain businesses?',
          url: 'supply-chain-impacts',
          baseUrl: 'supply-chain-impacts',
          nextUrl: 'food-mile-impacts',
          type: 'single-answer',
          fundingPriorities: '',
          ga: { dimension: '', value: '' },
          sidebar:
          {
            heading: 'Funding priorities',
            para: 'RPA wants to fund projects that:',
            items: ['improve addvalue', 'improve the environment', 'introduce innovation ']
          },
          validate: {
          },
          validations: [
            {
              type: '',
              error: '',
              regEx: '',
              dependentAnswerKey: ''
            }
          ],
          answers: [
            {
              key: 'business-impact-A1',
              value: 'Produces quantifiable benefits to other named producers'
            },
            {
              key: 'business-impact-A2',
              value: 'Enables new collaborations or formal partnerships'
            },
            {
              key: 'business-impact-A3',
              value: 'Benefits existing  collaborations or formal partnerships'
            },
            {
              key: 'business-impact-A4',
              value: 'Shortens Supply chain (reduced miles)'
            },
            {
              key: 'business-impact-A5',
              value: 'Increases local supply chain resilience'
            },
            {
              key: 'business-impact-A6',
              value: 'Reduces imports (substitution)'
            }
          ],
          yarKey: 'supplyChainImpacts'
        },
        {
          key: 'food-mile-impacts',
          order: 290,
          title: 'What impact will the project have on ‘food miles’?',
          pageTitle: '',
          url: 'food-mile-impacts',
          baseUrl: 'food-mile-impacts',
          nextUrl: 'environment-impacts',
          hint: {
            text: 'Location of processing to Add Value:'
          },
          eliminationAnswerKeys: '',
          ineligibleContent: {
            messageContent: 'Your cannot apply for a grant if your project does not include the purchase of robotic or innovative technology.',
            messageLink: {
              url: 'https://www.gov.uk/government/collections/rural-payments-and-grants',
              title: 'See other grants you may be eligible for.'
            }
          },
          fundingPriorities: '',
          type: 'single-answer',
          minAnswerCount: 1,
          ga: { dimension: '', value: '' },
          sidebar:
          {
            heading: 'Eligibility',
            para: `Equipment must increase the Adding Value of primary agricultural or horticultural practices.\n\n
            Your project’s positive environmental benefit and the increase to Adding Value will be assessed at full application stage.`,
            items: []
          },
          validate: [
            {
              type: 'NOT_EMPTY',
              error: 'Select the type of new technology your project needs'
            }
          ],
          answers: [
            {
              key: 'food-mile-impacts-A1',
              value: 'At Point of Origin - at growers/producers location'
            },
            {
              key: 'food-mile-impacts-A2',
              value: 'Locally – within 10 miles of origin'
            },
            {
              key: 'food-mile-impacts-A3',
              value: 'Regionally – within 50 miles of origin'
            },
            {
              key: 'food-mile-impacts-A4',
              value: 'Nationally – within the UK'
            },
            {
              key: 'food-mile-impacts-A5',
              value: 'Internationally – outside the UK'
            }
          ],
          yarKey: 'foodMileImpacts'

        },
        {
          key: 'environment-impacts',
          order: 300,
          title: 'What impact will the project have on the environment?',
          pageTitle: '',
          url: 'environment-impacts',
          baseUrl: 'environment-impacts',
          backUrl: 'food-mile-impacts',
          nextUrl: 'score',
          eliminationAnswerKeys: '',
          ineligibleContent: {
            messageContent: '',
            messageLink: {
              url: '',
              title: ''
            }
          },
          fundingPriorities: '',
          type: 'multi-answer',
          minAnswerCount: 1,
          ga: { dimension: '', value: '' },
          validate: {
          },
          validations: [
            {
              type: '',
              error: '',
              regEx: '',
              dependentAnswerKey: ''
            }
          ],
          answers: [
            {
              key: 'environment-impacts-A1',
              value: 'Energy efficiency improvements'
            },
            {
              key: 'environment-impacts-A2',
              value: 'Water efficiency improvements'
            },
            {
              key: 'environment-impacts-A3',
              value: 'Wastage efficiency improvements'
            },
            {
              key: 'environment-impacts-A4',
              value: 'Reduces single use plastics'
            },
            {
              value: 'divider'
            },
            {
              key: 'environment-impacts-A5',
              value: 'None of the above'
            }
          ],
          yarKey: 'environmentImpacts'

        },

        /// ////// ***************** ROBOTICS END  ************************************/////////////////////
        {
          key: 'business-details',
          order: 180,
          title: 'Business details',
          pageTitle: 'Crops',
          url: 'business-details',
          baseUrl: 'business-details',
          backUrl: 'score',
          nextUrl: '/adding-value/applying',
          eliminationAnswerKeys: '',
          ineligibleContent: {},
          fundingPriorities: '',
          type: 'multi-input',
          minAnswerCount: '',
          maxAnswerCount: '',
          ga: { dimension: '', value: '' },
          validations: [
            {
              type: '',
              error: '',
              regEx: '',
              dependentAnswerKey: ''
            }
          ],
          allFields: [
            {
              yarKey: 'projectName',
              type: 'input',
              label: {
                text: 'Project name',
                classes: 'govuk-label'
              },
              hint: {
                text: 'For example, Brown Hill Farm reservoir'
              },
              validate: [
                {
                  type: 'NOT_EMPTY',
                  error: 'Enter a project name'
                }
              ]
            },
            {
              yarKey: 'businessName',
              type: 'input',
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
                  type: 'MIN_MAX',
                  min: 5,
                  max: 100,
                  error: 'Name must be 100 characters or fewer'
                }
              ]
            },
            {
              yarKey: 'numberEmployees',
              type: 'input',
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
                  regex: NUMBER_REGEX,
                  error: 'Employee number must be 7 digits or fewer'
                },
                {
                  type: 'MIN_MAX',
                  min: 1,
                  max: 7,
                  error: 'Employee number must be 7 digits or fewer'
                }
              ]
            },
            {
              yarKey: 'businessTurnover',
              type: 'input',
              classes: 'govuk-input--width-10',
              prefix: {
                text: '£'
              },
              label: {
                text: 'Business turnover (£)',
                classes: 'govuk-label'
              },
              validate: [
                {
                  type: 'NOT_EMPTY',
                  error: 'Enter the business turnover'
                },
                {
                  type: 'REGEX',
                  regex: NUMBER_REGEX,
                  error: 'Business turnover must be 9 digits or fewer'
                },
                {
                  type: 'MIN_MAX',
                  min: 1,
                  max: 9,
                  error: 'Business turnover must be 9 digits or fewer'
                }
              ]
            },
            {
              yarKey: 'inSbi',
              conditionalKey: 'sbi',
              type: 'single-answer',
              title: 'Single Business Identifier (SBI)',
              classes: 'govuk-fieldset__legend--s',
              hint: {
                text: 'Select one option'
              },
              validate: [
                {
                  type: 'NOT_EMPTY',
                  error: 'Select if you have an SBI number'
                },
                {
                  dependentKey: 'sbi',
                  type: 'NOT_EMPTY',
                  error: 'SBI number must have 9 characters, like 011115678'
                },
                {
                  dependentKey: 'sbi',
                  type: 'REGEX',
                  regex: NUMBER_REGEX,
                  error: 'SBI number must have 9 characters, like 011115678'
                },
                {
                  dependentKey: 'sbi',
                  type: 'MIN_MAX',
                  min: 9,
                  max: 9,
                  error: 'SBI number must have 9 characters, like 011115678'
                }
              ],
              answers: [
                {
                  key: 'inSbi-A1',
                  conditional: true,
                  value: 'Yes'
                },
                {
                  key: 'inSbi-A2',
                  value: 'No'
                }
              ]
            }
          ],
          yarKey: 'businessDetails',
          conditionalKey: 'sbi'
        },
        {
          key: 'applying',
          order: 190,
          title: 'Who is applying for this grant?',
          pageTitle: '',
          url: 'applying',
          baseUrl: 'applying',
          backUrl: 'business-details',
          eliminationAnswerKeys: '',
          ineligibleContent: {
            messageContent: '',
            insertText: { text: '' },
            messageLink: {
              url: '',
              title: ''
            }
          },
          fundingPriorities: '',
          type: 'single-answer',
          classes: 'govuk-radios--inline govuk-fieldset__legend--l',
          minAnswerCount: 1,
          ga: { dimension: '', value: '' },
          validate: [
            {
              type: 'NOT_EMPTY',
              error: 'Select who is applying for this grant'
            }
          ],
          answers: [
            {
              key: 'applying-A1',
              value: 'Farmer',
              redirectUrl: '/adding-value/farmers-details'
            },
            {
              key: 'applying-A2',
              value: 'Agent',
              redirectUrl: '/adding-value/agents-details'
            }
          ],
          yarKey: 'applying'

        },
        {
          key: 'farmer-details',
          order: 200,
          title: 'Farmer’s details',
          pageTitle: '',
          url: 'farmers-details',
          baseUrl: 'farmer-details',
          backUrl: '/adding-value/applying',
          nextUrl: 'check-details',
          eliminationAnswerKeys: '',
          ineligibleContent: {
            messageContent: '',
            insertText: { text: '' },
            messageLink: {
              url: '',
              title: ''
            }
          },
          backUrlObject: {
            dependentQuestionYarKey: 'applying',
            dependentAnswerKeysArray: ['applying-A1'],
            urlOptions: {
              thenUrl: '/adding-value/applying',
              elseUrl: '/adding-value/agents-details'
            }
          },
          fundingPriorities: '',
          type: 'multi-input',
          minAnswerCount: '',
          maxAnswerCount: '',
          ga: { dimension: '', value: '' },
          validations: [],
          allFields: [
            {
              yarKey: 'firstName',
              type: 'input',
              classes: 'govuk-input--width-20',
              label: {
                html: `
                  <span class="govuk-heading-m">Name</span><span>First name</span>
                `,
                classes: 'govuk-label'
              },
              validate: [
                {
                  type: 'NOT_EMPTY',
                  error: 'Enter your first name'
                },
                {
                  type: 'REGEX',
                  regex: NAME_ONLY_REGEX,
                  error: 'Name must only include letters, hyphens and apostrophes'
                }
              ]
            },
            {
              yarKey: 'lastName',
              type: 'input',
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
                {
                  type: 'REGEX',
                  regex: NAME_ONLY_REGEX,
                  error: 'Name must only include letters, hyphens and apostrophes'
                }
              ]
            },
            {
              yarKey: 'emailAddress',
              type: 'input',
              classes: 'govuk-input--width-20',
              label: {
                text: '',
                html: `
                  <span class="govuk-heading-m">Contact details</span><span>Email address</span>
                `,
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
              yarKey: 'mobileNumber',
              type: 'input',
              classes: 'govuk-input--width-20',
              label: {
                text: 'Mobile number',
                classes: 'govuk-label'
              },
              hint: {
                text: 'We will only use this to contact you about your application'
              },
              validate: [
                {
                  type: 'NOT_EMPTY_EXTRA',
                  error: 'Enter a landline or mobile number',
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
              type: 'input',
              classes: 'govuk-input--width-20',
              label: {
                text: 'Landline number',
                classes: 'govuk-label'
              },
              hint: {
                text: 'We will only use this to contact you about your application'
              },
              validate: [
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
              yarKey: 'address1',
              type: 'input',
              classes: 'govuk-input--width-20',
              label: {
                html: `
                  <span class="govuk-heading-m">Address</span><span>Building and street</span>
                `,
                classes: 'govuk-label'
              },
              validate: [
                {
                  type: 'NOT_EMPTY',
                  error: 'Enter your building and street details'
                }
              ]
            },
            {
              yarKey: 'address2',
              type: 'input',
              classes: 'govuk-input--width-20'
            },
            {
              yarKey: 'town',
              type: 'input',
              classes: 'govuk-input--width-10',
              label: {
                text: 'Town',
                classes: 'govuk-label'
              },
              validate: [
                {
                  type: 'NOT_EMPTY',
                  error: 'Enter your town'
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
              type: 'input',
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
          yarKey: 'farmerDetails'

        },
        {
          key: 'agents-details',
          order: 201,
          title: 'Agent’s details',
          pageTitle: '',
          url: 'agents-details',
          baseUrl: 'agents-details',
          backUrl: 'applying',
          nextUrl: 'farmers-details',
          eliminationAnswerKeys: '',
          ineligibleContent: {},
          fundingPriorities: '',
          type: 'multi-input',
          minAnswerCount: '',
          maxAnswerCount: '',
          ga: { dimension: '', value: '' },
          validations: [],
          allFields: [
            {
              yarKey: 'firstName',
              type: 'input',
              classes: 'govuk-input--width-20',
              label: {
                html: `
                  <span class="govuk-heading-m">Name</span><span>First name</span>
                `,
                classes: 'govuk-label'
              },
              validate: [
                {
                  type: 'NOT_EMPTY',
                  error: 'Enter your first name'
                },
                {
                  type: 'REGEX',
                  regex: NAME_ONLY_REGEX,
                  error: 'Name must only include letters, hyphens and apostrophes'
                }
              ]
            },
            {
              yarKey: 'lastName',
              type: 'input',
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
                {
                  type: 'REGEX',
                  regex: NAME_ONLY_REGEX,
                  error: 'Name must only include letters, hyphens and apostrophes'
                }
              ]
            },
            {
              yarKey: 'emailAddress',
              type: 'input',
              classes: 'govuk-input--width-20',
              label: {
                text: '',
                html: `
                  <span class="govuk-heading-m">Contact details</span><span>Email address</span>
                `,
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
              yarKey: 'mobileNumber',
              type: 'input',
              classes: 'govuk-input--width-20',
              label: {
                text: 'Mobile number',
                classes: 'govuk-label'
              },
              hint: {
                text: 'We will only use this to contact you about your application'
              },
              validate: [
                {
                  type: 'NOT_EMPTY_EXTRA',
                  error: 'Enter a landline or mobile number',
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
              type: 'input',
              classes: 'govuk-input--width-20',
              label: {
                text: 'Landline number',
                classes: 'govuk-label'
              },
              hint: {
                text: 'We will only use this to contact you about your application'
              },
              validate: [
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
              yarKey: 'address1',
              type: 'input',
              classes: 'govuk-input--width-20',
              label: {
                html: `
                  <span class="govuk-heading-m">Address</span><span>Building and street</span>
                `,
                classes: 'govuk-label'
              },
              validate: [
                {
                  type: 'NOT_EMPTY',
                  error: 'Enter your building and street details'
                }
              ]
            },
            {
              yarKey: 'address2',
              type: 'input',
              classes: 'govuk-input--width-20'
            },
            {
              yarKey: 'town',
              type: 'input',
              classes: 'govuk-input--width-10',
              label: {
                text: 'Town',
                classes: 'govuk-label'
              },
              validate: [
                {
                  type: 'NOT_EMPTY',
                  error: 'Enter your town'
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
              type: 'input',
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
          baseUrl: 'check-details',
          backUrl: 'farmers-details',
          nextUrl: 'confirm',
          eliminationAnswerKeys: '',
          ineligibleContent: {},
          backUrlObject: {
            dependentQuestionYarKey: 'applying',
            dependentAnswerKeysArray: ['applying-A1'],
            urlOptions: {
              thenUrl: '/adding-value/farmers-details',
              elseUrl: '/adding-value/agents-details'
            }
          },
          maybeEligible: true,
          maybeEligibleContent: {
            messageHeader: 'Check details',
            messageContent: ''
          },
          fundingPriorities: '',
          type: '',
          minAnswerCount: 1,
          ga: { dimension: '', value: '' },
          validations: [
            {
              type: '',
              error: '',
              regEx: '',
              dependentAnswerKey: ''
            }
          ],
          answers: [],
          yarKey: 'checkDetails'

        },
        {
          key: 'confirm',
          order: 220,
          url: 'confirm',
          backUrl: 'check-details',
          nextUrl: 'confirmation',
          maybeEligible: true,
          maybeEligibleContent: {
            messageHeader: 'Confirm and send',
            messageContent: `<ul class="govuk-list"> <li>I confirm that, to the best of my knowledge, the details I have provided are correct.</li>
            <li> I understand the score was based on the answers I provided.</li>
            <li> I am aware the information I submit will be checked.</li>
            <li> I am happy to be contacted by Defra and RPA (or a third-party on their behalf) about my application.</li></ul>`
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
          maybeEligible: true,
          maybeEligibleContent: {
            reference: {
              titleText: 'Details submitted',
              html: 'Your reference number<br><strong>{{_confirmationId_}}</strong>',
              surveyLink: 'https://defragroup.eu.qualtrics.com/jfe/preview/SV_9EwLLuCwWGJMz8a?Q_CHL=preview&Q_SurveyVersionID=current'
            },
            messageContent: `You will get an email with a record of your answers.<br/><br/>
            If you do not get an email within 72 hours, please call the RPA helpline and follow the options for the Farming Transformation Fund scheme:<br/><br/>
            Telephone: 03000 200 301<br/>
            <br/>Monday to Friday, 9am to 5pm (except public holidays)<br/>
            <p><a class="govuk-link" target="_blank" href="https://www.gov.uk/call-charges">Find out about call charges (opens in new tab)</a></p>
            
            Email: <a class="govuk-link" target="_blank" href="mailto:ftf@rpa.gov.uk">FTF@rpa.gov.uk</a>
            
            <p>RPA will be in touch when the full application period opens. They'll tell you about the application form and any guidance you need to submit a full application.</p>`,
            warning: {
              text: 'You must not start the project'
            },
            extraMessageContent: `<p>Starting the project or committing to any costs (such as placing orders) before you receive a funding agreement will invalidate your application.</p> 
            <p>Before you start the project, you can:</p>
            <ul>
              <li>get quotes from suppliers</li>
              <li>apply for planning permission or an abstraction licence</li>
            </ul>
            <p><b>You will not automatically get a grant.</b> The grant is expected to be highly competitive and you are competing against other projects.</p>`
          },
          fundingPriorities: '',
          type: '',
          minAnswerCount: 1,
          ga: { dimension: '', value: '' },
          validations: [],
          answers: [],
          yarKey: ''

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

const YAR_KEYS = []
ALL_QUESTIONS.forEach(item => YAR_KEYS.push(item.yarKey))
module.exports = {
  questionBank,
  ALL_QUESTIONS,
  YAR_KEYS,
  ALL_URLS
}
