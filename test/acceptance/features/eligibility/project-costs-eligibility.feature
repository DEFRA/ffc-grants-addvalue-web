Feature: Project Costs Specific Eligibility and Elimination

    Background:
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

        # planning-permisssion
        Then the user should be at URL "planning-permission"
        And should see heading "Does the project have planning permission?"
        When the user selects "Not needed"
        And continues

        # project-start
        Then the user should be at URL "project-start"
        And should see heading "Have you already started work on the project?"
        When the user selects "Yes, preparatory work"
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
        When the user selects "Yes"
        And continues

    Scenario: Explore project costs eligibility questions and elimination by project cost under minimum grant threshold
        # solar-PV-system
        Then the user should be at URL "solar-PV-system"
        And should see heading "Will you buy a solar PV system with this grant?"
        When the user selects "Yes"
        And continues

        # project cost elimination
        Then the user should be at URL "project-cost"
        And should see heading label "What is the estimated cost of the items?"
        When the user enters "62499" in "projectCost"
        And continues
        Then the user should be at URL "project-cost"
        And should see heading "You cannot apply for a grant from this scheme"
        And should see body "The minimum grant you can apply for is £25,000 (40% of £62,500)."

    Scenario: Explore project costs eligibility questions and elimination by remaining costs not being met
        # solar-PV-system
        Then the user should be at URL "solar-PV-system"
        And should see heading "Will you buy a solar PV system with this grant?"
        When the user selects "Yes"
        And continues

        # project cost
        Then the user should be at URL "project-cost"
        And should see heading label "What is the estimated cost of the items?"
        When the user enters "62500" in "projectCost"
        And continues

        # solar-PV-cost
        Then the user should be at URL "solar-PV-cost"
        And should see heading label "What is the estimated cost of buying and installing the solar PV system?"
        When the user enters "50000" in "solarPVCost"
        And continues

        # potential-amount-solar
        Then the user should be at URL "potential-amount-solar"
        And should see heading "Potential grant funding"
        And continues

        # remaining-costs elimination
        Then the user should be at URL "remaining-costs"
        And should see heading "Can you pay the remaining costs of £75,000?"
        When the user selects "No"
        And continues
        Then the user should be at URL "remaining-costs"
        And should see heading "You cannot apply for a grant from this scheme"
