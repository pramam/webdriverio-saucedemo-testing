# Testing a shopping cart application using a Finite State Machine

## Overview

We will be using [WebDriverIO](https://webdriver.io/), which is a browser test automation framework for Node.js. 

An eCommerce demo site called [Swag Labs](https://www.saucedemo.com/) is a simple shopping cart application with a 2 step checkout process. 

[***Github repo***](https://github.com/pramam/webdriverio-saucedemo-testing)

## Notable with the target test site

The demo application will log you out after 10 minutes. This is part of the design of the site and this functionaility is also tested in the state machine. 

## Finite State Machine
Play with the application at [Swag Labs](https://www.saucedemo.com/) and then see the State Machine diagram below. The letters in Red are states. The arrows with the Turquoise numbers are transitions.

![State Machine](./images/StateMachineExcaliDraw.png) 

This state machine diagram works as a mental model of the application, and walking through the various paths of the state machine can give one reasonable confidence about end-to-end integration testing of the application. However, it must be noted that this state machine is only a ***proxy*** for the state machine used to implement the actual application code and there is room for error and one cannot have 100% confidence that there are no hidden bugs in the said application.

That said, having a mental model of a state machine is useful when writing a test plan.

[Checkout Test Cases](./StateDiagramCheckoutTestCases.md)

[Reset and Login Test Cases](./StateDiagramLoginResetTestCases.md)

## Test Results

Clicking on the Burger menu -> Logout or Reset Application is a bit flaky in the automated tests, so these tests are showing up as yellow in the above screenshots.

The Page Object Model(POM) was used to write these tests. The classes created in the POM `throw` errors, which currently shows up as a test defect(instead of product defect) in the allure results. The actual [test cases](https://github.com/pramam/webdriverio-saucedemo-testing/tree/develop/test/specs) are clean, with `await object.method()` and can serve as living documentation for each test.

### Allure Reports

Here are some screen shots of the test results for the various users.

***standard_user:***

![standard_user](./result-screenshots/allure-standard_user.png)

***problem_user:***

![problem_user](./result-screenshots/allure-problem_user.png)

***performance_glitch_user:***

![performance_glitch_user](./result-screenshots/allure-performance_glitch_user.png)

***locked_out_user:***

![locked_out_user](./result-screenshots/allure-locked_out_user.png)

### html-nice-reporter

Here are some reports you can interact with. This was a different run from the allure reports above.

[standard_user](https://pramam.github.io/webdriverio-saucedemo-testing/reports/html-reports/standard_user/master-report.html)

[problem_user](https://pramam.github.io/webdriverio-saucedemo-testing/reports/html-reports/problem_user/master-report.html)

[performance_glitch_user](https://pramam.github.io/webdriverio-saucedemo-testing/reports/html-reports/performance_glitch_user/master-report.html)

[locked_out_user](https://pramam.github.io/webdriverio-saucedemo-testing/reports/html-reports/locked_out_user/master-report.html)

## Existing Files

Look at [this repo](https://github.com/pramam/webdriverio-saucedemo-testing):

| File | Description |
| ------ | ------ |
| /test/specs/*.e2e.js | Each file tests a checkout path through the state machine|
| pageobjects/page.js | Base page object used for sharing across all pages |
| pageobjects/*.page.js | Page objects for the various pages |
| ./wdio.config.js | Base configuration file set to use Chrome as default browser |

## Running tests

1. Setup a new project in your preferred IDE with these project files
2. Run `npm install` to install the latest version (requires you have [node.js installed](https://nodejs.org/en/download/))
3. Run `npx wdio run ./wdio.conf.js` to run all the tests
4. Run `npx wdio run ./wdio.conf.js --spec checkout1.e2e.js` to run the specified spec file. 
5. Run `allure generate allure-results --clean && allure open` to generate a report; `allure generate --clean && allure open` also works as `allure-results` is a default
6. To clean up results from a prior run `rm -rf allure-results`
7. The default username/login is in [this file](https://github.com/pramam/webdriverio-saucedemo-testing/tree/develop/data/logindata.js). Change the username in this file to run the automation with a different user account.
