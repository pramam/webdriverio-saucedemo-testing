const LoginPage = require('../pageobjects/login.page');
const InventoryPage = require('../pageobjects/inventory.page');
const CartPage = require('../pageobjects/cart.page');
const CheckoutStep1Page = require ('../pageobjects/checkoutstep1.page');
const CheckoutStep2Page = require('../pageobjects/checkoutstep2.page');
const CheckoutCompletePage = require ('../pageobjects/checkoutcomplete.page');
const LoginData = require('../../data/logindata');

describe('UserStory: Checkout', () => {

    //TODO: Investigate: Running all the tests together is causing second test to fail
    //      Do I need to logout after one test?


    // This is TestCase_2 modified with an intermediate logout-login from inventory page
    // State machine info:
    // X 1 A 2 14(Logout) Y 1(Login) A 4 B 6 C 9 D 12 E
    it("TestCase_7: (TestCase_2 modified) should be able to add one item to cart, logout, log back in and check it out successfully", async ()=>{ 
        await LoginPage.open();
        await LoginPage.login(LoginData.userName, LoginData.password);
 
        await InventoryPage.ensureOnPage();

        console.log(`TestCase_7: Logged in`)
 
        await CartPage.addItemToCart('#add-to-cart-sauce-labs-backpack');

        console.log("TestCase_7: Added item to cart");

        // This check  is done on inventory page
        await CartPage.checkNumCartItems(1);

        await LoginPage.logout();
        console.log(`TestCase_7: Logged out`);

        await LoginPage.ensureOnLogoutPage();

        // I should be on a login page
        // await LoginPage.open();
        await LoginPage.login(LoginData.userName, LoginData.password);
        console.log(`TestCase_7: Logged in again`);

        await InventoryPage.ensureOnPage();
        console.log(`TestCase_7: InventoryPage.ensure`);
        await CartPage.checkNumCartItems(1);

        await CartPage.clickOnCartIcon();

        await CartPage.ensureOnPage();
        // Checking count again on next page.
        await CartPage.checkNumCartItems(1);
        console.log("TestCase_7: Checked 1 item in cart, clicked on Cart Icon,ensured On CartPage");
        //TODO: Check that the cart has:
        //      - the right item in it. Need the name of the item
        //      - the right quantity
        //      - the right price

        await CartPage.clickOnCheckout();
        console.log("TestCase_7: Clicked on Checkout from CartPage");
        
        await CheckoutStep1Page.ensureOnPage();
        console.log("TestCase_7: Ensured on CheckoutStep1Page");
 
        await CartPage.checkNumCartItems(1);
 
        await CheckoutStep1Page.fillInCustomerInfo("Jane", "Doe", "90210");
        console.log("TestCase_7: CheckoutStep1Page: Filled in customer info");
        
        await CheckoutStep1Page.clickOnContinue();
        console.log("TestCase_7: CheckoutStep1Page: Clicked on Continue");    
        
        await CheckoutStep2Page.ensureOnPage();
        console.log("TestCase_7: CheckoutStep2Page: ensure on page");    
       
        // TODO: Add a wait > 10 mins and check that you are logged out

        // TODO: Check that item in cart matches the description of the item we selected
        await CartPage.checkNumCartItems(1);
 
        await CheckoutStep2Page.clickOnFinish();
        console.log("TestCase_7: CheckoutStep2Page: Clicked on Finish");    
         
        await CheckoutCompletePage.ensureOnPage();
        console.log("TestCase_7: CheckoutCompletePage: ensureOnPage"); 
        await CartPage.checkNumCartItems(0);

    })

});


