const LoginPage = require('../pageobjects/login.page');
const InventoryPage = require('../pageobjects/inventory.page');
const CartPage = require('../pageobjects/cart.page');
const CheckoutStep1Page = require ('../pageobjects/checkoutstep1.page');
const CheckoutStep2Page = require('../pageobjects/checkoutstep2.page');
const CheckoutCompletePage = require ('../pageobjects/checkoutcomplete.page');

describe('UserStory: Checkout', () => {

    //TODO: Investigate: Running all the tests together is causing second test to fail
    //      Do I need to logout after one test?

    // State Machine:
    // X 1 A 2 4 B 6 C <incomplete cust info> <should see error>
    it("TestCase_4: should error out when customer information is missing", async ()=>{ 
        await LoginPage.open();
        await LoginPage.login('standard_user', 'secret_sauce');
 
        await InventoryPage.ensureOnPage();

        console.log(`TestCase_4: Logged in`)
 
        await CartPage.addItemToCart('#add-to-cart-sauce-labs-backpack');

        console.log("TestCase_4: Added item to cart");

        // This check  is done on inventory page
        await CartPage.checkNumCartItems(1);
        await CartPage.clickOnCartIcon();

        await CartPage.ensureOnPage();
        // Checking count again on next page.
        await CartPage.checkNumCartItems(1);
        console.log("TestCase_4: Checked 1 item in cart, clicked on Cart Icon,ensured On CartPage");
      
        await CartPage.clickOnCheckout();
        console.log("TestCase_4: Clicked on Checkout from CartPage");
        
        await CheckoutStep1Page.ensureOnPage();
        console.log("TestCase_4: Ensured on CheckoutStep1Page");
 
        await CartPage.checkNumCartItems(1);
 
        
        await CheckoutStep1Page.fillInCustomerInfo("", "Doe", "90210");
        console.log("TestCase_4: CheckoutStep1Page: Filled in customer info");
        
        // This should throw an error as customer info is missing
        await CheckoutStep1Page.clickOnContinue();
        await CheckoutStep1Page.validateCustomerSeesError();

        
        // TODO: Reset App State for next test
    })
});


