const LoginPage = require('../pageobjects/login.page');
const InventoryPage = require('../pageobjects/inventory.page');
const CartPage = require('../pageobjects/cart.page');
const CheckoutStep1Page = require ('../pageobjects/checkoutstep1.page');
const CheckoutStep2Page = require('../pageobjects/checkoutstep2.page');
const CheckoutCompletePage = require ('../pageobjects/checkoutcomplete.page');
const LoginData = require('../../data/logindata');
const allureReporter = require('@wdio/allure-reporter').default;

describe('UserStory: Logout', () => {
    allureReporter.addFeature('Logout');

    // This is TestCase_2 modified with logout-login from CheckoutComplete page
    // Log back in and make sure there are 0 items in cart
    // State machine info:
    // X 1 A 2 4 B 6 C 17 9 D 12 E 14(Logout) Y 1(Login) A
    it("TestCase_15: (TestCase_2 modified) should be able to add one item to cart, checkout, logout at checkoutComplete page, log back in and check 0 items in cart", async ()=>{ 
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
        await LoginPage.logout();
        await LoginPage.ensureOnLogoutPage();
        // I should be on a login page again
        await LoginPage.login(LoginData.userName, LoginData.password);

        await InventoryPage.ensureOnPage();
        await CartPage.checkNumCartItems(0);
    })

});


