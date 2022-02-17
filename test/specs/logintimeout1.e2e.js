const LoginPage = require('../pageobjects/login.page');
const InventoryPage = require('../pageobjects/inventory.page');
const CartPage = require('../pageobjects/cart.page');
const delay = require ('delay');
const LoginData = require('../../data/logindata');
const allureReporter = require('@wdio/allure-reporter').default;


describe("UserStory: Login", function (){
    // Increase total timeout for this test from the default in wdio.conf.js
    // The above describe should have a function as second arg, not a fat arrow
    // https://stackoverflow.com/questions/23492043/change-default-timeout-for-mocha/45220192#45220192
    this.timeout(700000);
    allureReporter.addFeature('Logout');
    it(`LoginTimeout_1: Logged in user should be kicked out after 10 minutes`,async ()=>{
        await LoginPage.open();
        await LoginPage.login(LoginData.userName,LoginData.password);
        await InventoryPage.ensureOnPage();
        await CartPage.addItemToCart('#add-to-cart-sauce-labs-backpack');
    
        // https://www.npmjs.com/package/delay
        // wait 10 mins + a bit
        await delay(10 * 60 * 1000 +1000)
    
        await LoginPage.checkIfOnErroredLogoutPage("/inventory.html");
    })
})