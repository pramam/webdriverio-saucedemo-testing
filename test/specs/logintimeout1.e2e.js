const LoginPage = require('../pageobjects/login.page');
const InventoryPage = require('../pageobjects/inventory.page');
const CartPage = require('../pageobjects/cart.page');
const delay = require ('delay');
const LoginData = require('../../data/logindata');
const allureReporter = require('@wdio/allure-reporter').default;

describe("Login Timeout", ()=>{
    // State Machine
    // X 1 A 2 16 Z
    it("LoginTimeout_1: logged in user should be kicked out after 10 minutes", async()=>{
        allureReporter.addFeature('Logout');
        // https://www.npmjs.com/package/delay
        let stepnum = 0;
        await LoginPage.open();

        await LoginPage.login(LoginData.userName, LoginData.password);
        await InventoryPage.ensureOnPage();
        stepnum += 3;
        console.log(`LoginTimeout_1: S${stepnum} Logged in with  user account at ${Date.now()}`);
    
        await CartPage.addItemToCart('#add-to-cart-sauce-labs-backpack');
        stepnum += 1;
        console.log(`LoginTimeout_1: S${stepnum} Added item to cart`);

        // wait 10 mins + a bit
        await delay(10 * 60 * 1000 +5000)
        stepnum += 1;
        // check if You see the logout error
        await LoginPage.checkIfOnErroredLogoutPage("/inventory.html");
        stepnum += 1;
        console.log(`LoginTimeout_1: S${stepnum} Finished test at ${Date.now()}`)
        console.log(`LoginTimeout_1: S${stepnum} END`);
    })
})