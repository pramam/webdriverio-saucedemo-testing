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


    // State machine info:
    // X 1 A 2 2 2 4 B 5 A 3 4 B 6 C 7 B 6 C 9 D 12
    it("TestCase_3: Add multiple items to cart, Continue shopping from cart, Cancel from Checkout1, to successful checkout", async ()=>{ 
        await LoginPage.open();
        await LoginPage.login(LoginData.userName, LoginData.password);
 
        await InventoryPage.ensureOnPage();

        console.log(`TestCase_3: Logged in`)
 
        await CartPage.addItemToCart('#add-to-cart-sauce-labs-backpack');
        await CartPage.addItemToCart('#add-to-cart-sauce-labs-bike-light');
        await CartPage.addItemToCart('#add-to-cart-sauce-labs-bolt-t-shirt');

        console.log("TestCase_3: Added 3 items to cart");

        // This check  is done on inventory page
        await CartPage.checkNumCartItems(3);
        await CartPage.clickOnCartIcon();


        await CartPage.ensureOnPage();
        await CartPage.checkNumCartItems(3);

        await CartPage.clickOnContinueShopping();
        console.log("TestCase_3: Click on Continue Shopping from Cart page");

        await InventoryPage.ensureOnPage();

        await CartPage.removeItemFromCart('#remove-sauce-labs-bolt-t-shirt');
        console.log("TestCase_3: Removed 1 item from cart");

        await CartPage.checkNumCartItems(2);

        await CartPage.clickOnCartIcon();
        await CartPage.ensureOnPage();

        await CartPage.clickOnCheckout();
        console.log("TestCase_3: Clicked on Checkout from CartPage");

        await CheckoutStep1Page.ensureOnPage();
        console.log("TestCase_3: Ensured on CheckoutStep1Page");
 
        await CartPage.checkNumCartItems(2);
        await CheckoutStep1Page.clickOnCancel1();

        console.log("TestCase_3: Cancel from CheckoutStep1Page"); 

        await CartPage.ensureOnPage();
        await CartPage.checkNumCartItems(2);
        console.log("TestCase_3: CartPage: ensureOnPage"); 

        await CartPage.clickOnCheckout();
        
        await CheckoutStep1Page.ensureOnPage();
        await CartPage.checkNumCartItems(2);
        console.log("TestCase_3: Click on Checkout a 2nd time, check 2 items in cart"); 

        await CheckoutStep1Page.fillInCustomerInfo("Jane", "Doe", "90210");
        console.log("TestCase_3: CheckoutStep1Page: Filled in customer info");

        await CheckoutStep1Page.clickOnContinue();

        await CheckoutStep2Page.ensureOnPage();
        console.log("TestCase_3: CheckoutStep2Page: ensure on page");    
       
        await CartPage.checkNumCartItems(2);
 
        await CheckoutStep2Page.clickOnFinish();
        console.log("TestCase_3: CheckoutStep2Page: Clicked on Finish");    

        await CheckoutCompletePage.ensureOnPage();
        console.log("TestCase_3: CheckoutCompletePage: ensureOnPage"); 
        await CartPage.checkNumCartItems(0);

        return;
        // TODO: Should be able to logout
    })
});


