const LoginPage = require('../pageobjects/login.page');
const InventoryPage = require('../pageobjects/inventory.page');
const CartPage = require('../pageobjects/cart.page');
const CheckoutStep1Page = require ('../pageobjects/checkoutstep1.page');
const CheckoutStep2Page = require('../pageobjects/checkoutstep2.page');
const CheckoutCompletePage = require ('../pageobjects/checkoutcomplete.page');

describe('UserStory: Checkout', () => {

    //TODO: Investigate: Running all the tests together is causing second test to fail
    //      Do I need to logout after one test?


    // State machine info:
    // X 1 A 2 4 B 6 C 9 D 12 E
    it("TestCase_2: should be able to add one item to cart and check it out successfully", async ()=>{ 
        await LoginPage.open();
        await LoginPage.login('standard_user', 'secret_sauce');
 
        await InventoryPage.ensureOnPage();

        console.log(`TestCase_2: Logged in`)
 
        await InventoryPage.addItemToCart('#add-to-cart-sauce-labs-backpack');

        console.log("TestCase_2: Added item to cart");

        // This check  is done on inventory page
        await CartPage.checkNumCartItems(1);
        await CartPage.clickOnCartIcon();


        await CartPage.ensureOnPage();
        // Checking count again on next page.
        await CartPage.checkNumCartItems(1);
        console.log("TestCase_2: Checked 1 item in cart, clicked on Cart Icon,ensured On CartPage");
        //TODO: Check that the cart has:
        //      - the right item in it. Need the name of the item
        //      - the right quantity
        //      - the right price

        await CartPage.clickOnCheckout();
        console.log("TestCase_2: Clicked on Checkout from CartPage");
        
        await CheckoutStep1Page.ensureOnPage();
        console.log("TestCase_2: Ensured on CheckoutStep1Page");
 
        await CartPage.checkNumCartItems(1);
 
        await CheckoutStep1Page.fillInCustomerInfo("Jane", "Doe", "90210");
        console.log("TestCase_2: CheckoutStep1Page: Filled in customer info");
        
        await CheckoutStep1Page.clickOnContinue();
        console.log("TestCase_2: CheckoutStep1Page: Clicked on Continue");    
        
        await CheckoutStep2Page.ensureOnPage();
        console.log("TestCase_2: CheckoutStep2Page: ensure on page");    
       
        // TODO: Add a wait > 10 mins and check that you are logged out

        // TODO: Check that item in cart matches the description of the item we selected
        await CartPage.checkNumCartItems(1);
 
        await CheckoutStep2Page.clickOnFinish();
        console.log("TestCase_2: CheckoutStep2Page: Clicked on Finish");    
         
        await CheckoutCompletePage.ensureOnPage();
        console.log("TestCase_2: CheckoutCompletePage: ensureOnPage"); 
        await CartPage.checkCartIsEmpty();
        
        // TODO: Should be able to logout
    })

    // Other Tests to write:
    // Not specifying FirstName/Last Name/ZipCode on checkout should fail the checkout
    // should be able to add more than one item to cart from inventory page
    // should not be able to checkout with problem_user
});


