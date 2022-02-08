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
    // X 1 A 2 2 2 4 B 6 C 17 9 D 10 B 6 C 17 9 D 11 
    // ...A 4 B 6 C 17 9 D 12 E
    it("TestCase_6: Testing CartIcon from CheckoutStep2, Cancel from CheckoutStep2", async ()=>{ 
        let stepnum = 0;
        await LoginPage.open();
        await LoginPage.login(LoginData.userName, LoginData.password);
 
        await InventoryPage.ensureOnPage();
        stepnum += 3;
        console.log(`TestCase_6: S${stepnum} Logged in`);
 
        await CartPage.addItemToCart('#add-to-cart-sauce-labs-bolt-t-shirt');
        await CartPage.addItemToCart('#add-to-cart-sauce-labs-fleece-jacket');
        await CartPage.addItemToCart('#add-to-cart-sauce-labs-onesie');
        stepnum += 3;
        console.log(`TestCase_6: S${stepnum} Added 3 items to cart`);

        await CartPage.checkNumCartItems(3);
        await CartPage.clickOnCartIcon();
        stepnum += 2;
        console.log(`TestCase_6: S${stepnum} On Cart Page with 3 items`);

        await CartPage.ensureOnPage();
        await CartPage.checkNumCartItems(3);

        await CartPage.clickOnCheckout();
        stepnum += 3;
        console.log(`TestCase_6: S${stepnum} Click on Checkout from Cart page`);

        await CheckoutStep1Page.ensureOnPage();
        stepnum += 1;
        console.log(`TestCase_6: S${stepnum} Ensured on CheckoutStep1Page`);
 
        await CheckoutStep1Page.fillInCustomerInfo("Jane", "Doe", "90210");
        stepnum += 1;
        console.log(`TestCase_6: S${stepnum} CheckoutStep1Page: Filled in customer info`);

        await CheckoutStep1Page.clickOnContinue();

        await CheckoutStep2Page.ensureOnPage();
        stepnum += 2;
        console.log(`TestCase_6: S${stepnum} CheckoutStep2Page: ensure on page`);    
       
        await CartPage.checkNumCartItems(3);
        
        // Go back to Cart from CheckoutStep2
        await CartPage.clickOnCartIcon();
        stepnum += 2;
        console.log(`TestCase_6: S${stepnum} Go back to CartPage from CheckoutStep2`);
        
        await CartPage.ensureOnPage();
        await CartPage.checkNumCartItems(3);
        
        await CartPage.clickOnCheckout();

        await CheckoutStep1Page.ensureOnPage();
        await CartPage.checkNumCartItems(3);
        await CheckoutStep1Page.fillInCustomerInfo("John", "Duran", "66");
        await CheckoutStep1Page.clickOnContinue();

        await CheckoutStep2Page.ensureOnPage();
        
        await CartPage.checkNumCartItems(3);
        stepnum += 9;
        console.log(`TestCase_6: S${stepnum} Walk through CheckoutStep1 to CheckoutStep2`);

        //Go back to inventory page
        await CheckoutStep2Page.clickOnCancel2();
        stepnum += 1;
        console.log(`TestCase_6: S${stepnum} Click on Cancel2 from CheckoutStep2Page to go back to InventoryPage`);
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
        stepnum += 12;
        console.log(`TestCase_6: S${stepnum} Did a single file checkout from Inventory Page`);
        // TODO: Should be able to logout
        console.log(`TestCase_6: S${stepnum} END`);
    })
});


