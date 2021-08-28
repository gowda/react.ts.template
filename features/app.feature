Feature: Placeholder application

  Scenario: Page should have 'Authorize' button
    Given I navigate to the url "/"
    Then I should see the text "Authorize"
