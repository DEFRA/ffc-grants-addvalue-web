Feature: Smaller Abattoir Journey

    Scenario: Successfully apply for a grant on the Smaller Abattoir journey
        - buying a solar PV system
        - using mechanisation
        - receiving a strong score
        - as the applicant

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
        When the user selects "Sole trader"
        And continues

        # country
        Then the user should be at URL "country"
        And should see heading "Is the planned project in England?"
        When the user selects "Yes"
        And continues

        # planning-permission
        Then the user should be at URL "planning-permission"
        And should see heading "Does the project have planning permission?"
        When the user selects "Secured"
        And continues

        # project-start
        Then the user should be at URL "project-start"
        And should see heading "Have you already started work on the project?"
        When the user selects "No, we have not done any work on this project yet"
        And continues

        # tenancy
        Then the user should be at URL "tenancy"
        And should see heading "Is the planned project on land the business owns?"
        When the user selects "Yes"
        And continues

        # smaller-abattoir
        Then the user should be at URL "smaller-abattoir"
        And should see heading "Do you want to build a new smaller abattoir?"
        When the user selects "Yes"
        And continues

        # other-farmers
        Then the user should be at URL "other-farmers"
        And should see heading "Will this abattoir provide services to other farmers?"
        When the user selects "Yes"
        And continues

        # project-items
        Then the user should be at URL "project-items"
        And should see heading "What eligible items does your project need?"
        When the user selects the following
            | Constructing or improving buildings for processing |
        And continues

        # storage
        Then the user should be at URL "storage"
        And should see heading "Does your project also need storage facilities?"
        When the user selects "Yes, we will need storage facilities"
        And continues

        # solar-PV-system
        Then the user should be at URL "solar-PV-system"
        And should see heading "Will you buy a solar PV system with this grant?"
        When the user selects "Yes"
        And continues

        # project-cost
        Then the user should be at URL "project-cost"
        And should see heading label "What is the estimated cost of the items?"
        When the user enters "100000" in "projectCost"
        And continues

        # solar-PV-cost
        Then the user should be at URL "solar-PV-cost"
        And should see heading label "What is the estimated cost of buying and installing the solar PV system?"
        When the user enters "50000" in "solarPVCost"
        And continues

        # potential-amount-solar
        Then the user should be at URL "potential-amount-solar"
        And should see heading "Potential grant funding"
        And should see body "You may be able to apply for a grant of up to £52,500, based on the total estimated cost of £150,000."
        And should see bullet point "£40,000 for building costs (40% of £100,000)"
        And should see bullet point "£12,500 for solar PV system costs (25% of £50,000)"
        And continues

        # remaining-costs
        Then the user should be at URL "remaining-costs"
        And should see heading "Can you pay the remaining costs of £97,500?"
        When the user selects "Yes"
        And continues

        # produce-processed
        Then the user should be at URL "produce-processed"
        And should see heading "What type of produce is being processed?"
        When the user selects "Wild venison meat produce"
        And continues

        # how-adding-value
        Then the user should be at URL "how-adding-value"
        And should see heading "How will this project add value to the produce?"
        When the user selects "Introducing a new product to your farm"
        And continues

        # project-impact
        Then the user should be at URL "project-impact"
        And should see heading "What impact will this project have?"
        When the user selects the following
            | Increasing range of added-value products  |
            | Increasing volume of added-value products |
        And continues

        # mechanisation
        Then the user should be at URL "mechanisation"
        And should see heading "Will this project use any mechanisation instead of manual labour?"
        When the user selects "Yes"
        And continues

        # manual-labour-amount
        Then the user should be at URL "manual-labour-amount"
        And should see heading "How much manual labour will the mechanisation be equal to?"
        When the user selects "More than 10%"
        And continues

        # future-customers
        Then the user should be at URL "future-customers"
        And should see heading "Who will your new customers be after this project?"
        When the user selects the following
            | Processors  |
            | Wholesalers |
        And continues

        # collaboration
        Then the user should be at URL "collaboration"
        And should see heading "Will you work in partnership or collaborate with other farmers or producers?"
        When the user selects "Yes"
        And continues

        # environmental-impact
        Then the user should be at URL "environmental-impact"
        And should see heading "How will this project improve the environment?"
        When the user selects the following
            | Renewable energy  |
            | Energy efficiency |
        And continues to their score

        # score
        Then the user should be at URL "score"
        And should see "Strong" for their project score
        And should see the following scoring answers
            | TOPIC                | ANSWERS                                   | SCORE   |
            | Produce processed    | Wild venison meat produce                 | Strong  |
            | Adding value         | Introducing a new product to your farm    | Strong  |
            | Project impact       | Increasing range of added-value products  | Average |
            |                      | Increasing volume of added-value products |         |
            | Mechanisation        | Yes, more than 10%                        | Strong  |
            | New customers        | Processors                                | Weak    |
            |                      | Wholesalers                               |         |
            | Collaboration        | Yes                                       | Strong  |
            | Environmental impact | Renewable energy                          | Strong  |
            |                      | Energy efficiency                         |         |
        When the user continues

        # business-details
        Then the user should be at URL "business-details"
        And should see heading "Business details"
        When the user enters the following
            | FIELD                            | VALUE                    | ID               |
            | Project name                     | Smaller Abattoir Project | projectName      |
            | Business name                    | Test Farm Ltd            | businessName     |
            | Number of employees              | 5                        | numberEmployees  |
            | Annual business turnover (£)     | 2000000                  | businessTurnover |
            | Single Business Identifier (SBI) | 123456789                | sbi              |
        And continues

        # applying
        Then the user should be at URL "applying"
        And should see heading "Who is applying for this grant?"
        When the user selects "Applicant"
        And continues

        # applicant-details
        Then the user should be at URL "applicant-details"
        And should see heading "Applicant's details"
        When the user enters the following
            | FIELD                 | VALUE                                                          | ID                  |
            | First name            | James                                                          | firstName           |
            | Last name             | Test-Farmer                                                    | lastName            |
            | Email address         | cl-defra-tactical-grants-test-applicant-email@equalexperts.com | emailAddress        |
            | Confirm email address | cl-defra-tactical-grants-test-applicant-email@equalexperts.com | confirmEmailAddress |
            | Mobile phone number   | 07777 123456                                                   | mobileNumber        |
            | Landline number       | 01604 123456                                                   | landlineNumber      |
            | Address line 1        | Test Farm                                                      | address1            |
            | Address line 2        | Cogenhoe                                                       | address2            |
            | Town                  | Northampton                                                    | town                |
            | County                | Northamptonshire                                               | county              |
            | Postcode              | NN7 1NN                                                        | postcode            |
            | Project postcode      | NN7 2NN                                                        | projectPostcode     |
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
            | ROW NO | FIELD NAME                                           | FIELD VALUE                                                                         | DATA TYPE        |
            | 2      | FA or OA                                             | Outline Application                                                                 |                  |
            | 4      | Single business identifier (SBI)                     | 123456789                                                                           |                  |
            | 5      | Surname                                              | Test-Farmer                                                                         |                  |
            | 6      | Forename                                             | James                                                                               |                  |
            | 7      | Business name                                        | Test Farm Ltd                                                                       |                  |
            | 8      | Address line 1                                       | Test Farm                                                                           |                  |
            | 9      | Address line 2                                       | Cogenhoe                                                                            |                  |
            | 10     | Address line 3                                       |                                                                                     |                  |
            | 11     | Address line 4 (town)                                | Northampton                                                                         |                  |
            | 12     | Address line 5 (county)                              | Northamptonshire                                                                    |                  |
            | 13     | Postcode (use capitals)                              | NN7 1NN                                                                             |                  |
            | 16     | Landline number                                      | 01604 123456                                                                        |                  |
            | 17     | Mobile number                                        | 07777 123456                                                                        |                  |
            | 18     | Email                                                | cl-defra-tactical-grants-test-applicant-email@equalexperts.com                      |                  |
            | 20     | Business size                                        | Small                                                                               |                  |
            | 22     | Employees                                            | 5                                                                                   |                  |
            | 23     | Status of applicant                                  | Sole trader                                                                         |                  |
            | 26     | Agent Surname                                        |                                                                                     |                  |
            | 27     | Agent Forename                                       |                                                                                     |                  |
            | 28     | Agent Business Name                                  |                                                                                     |                  |
            | 29     | Agent Address line 1                                 |                                                                                     |                  |
            | 30     | Agent Address line 2                                 |                                                                                     |                  |
            | 32     | Agent Address line 4 (town)                          |                                                                                     |                  |
            | 33     | Agent Address line 5 (County)                        |                                                                                     |                  |
            | 34     | Agent Postcode (use capitals)                        |                                                                                     |                  |
            | 35     | Agent Landline number                                |                                                                                     |                  |
            | 36     | Agent Mobile number                                  |                                                                                     |                  |
            | 37     | Agent Email                                          |                                                                                     |                  |
            | 39     | Sub scheme                                           | FTF-Adding Value Round 2                                                            |                  |
            | 40     | Scheme                                               | Farming Transformation Fund                                                         |                  |
            | 41     | Owner                                                | RD                                                                                  |                  |
            | 42     | Project name                                         | Smaller Abattoir Project                                                            |                  |
            | 43     | Theme                                                | Adding Value                                                                        |                  |
            | 44     | Adding Value Project Items                           | Constructing or improving buildings for processing\|Storage Facilities              |                  |
            | 45     | Location of project (postcode)                       | NN7 2NN                                                                             |                  |
            | 49     | Site of Special Scientific Interest (SSSI)           |                                                                                     |                  |
            | 53     | Business type                                        | producer                                                                            |                  |
            | 54     | Electronic OA received date                          | ?                                                                                   | CURRENT-DATE     |
            | 55     | Total project expenditure                            | 150000                                                                              |                  |
            | 56     | Grant amount requested                               | 52500                                                                               | INTEGER          |
            | 57     | Grant rate                                           | 35.00                                                                               |                  |
            | 85     | Full Application Submission Date                     | ?                                                                                   | DATE-IN-6-MONTHS |
            | 89     | Customer Marketing Indicator                         | No                                                                                  |                  |
            | 90     | Project type                                         | Adding Value                                                                        |                  |
            | 91     | Are you an AGENT applying on behalf of your customer | No                                                                                  |                  |
            | 92     | RAG rating                                           | Green                                                                               |                  |
            | 93     | RAG date reviewed                                    | ?                                                                                   | CURRENT-DATE     |
            | 94     | Current location of file                             | NA Automated                                                                        |                  |
            | 341    | Grant Launch Date                                    |                                                                                     |                  |
            | 342    | Land owned by Farm                                   | Yes                                                                                 |                  |
            | 343    | Tenancy for next 5 years                             |                                                                                     |                  |
            | 345    | Remaining Cost to Farmer                             | 97500                                                                               | INTEGER          |
            | 346    | Planning Permission Status                           | Approved                                                                            |                  |
            | 365    | OA score                                             | Strong                                                                              |                  |
            | 366    | Date of OA decision                                  |                                                                                     |                  |
            | 367    | Annual Turnover                                      | 2000000                                                                             |                  |
            | 368    | Date ready for QC or decision                        | ?                                                                                   | CURRENT-DATE     |
            | 369    | Eligibility Reference No.                            | ?                                                                                   | REFERENCE-NUMBER |
            | 370    | Status                                               | Pending RPA review                                                                  |                  |
            | 375    | OA percent                                           | 72.33                                                                               |                  |
            | 376    | Project Started                                      | No, we have not done any work on this project yet                                   |                  |
            | 386    | Products To Be Processed                             | Wild venison meat produce                                                           |                  |
            | 387    | How add value to products                            | Introducing a new product to your farm                                              |                  |
            | 388    | AV Project Impact                                    | Increasing range of added-value products\|Increasing volume of added-value products |                  |
            | 389    | AV Target Customers                                  | Processors\|Wholesalers                                                             |                  |
            | 390    | AV Farmer Collaborate                                | Yes                                                                                 |                  |
            | 393    | AV Improve Environment                               | Renewable energy\|Energy efficiency                                                 |                  |
            | 394    | AV Business Type                                     | A grower or producer of agricultural or horticultural produce                       |                  |
            | 395    | Storage Facilities                                   | Yes                                                                                 |                  |
            | 445    | Solar Cost                                           | 50000                                                                               |                  |
            | 446    | Solar Grant Amount                                   | 12500                                                                               | INTEGER          |
            | 527    | Project items cost                                   | 100000                                                                              |                  |
            | 528    | Project items grant amount                           | 40000                                                                               |                  |
