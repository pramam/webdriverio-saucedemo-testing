const LoginPage = require('../pageobjects/login.page');

describe("Login Error", ()=>{
    // State Machine:
    // A Z
    it("LoginError_2: accessing a valid page without being logged in should show correct Error message", async()=>{
        let stepnum = 0;
        const subPath = 'inventory.html'
        browser.url(`https://www.saucedemo.com/${subPath}`)
        await LoginPage.checkIfOnErroredLogoutPage(`/${subPath}`);
        stepnum += 2;
        console.log(`LoginError_2: S${stepnum} Finished test at ${Date.now()}`);
        console.log(`LoginError_2: S${stepnum} END`);
    })
})