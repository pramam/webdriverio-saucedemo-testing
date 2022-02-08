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
    // Testing states 8, 13: CheckoutStep1->CartIcon->CartPage, CheckoutComplete->BackHome->InventoryPage
    // X 1 A 2 2 2 2 2 4 B 6 C [don't fill customer info] 8 B 3 B 6 C 17 9 D 12 E 13 A
    it("TestCase_5: Add 5 items to cart, got to CheckoutStep1, don't fill in customer info, go Back to Cart, Remove an item, continue to checkout, go Back Home", async ()=>{ 
        let stepnum = 0;
        await LoginPage.open();
        await LoginPage.login(LoginData.userName, LoginData.password);
 
        await InventoryPage.ensureOnPage();
        stepnum += 3;
        console.log(`TestCase_5: S${stepnum} Logged in`)
 
        await CartPage.addItemToCart('#add-to-cart-sauce-labs-backpack');
        await CartPage.addItemToCart('#add-to-cart-sauce-labs-bike-light');
        await CartPage.addItemToCart('#add-to-cart-sauce-labs-bolt-t-shirt');
        await CartPage.addItemToCart('#add-to-cart-sauce-labs-fleece-jacket');
        await CartPage.addItemToCart('#add-to-cart-sauce-labs-onesie');
        stepnum += 5;
        console.log(`TestCase_5: S${stepnum} Added 5 items to cart`);

        await CartPage.checkNumCartItems(5);
        await CartPage.clickOnCartIcon();
        stepnum +=2;
        console.log(`TestCase_5: S${stepnum} On Cart Page with 5 items`);

        await CartPage.ensureOnPage();
        await CartPage.checkNumCartItems(5);

        await CartPage.clickOnCheckout();
        stepnum += 3;
        console.log(`TestCase_5: S${stepnum} Click on Checkout from Cart page`);

        await CheckoutStep1Page.ensureOnPage();
        stepnum += 1;
        console.log(`TestCase_3: S${stepnum} Ensured on CheckoutStep1Page`);
 
        // Don't fill in customer info on CheckoutStep1Page
        await CartPage.clickOnCartIcon();
        await CartPage.ensureOnPage();
        await CartPage.checkNumCartItems(5);
        stepnum += 3;
        console.log(`TestCase_5: S${stepnum} Back on Cart Page`);

        await CartPage.removeItemFromCart('#remove-sauce-labs-onesie');
        await CartPage.checkNumCartItems(4);
        await CartPage.clickOnCheckout();
        stepnum += 3;
        console.log(`TestCase_5: S${stepnum} Removed 1 item from cart on CartPage`);

        await CheckoutStep1Page.ensureOnPage();
        await CartPage.checkNumCartItems(4);
        stepnum += 2;
        console.log(`TestCase_5: S${stepnum} Click on Checkout, check 4 items in cart`); 

        await CheckoutStep1Page.fillInCustomerInfo("Jane", "Doe", "90210");
        stepnum += 1;
        console.log(`TestCase_5: S${stepnum} CheckoutStep1Page: Filled in customer info`);

        await CheckoutStep1Page.clickOnContinue();

        await CheckoutStep2Page.ensureOnPage();
        stepnum += 2;
        console.log(`TestCase_5: S${stepnum} CheckoutStep2Page: ensure on page`);    
       
        await CartPage.checkNumCartItems(4);
 
        await CheckoutStep2Page.clickOnFinish();
        stepnum += 2;
        console.log(`TestCase_5: S${stepnum} CheckoutStep2Page: Clicked on Finish`);    

        await CheckoutCompletePage.ensureOnPage();
        stepnum += 1;
        console.log(`TestCase_5: S${stepnum} CheckoutCompletePage: ensureOnPage`); 
        await CartPage.checkNumCartItems(0);

        await CheckoutCompletePage.clickOnBackHome();
        stepnum += 2;
        console.log(`TestCase_5: S${stepnum} Clicked on BackHome after successful checkout`);

        await InventoryPage.ensureOnPage();
        await CartPage.checkNumCartItems(0);
        stepnum += 2;
        console.log(`TestCase_5: S${stepnum} InventoryPage.ensureOnPage, cart has 0 items`)
         // TODO: Should be able to logout
        console.log(`TestCase_5: S${stepnum} END`);
    })
});


