const LoginPage = require('../pageobjects/login.page');
const InventoryPage = require('../pageobjects/inventory.page');
const CartPage = require('../pageobjects/cart.page');
const CheckoutStep1Page = require ('../pageobjects/checkoutstep1.page');
const CheckoutStep2Page = require('../pageobjects/checkoutstep2.page');
const CheckoutCompletePage = require ('../pageobjects/checkoutcomplete.page');
const LoginData = require('../../data/logindata');
const allureReporter = require('@wdio/allure-reporter').default;

describe('UserStory: Logout', () => {

    //TODO: Investigate: Running all the tests together is causing second test to fail
    //      Do I need to logout after one test?


    // This is TestCase_2 modified with an intermediate logout-login from cart page
    // State machine info:
    // X 1 A 2 4 B 14(Logout) Y 1(Login) A 4 B 6 C 17 9 D 12 E
    it("TestCase_9: (TestCase_2 modified) should be able to add one item to cart, go to Cart page, logout, log back in and check it out successfully", async ()=>{ 
        allureReporter.addFeature('Logout');
        await LoginPage.open();
        await LoginPage.login(LoginData.userName, LoginData.password);
 
        await InventoryPage.ensureOnPage();
  
        await CartPage.addItemToCart('#add-to-cart-sauce-labs-backpack');
  
        // This check  is done on inventory page
        await CartPage.checkNumCartItems(1);

        await InventoryPage.ensureOnPage();
        await CartPage.checkNumCartItems(1);

        await CartPage.clickOnCartIcon();

        await CartPage.ensureOnPage();
        // Checking count again on next page.
        await CartPage.checkNumCartItems(1);
  
        await LoginPage.logout();
  
        await LoginPage.ensureOnLogoutPage();

        // I should be on a login page
        // await LoginPage.open();
        await LoginPage.login(LoginData.userName, LoginData.password);
  
        await InventoryPage.ensureOnPage();
        await CartPage.checkNumCartItems(1);
        await CartPage.clickOnCartIcon();
        await CartPage.clickOnCheckout();
        
        await CheckoutStep1Page.ensureOnPage();
  
        await CartPage.checkNumCartItems(1);
 
        await CheckoutStep1Page.fillInCustomerInfo("Jane", "Doe", "90210");
        
        await CheckoutStep1Page.clickOnContinue();
        
        await CheckoutStep2Page.ensureOnPage();
       
        // TODO: Check that item in cart matches the description of the item we selected
        await CartPage.checkNumCartItems(1);
 
        await CheckoutStep2Page.clickOnFinish();
         
        await CheckoutCompletePage.ensureOnPage();
        await CartPage.checkNumCartItems(0);
    })
});


