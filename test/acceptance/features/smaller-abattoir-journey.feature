@RunInCI
Feature: Smaller Abattoir Journey

    Scenario: Successfully apply for a grant on the Smaller Abattoir journey
        - buying a solar PV system, leading to solar-PV-cost
        - using mechanisation, leading to manual-labour-amount
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
        And should see hint text "Storage facilities will only be funded as part of a bigger project and cannot be more than 40% of the total grant funding."
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
        ## TODO: check calculations
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
            | Business name                    | Home Farm Ltd            | businessName     |
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
            | FIELD                 | VALUE                          | ID                  |
            | First name            | Andrew                         | firstName           |
            | Last name             | Deacon                         | lastName            |
            | Email address         | andrew.deacon@equalexperts.com | emailAddress        |
            | Confirm email address | andrew.deacon@equalexperts.com | confirmEmailAddress |
            | Mobile phone number   | 07777 123456                   | mobileNumber        |
            | Landline number       | 01234 123456                   | landlineNumber      |
            | Address line 1        | Home Farm                      | address1            |
            | Address line 2        | Market Weston                  | address2            |
            | Town                  | Oakham                         | town                |
            | County                | Rutland                        | county              |
            | Postcode              | LE1 1LE                        | postcode            |
            | Project postcode      | LE1 2LE                        | projectPostcode     |
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
            | FIELD NAME                                           | FIELD VALUE                                                                         | DATA TYPE        |
            | FA or OA                                             | Outline Application                                                                 |                  |
            | Single business identifier (SBI)                     | 123456789                                                                           |                  |
            | Surname                                              | Deacon                                                                              |                  |
            | Forename                                             | Andrew                                                                              |                  |
            | Business name                                        | Home Farm Ltd                                                                       |                  |
            | Address line 1                                       | Home Farm                                                                           |                  |
            | Address line 2                                       | Market Weston                                                                       |                  |
            | Address line 3                                       |                                                                                     |                  |
            | Address line 4 (town)                                | Oakham                                                                              |                  |
            | Address line 5 (county)                              | Rutland                                                                             |                  |
            | Postcode (use capitals)                              | LE1 1LE                                                                             |                  |
            | Landline number                                      | 01234 123456                                                                        |                  |
            | Mobile number                                        | 07777 123456                                                                        |                  |
            | Email                                                | andrew.deacon@equalexperts.com                                                      |                  |
            | Business size                                        | Small                                                                               |                  |
            | Employees                                            | 5                                                                                   |                  |
            | Status of applicant                                  | Sole trader                                                                         |                  |
            | Agent Surname                                        |                                                                                     |                  |
            | Agent Forename                                       |                                                                                     |                  |
            | Agent Business Name                                  |                                                                                     |                  |
            | Agent Address line 1                                 |                                                                                     |                  |
            | Agent Address line 2                                 |                                                                                     |                  |
            | Agent Address line 4 (town)                          |                                                                                     |                  |
            | Agent Address line 5 (County)                        |                                                                                     |                  |
            | Agent Postcode (use capitals)                        |                                                                                     |                  |
            | Agent Landline number                                |                                                                                     |                  |
            | Agent Mobile number                                  |                                                                                     |                  |
            | Agent Email                                          |                                                                                     |                  |
            | Sub scheme                                           | FTF-Adding Value Round 2                                                            |                  |
            | Scheme                                               | Farming Transformation Fund                                                         |                  |
            | Owner                                                | RD                                                                                  |                  |
            | Project name                                         | Smaller Abattoir Project                                                            |                  |
            | Theme                                                | Adding Value                                                                        |                  |
            | Adding Value Project Items                           | Constructing or improving buildings for processing\|Storage Facilities              |                  |
            | Location of project (postcode)                       | LE1 2LE                                                                             |                  |
            | Site of Special Scientific Interest (SSSI)           |                                                                                     |                  |
            | Business type                                        | producer                                                                            |                  |
            | Electronic OA received date                          | ?                                                                                   | CURRENT-DATE     |
            | Total project expenditure                            | 150000                                                                              |                  |
            | Grant amount requested                               | 52500                                                                               | INTEGER          |
            | Grant rate                                           | 35.00                                                                               |                  |
            | Full Application Submission Date                     | ?                                                                                   | DATE-IN-6-MONTHS |
            | Customer Marketing Indicator                         | No                                                                                  |                  |
            | Project type                                         | Adding Value                                                                        |                  |
            | Are you an AGENT applying on behalf of your customer | No                                                                                  |                  |
            | RAG rating                                           | Green                                                                               |                  |
            | RAG date reviewed                                    | ?                                                                                   | CURRENT-DATE     |
            | Current location of file                             | NA Automated                                                                        |                  |
            | Grant Launch Date                                    |                                                                                     |                  |
            | Land owned by Farm                                   | Yes                                                                                 |                  |
            | Tenancy for next 5 years                             |                                                                                     |                  |
            | Remaining Cost to Farmer                             | 97500                                                                               | INTEGER          |
            | Planning Permission Status                           | Approved                                                                            |                  |
            | OA score                                             | Strong                                                                              |                  |
            | Date of OA decision                                  |                                                                                     |                  |
            | Annual Turnover                                      | 2000000                                                                             |                  |
            | Date ready for QC or decision                        | ?                                                                                   | CURRENT-DATE     |
            | Eligibility Reference No.                            | ?                                                                                   | REFERENCE-NUMBER |
            | Status                                               | Pending RPA review                                                                  |                  |
            | OA percent                                           | 72.33                                                                               |                  |
            | Project Started                                      | No, we have not done any work on this project yet                                   |                  |
            | Products To Be Processed                             | Wild venison meat produce                                                           |                  |
            | How add value to products                            | Introducing a new product to your farm                                              |                  |
            | AV Project Impact                                    | Increasing range of added-value products\|Increasing volume of added-value products |                  |
            | AV Target Customers                                  | Processors\|Wholesalers                                                             |                  |
            | AV Farmer Collaborate                                | Yes                                                                                 |                  |
            | AV Improve Environment                               | Renewable energy\|Energy efficiency                                                 |                  |
            | AV Business Type                                     | A grower or producer of agricultural or horticultural produce                       |                  |
            | Storage Facilities                                   | Yes                                                                                 |                  |
            | Solar Cost                                           | 50000                                                                               |                  |
            | Solar Grant Amount                                   | 12500                                                                               | INTEGER          |
            | Project items cost                                   | 100000                                                                              |                  |
            | Project items grant amount                           | 40000                                                                               |                  |
