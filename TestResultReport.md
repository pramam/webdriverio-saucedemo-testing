# Allure Report of running all 27 tests with all 4 user accounts.

## logout failures

All the failures with logout are the same issue, irrespective of the user:

element ("#logout_sidebar_link") still not clickable after 5000ms 

## reset cart state failures

All the failures with Reset are the same issue, irrespective of the user:

element ("#reset_sidebar_link") still not clickable after 2000ms

## performance glitch user

I could not identify any problems specific to this user, apart from the logout and reset failures.

## problem user

3 bugs were found with problem user

The reports are below:

### standard_user

![Standard user test report](/result-screenshots/allure-standard_user.png)

### problem_user

![Problem user test report](/result-screenshots/allure-problem_user.png)

### performance_glitch_user

![Performance glitch user test report](/result-screenshots/allure-performance_glitch_user.png)

### locked_out_user

![Locked out user test report](/result-screenshots/allure-locked_out_user.png)
