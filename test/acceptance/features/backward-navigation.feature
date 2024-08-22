Feature: Backward Navigation

    Scenario: Explore all backward navigation options
        # login/start
        Given the user navigates to "/adding-value/start"
        And completes any login process
        And clicks on "Accept analytics cookies"
        Then the user should see heading "Check if you can apply for a Farming Investment Fund Adding Value Round 2 Grant"
        When the user clicks on "Start now"

        # nature-of-business
        Then the user should be at URL "nature-of-business"
        When the user goes back
        Then the user should be at URL "start"
        When the user clicks on "Start now"
        Then the user should be at URL "nature-of-business"
        And should see heading "What is your business?"
        When the user selects "A grower or producer of agricultural or horticultural produce"
        And continues

        # legal-status
        Then the user should be at URL "legal-status"
        When the user goes back
        Then the user should be at URL "nature-of-business"
        When the user continues
        Then the user should be at URL "legal-status"
        And should see heading "What is the legal status of the business?"
        When the user selects "Sole trader"
        And continues

        # country
        Then the user should be at URL "country"
        When the user goes back
        Then the user should be at URL "legal-status"
        When the user continues
        Then the user should be at URL "country"
        And should see heading "Is the planned project in England?"
        When the user selects "Yes"
        And continues

        # planning-permission
        Then the user should be at URL "planning-permission"
        When the user goes back
        Then the user should be at URL "country"
        When the user continues
        Then the user should be at URL "planning-permission"
        And should see heading "Does the project have planning permission?"
        When the user selects "Not needed"
        And continues

        # project-start
        Then the user should be at URL "project-start"
        When the user goes back
        Then the user should be at URL "planning-permission"
        When the user continues
        Then the user should be at URL "project-start"
        And should see heading "Have you already started work on the project?"
        When the user selects "Yes, preparatory work"
        And continues

        # tenancy
        Then the user should be at URL "tenancy"
        When the user goes back
        Then the user should be at URL "project-start"
        When the user continues
        Then the user should be at URL "tenancy"
        And should see heading "Is the planned project on land the business owns?"
        When the user selects "No"
        And continues

        # tenancy-length
        Then the user should be at URL "tenancy-length"
        When the user goes back
        Then the user should be at URL "tenancy"
        And continues
        Then the user should be at URL "tenancy-length"
        And should see heading "Do you have a tenancy agreement for 5 years after the final grant payment?"
        When the user selects "Yes"
        And continues

        # smaller-abattoir
        Then the user should be at URL "smaller-abattoir"
        When the user goes back
        Then the user should be at URL "tenancy-length"
        When the user continues

        # explore smaller abattoir journey

        # smaller-abattoir
        Then the user should be at URL "smaller-abattoir"
        And should see heading "Do you want to build a new smaller abattoir?"
        When the user selects "Yes"
        And continues

        # other-farmers
        Then the user should be at URL "other-farmers"
        When the user goes back

        # explore top fruit journey

        # smaller-abattoir
        Then the user should be at URL "smaller-abattoir"
        And should see heading "Do you want to build a new smaller abattoir?"
        When the user selects "No"
        And continues

        # fruit-storage
        Then the user should be at URL "fruit-storage"
        When the user goes back
        Then the user should be at URL "smaller-abattoir"
        When the user continues
        Then the user should be at URL "fruit-storage"
        And should see heading "Do you want to build new controlled atmosphere storage for top fruit?"
        When the user selects "Yes"
        And continues

        # solar-PV-system
        Then the user should be at URL "solar-PV-system"
        And should see heading "Will you buy a solar PV system with this grant?"
        When the user goes back

        # explore project items-only journey

        # fruit-storage
        Then the user should be at URL "fruit-storage"
        And should see heading "Do you want to build new controlled atmosphere storage for top fruit?"
        When the user selects "No"
        And continues

        # project-items
        Then the user should be at URL "project-items"
        When the user goes back
        Then the user should be at URL "fruit-storage"
        And continues
        Then the user should be at URL "project-items"
        And should see heading "What eligible items does your project need?"
        When the user selects the following
            | Constructing or improving buildings for processing |
        And continues

        # storage
        Then the user should be at URL "storage"
        When the user goes back
        Then the user should be at URL "project-items"
        And continues
        Then the user should be at URL "storage"
        And should see heading "Does your project also need storage facilities?"
        When the user selects "Yes, we will need storage facilities"
        And continues

        # solar-PV-system
        Then the user should be at URL "solar-PV-system"
        When the user goes back
        Then the user should be at URL "storage"
        When the user continues
        Then the user should be at URL "solar-PV-system"
        And should see heading "Will you buy a solar PV system with this grant?"
        When the user selects "Yes"
        And continues

        # project-cost
        Then the user should be at URL "project-cost"
        When the user goes back
        Then the user should be at URL "solar-PV-system"
        When the user continues
        Then the user should be at URL "project-cost"
        And should see heading label "What is the estimated cost of the items?"
        When the user enters "62500" in "projectCost"
        And continues

        # solar-PV-cost
        Then the user should be at URL "solar-PV-cost"
        When the user goes back
        Then the user should be at URL "project-cost"
        When the user continues
        Then the user should be at URL "solar-PV-cost"
        And should see heading label "What is the estimated cost of buying and installing the solar PV system?"
        When the user enters "50000" in "solarPVCost"
        And continues

        # potential-amount-solar
        Then the user should be at URL "potential-amount-solar"
        When the user goes back
        Then the user should be at URL "solar-PV-cost"
        When the user continues
        Then the user should be at URL "potential-amount-solar"
        And should see heading "Potential grant funding"
        And continues

        # remaining-costs
        Then the user should be at URL "remaining-costs"
        When the user goes back
        Then the user should be at URL "potential-amount-solar"
        When the user continues
        Then the user should be at URL "remaining-costs"
        And should see heading "Can you pay the remaining costs of £75,000?"
        When the user selects "Yes"
        And continues

        # produce-processed
        Then the user should be at URL "produce-processed"
        When the user goes back
        Then the user should be at URL "remaining-costs"
        When the user continues
        Then the user should be at URL "produce-processed"
        And should see heading "What type of produce is being processed?"
        When the user selects "Arable produce"
        And continues

        # how-adding-value
        Then the user should be at URL "how-adding-value"
        When the user goes back
        Then the user should be at URL "produce-processed"
        When the user continues
        Then the user should be at URL "how-adding-value"
        And should see heading "How will this project add value to the produce?"
        When the user selects "Introducing a new product to your farm"
        And continues

        # project-impact
        Then the user should be at URL "project-impact"
        When the user goes back
        Then the user should be at URL "how-adding-value"
        When the user continues
        Then the user should be at URL "project-impact"
        And should see heading "What impact will this project have?"
        When the user selects the following
            | Increasing range of added-value products |
        And continues

        # mechanisation
        Then the user should be at URL "mechanisation"
        When the user goes back
        Then the user should be at URL "project-impact"
        When the user continues
        Then the user should be at URL "mechanisation"
        And should see heading "Will this project use any mechanisation instead of manual labour?"
        When the user selects "Yes"
        And continues

        # manual-labour-amount
        Then the user should be at URL "manual-labour-amount"
        When the user goes back
        Then the user should be at URL "mechanisation"
        When the user continues
        Then the user should be at URL "manual-labour-amount"
        And should see heading "How much manual labour will the mechanisation be equal to?"
        When the user selects "More than 10%"
        And continues

        # future-customers
        Then the user should be at URL "future-customers"
        When the user goes back
        Then the user should be at URL "manual-labour-amount"
        When the user continues
        Then the user should be at URL "future-customers"
        And should see heading "Who will your new customers be after this project?"
        When the user selects the following
            | Processors |
        And continues

        # collaboration
        Then the user should be at URL "collaboration"
        When the user goes back
        Then the user should be at URL "future-customers"
        When the user continues
        Then the user should be at URL "collaboration"
        And should see heading "Will you work in partnership or collaborate with other farmers or producers?"
        When the user selects "Yes"
        And continues

        # environmental-impact
        Then the user should be at URL "environmental-impact"
        When the user goes back
        Then the user should be at URL "collaboration"
        When the user continues
        Then the user should be at URL "environmental-impact"
        And should see heading "How will this project improve the environment?"
        When the user selects the following
            | Renewable energy |
        And continues to their score

        # score
        Then the user should be at URL "score"
        When the user goes back
        Then the user should be at URL "environmental-impact"
        When the user continues to their score
        Then the user should be at URL "score"
        When the user continues

        # business-details
        Then the user should be at URL "business-details"
        When the user goes back
        Then the user should be at URL "score"
        When the user continues
        Then the user should be at URL "business-details"
        And should see heading "Business details"
        When the user enters the following
            | FIELD                            | VALUE                       | ID               |
            | Project name                     | Project | projectName      |
            | Business name                    | Home Farm Ltd               | businessName     |
            | Number of employees              | 100                         | numberEmployees  |
            | Annual business turnover (£)     | 20000000                    | businessTurnover |
            | Single Business Identifier (SBI) | 123456789                   | sbi              |
        And continues

        # applying
        Then the user should be at URL "applying"
        When the user goes back
        Then the user should be at URL "business-details"
        When the user continues
        Then the user should be at URL "applying"
        And should see heading "Who is applying for this grant?"
        When the user selects "Agent"
        And continues

        # agents-details
        Then the user should be at URL "agents-details"
        When the user goes back
        Then the user should be at URL "applying"
        When the user continues
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
        When the user goes back
        Then the user should be at URL "agents-details"
        When the user continues
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
        When the user goes back
        Then the user should be at URL "applicant-details"
        When the user continues
        Then the user should be at URL "check-details"
        And should see heading "Check your details"
        And continues

        # confirm
        Then the user should be at URL "confirm"
        When the user goes back
        Then the user should be at URL "check-details"
        When the user continues
        Then the user should be at URL "confirm"
        And should see heading "Confirm and send"
