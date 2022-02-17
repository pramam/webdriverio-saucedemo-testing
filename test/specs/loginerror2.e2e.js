const LoginPage = require('../pageobjects/login.page');
const allureReporter = require('@wdio/allure-reporter').default;

describe("UserStory: Login", ()=>{
    allureReporter.addFeature('Login');
    // State Machine:
    // A Z
    it("LoginError_2: accessing a valid page without being logged in should show correct Error message", async()=>{   
        const subPath = 'inventory.html'
        browser.url(`https://www.saucedemo.com/${subPath}`)
        await LoginPage.checkIfOnErroredLogoutPage(`/${subPath}`);
    })
})