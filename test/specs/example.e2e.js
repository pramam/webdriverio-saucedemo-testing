const LoginPage = require('../pageobjects/login.page');
const InventoryPage = require('../pageobjects/inventory.page');
const LoginData = require('../../data/logindata');
const allureReporter = require('@wdio/allure-reporter').default;

describe('UserStory: Login', () => {
    allureReporter.addFeature('Login');
    it(`Login_1: Should be able to login with valid credentials`, async ()=> {
        await LoginPage.open();
        await LoginPage.login(LoginData.userName, LoginData.password);
        await expect(InventoryPage.secondaryTitle).toHaveTextContaining('PRODUCTS');
    })    
});

describe(`UserStory: Login`, ()=>{
    allureReporter.addFeature('Login');
    it(`Login_2: Should be able to login, then logout`, async ()=>{
        await LoginPage.open();
        await LoginPage.login(LoginData.userName, LoginData.password);

        await expect(InventoryPage.secondaryTitle).toHaveTextContaining('PRODUCTS');

        await LoginPage.logout();
    })
})

