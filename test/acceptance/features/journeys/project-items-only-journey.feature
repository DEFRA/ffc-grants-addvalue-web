Feature: Project Items-Only Journey

    Scenario: Successfully apply for a grant on the Project Items-only journey
        - checking storage percentage
        - receiving an average score
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
        When the user selects "A business processing agricultural or horticultural products that is at least 50% owned by agricultural or horticultural producers"
        And continues

        # legal-status
        Then the user should be at URL "legal-status"
        And should see heading "What is the legal status of the business?"
        When the user selects "Co-operative society (Co-Op)"
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
        When the user selects "No"
        And continues

        # fruit-storage
        Then the user should be at URL "fruit-storage"
        And should see heading "Do you want to build new controlled atmosphere storage for top fruit?"
        When the user selects "No"
        And continues

        # project-items
        Then the user should be at URL "project-items"
        And should see heading "What eligible items does your project need?"
        And should see hint "Storage facilities will only be funded as part of a bigger project and cannot be more than 40% of the total grant funding."
        When the user selects the following
            | Constructing or improving buildings for processing |
            | Processing equipment or machinery                  |
            | Retail facilities                                  |
        And continues

        # storage
        Then the user should be at URL "storage"
        And should see heading "Does your project also need storage facilities?"
        And should see warning "Storage facilities cannot be more than 40% of the total grant funding."
        When the user selects "No"
        And continues

        # solar-PV-system
        Then the user should be at URL "solar-PV-system"
        And should see heading "Will you buy a solar PV system with this grant?"
        When the user selects "No"
        And continues

        # project-cost
        Then the user should be at URL "project-cost"
        And should see heading label "What is the estimated cost of the items?"
        When the user enters "125000" in "projectCost"
        And continues

        # potential-amount
        Then the user should be at URL "potential-amount"
        And should see heading "Potential grant funding"
        And should see body "You may be able to apply for grant funding of up to £50,000 (40% of £125,000)."
        And continues

        # remaining-costs
        Then the user should be at URL "remaining-costs"
        And should see heading "Can you pay the remaining costs of £75,000?"
        When the user selects "Yes"
        And continues

        # produce-processed
        Then the user should be at URL "produce-processed"
        And should see heading "What type of produce is being processed?"
        When the user selects "Fibre produce"
        And continues

        # how-adding-value
        Then the user should be at URL "how-adding-value"
        And should see heading "How will this project add value to the produce?"
        When the user selects "Packing produce"
        And continues

        # project-impact
        Then the user should be at URL "project-impact"
        And should see heading "What impact will this project have?"
        When the user selects the following
            | Increasing range of added-value products  |
            | Increasing volume of added-value products |
            | Allow selling direct to consumer          |
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
            | Processors                  |
            | Wholesalers                 |
            | Retailers                   |
            | Selling direct to consumers |
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
            | Renewable energy  |
            | Energy efficiency |
            | Water efficiency  |
        And continues to their score

        # score
        Then the user should be at URL "score"
        And should see "Average" for their project score
        And should see the following scoring answers
            | TOPIC                | ANSWERS                                   | SCORE   |
            | Produce processed    | Fibre produce                             | Weak    |
            | Adding value         | Packing produce                           | Weak    |
            | Project impact       | Increasing range of added-value products  | Average |
            |                      | Increasing volume of added-value products |         |
            |                      | Allow selling direct to consumer          |         |
            | Mechanisation        | No                                        | Weak    |
            | New customers        | Processors                                | Strong  |
            |                      | Wholesalers                               |         |
            |                      | Retailers                                 |         |
            |                      | Selling direct to consumers               |         |
            | Collaboration        | No                                        | Weak    |
            | Environmental impact | Renewable energy                          | Strong  |
            |                      | Energy efficiency                         |         |
            |                      | Water efficiency                          |         |
        When the user continues

        # business-details
        Then the user should be at URL "business-details"
        And should see heading "Business details"
        When the user enters the following
            | FIELD                            | VALUE                      | ID               |
            | Project name                     | Project Items-only Project | projectName      |
            | Business name                    | Home Farm Ltd              | businessName     |
            | Number of employees              | 100                        | numberEmployees  |
            | Annual business turnover (£)     | 20000000                   | businessTurnover |
            | Single Business Identifier (SBI) | 123456789                  | sbi              |
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
            | FIELD NAME                                           | FIELD VALUE                                                                                                                        | DATA TYPE        |
            | FA or OA                                             | Outline Application                                                                                                                |                  |
            | Single business identifier (SBI)                     | 123456789                                                                                                                          |                  |
            | Surname                                              | Farmer                                                                                                                             |                  |
            | Forename                                             | James                                                                                                                              |                  |
            | Business name                                        | Home Farm Ltd                                                                                                                      |                  |
            | Address line 1                                       | Home Farm                                                                                                                          |                  |
            | Address line 2                                       | Cogenhoe                                                                                                                           |                  |
            | Address line 3                                       |                                                                                                                                    |                  |
            | Address line 4 (town)                                | Northampton                                                                                                                        |                  |
            | Address line 5 (county)                              | Northamptonshire                                                                                                                   |                  |
            | Postcode (use capitals)                              | NN7 1NN                                                                                                                            |                  |
            | Landline number                                      | 01234 123456                                                                                                                       |                  |
            | Mobile number                                        | 07777 123456                                                                                                                       |                  |
            | Email                                                | cl-defra-tactical-grants-test-email-service-account@equalexperts.com                                                               |                  |
            | Business size                                        | Medium                                                                                                                             |                  |
            | Employees                                            | 100                                                                                                                                |                  |
            | Status of applicant                                  | Co-operative society (Co-Op)                                                                                                       |                  |
            | Agent Surname                                        |                                                                                                                                    |                  |
            | Agent Forename                                       |                                                                                                                                    |                  |
            | Agent Business Name                                  |                                                                                                                                    |                  |
            | Agent Address line 1                                 |                                                                                                                                    |                  |
            | Agent Address line 2                                 |                                                                                                                                    |                  |
            | Agent Address line 4 (town)                          |                                                                                                                                    |                  |
            | Agent Address line 5 (County)                        |                                                                                                                                    |                  |
            | Agent Postcode (use capitals)                        |                                                                                                                                    |                  |
            | Agent Landline number                                |                                                                                                                                    |                  |
            | Agent Mobile number                                  |                                                                                                                                    |                  |
            | Agent Email                                          |                                                                                                                                    |                  |
            | Sub scheme                                           | FTF-Adding Value Round 2                                                                                                           |                  |
            | Scheme                                               | Farming Transformation Fund                                                                                                        |                  |
            | Owner                                                | RD                                                                                                                                 |                  |
            | Project name                                         | Project Items-only Project                                                                                                         |                  |
            | Theme                                                | Adding Value                                                                                                                       |                  |
            | Adding Value Project Items                           | Constructing or improving buildings for processing\|Processing equipment or machinery\|Retail facilities                           |                  |
            | Location of project (postcode)                       | NN7 2NN                                                                                                                            |                  |
            | Site of Special Scientific Interest (SSSI)           |                                                                                                                                    |                  |
            | Business type                                        | processor                                                                                                                          |                  |
            | Electronic OA received date                          | ?                                                                                                                                  | CURRENT-DATE     |
            | Total project expenditure                            | null                                                                                                                               |                  |
            | Grant amount requested                               | 50000                                                                                                                              | INTEGER          |
            | Grant rate                                           | 40                                                                                                                                 |                  |
            | Full Application Submission Date                     | ?                                                                                                                                  | DATE-IN-6-MONTHS |
            | Customer Marketing Indicator                         | No                                                                                                                                 |                  |
            | Project type                                         | Adding Value                                                                                                                       |                  |
            | Are you an AGENT applying on behalf of your customer | No                                                                                                                                 |                  |
            | RAG rating                                           | Green                                                                                                                              |                  |
            | RAG date reviewed                                    | ?                                                                                                                                  | CURRENT-DATE     |
            | Current location of file                             | NA Automated                                                                                                                       |                  |
            | Grant Launch Date                                    |                                                                                                                                    |                  |
            | Land owned by Farm                                   | Yes                                                                                                                                |                  |
            | Tenancy for next 5 years                             |                                                                                                                                    |                  |
            | Remaining Cost to Farmer                             | 75000.00                                                                                                                           |                  |
            | Planning Permission Status                           | Approved                                                                                                                           |                  |
            | OA score                                             | Average                                                                                                                            |                  |
            | Date of OA decision                                  |                                                                                                                                    |                  |
            | Annual Turnover                                      | 20000000                                                                                                                           |                  |
            | Date ready for QC or decision                        | ?                                                                                                                                  | CURRENT-DATE     |
            | Eligibility Reference No.                            | ?                                                                                                                                  | REFERENCE-NUMBER |
            | Status                                               | Pending RPA review                                                                                                                 |                  |
            | OA percent                                           | 31.33                                                                                                                              |                  |
            | Project Started                                      | No, we have not done any work on this project yet                                                                                  |                  |
            | Products To Be Processed                             | Fibre produce                                                                                                                      |                  |
            | How add value to products                            | Packing produce                                                                                                                    |                  |
            | AV Project Impact                                    | Increasing range of added-value products\|Increasing volume of added-value products\|Allow selling direct to consumer              |                  |
            | AV Target Customers                                  | Processors\|Wholesalers\|Retailers\|Selling direct to consumers                                                                    |                  |
            | AV Farmer Collaborate                                | No                                                                                                                                 |                  |
            | AV Improve Environment                               | Renewable energy\|Energy efficiency\|Water efficiency                                                                              |                  |
            | AV Business Type                                     | A business processing agricultural or horticultural products that is at least 50% owned by agricultural or horticultural producers |                  |
            | Storage Facilities                                   | No                                                                                                                                 |                  |
            | Solar Cost                                           |                                                                                                                                    |                  |
            | Solar Grant Amount                                   | 0                                                                                                                                  | INTEGER          |
            | Project items cost                                   | 125000                                                                                                                             |                  |
            | Project items grant amount                           | 50000                                                                                                                              |                  |
