const LoginPage = require('../pageobjects/login.page');
const InventoryPage = require('../pageobjects/inventory.page');
const LoginData = require('../../data/logindata');
const allureReporter = require('@wdio/allure-reporter').default;

describe("UserStory: Login", ()=>{
    // State machine:
    // X 1 A 14 1 A
    it('Login_3:should be able to login, logout, login', async () => {
        allureReporter.addFeature('Login');
        let stepnum = 0;

        await LoginPage.open();

        await LoginPage.login(LoginData.userName, LoginData.password);
        await InventoryPage.ensureOnPage();
        stepnum += 3;
        console.log(`Login_3: S${stepnum} Logged in successfully`);

        await LoginPage.logout();
        stepnum += 1;
        console.log(`Login_3: S${stepnum} Logged out successfully`);
        
        await LoginPage.open();

        await LoginPage.login(LoginData.userName, LoginData.password);
        await InventoryPage.ensureOnPage();
        stepnum += 3;
        console.log(`Login_3: S${stepnum} Logged in again successfully`);
        console.log(`Login_3: S${stepnum} END`);
    });
})