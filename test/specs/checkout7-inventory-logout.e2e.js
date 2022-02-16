const LoginPage = require('../pageobjects/login.page');
const InventoryPage = require('../pageobjects/inventory.page');
const CartPage = require('../pageobjects/cart.page');
const CheckoutStep1Page = require ('../pageobjects/checkoutstep1.page');
const CheckoutStep2Page = require('../pageobjects/checkoutstep2.page');
const CheckoutCompletePage = require ('../pageobjects/checkoutcomplete.page');
const LoginData = require('../../data/logindata');
const allureReporter = require('@wdio/allure-reporter').default;
const {padDigits} = require('../../utils/myUtils');

describe('UserStory: Logout', () => {

    //TODO: Investigate: Running all the tests together is causing second test to fail
    //      Do I need to logout after one test?


    // This is TestCase_2 modified with an intermediate logout-login from inventory page
    // State machine info:
    // X 1 A 2 14(Logout) Y 1(Login) A 4 B 6 C 17 9 D 12 E
    describe("(Checkout2 modified) should be able to add one item to cart, logout from InventoryPage, log back in and check it out successfully", async ()=>{ 
        allureReporter.addFeature('Logout');
        let step = 0;

        step++;
        it(`${padDigits(step,3)} Login: should login user`, async ()=>{
            await LoginPage.open();
            await LoginPage.login(LoginData.userName, LoginData.password);
        })
        step++;
        it(`${padDigits(step,3)} Inventory Page: should be on Inventory Page`, async ()=> {
            await InventoryPage.ensureOnPage();
        })
        step++;
        it(`${padDigits(step,3)} Add 1 item to cart: should add 1 item to cart`, async ()=> {
            await CartPage.addItemToCart('#add-to-cart-sauce-labs-backpack');
        })
        
        step++;
        it(`${padDigits(step,3)} Logout: should logout from InventoryPage`, async ()=>{
            await LoginPage.logout();
            await LoginPage.ensureOnLogoutPage();
        })

        // I should be on a login page
        // await LoginPage.open();
        step++;
        it(`${padDigits(step,3)} Login: logged in again`, async ()=>{
            await LoginPage.open();
            await LoginPage.login(LoginData.userName, LoginData.password);
        })

        step++;
        it(`${padDigits(step,3)} Inventory Page: should be on Inventory Page`, async ()=> {
            await InventoryPage.ensureOnPage();
        })
        
        step++;
        it(`${padDigits(step,3)} Check Cart after relogin: cart should have 1 item`, async ()=>{
            await CartPage.checkNumCartItems(1);
        })
        
        step++;
        it(`${padDigits(step,3)} Click on Cart Icon: click on Cart Icon`, async ()=>{
            await CartPage.clickOnCartIcon();
        })
        step++;
        it(`${padDigits(step,3)} Cart Page: should be on Cart Page`, async ()=>{
            await CartPage.ensureOnPage();
        })
        //TODO: Check that the cart has:
        //      - the right item in it. Need the name of the item
        //      - the right quantity
        //      - the right price

        step++;
        it(`${padDigits(step,3)} Cart Page: should have 1 item in Cart`, async ()=>{
            await CartPage.checkNumCartItems(1);
        })
        
        step++;
        it(`${padDigits(step,3)} Click on Checkout: click on Checkout`, async ()=>{
            await CartPage.clickOnCheckout();
        })
        step++;
    
        it(`${padDigits(step,3)} Checkout Step1 Page: should be on Checkout Step1 Page`, async()=>{
            await CheckoutStep1Page.ensureOnPage();
        })
        step++;
        it(`${padDigits(step,3)} Checkout Step1 Page: should have 1 item in cart`, async ()=>{
            await CartPage.checkNumCartItems(1);
        })
        step++;
        it(`${padDigits(step,3)} Checkout Step1 Page: fill in customer info`, async ()=>{
            await CheckoutStep1Page.fillInCustomerInfo("Jane", "Doe", "90210");
        })
        
        step++;
        it(`${padDigits(step,3)} Click on Continue: click on Continue`, async ()=>{
            await CheckoutStep1Page.clickOnContinue();
        })
        step++;
        it(`${padDigits(step,3)} Checkout Step2 Page: should be on Checkout Step2 Page`, async ()=>{
            await CheckoutStep2Page.ensureOnPage();
        })
        step++;
        it(`${padDigits(step,3)} Checkout Step2 Page: should have 1 item in cart`, async ()=>{
            await CartPage.checkNumCartItems(1);
        })
        step++;
        it(`${padDigits(step,3)} Click on Finish: click on Finish`, async ()=>{
            await CheckoutStep2Page.clickOnFinish();
        })
        step++;
        it(`${padDigits(step,3)} Checkout Complete Page: should be on Checkout Complete page`, async ()=>{
            await CheckoutCompletePage.ensureOnPage();
        })
        step++;
        it(`${padDigits(step,3)} Checkout Complete Page: cart should be empty`, async ()=>{
            await CartPage.checkNumCartItems(0);
        })
        
    })

});


