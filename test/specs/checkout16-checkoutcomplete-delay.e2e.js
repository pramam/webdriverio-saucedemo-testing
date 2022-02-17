const LoginPage = require('../pageobjects/login.page');
const InventoryPage = require('../pageobjects/inventory.page');
const CartPage = require('../pageobjects/cart.page');
const CheckoutStep1Page = require ('../pageobjects/checkoutstep1.page');
const CheckoutStep2Page = require('../pageobjects/checkoutstep2.page');
const CheckoutCompletePage = require ('../pageobjects/checkoutcomplete.page');
const LoginData = require('../../data/logindata');
const delay = require('delay');
const allureReporter = require('@wdio/allure-reporter').default;

describe('UserStory: Delay', function(){
    // Increase total timeout for this test from the default in wdio.conf.js
    // The above describe should have a function as second arg, not a fat arrow
    // https://stackoverflow.com/questions/23492043/change-default-timeout-for-mocha/45220192#45220192
    this.timeout(700000);
    allureReporter.addFeature('Delay');

    // This is TestCase_2 modified with logout-login from CheckoutComplete page
    // Log back in and make sure there are 0 items in cart
    // State machine info:
    // X 1 A 2 4 B 6 C 17 9 D 12 E 16(delay) Z 1(Login) A
    it("TestCase_16: (TestCase_2 modified) should be able to add one item to cart and go to checkoutComplete page, delay, logged out, log back in and check 0 items in cart", async ()=>{ 
        await LoginPage.open();
        await LoginPage.login(LoginData.userName, LoginData.password);
 
        await InventoryPage.ensureOnPage(); 
        await CartPage.addItemToCart('#add-to-cart-sauce-labs-backpack');
        await CartPage.checkNumCartItems(1);

        await CartPage.clickOnCartIcon();
        await CartPage.clickOnCheckout();

        await CheckoutStep1Page.ensureOnPage();
        await CartPage.checkNumCartItems(1);
        await CheckoutStep1Page.fillInCustomerInfo("Jane", "Doe", "90210");
        await CheckoutStep1Page.clickOnContinue();
        
        await CheckoutStep2Page.ensureOnPage();
        await CheckoutStep2Page.clickOnFinish();

        await CheckoutCompletePage.ensureOnPage();
        await CartPage.checkNumCartItems(0);
        // wait 10 mins + a bit
        await delay(10 * 60 * 1000 +5000);

        // check if you see the logout error
        await LoginPage.checkIfOnErroredLogoutPage("/checkout-complete.html");

        // I should be on a login page
        await LoginPage.login(LoginData.userName, LoginData.password);

        await InventoryPage.ensureOnPage();
        await CartPage.checkNumCartItems(0);
    })

});


