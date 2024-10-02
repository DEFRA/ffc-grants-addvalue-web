import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    vus: 50,
    duration: '2m',
    thresholds: {
      http_req_failed: ['rate<0.01'], // http errors should be less than 1%
      http_req_duration: ['p(95)<1500'], // 95% of requests should be below 1500ms
    }
};

export default function () {
    const submitJourneyForm = function(fields) {
        sleep(3); // mimic human behaviour
        fields = fields ?? {};
        fields['crumb'] = crumb;
        response = response.submitForm({ formSelector: `form[method='POST']`, fields: fields });
        check(response, { 'is http response status 200': (r) => r.status === 200 });
    }

    const followLinkWithText = function(text) {
        response = response.clickLink({ selector: `a:contains('${text}')` });
    }

    let response = http.get('https://ffc-grants-frontend-test.azure.defra.cloud/adding-value/start');

    // start
    if (response.url.endsWith('login')) {
        response = response.submitForm({ fields: { username: 'grants', password: 'grants2021' }});
    }
    followLinkWithText('Start now');
    let crumb = response.html().find('#crumb').attr('value');

    // nature-of-business
    submitJourneyForm({ applicantBusiness: 'applicantBusiness' });
    // legal-status
    submitJourneyForm({ legalStatus: 'Sole trader' });    
    // country
    submitJourneyForm({ inEngland: 'Yes' });
    // planning-permission
    submitJourneyForm({ planningPermission: 'Secured' });
    // project-start
    submitJourneyForm({ projectStart: 'No, we have not done any work on this project yet'} );
    // tenancy
    submitJourneyForm({ tenancy: 'Yes'});
    // smaller-abattoir
    submitJourneyForm({ smallerAbattoir: 'Yes'});
    // other-farmers
    submitJourneyForm({ otherFarmers: 'Yes' });
    // project-items
    submitJourneyForm({ projectItems: 'Constructing or improving buildings for processing' });
    // storage
    submitJourneyForm({ storage: 'Yes, we will need storage facilities' });
    // solar-PV-system
    submitJourneyForm({ solarPVSystem: 'Yes' });
    // project-cost
    submitJourneyForm({ projectCost: '100000' });
    // solar-PV-cost
    submitJourneyForm({ solarPVCost: '50000' });
    // potential-amount-solar
    followLinkWithText('Continue');
    // remaining-costs
    submitJourneyForm({ canPayRemainingCost: 'Yes' });
    // produce-processed
    submitJourneyForm({ productsProcessed: 'Wild venison meat produce' });
    // how-adding-value
    submitJourneyForm({ howAddingValue: 'Introducing a new product to your farm' });
    // project-impact
    submitJourneyForm({ projectImpact: ['Increasing range of added-value products', 'Increasing volume of added-value products'] });
    // mechanisation
    submitJourneyForm({ mechanisation: 'Yes' });
    // manual-labour-amount
    submitJourneyForm({ manualLabour: 'More than 10%' });
    // future-customers
    submitJourneyForm({ futureCustomers: ['Processors', 'Wholesalers'] });
    // collaboration
    submitJourneyForm({ collaboration: 'Yes' });
    // environmental-impact
    submitJourneyForm({ environmentalImpact: ['Renewable energy', 'Energy efficiency'] });
    // score
    submitJourneyForm();
    // business-details
    submitJourneyForm({ projectName: 'Smaller Abattoir Project', businessName: 'Test Farm Ltd', numberEmployees: '5', businessTurnover: '2000000', sbi: '123456789' });
    // applying
    submitJourneyForm({ applying: 'Applicant' });
    // applicant-details
    submitJourneyForm({
        firstName: 'James',
        lastName: 'Test-Farmer',
        emailAddress: 'cl-defra-tactical-grants-test-applicant-email@equalexperts.com',
        confirmEmailAddress: 'cl-defra-tactical-grants-test-applicant-email@equalexperts.com',
        mobileNumber: '07777 123456',
        landlineNumber: '01604 123456',
        address1: 'Test Farm',
        address2: 'Cogenhoe',
        town: 'Northampton',
        county: 'Northamptonshire',
        postcode: 'NN7 1NN',
        projectPostcode: 'NN7 2NN'
     });
     // check-details
     submitJourneyForm();
     // confirm
     submitJourneyForm();
}
