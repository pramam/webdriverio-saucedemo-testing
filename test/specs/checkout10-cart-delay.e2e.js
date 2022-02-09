const LoginPage = require('../pageobjects/login.page');
const InventoryPage = require('../pageobjects/inventory.page');
const CartPage = require('../pageobjects/cart.page');
const CheckoutStep1Page = require ('../pageobjects/checkoutstep1.page');
const CheckoutStep2Page = require('../pageobjects/checkoutstep2.page');
const CheckoutCompletePage = require ('../pageobjects/checkoutcomplete.page');
const LoginData = require('../../data/logindata');
const delay = require('delay');
const allureReporter = require('@wdio/allure-reporter').default;

describe('UserStory: Checkout', () => {

    //TODO: Investigate: Running all the tests together is causing second test to fail
    //      Do I need to logout after one test?


    // This is TestCase_2 modified with an intermediate delay on the cart page which kicks out the user.
    // Login again and finish the checkout process
    // State machine info:
    // X 1 A 2 4 B 16(delay) Z 1(Login) A 4 B 6 C 17 9 D 12 E
    it("TestCase_10: (TestCase_2 modified) should be able to add one item to cart, go to Cart page, delay, get kicked out, log back in and check it out successfully", async ()=>{ 
        allureReporter.addFeature('Delay');
        let stepnum = 0;
        await LoginPage.open();
        await LoginPage.login(LoginData.userName, LoginData.password);
 
        await InventoryPage.ensureOnPage();
        stepnum += 3;
        console.log(`TestCase_10: S${stepnum} Logged in`)
 
        await CartPage.addItemToCart('#add-to-cart-sauce-labs-backpack');
        stepnum += 1;
        console.log(`TestCase_10: S${stepnum} Added item to cart`);

        // This check  is done on inventory page
        await CartPage.checkNumCartItems(1);

        await InventoryPage.ensureOnPage();
        stepnum += 2;
        console.log(`TestCase_10: S${stepnum} InventoryPage.ensure`);
        await CartPage.checkNumCartItems(1);

        await CartPage.clickOnCartIcon();

        await CartPage.ensureOnPage();
        // Checking count again on next page.
        await CartPage.checkNumCartItems(1);
        stepnum += 4;
        console.log(`TestCase_10: S${stepnum} Checked 1 item in cart, clicked on Cart Icon,ensured On CartPage`);
        //TODO: Check that the cart has:
        //      - the right item in it. Need the name of the item
        //      - the right quantity
        //      - the right price

        console.log(`TestCase_10: S${stepnum} Start delay at ${Date.now()}`);
        // wait 10 mins + a bit
        await delay(10 * 60 * 1000 +5000);
        stepnum += 1;
        console.log(`TestCase_10: S${stepnum} Ended delay at ${Date.now()}`);

        // check if you see the logout error
        await LoginPage.checkIfOnErroredLogoutPage("/cart.html");
        stepnum += 1;
        console.log(`TestCase_10: S${stepnum} User kicked out after delay on Cart Page`);

        // I should be on a login page
        // await LoginPage.open();
        await LoginPage.login(LoginData.userName, LoginData.password);
        stepnum += 1;
        console.log(`TestCase_10: S${stepnum} Logged in again`);

        await InventoryPage.ensureOnPage();
        stepnum += 1;
        console.log(`TestCase_10: S${stepnum} InventoryPage.ensure`);

        // Continue to straight checkout
        await InventoryPage.ensureOnPage();
        await CartPage.checkNumCartItems(1);
        await CartPage.clickOnCartIcon();
        await CartPage.clickOnCheckout();
        stepnum += 4;
        console.log(`TestCase_10: S${stepnum} Clicked on Checkout from CartPage`);
        
        await CheckoutStep1Page.ensureOnPage();
        stepnum += 1;
        console.log(`TestCase_10: S${stepnum} Ensured on CheckoutStep1Page`);
 
        await CartPage.checkNumCartItems(1);
 
        await CheckoutStep1Page.fillInCustomerInfo("Jane", "Doe", "90210");
        stepnum += 2;
        console.log(`TestCase_10: S${stepnum} CheckoutStep1Page: Filled in customer info`);
        
        await CheckoutStep1Page.clickOnContinue();
        stepnum += 1;
        console.log(`TestCase_10: S${stepnum} CheckoutStep1Page: Clicked on Continue`);    
        
        await CheckoutStep2Page.ensureOnPage();
        stepnum += 1;
        console.log(`TestCase_10: S${stepnum} CheckoutStep2Page: ensure on page`);    
       
        // TODO: Check that item in cart matches the description of the item we selected
        await CartPage.checkNumCartItems(1);
 
        await CheckoutStep2Page.clickOnFinish();
        stepnum += 2;
        console.log(`TestCase_10: S${stepnum} CheckoutStep2Page: Clicked on Finish`);    
         
        await CheckoutCompletePage.ensureOnPage();
        stepnum += 1;
        console.log(`TestCase_10: S${stepnum} CheckoutCompletePage: ensureOnPage`); 
        await CartPage.checkNumCartItems(0);
        stepnum += 1;
        console.log(`TestCase_10: S${stepnum} END`);
    })

});


