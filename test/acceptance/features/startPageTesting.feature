Feature: Test start page

    Scenario: Open start page

        Given I open the url "/adding-value/start"
        Then I expect that element "h1" contains the text "Check if you can apply for a Farming Investment Fund Adding Value Round 2 Grant"
        When I click on the link "Start now"
        Then I expect that the url contains "/adding-value/nature-of-business"
