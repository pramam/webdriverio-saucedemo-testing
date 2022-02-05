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
    // Testing states 10, 11: CartIcon from CheckoutStep2, Cancel from CheckoutStep2
    // X 1 A 2 2 2 4 B 6 C [fill in customer info] 9 D 10 B 6 C 9 D 11 
    // ...A 4 B 6 C 9 D 12 E
    it("TestCase_6: Testing CartIcon from CheckoutStep2, Cancel from CheckoutStep2", async ()=>{ 
        await LoginPage.open();
        await LoginPage.login(LoginData.userName, LoginData.password);
 
        await InventoryPage.ensureOnPage();

        console.log(`TestCase_6: Logged in`);
 
        await CartPage.addItemToCart('#add-to-cart-sauce-labs-bolt-t-shirt');
        await CartPage.addItemToCart('#add-to-cart-sauce-labs-fleece-jacket');
        await CartPage.addItemToCart('#add-to-cart-sauce-labs-onesie');

        console.log("TestCase_6: Added 3 items to cart");

        await CartPage.checkNumCartItems(3);
        await CartPage.clickOnCartIcon();
        console.log("TestCase_6: On Cart Page with 3 items");

        await CartPage.ensureOnPage();
        await CartPage.checkNumCartItems(3);

        await CartPage.clickOnCheckout();
        console.log("TestCase_6: Click on Checkout from Cart page");

        await CheckoutStep1Page.ensureOnPage();
        console.log("TestCase_6: Ensured on CheckoutStep1Page");
 
        await CheckoutStep1Page.fillInCustomerInfo("Jane", "Doe", "90210");
        console.log("TestCase_6: CheckoutStep1Page: Filled in customer info");

        await CheckoutStep1Page.clickOnContinue();

        await CheckoutStep2Page.ensureOnPage();
        console.log("TestCase_6: CheckoutStep2Page: ensure on page");    
       
        await CartPage.checkNumCartItems(3);
        
        // Go back to Cart from CheckoutStep2
        await CartPage.clickOnCartIcon();
        console.log("TestCase_6: Go back to CartPage from CheckoutStep2");
        
        await CartPage.ensureOnPage();
        await CartPage.checkNumCartItems(3);
        
        await CartPage.clickOnCheckout();

        await CheckoutStep1Page.ensureOnPage();
        await CartPage.checkNumCartItems(3);
        await CheckoutStep1Page.fillInCustomerInfo("John", "Duran", "66");
        await CheckoutStep1Page.clickOnContinue();

        await CheckoutStep2Page.ensureOnPage();
        
        await CartPage.checkNumCartItems(3);

        console.log("TestCase_6: Walk through CheckoutStep1 to CheckoutStep2");

        //Go back to inventory page
        await CheckoutStep2Page.clickOnCancel2();
        console.log("TestCase_6: Click on Cancel2 from CheckoutStep2Page to go back to InventoryPage");
        // Now we're back on Inventory page
        // Do a single file walk through to checkout
        await InventoryPage.ensureOnPage();
        await CartPage.clickOnCartIcon();
        await CartPage.ensureOnPage();
        await CartPage.clickOnCheckout();
        await CheckoutStep1Page.ensureOnPage();
        await CheckoutStep1Page.fillInCustomerInfo("Hello", "World", "900000");
        await CheckoutStep1Page.clickOnContinue();
        await CheckoutStep2Page.ensureOnPage();
        await CartPage.checkNumCartItems(3);
        await CheckoutStep2Page.clickOnFinish();
        await CheckoutCompletePage.ensureOnPage();

        await CartPage.checkNumCartItems(0);
        console.log("TestCase_6: Did a single file checkout from Inventory Page");
        return;
        // TODO: Should be able to logout
    })
});


