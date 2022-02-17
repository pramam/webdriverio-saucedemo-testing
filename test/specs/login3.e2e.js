const LoginPage = require('../pageobjects/login.page');
const InventoryPage = require('../pageobjects/inventory.page');
const LoginData = require('../../data/logindata');
const allureReporter = require('@wdio/allure-reporter').default;

describe("UserStory: Login", ()=>{
    allureReporter.addFeature('Login');
    // State machine:
    // X 1 A 14 1 A
    it('Login_3:should be able to login, logout, login', async () => {    
        await LoginPage.open();
        await LoginPage.login(LoginData.userName, LoginData.password);
        await InventoryPage.ensureOnPage();
        
        await LoginPage.logout();
        // I should be on login page
        await LoginPage.login(LoginData.userName, LoginData.password);
        await InventoryPage.ensureOnPage();
    });
})