const LoginPage = require('../pageobjects/login.page');
const InventoryPage = require('../pageobjects/inventory.page');
const LoginData = require('../../data/logindata');
const allureReporter = require('@wdio/allure-reporter').default;

describe('UserStory: Login', () => {
    // State machine
    // X 1 A
    it('Login_1:should login with valid credentials', async () => {
        allureReporter.addFeature('Login');
        let stepnum = 0;
        await LoginPage.open();

        await LoginPage.login(LoginData.userName, LoginData.password);
        await expect(InventoryPage.secondaryTitle).toHaveTextContaining('PRODUCTS');
        stepnum += 3;
        console.log(`Login_1: S${stepnum} END`);
    });
    // State machine:
    // X 1 A 14
    it('Login_2:should be able to logout after login', async () => {
        allureReporter.addFeature('Login');
        let stepnum = 0;
        await LoginPage.open();

        await LoginPage.login(LoginData.userName, LoginData.password);
        await expect(InventoryPage.secondaryTitle).toHaveTextContaining('PRODUCTS');
        stepnum += 3;
        console.log(`Login_2: S${stepnum} Logged in`);
        
        await LoginPage.logout();
        console.log(`Login_2: S${stepnum} END`);
    });
});


