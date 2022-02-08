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
    // X 1 A 2 2 2 4 B 5 A 3 4 B 6 C 7 B 6 C 17 9 D 12 E
    it("TestCase_3: Add multiple items to cart, Continue shopping from cart, Cancel from Checkout1, to successful checkout", async ()=>{ 
        let stepnum = 0;
        await LoginPage.open();
        await LoginPage.login(LoginData.userName, LoginData.password);
 
        await InventoryPage.ensureOnPage();
        stepnum +=3;

        console.log(`TestCase_3: S${stepnum} Logged in`)
 
        await CartPage.addItemToCart('#add-to-cart-sauce-labs-backpack');
        await CartPage.addItemToCart('#add-to-cart-sauce-labs-bike-light');
        await CartPage.addItemToCart('#add-to-cart-sauce-labs-bolt-t-shirt');
        stepnum += 3;
        
        console.log(`TestCase_3: S${stepnum} Added 3 items to cart`);

        // This check  is done on inventory page
        await CartPage.checkNumCartItems(3);
        await CartPage.clickOnCartIcon();


        await CartPage.ensureOnPage();
        await CartPage.checkNumCartItems(3);

        await CartPage.clickOnContinueShopping();
        stepnum +=5;
        console.log(`TestCase_3: S${stepnum} Click on Continue Shopping from Cart page`);

        await InventoryPage.ensureOnPage();

        await CartPage.removeItemFromCart('#remove-sauce-labs-bolt-t-shirt');
        stepnum += 2;
        console.log(`TestCase_3: S${stepnum} Removed 1 item from cart`);

        await CartPage.checkNumCartItems(2);

        await CartPage.clickOnCartIcon();
        await CartPage.ensureOnPage();

        await CartPage.clickOnCheckout();
        stepnum += 4;
        console.log(`TestCase_3: S${stepnum} Clicked on Checkout from CartPage`);

        await CheckoutStep1Page.ensureOnPage();
        stepnum += 1;
        console.log(`TestCase_3: S${stepnum} Ensured on CheckoutStep1Page`);
 
        await CartPage.checkNumCartItems(2);
        await CheckoutStep1Page.clickOnCancel1();
        stepnum += 2;
        console.log(`TestCase_3: S${stepnum} Cancel from CheckoutStep1Page`); 

        await CartPage.ensureOnPage();
        await CartPage.checkNumCartItems(2);
        stepnum += 2;
        console.log(`TestCase_3: S${stepnum} CartPage: ensureOnPage`); 

        await CartPage.clickOnCheckout();
        
        await CheckoutStep1Page.ensureOnPage();
        await CartPage.checkNumCartItems(2);
        stepnum += 3;
        console.log(`TestCase_3: S${stepnum} Click on Checkout a 2nd time, check 2 items in cart`); 

        await CheckoutStep1Page.fillInCustomerInfo("Jane", "Doe", "90210");
        stepnum += 1;
        console.log(`TestCase_3: S${stepnum} CheckoutStep1Page: Filled in customer info`);

        await CheckoutStep1Page.clickOnContinue();

        await CheckoutStep2Page.ensureOnPage();
        stepnum += 2;
        console.log(`TestCase_3: S${stepnum} CheckoutStep2Page: ensure on page`);    
       
        await CartPage.checkNumCartItems(2);
 
        await CheckoutStep2Page.clickOnFinish();
        stepnum += 2;
        console.log(`TestCase_3: S${stepnum} CheckoutStep2Page: Clicked on Finish`);    

        await CheckoutCompletePage.ensureOnPage();
        stepnum += 1;
        console.log(`TestCase_3: S${stepnum} CheckoutCompletePage: ensureOnPage`); 
        await CartPage.checkNumCartItems(0);
        stepnum += 1;
        // TODO: Should be able to logout
        console.log(`TestCase_3: S${stepnum} END`);
    })
});


