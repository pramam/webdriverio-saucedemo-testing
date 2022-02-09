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


    // This is TestCase_2 modified with logout-login from CheckoutComplete page
    // Log back in and make sure there are 0 items in cart
    // State machine info:
    // X 1 A 2 4 B 6 C 17 9 D 12 E 14(Logout) Y 1(Login) A
    it("TestCase_15: (TestCase_2 modified) should be able to add one item to cart, checkout, logout at checkoutComplete page, log back in and check 0 items in cart", async ()=>{ 
        allureReporter.addFeature('Logout');
        let stepnum = 0;
        await LoginPage.open();
        await LoginPage.login(LoginData.userName, LoginData.password);
 
        await InventoryPage.ensureOnPage();
        stepnum += 3;
        console.log(`TestCase_15: S${stepnum} Logged in`)
 
        await CartPage.addItemToCart('#add-to-cart-sauce-labs-backpack');
        stepnum += 1;
        console.log(`TestCase_15: S${stepnum} Added item to cart`);

        // This check  is done on inventory page
        await CartPage.checkNumCartItems(1);

        await CartPage.clickOnCartIcon();
        await CartPage.clickOnCheckout();
        await CheckoutStep1Page.ensureOnPage();
        stepnum += 4;
        console.log(`TestCase_15: S${stepnum} On CheckoutStep1Page`);

        await CartPage.checkNumCartItems(1);
 
        await CheckoutStep1Page.fillInCustomerInfo("Jane", "Doe", "90210");
        stepnum += 2;
        console.log(`TestCase_15: S${stepnum} CheckoutStep1Page: Filled in customer info`);
        
        await CheckoutStep1Page.clickOnContinue();
        stepnum += 1;
        console.log(`TestCase_15: S${stepnum} CheckoutStep1Page: Clicked on Continue`);    
        
        await CheckoutStep2Page.ensureOnPage();
        stepnum += 1;
        console.log(`TestCase_15: S${stepnum} CheckoutStep2Page: ensure on page`);    

        await CheckoutStep2Page.clickOnFinish();

        await CheckoutCompletePage.ensureOnPage();
        stepnum += 2;
        console.log(`TestCase_15: S${stepnum} CheckoutCompletePage: ensure on page`);    

        await CartPage.checkNumCartItems(0);
        await LoginPage.logout();
        stepnum += 2;
        console.log(`TestCase_15: S${stepnum} Logged out`);

        await LoginPage.ensureOnLogoutPage();

        // I should be on a login page
        // await LoginPage.open();
        await LoginPage.login(LoginData.userName, LoginData.password);
        stepnum += 2;
        console.log(`TestCase_15: S${stepnum} Logged in again`);

        await InventoryPage.ensureOnPage();
        stepnum += 1;
        console.log(`TestCase_15: S${stepnum} InventoryPage.ensure`);
        await CartPage.checkNumCartItems(0);
        stepnum += 1;
        console.log(`TestCase_15: S${stepnum} Check 0 items in cart`);
        
        console.log(`TestCase_15: S${stepnum} END`);
    })

});


