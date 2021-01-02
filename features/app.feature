Feature: Placeholder application

  Scenario: Page should have 'hello world' text
    Given I navigate to the url "/"
    Then I should see the text "Hello, world"
