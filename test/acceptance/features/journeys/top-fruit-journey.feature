@journey
Feature: Top Fruit Journey

    Scenario: Successfully apply for a grant on the Top Fruit journey
        - while awaiting planning permission
        - on land business doesn't own
        - receiving an average score
        - as an agent

        # login/start
        Given the user navigates to "/adding-value/start"
        And completes any login process
        And clicks on "Accept analytics cookies"
        Then the user should see heading "Check if you can apply for a Farming Investment Fund Adding Value Round 2 Grant"
        When the user clicks on "Start now"

        # nature-of-business
        Then the user should be at URL "nature-of-business"
        And should see heading "What is your business?"
        When the user selects "A grower or producer of agricultural or horticultural produce"
        And continues

        # legal-status
        Then the user should be at URL "legal-status"
        And should see heading "What is the legal status of the business?"
        When the user selects "Limited company"
        And continues

        # country
        Then the user should be at URL "country"
        And should see heading "Is the planned project in England?"
        When the user selects "Yes"
        And continues

        # planning-permission
        Then the user should be at URL "planning-permission"
        And should see heading "Does the project have planning permission?"
        When the user selects "Should be in place by the time I make my full application"
        And continues

        # planning-required-condition
        Then the user should be at URL "planning-required-condition"
        And should see heading "You may be able to apply for this grant"
        When the user continues

        # project-start
        Then the user should be at URL "project-start"
        And should see heading "Have you already started work on the project?"
        When the user selects "Yes, preparatory work"
        And continues

        # tenancy
        Then the user should be at URL "tenancy"
        And should see heading "Is the planned project on land the business owns?"
        When the user selects "No"
        And continues

        # tenancy-length
        Then the user should be at URL "tenancy-length"
        And should see heading "Do you have a tenancy agreement for 5 years after the final grant payment?"
        When the user selects "Yes"
        And continues

        # smaller-abattoir
        Then the user should be at URL "smaller-abattoir"
        And should see heading "Do you want to build a new smaller abattoir?"
        When the user selects "No"
        And continues

        # fruit-storage
        Then the user should be at URL "fruit-storage"
        And should see heading "Do you want to build new controlled atmosphere storage for top fruit?"
        When the user selects "Yes"
        And continues

        # solar-PV-system
        Then the user should be at URL "solar-PV-system"
        And should see heading "Will you buy a solar PV system with this grant?"
        When the user selects "No"
        And continues

        # project-cost
        Then the user should be at URL "project-cost"
        And should see heading label "What is the estimated cost of the items?"
        When the user enters "250000" in "projectCost"
        And continues

        # potential-amount
        Then the user should be at URL "potential-amount"
        And should see heading "Potential grant funding"
        And should see body "You may be able to apply for grant funding of up to £100,000 (40% of £250,000)."
        And continues

        # remaining-costs
        Then the user should be at URL "remaining-costs"
        And should see heading "Can you pay the remaining costs of £150,000?"
        When the user selects "Yes"
        And continues

        # mechanisation
        Then the user should be at URL "mechanisation"
        And should see heading "Will this project use any mechanisation instead of manual labour?"
        When the user selects "No"
        And continues

        # future-customers
        Then the user should be at URL "future-customers"
        And should see heading "Who will your new customers be after this project?"
        When the user selects the following
            | No change |
        And continues

        # collaboration
        Then the user should be at URL "collaboration"
        And should see heading "Will you work in partnership or collaborate with other farmers or producers?"
        When the user selects "No"
        And continues

        # environmental-impact
        Then the user should be at URL "environmental-impact"
        And should see heading "How will this project improve the environment?"
        When the user selects the following
            | My project will not improve the environment |
        And continues to their score

        # score
        Then the user should be at URL "score"
        And should see "Average" for their project score
        And should see the following scoring answers
            | TOPIC                | ANSWERS                                     | SCORE |
            | Mechanisation        | No                                          | Weak  |
            | New customers        | No change                                   | Weak  |
            | Collaboration        | No                                          | Weak  |
            | Environmental impact | My project will not improve the environment | Weak  |
        When the user continues

        # business-details
        Then the user should be at URL "business-details"
        And should see heading "Business details"
        When the user enters the following
            | FIELD                            | VALUE             | ID               |
            | Project name                     | Top Fruit Project | projectName      |
            | Business name                    | Home Farm Ltd     | businessName     |
            | Number of employees              | 15                | numberEmployees  |
            | Annual business turnover (£)     | 7500000           | businessTurnover |
            | Single Business Identifier (SBI) | 123456789         | sbi              |
        And continues

        # applying
        Then the user should be at URL "applying"
        And should see heading "Who is applying for this grant?"
        When the user selects "Agent"
        And continues

        # agent-details
        Then the user should be at URL "agent-details"
        And should see heading "Agent's details"
        When the user enters the following
            | FIELD                 | VALUE                 | ID                  |
            | First name            | John                  | firstName           |
            | Last name             | Agent                 | lastName            |
            | Business name         | Farm Agency Ltd       | businessName        |
            | Email address         | test@equalexperts.com | emailAddress        |
            | Confirm email address | test@equalexperts.com | confirmEmailAddress |
            | Mobile phone number   | 07777 654321          | mobileNumber        |
            | Landline number       | 01604 654321          | landlineNumber      |
            | Address line 1        | High Street           | address1            |
            | Address line 2        | Denton                | address2            |
            | Town                  | Northampton           | town                |
            | County                | Northamptonshire      | county              |
            | Postcode              | NN7 3NN               | postcode            |
        And continues

        # applicant-details
        Then the user should be at URL "applicant-details"
        And should see heading "Applicant's details"
        When the user enters the following
            | FIELD                 | VALUE                                                                | ID                  |
            | First name            | James                                                                | firstName           |
            | Last name             | Farmer                                                               | lastName            |
            | Email address         | cl-defra-tactical-grants-test-email-service-account@equalexperts.com | emailAddress        |
            | Confirm email address | cl-defra-tactical-grants-test-email-service-account@equalexperts.com | confirmEmailAddress |
            | Mobile phone number   | 07777 123456                                                         | mobileNumber        |
            | Landline number       | 01234 123456                                                         | landlineNumber      |
            | Address line 1        | Home Farm                                                            | address1            |
            | Address line 2        | Cogenhoe                                                             | address2            |
            | Town                  | Northampton                                                          | town                |
            | County                | Northamptonshire                                                     | county              |
            | Postcode              | NN7 1NN                                                              | postcode            |
            | Project postcode      | NN7 2NN                                                              | projectPostcode     |
        And continues

        # check-details
        Then the user should be at URL "check-details"
        And should see heading "Check your details"
        And continues

        # confirm
        Then the user should be at URL "confirm"
        And should see heading "Confirm and send"
        And confirms and sends

        # confirmation
        Then the user should be at URL "confirmation"
        And should see heading "Details submitted"
        And should see a reference number for their application
        Then a spreadsheet should be generated with the following values
            | FIELD NAME                                           | FIELD VALUE                                                          | DATA TYPE        |
            | FA or OA                                             | Outline Application                                                  |                  |
            | Single business identifier (SBI)                     | 123456789                                                            |                  |
            | Surname                                              | Farmer                                                               |                  |
            | Forename                                             | James                                                                |                  |
            | Business name                                        | Home Farm Ltd                                                        |                  |
            | Address line 1                                       | Home Farm                                                            |                  |
            | Address line 2                                       | Cogenhoe                                                             |                  |
            | Address line 3                                       |                                                                      |                  |
            | Address line 4 (town)                                | Northampton                                                          |                  |
            | Address line 5 (county)                              | Northamptonshire                                                     |                  |
            | Postcode (use capitals)                              | NN7 1NN                                                              |                  |
            | Landline number                                      | 01234 123456                                                         |                  |
            | Mobile number                                        | 07777 123456                                                         |                  |
            | Email                                                | cl-defra-tactical-grants-test-email-service-account@equalexperts.com |                  |
            | Business size                                        | Small                                                                |                  |
            | Employees                                            | 15                                                                   |                  |
            | Status of applicant                                  | Limited company                                                      |                  |
            | Agent Surname                                        | Agent                                                                |                  |
            | Agent Forename                                       | John                                                                 |                  |
            | Agent Business Name                                  | Farm Agency Ltd                                                      |                  |
            | Agent Address line 1                                 | High Street                                                          |                  |
            | Agent Address line 2                                 | Denton                                                               |                  |
            | Agent Address line 4 (town)                          | Northampton                                                          |                  |
            | Agent Address line 5 (County)                        | Northamptonshire                                                     |                  |
            | Agent Postcode (use capitals)                        | NN7 3NN                                                              |                  |
            | Agent Landline number                                | 01604 654321                                                         |                  |
            | Agent Mobile number                                  | 07777 654321                                                         |                  |
            | Agent Email                                          | test@equalexperts.com                                                |                  |
            | Sub scheme                                           | FTF-Adding Value Round 2                                             |                  |
            | Scheme                                               | Farming Transformation Fund                                          |                  |
            | Owner                                                | RD                                                                   |                  |
            | Project name                                         | Top Fruit Project                                                    |                  |
            | Theme                                                | Adding Value                                                         |                  |
            | Adding Value Project Items                           |                                                                      |                  |
            | Location of project (postcode)                       | NN7 2NN                                                              |                  |
            | Site of Special Scientific Interest (SSSI)           |                                                                      |                  |
            | Business type                                        | producer                                                             |                  |
            | Electronic OA received date                          | ?                                                                    | CURRENT-DATE     |
            | Total project expenditure                            | null                                                                 |                  |
            | Grant amount requested                               | 100000                                                               | INTEGER          |
            | Grant rate                                           | 40                                                                   |                  |
            | Full Application Submission Date                     | ?                                                                    | DATE-IN-6-MONTHS |
            | Customer Marketing Indicator                         | No                                                                   |                  |
            | Project type                                         | Adding Value                                                         |                  |
            | Are you an AGENT applying on behalf of your customer | Yes                                                                  |                  |
            | RAG rating                                           | Green                                                                |                  |
            | RAG date reviewed                                    | ?                                                                    | CURRENT-DATE     |
            | Current location of file                             | NA Automated                                                         |                  |
            | Grant Launch Date                                    |                                                                      |                  |
            | Land owned by Farm                                   | No                                                                   |                  |
            | Tenancy for next 5 years                             | Yes                                                                  |                  |
            | Remaining Cost to Farmer                             | 150000.00                                                            |                  |
            | Planning Permission Status                           | Not yet applied for                                                  |                  |
            | OA score                                             | Average                                                              |                  |
            | Date of OA decision                                  |                                                                      |                  |
            | Annual Turnover                                      | 7500000                                                              |                  |
            | Date ready for QC or decision                        | ?                                                                    | CURRENT-DATE     |
            | Eligibility Reference No.                            | ?                                                                    | REFERENCE-NUMBER |
            | Status                                               | Pending RPA review                                                   |                  |
            | OA percent                                           | 37.5                                                                 |                  |
            | Project Started                                      | Yes, preparatory work                                                |                  |
            | Products To Be Processed                             |                                                                      |                  |
            | How add value to products                            |                                                                      |                  |
            | AV Project Impact                                    |                                                                      |                  |
            | AV Target Customers                                  | No change                                                            |                  |
            | AV Farmer Collaborate                                | No                                                                   |                  |
            | AV Improve Environment                               | My project will not improve the environment                          |                  |
            | AV Business Type                                     | A grower or producer of agricultural or horticultural produce        |                  |
            | Storage Facilities                                   |                                                                      |                  |
            | Solar Cost                                           |                                                                      |                  |
            | Solar Grant Amount                                   | 0                                                                    | INTEGER          |
            | Project items cost                                   | 250000                                                               |                  |
            | Project items grant amount                           | 100000                                                               |                  |
