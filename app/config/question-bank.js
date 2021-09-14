const {
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
          key: 'applicant-business',
          order: 10,
          title: 'What is the nature of the applicant business?',
          pageTitle: '',
          backUrl: 'start',
          nextUrl: 'legal-status',
          url: 'applicant-business',
          baseUrl: 'applicant-business',
          type: 'single-answer',
          fundingPriorities: '',
          minAnswerCount: 1,
          ga: { dimension: '', value: '' },
          ineligibleContent: {
            messageContent: 'Your business is not eligible',
            details: {
              summaryText: 'Who is eligible',
              html: ''
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
          sidebar: {
            heading: 'Eligibility',
            para: 'This scheme is only open to:',
            items: [
              'a grower or producer owned business, or',
              'those providing contracted services on behalf of the original growers/producers.'
            ],
            footer: 'Contract processors must be returning the added-value outputs to the ownership of the grower/producer.'
          },
          validate: {
            errorEmptyField: 'Select the nature of the applicant business'
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
              key: 'applicant-business-A1',
              value: 'The Grower/Producer of the primary products to be processed,'
            },
            {
              key: 'applicant-business-A2',
              value: 'A business linked to the original grower/producer through majority ownership,'
            },
            {
              key: 'applicant-business-A3',
              value: 'A Processer, using purchased primary products for eventual own onward sale,',
              notEligible: true
            },
            {
              key: 'applicant-business-A4',
              value: 'None of the above.',
              notEligible: true
            }
          ],
          yarKey: 'applicantBusiness'
        },
        {
          key: 'legal-status',
          order: 20,
          title: 'What is the legal status of the applicant business?',
          pageTitle: '',
          backUrl: 'applicant-business',
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
          sidebar: null,
          validate: {
            errorEmptyField: 'Select the legal status of the farm business'
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
              value: 'Limited partnership'
            },
            {
              key: 'legal-status-A8',
              value: 'Co-operative'
            },
            {
              value: 'divider'
            },
            {
              key: 'legal-status-A9',
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
            heading: 'Eligibility',
            para: 'This grant is only for projects in England. \n \n Scotland, Wales and Northern Ireland have other grants available.',
            items: []
          },
          validate: {
            errorEmptyField: 'Select yes if the project is in England',
            conditionalValidate: {
              errorEmptyField: 'Enter a postcode, like AA1 1AA',
              checkRegex: {
                regex: POSTCODE_REGEX,
                error: 'Enter a postcode, like AA1 1AA'
              }
            }
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
          yarKey: 'inEngland',
          conditionalKey: 'projectPostcode'
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
            messageContent: 'Any planning permission must be in place by 31 March 2022 (the end of the application window).',
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
            para: 'Any planning permission must be in place by 31 March 2022 (the end of the application window).',
            items: []
          },
          validate: {
            errorEmptyField: 'Select when the project will have planning permission'
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
              key: 'planning-permission-A1',
              value: 'Not needed'
            },
            {
              key: 'planning-permission-A2',
              value: 'Secured'
            },
            {
              key: 'planning-permission-A3',
              value: 'Should be in place by 31 March 2022',
              redirectUrl: 'planning-required-condition'
            },
            {
              key: 'planning-permission-A4',
              value: 'Will not be in place by 31 March 2022',
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
            messageContent: 'Any planning permission must be in place by 31 March 2022 (the end of the application window).'
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
          validate: {
            errorEmptyField: 'Select when the project will have planning permission'
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
              thenUrl: '/addvalue/planning-required-condition',
              elseUrl: '/addvalue/planning-permission'
            }
          },
          nextUrl: 'project-items',
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
          sidebar:
          {
            heading: 'Eligibility',
            para: 'You will invalidate your application if you start the project or commit to any costs (such as placing orders) before you receive a funding agreement.\n \n Before you start the project, you can:',
            items: ['get quotes from suppliers', 'Apply for planning permission or other necessary licences.']
          },
          validate: {
            errorEmptyField: 'Select the option that applies to your project'
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
                text: 'For example, digging, signing contracts, placing orders'
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
          key: 'project-items',
          order: 80,
          title: 'What type of primary products are being processed?',
          pageTitle: '',
          url: 'project-items',
          baseUrl: 'project-items',
          backUrl: '/addvalue/project-start',
          nextUrl: 'acidification-infrastructure',
          sidebar: {
            heading: 'Eligibility',
            para: 'Only primary agricultural, horticultural, livestock, or forestry products are eligible under this scheme. Only wood sourced direct from harvested trees is eligible for this scheme: waste wood, offcuts, and sawmill waste are not eligible.'
          },
          ineligibleContent: {
            messageContent: `
              <span>Your project must process following types of primary products: </span>
              <ul class="govuk-body">
                <li>Arable crops – Cereals/Legumes/Oilseeds</li>
                <li>Horticultural crops – Vegetables/Fruits & Nuts/Edible Flowers</li>
                <li>Dairy or Meat produce</li>
                <li>Forestry products</li>
                <li>Fodder crops</li>
                <li>Non-edible flowers</li>
                <li>Fibre products</li>
              </ul>`,
            messageLink: {
              url: 'https://www.gov.uk/topic/farming-food-grants-payments/rural-grants-payments',
              title: 'See other grants you may be eligible for'
            }
          },
          fundingPriorities: '',
          type: 'single-answer',
          minAnswerCount: 1,
          ga: { dimension: '', value: '' },
          validate: {
            errorEmptyField: 'Select one of the answer'
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
              key: 'project-items-A1',
              value: 'Arable crops – Cereals/Legumes/Oilseeds'
            },
            {
              key: 'project-items-A2',
              value: 'Horticultural crops – Vegetables/Fruits & Nuts/Edible Flowers'
            },
            {
              key: 'project-items-A3',
              value: 'Dairy or Meat produce'
            },
            {
              key: 'project-items-A4',
              value: 'Forestry products'
            },
            {
              key: 'project-items-A5',
              value: 'Fodder crops'
            },
            {
              key: 'project-items-A6',
              value: 'Non-edible flowers'
            },
            {
              key: 'project-items-A7',
              value: 'Fibre products'
            },
            {
              key: 'project-items-A8',
              value: 'None of the above',
              notEligible: true
            }
          ],
          yarKey: 'projectItems'
        },
        {
          key: 'acidification-infrastructure',
          order: 81,
          title: 'What products will you produce as a result of the project?',
          hint: {
            text: 'Any work to adapt or install pipework, pumps etc to get  into the acidification system and then out to storage.'
          },
          pageTitle: '',
          url: 'acidification-infrastructure',
          baseUrl: 'acidification-infrastructure',
          backUrl: 'project-items',
          nextUrl: 'eligible-items',
          eliminationAnswerKeys: '',
          ineligibleContent: {},
          sidebar: {
            heading: 'Eligibility',
            para: 'Eligible Added-Value outputs include',
            items: [
              'Primary products that have (only) been sorted and/or packaged to accrue a higher value.',
              'Processed products made by transforming primary products into a new type of product.',
              'Primary products in lengthy Controlled Atmosphere or Dynamic Controlled Atmosphere storage to accrue a higher value.'
            ]
          },
          fundingPriorities: '',
          type: 'single-answer',
          minAnswerCount: 1,
          maxAnswerCount: 3,
          ga: { dimension: '', value: '' },
          validate: {
            errorEmptyField: 'Select one of the answer'
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
              key: 'acidification-infrastructure-A1',
              value: 'primary product that are kept in controlled atmosphere storage for longer so that they can be sold at a higher price'
            },
            {
              key: 'acidification-infrastructure-A2',
              value: 'primary product that are kept in dynamic controlled atmosphere storage, so that they can be sold at a higher price'
            },
            {
              key: 'acidification-infrastructure-A2',
              value: 'Primary product(s) that is prepared so that it can be sold at a higher price i.e washed veg/top and tail.'
            },
            {
              key: 'acidification-infrastructure-A2',
              value: 'primary product(s) that is graded so that it can be sold at a higher price'
            },
            {
              key: 'acidification-infrastructure-A2',
              value: 'primary product(s) that is packaged so that it can be sold at a higher price'
            },
            {
              key: 'acidification-infrastructure-A2',
              value: 'A new product(s) from the primary product(s) that you grow so that it can be sold at a higher price'
            },
            {
              value: 'divider'
            },
            {
              key: 'acidification-infrastructure-A2',
              value: 'None of the above',
              notEligible: true
            }
          ],
          yarKey: 'acidificationInfrastructure'
        },
        {
          key: 'eligible-items',
          order: 82,
          title: 'What eligible items does your project need?',
          pageTitle: '',
          url: 'eligible-items',
          baseUrl: 'eligible-items',
          backUrl: 'acidification-infrastructure',
          nextUrl: 'auxiliary-items',
          eliminationAnswerKeys: '',
          ineligibleContent: {
            messageContent: 'You cannot apply for a grant if you will not be using low emission precision application equipment.',
            messageLink: {
              url: 'https://www.gov.uk/government/collections/rural-payments-and-grants',
              title: 'See other grants you may be eligible for.'
            }
          },
          fundingPriorities: '',
          type: 'single-answer',
          minAnswerCount: 1,
          ga: { dimension: '', value: '' },
          validate: {
            errorEmptyField: 'Select the option'
          },
          sidebar: {
            heading: 'Eligibility',
            para: 'You must use low-emission precision application equipment.',
            items: []
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
              key: 'eligible-items-A1',
              value: 'Processing equipment or machinery'
            },
            {
              key: 'eligible-items-A2',
              value: 'Controlled atmosphere storage facilities'
            },
            {
              key: 'eligible-items-A3',
              value: 'Dynamic Controlled atmosphere storage facilities'
            },
            {
              value: 'divider'
            },
            {
              key: 'eligible-items-A4',
              value: 'No, I won’t be using the equipment',
              notEligible: true
            }
          ],
          yarKey: 'Application'
        },
        {
          key: 'auxiliary-items',
          order: 82,
          title: 'what Auxiliary items does your project need?',
          pageTitle: '',
          url: 'auxiliary-items',
          baseUrl: 'eligible-items',
          backUrl: 'acidification-infrastructure',
          nextUrl: 'project-cost',
          eliminationAnswerKeys: '',
          ineligibleContent: {
            messageContent: 'You cannot apply for a grant if you will not be using low emission precision application equipment.',
            messageLink: {
              url: 'https://www.gov.uk/government/collections/rural-payments-and-grants',
              title: 'See other grants you may be eligible for.'
            }
          },
          fundingPriorities: '',
          type: 'single-answer',
          minAnswerCount: 1,
          ga: { dimension: '', value: '' },
          validate: {
            errorEmptyField: 'Select the option'
          },
          sidebar: {
            heading: 'Eligibility',
            para: 'You must use low-emission precision application equipment.',
            items: []
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
              key: 'eligible-items-A1',
              value: 'Specialist vehicles'
            },
            {
              key: 'eligible-items-A2',
              value: 'Retail facilities'
            },
            {
              key: 'eligible-items-A3',
              value: 'Storage facilities *'
            },
            {
              value: 'divider'
            },
            {
              key: 'eligible-items-A4',
              value: 'No auxiliary facilities required.',
              notEligible: true
            }
          ],
          yarKey: 'Application'
        },
        {
          key: 'project-cost',
          order: 90,
          pageTitle: '',
          url: 'project-cost',
          baseUrl: 'project-cost',
          backUrl: 'eligible-items',
          nextUrl: 'potential-amount',
          classes: 'govuk-input--width-10',
          id: 'projectCost',
          name: 'projectCost',
          prefix: { text: '£' },
          type: 'input',
          grantInfo: {
            minGrant: 35000,
            maxGrant: 500000,
            grantPercentage: 40
          },
          label: {
            text: 'What is the estimated cost of the items?',
            classes: 'govuk-label--l',
            isPageHeading: true
          },
          hint: {
            html: `
              You can only apply for a grant of up to 40% of the estimated costs.
              <br/>Do not include VAT.
              <br/>The minimum grant you can apply for this project is £35,000 (40% of £87,500). The maximum grant is £500,000.
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
            heading: 'Items selected',
            para: '',
            items: [],
            dependentYarKey: 'projectItems'
          },
          validate: {
            errorEmptyField: 'Enter the estimated cost for the items',
            checkRegex: {
              regex: DIGITS_MAX_7,
              error: 'Enter a whole number with a maximum of 7 digits'
            }
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
              key: '',
              value: ''
            }
          ],
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
          nextUrl: 'SSSI',
          eliminationAnswerKeys: '',
          ineligibleContent: {
            messageContent: 'You cannot use public money (for example, grant funding from government or local authorities) towards the project costs.',
            insertText: { text: 'You can use loans, overdrafts and certain other grants, such as the Basic Payment Scheme or agri-environment schemes such as the Countryside Stewardship Scheme.Funds from a Producer Organisation are not an eligible source for this scheme.' },
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
            heading: 'Eligibility',
            para: `
              You cannot use any grant funding from government or local authorities.
              \n\nYou can use money from the Basic Payment Scheme or agri-environment schemes such as Countryside Stewardship Scheme.
            `,
            items: []
          },
          validate: {
            errorEmptyField: 'Select yes if you can pay the remaining costs without using any other grant money'
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
          key: 'SSSI',
          order: 120,
          title: 'What impact will the project have',
          pageTitle: '',
          url: 'SSSI',
          baseUrl: 'SSSI',
          backUrl: 'remaining-costs',
          nextUrl: 'project-impacts',
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
          validate: {
            errorEmptyField: 'Select yes if the project directly impacts a Site of Special Scientific Interest'
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
              key: 'SSSI-A1',
              value: 'Enables creation of new added-value products for the applicant business'
            },
            {
              key: 'SSSI-A2',
              value: 'Increases volume of existing added-value products for the applicant business'
            },
            {
              key: 'SSSI-A3',
              value: 'None of the above'
            }
          ],
          yarKey: 'SSSI'
        },
        {
          key: 'project-impacts',
          order: 130,
          title: 'What growth impact will the project have on your business?',
          pageTitle: '',
          url: 'project-impacts',
          nextUrl: 'market-impacts',
          baseUrl: 'project-impacts',
          backUrl: 'SSSI',
          hint: {
            html: '<br>Select one option<br>'
          },
          validate: {
            errorEmptyField: 'Select one option to describe the project impact'
          },
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
              key: 'project-impacts-A1',
              value: 'Increased productivity'
            },
            {
              key: 'project-impacts-A2',
              value: 'Increased profits'
            },
            {
              key: 'project-impacts-A3',
              value: 'Increased jobs'
            },
            {
              key: 'project-impacts-A4',
              value: 'Introduces innovative equipment or processes new to the business '
            },
            {
              key: 'project-impacts-A5',
              value: 'Introduces added-value processing as entirely new business activity'
            },
            {
              key: 'project-impacts-A6',
              value: 'none of the above'
            }
          ],
          yarKey: 'projectImpacts'

        },
        {
          key: 'market-impacts',
          order: 140,
          pageTitle: '',
          title: 'What impact will the project have on your markets?',
          url: 'market-impacts',
          baseUrl: 'market-impacts',
          backUrl: 'project-impacts',
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
              key: 'project-impacts-A1',
              value: 'Produces quantifiable benefits to other named producers'
            },
            {
              key: 'project-impacts-A2',
              value: 'Enables new collaborations or formal partnerships'
            },
            {
              key: 'project-impacts-A3',
              value: 'Benefits existing  collaborations or formal partnerships'
            },
            {
              key: 'project-impacts-A4',
              value: 'Shortens Supply chain (reduced miles)'
            },
            {
              key: 'project-impacts-A5',
              value: 'Increases local supply chain resilience'
            },
            {
              key: 'project-impacts-A6',
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
          validate: {
            errorEmptyField: 'Select the type of new technology your project needs'
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
              key: 'food-mile-impacts-A4',
              value: 'Internationally – outside the UK'
            }
          ],
          yarKey: 'projectPurchase'

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
          nextUrl: '/addvalue/applying',
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
          validate: {
            errorEmptyField: 'Select who is applying for this grant'
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
              key: 'applying-A1',
              value: 'Farmer',
              redirectUrl: '/addvalue/farmers-details'
            },
            {
              key: 'applying-A2',
              value: 'Agent',
              redirectUrl: '/addvalue/agents-details'
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
          backUrl: '/addvalue/applying',
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
              thenUrl: '/addvalue/applying',
              elseUrl: '/addvalue/agents-details'
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
              thenUrl: '/addvalue/farmers-details',
              elseUrl: '/addvalue/agents-details'
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
              surveyLink: 'https://defragroup.eu.qualtrics.com/jfe/form/SV_26sUm6qNA26AoK2'
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
