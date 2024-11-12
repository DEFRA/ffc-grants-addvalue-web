import http from 'k6/http';
import { sleep } from 'k6';
import { describe, expect } from 'https://jslib.k6.io/k6chaijs/4.3.4.3/index.js';

export const options = {
    scenarios: {
        journey: {
            executor: 'ramping-vus',
            startVUs: 0,
            stages: [
                { duration: '15s', target: 50 },
                { duration: '45s', target: 50 }
            ],
            gracefulRampDown: '0s',
            gracefulStop: '60s'
        },
    },
    thresholds: {
        http_req_duration: ['p(99)<1500'], // 99% of requests should be below 1500ms
    }
};

export default function () {
    describe('Checker Journey', (t) => { performCheckerJourney() });
}

function performCheckerJourney () {
    const submitForm = function(fields) {
        sleep(3); // mimic human interaction
        fields = fields ?? {};
        let crumb = response.html().find(`input[name='crumb']`).attr('value');
        fields['crumb'] = crumb;
        response = response.submitForm({ formSelector: `form[method='POST']`, fields: fields });
        expect(response.status).to.equal(200);
    }

    const followLink = function(text) {
        response = response.clickLink({ selector: `a:contains('${text}')` });
        expect(response.status).to.equal(200);
    }

    let response = null;

    try {
        response = http.get(`${__ENV.TEST_ENVIRONMENT_ROOT_URL}/adding-value/start`);
        expect(response.status).to.equal(200);

        // navigate past start page
        if (response.url.endsWith('login')) {
            submitForm({ username: 'grants', password: 'grants2021' });
        }
        followLink('Start now');

        // nature-of-business
        submitForm({ applicantBusiness: 'A grower or producer of agricultural or horticultural produce' });
        // legal-status
        submitForm({ legalStatus: 'Sole trader' });    
        // country
        submitForm({ inEngland: 'Yes' });
        // planning-permission
        submitForm({ planningPermission: 'Secured' });
        // project-start
        submitForm({ projectStart: 'No, we have not done any work on this project yet'} );
        // tenancy
        submitForm({ tenancy: 'Yes'});
        // smaller-abattoir
        submitForm({ smallerAbattoir: 'Yes'});
        // other-farmers
        submitForm({ otherFarmers: 'Yes' });
        // project-items
        submitForm({ projectItems: 'Constructing or improving buildings for processing' });
        // storage
        submitForm({ storage: 'Yes, we will need storage facilities' });
        // solar-PV-system
        submitForm({ solarPVSystem: 'Yes' });
        // project-cost
        submitForm({ projectCost: '100000' });
        // solar-PV-cost
        submitForm({ solarPVCost: '50000' });
        // potential-amount-solar
        followLink('Continue');
        // remaining-costs
        submitForm({ canPayRemainingCost: 'Yes' });
        // produce-processed
        submitForm({ productsProcessed: 'Wild venison meat produce' });
        // how-adding-value
        submitForm({ howAddingValue: 'Introducing a new product to your farm' });
        // project-impact
        submitForm({ projectImpact: ['Introducing a new product to your farm', 'Increasing volume of added-value products'] });
        // mechanisation
        submitForm({ mechanisation: 'Yes' });
        // manual-labour-amount
        submitForm({ manualLabour: 'More than 10%' });
        // future-customers
        submitForm({ futureCustomers: ['Processors', 'Wholesalers'] });
        // collaboration
        submitForm({ collaboration: 'Yes' });
        // environmental-impact
        submitForm({ environmentalImpact: ['Renewable energy', 'Energy efficiency'] });
        // score
        submitForm();
        // business-details
        submitForm({ projectName: 'Smaller Abattoir Project', businessName: 'Test Farm Ltd', numberEmployees: '5', businessTurnover: '2000000', sbi: '123456789' });
        // applying
        submitForm({ applying: 'Applicant' });
        // applicant-details
        submitForm({
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
        submitForm();
        // confirm
        submitForm({ consentMain: 'true' });
    } catch (error) {
        console.error(`Error for URL: ${response?.url}, body: ${response.body.substring(0, 200)}`);
        throw error;
    }
}
