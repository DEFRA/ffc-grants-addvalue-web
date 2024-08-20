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
        Then the user should be at URL "agents-details"
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
            | ROW NO | FIELD NAME                                           | FIELD VALUE                                                          | DATA TYPE        |
            | 2      | FA or OA                                             | Outline Application                                                  |                  |
            | 4      | Single business identifier (SBI)                     | 123456789                                                            |                  |
            | 5      | Surname                                              | Farmer                                                               |                  |
            | 6      | Forename                                             | James                                                                |                  |
            | 7      | Business name                                        | Home Farm Ltd                                                        |                  |
            | 8      | Address line 1                                       | Home Farm                                                            |                  |
            | 9      | Address line 2                                       | Cogenhoe                                                             |                  |
            | 10     | Address line 3                                       |                                                                      |                  |
            | 11     | Address line 4 (town)                                | Northampton                                                          |                  |
            | 12     | Address line 5 (county)                              | Northamptonshire                                                     |                  |
            | 13     | Postcode (use capitals)                              | NN7 1NN                                                              |                  |
            | 16     | Landline number                                      | 01234 123456                                                         |                  |
            | 17     | Mobile number                                        | 07777 123456                                                         |                  |
            | 18     | Email                                                | cl-defra-tactical-grants-test-email-service-account@equalexperts.com |                  |
            | 20     | Business size                                        | Small                                                                |                  |
            | 22     | Employees                                            | 15                                                                   |                  |
            | 23     | Status of applicant                                  | Limited company                                                      |                  |
            | 26     | Agent Surname                                        | Agent                                                                |                  |
            | 27     | Agent Forename                                       | John                                                                 |                  |
            | 28     | Agent Business Name                                  | Farm Agency Ltd                                                      |                  |
            | 29     | Agent Address line 1                                 | High Street                                                          |                  |
            | 30     | Agent Address line 2                                 | Denton                                                               |                  |
            | 32     | Agent Address line 4 (town)                          | Northampton                                                          |                  |
            | 33     | Agent Address line 5 (County)                        | Northamptonshire                                                     |                  |
            | 34     | Agent Postcode (use capitals)                        | NN7 3NN                                                              |                  |
            | 35     | Agent Landline number                                | 01604 654321                                                         |                  |
            | 36     | Agent Mobile number                                  | 07777 654321                                                         |                  |
            | 37     | Agent Email                                          | test@equalexperts.com                                                |                  |
            | 39     | Sub scheme                                           | FTF-Adding Value Round 2                                             |                  |
            | 40     | Scheme                                               | Farming Transformation Fund                                          |                  |
            | 41     | Owner                                                | RD                                                                   |                  |
            | 42     | Project name                                         | Top Fruit Project                                                    |                  |
            | 43     | Theme                                                | Adding Value                                                         |                  |
            | 44     | Adding Value Project Items                           |                                                                      |                  |
            | 45     | Location of project (postcode)                       | NN7 2NN                                                              |                  |
            | 49     | Site of Special Scientific Interest (SSSI)           |                                                                      |                  |
            | 53     | Business type                                        | producer                                                             |                  |
            | 54     | Electronic OA received date                          | ?                                                                    | CURRENT-DATE     |
            | 55     | Total project expenditure                            | null                                                                 |                  |
            | 56     | Grant amount requested                               | 100000                                                               | INTEGER          |
            | 57     | Grant rate                                           | 40                                                                   |                  |
            | 85     | Full Application Submission Date                     | ?                                                                    | DATE-IN-6-MONTHS |
            | 89     | Customer Marketing Indicator                         | No                                                                   |                  |
            | 90     | Project type                                         | Adding Value                                                         |                  |
            | 91     | Are you an AGENT applying on behalf of your customer | Yes                                                                  |                  |
            | 92     | RAG rating                                           | Green                                                                |                  |
            | 93     | RAG date reviewed                                    | ?                                                                    | CURRENT-DATE     |
            | 94     | Current location of file                             | NA Automated                                                         |                  |
            | 341    | Grant Launch Date                                    |                                                                      |                  |
            | 342    | Land owned by Farm                                   | No                                                                   |                  |
            | 343    | Tenancy for next 5 years                             | Yes                                                                  |                  |
            | 345    | Remaining Cost to Farmer                             | 150000.00                                                            |                  |
            | 346    | Planning Permission Status                           | Not yet applied for                                                  |                  |
            | 365    | OA score                                             | Average                                                              |                  |
            | 366    | Date of OA decision                                  |                                                                      |                  |
            | 367    | Annual Turnover                                      | 7500000                                                              |                  |
            | 368    | Date ready for QC or decision                        | ?                                                                    | CURRENT-DATE     |
            | 369    | Eligibility Reference No.                            | ?                                                                    | REFERENCE-NUMBER |
            | 370    | Status                                               | Pending RPA review                                                   |                  |
            | 375    | OA percent                                           | 37.5                                                                 |                  |
            | 376    | Project Started                                      | Yes, preparatory work                                                |                  |
            | 386    | Products To Be Processed                             |                                                                      |                  |
            | 387    | How add value to products                            |                                                                      |                  |
            | 388    | AV Project Impact                                    |                                                                      |                  |
            | 389    | AV Target Customers                                  | No change                                                            |                  |
            | 390    | AV Farmer Collaborate                                | No                                                                   |                  |
            | 393    | AV Improve Environment                               | My project will not improve the environment                          |                  |
            | 394    | AV Business Type                                     | A grower or producer of agricultural or horticultural produce        |                  |
            | 395    | Storage Facilities                                   |                                                                      |                  |
            | 445    | Solar Cost                                           |                                                                      |                  |
            | 446    | Solar Grant Amount                                   | 0                                                                    | INTEGER          |
            | 527    | Project items cost                                   | 250000                                                               |                  |
            | 528    | Project items grant amount                           | 100000                                                               |                  |
