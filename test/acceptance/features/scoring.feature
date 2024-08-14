@RunInCI
Feature: Scoring

    Scenario: Create a weak score, improve it to an average score and then improve it to a strong score
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
        And continues

        # remaining-costs
        Then the user should be at URL "remaining-costs"
        And should see heading "Can you pay the remaining costs of £97,500?"
        When the user selects "Yes"
        And continues

        # produce-processed
        Then the user should be at URL "produce-processed"
        And should see heading "What type of produce is being processed?"
        When the user selects "Non-edible produce"
        And continues

        # how-adding-value
        Then the user should be at URL "how-adding-value"
        And should see heading "How will this project add value to the produce?"
        When the user selects "New retail facility to sell direct to consumers"
        And continues

        # project-impact
        Then the user should be at URL "project-impact"
        And should see heading "What impact will this project have?"
        When the user selects the following
            | Increasing volume of added-value products |
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
        And should see "Weak" for their project score
        And should see the following scoring answers
            | TOPIC                | ANSWERS                                         | SCORE |
            | Produce processed    | Non-edible produce                              | Weak  |
            | Adding value         | New retail facility to sell direct to consumers | Weak  |
            | Project impact       | Increasing volume of added-value products       | Weak  |
            | Mechanisation        | No                                              | Weak  |
            | New customers        | No change                                       | Weak  |
            | Collaboration        | No                                              | Weak  |
            | Environmental impact | My project will not improve the environment     | Weak  |

        # improve score to average
        When the user chooses to change their "Environmental impact" answers

        # environmental-impact
        Then the user should be at URL "environmental-impact"
        And should see heading "How will this project improve the environment?"
        When the user unselects any previous selection
        And selects the following
            | Renewable energy |
        And continues to their score

        # score
        Then the user should be at URL "score"
        And should see "Average" for their project score
        And should see the following scoring answers
            | TOPIC                | ANSWERS                                         | SCORE   |
            | Produce processed    | Non-edible produce                              | Weak    |
            | Adding value         | New retail facility to sell direct to consumers | Weak    |
            | Project impact       | Increasing volume of added-value products       | Weak    |
            | Mechanisation        | No                                              | Weak    |
            | New customers        | No change                                       | Weak    |
            | Collaboration        | No                                              | Weak    |
            | Environmental impact | Renewable energy                                | Average |

        # improve score
        When the user chooses to change their "Collaboration" answers

        # collaboration
        Then the user should be at URL "collaboration"
        And should see heading "Will you work in partnership or collaborate with other farmers or producers?"
        When the user selects "Yes"
        And continues

        # environmental-impact
        Then the user should be at URL "environmental-impact"
        And should see heading "How will this project improve the environment?"
        When the user unselects any previous selection
        And selects the following
            | Renewable energy                       |
            | Energy efficiency                      |
            | Water efficiency                       |
            | Waste efficiency                       |
            | Sustainable packaging measures         |
            | Reduce harmful emissions or pollutants |
        And continues to their score

        # score
        Then the user should be at URL "score"
        And should see "Strong" for their project score
        And should see the following scoring answers
            | TOPIC                | ANSWERS                                         | SCORE  |
            | Produce processed    | Non-edible produce                              | Weak   |
            | Adding value         | New retail facility to sell direct to consumers | Weak   |
            | Project impact       | Increasing volume of added-value products       | Weak   |
            | Mechanisation        | No                                              | Weak   |
            | New customers        | No change                                       | Weak   |
            | Collaboration        | Yes                                             | Strong |
            | Environmental impact | Renewable energy                                | Strong |
            |                      | Energy efficiency                               |        |
            |                      | Water efficiency                                |        |
            |                      | Waste efficiency                                |        |
            |                      | Sustainable packaging measures                  |        |
            |                      | Reduce harmful emissions or pollutants          |        |

