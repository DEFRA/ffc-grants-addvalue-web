@RunInCI
Feature: Common Eligibility Checking and Elimination

    Scenario: Explore all common eligibility questions and elimination routes
        # login/start
        Given the user navigates to "/adding-value/start"
        And completes any login process
        And clicks on "Accept analytics cookies"
        Then the user should see heading "Check if you can apply for a Farming Investment Fund Adding Value Round 2 Grant"
        When the user clicks on "Start now"

        # nature-of-business navigate back
        Then the user should be at URL "nature-of-business"
        When the user goes back
        Then the user should be at URL "start"
        When the user clicks on "Start now"

        # nature-of-business elimination
        Then the user should be at URL "nature-of-business"
        And should see heading "What is your business?"
        When the user selects "None of the above"
        And continues
        Then the user should be at URL "nature-of-business"
        And should see heading "You cannot apply for a grant from this scheme"
        When the user goes back

        # nature-of-business
        Then the user should be at URL "nature-of-business"
        And should see heading "What is your business?"
        When the user selects "A grower or producer of agricultural or horticultural produce"
        And continues

        # legal-status navigate back
        Then the user should be at URL "legal-status"
        When the user goes back
        Then the user should be at URL "nature-of-business"
        When the user continues

        # legal-status elimination
        Then the user should be at URL "legal-status"
        And should see heading "What is the legal status of the business?"
        When the user selects "None of the above"
        And continues
        Then the user should be at URL "legal-status"
        And should see heading "You cannot apply for a grant from this scheme"
        When the user goes back

        # legal-status
        Then the user should be at URL "legal-status"
        And should see heading "What is the legal status of the business?"
        When the user selects "Sole trader"
        And continues

        # country navigate back
        Then the user should be at URL "country"
        When the user goes back
        Then the user should be at URL "legal-status"
        When the user continues

        # country elimination
        Then the user should be at URL "country"
        And should see heading "Is the planned project in England?"
        When the user selects "No"
        And continues
        Then the user should be at URL "country"
        And should see heading "You cannot apply for a grant from this scheme"
        When the user goes back

        # country
        Then the user should be at URL "country"
        And should see heading "Is the planned project in England?"
        When the user selects "Yes"
        And continues

        # planning-permission navigate back
        Then the user should be at URL "planning-permission"
        When the user goes back
        Then the user should be at URL "country"
        When the user continues

        # planning-permission elimination
        Then the user should be at URL "planning-permission"
        And should see heading "Does the project have planning permission?"
        When the user selects "Will not be in place by the time I make my full application"
        And continues
        Then the user should be at URL "planning-permission"
        And should see heading "You cannot apply for a grant from this scheme"
        When the user goes back

        # planning-permission
        Then the user should be at URL "planning-permission"
        And should see heading "Does the project have planning permission?"
        When the user selects "Secured"
        And continues

        # project-start navigate back
        Then the user should be at URL "project-start"
        When the user goes back
        Then the user should be at URL "planning-permission"
        When the user continues

        # project-start elimination
        Then the user should be at URL "project-start"
        And should see heading "Have you already started work on the project?"
        When the user selects "Yes, we have begun project work"
        And continues
        Then the user should be at URL "project-start"
        And should see heading "You cannot apply for a grant from this scheme"
        When the user goes back

        # project-start
        Then the user should be at URL "project-start"
        And should see heading "Have you already started work on the project?"
        When the user selects "Yes, preparatory work"
        And continues

        # tenancy navigate back
        Then the user should be at URL "tenancy"
        When the user goes back
        Then the user should be at URL "project-start"
        When the user continues

        # tenancy
        Then the user should be at URL "tenancy"
        And should see heading "Is the planned project on land the business owns?"
        When the user selects "No"
        And continues

        # tenancy-length navigate back
        Then the user should be at URL "tenancy-length"
        When the user goes back
        Then the user should be at URL "tenancy"
