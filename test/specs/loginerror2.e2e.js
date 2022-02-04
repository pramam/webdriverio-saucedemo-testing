const LoginPage = require('../pageobjects/login.page');

describe("Login Error", ()=>{
    it("LoginError_2: accessing a valid page without being logged in should show correct Error message", async()=>{
    
        const subPath = 'inventory.html'
        browser.url(`https://www.saucedemo.com/${subPath}`)
        await LoginPage.checkIfOnErroredLogoutPage(`/${subPath}`);

        console.log(`LoginTimeout_2: Finished test at ${Date.now()}`)
    })
})