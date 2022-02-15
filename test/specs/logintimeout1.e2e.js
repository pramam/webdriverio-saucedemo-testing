const LoginPage = require('../pageobjects/login.page');
const InventoryPage = require('../pageobjects/inventory.page');
const delay = require ('delay');
const LoginData = require('../../data/logindata');
const allureReporter = require('@wdio/allure-reporter').default;


describe("Login Timeout : Logged in user should be kicked out after 10 minutes", function (){
    // Increase total timeout for this test from the default in wdio.conf.js
    // The above describe should have a function as second arg, not a fat arrow
    // https://stackoverflow.com/questions/23492043/change-default-timeout-for-mocha/45220192#45220192
    this.timeout(700000);
    allureReporter.addFeature('Logout');
    describe(`Login`, ()=>{
        it(`should login user`, async ()=>{
            await LoginPage.open();
            await LoginPage.login(LoginData.userName,LoginData.password);
        })
    })
    describe(`Inventory Page`, ()=>{
        it(`should be on Inventory Page`, async () =>{
            await InventoryPage.ensureOnPage();
        })
    })
    describe(`Add 1 item to cart`, ()=>{
        it(`should add 1 item to cart`, async ()=> {
            await CartPage.addItemToCart('#add-to-cart-sauce-labs-backpack');
        })
    })
    describe(`Wait for 10 mins + a bit`, function (){
        it(`delay for 10 mins + a bit`, async ()=>{
            // https://www.npmjs.com/package/delay
            // wait 10 mins + a bit
            await delay(10 * 60 * 1000 +1000)
        })
    })
    describe(`Logged out`, ()=>{
        it(`should be on login page displaying logged out error`, async ()=>{
            await LoginPage.checkIfOnErroredLogoutPage("/inventory.html");
        })
    })
})