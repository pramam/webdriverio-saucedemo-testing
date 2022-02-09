const LoginPage = require('../pageobjects/login.page');
const InventoryPage = require('../pageobjects/inventory.page');
const CartPage = require('../pageobjects/cart.page');
const CheckoutStep1Page = require ('../pageobjects/checkoutstep1.page');
const CheckoutStep2Page = require('../pageobjects/checkoutstep2.page');
const LoginData = require('../../data/logindata');
const allureReporter = require('@wdio/allure-reporter').default;

describe('UserStory: Checkout', () => {

    //TODO: Investigate: Running all the tests together is causing second test to fail
    //      Do I need to logout after one test?


    // State machine info:
    // X 1 A 2 4 B 6 C 17 9 D 15 10 B
    it("Reset_4: should be able to add one item to cart and check it out successfully", async ()=>{ 
        allureReporter.addFeature('Reset');
        let stepnum = 0;
        await LoginPage.open();
        await LoginPage.login(LoginData.userName, LoginData.password);
 
        await InventoryPage.ensureOnPage();
        stepnum += 3;
        console.log(`Reset_4: S${stepnum} Logged in`)
 
        await CartPage.addItemToCart('#add-to-cart-sauce-labs-backpack');

        stepnum += 1;
        console.log(`Reset_4: S${stepnum} Added item to cart`);

        // This check  is done on inventory page
        await CartPage.checkNumCartItems(1);
        await CartPage.clickOnCartIcon();

        await CartPage.ensureOnPage();
        // Checking count again on next page.
        await CartPage.checkNumCartItems(1);
        stepnum += 4;
        console.log(`Reset_4: S${stepnum} Checked 1 item in cart, clicked on Cart Icon,ensured On CartPage`);
        //TODO: Check that the cart has:
        //      - the right item in it. Need the name of the item
        //      - the right quantity
        //      - the right price

        await CartPage.clickOnCheckout();
        stepnum += 1;
        console.log(`Reset_4: S${stepnum} Clicked on Checkout from CartPage`);
        
        await CheckoutStep1Page.ensureOnPage();
        stepnum += 1;
        console.log(`Reset_4: S${stepnum} Ensured on CheckoutStep1Page`);
 
        await CartPage.checkNumCartItems(1);
 
        await CheckoutStep1Page.fillInCustomerInfo("Jane", "Doe", "90210");
        stepnum += 2;
        console.log(`Reset_4: S${stepnum} CheckoutStep1Page: Filled in customer info`);
        
        await CheckoutStep1Page.clickOnContinue();
        stepnum += 1;
        console.log(`Reset_4: S${stepnum} CheckoutStep1Page: Clicked on Continue`);    
        
        await CheckoutStep2Page.ensureOnPage();
        stepnum += 1;
        console.log(`Reset_4: S${stepnum} CheckoutStep2Page: ensure on page`);    
       
        await CartPage.checkNumCartItems(1);

        await LoginPage.resetAppState();
        stepnum += 2;
        console.log(`Reset_4: S${stepnum} resetAppState from CheckoutStep2 page`);

        await CheckoutStep2Page.ensureOnPage();

        await CartPage.checkNumCartItems(0);
        stepnum += 2;
        console.log(`Reset_4: S${stepnum} Confirmed number of items in cart is 0 from CheckoutStep2Page`);
        // Ensure on same page
        await CheckoutStep2Page.ensureOnPage();

        // extra step, go back to Cart Page and check items there too
        await CheckoutStep2Page.clickOnCartIcon();
        stepnum += 2;
        console.log(`Reset_4: S${stepnum} CheckoutStep2Page: Clicked on cart icon`);    
        
        await CartPage.ensureOnPage();
        stepnum += 1;
        console.log(`Reset_4: S${stepnum} CartPage: ensure on page`);    
       
        await CartPage.checkNumCartItems(0);
 
        stepnum += 1;
        console.log(`Reset_4: S${stepnum} CartPage has 0 items`);    
        
        console.log(`Reset_4: S${stepnum} END`);
    })

});


