const LoginPage = require('../pageobjects/login.page');
const InventoryPage = require('../pageobjects/inventory.page');
const CartPage = require('../pageobjects/cart.page');
const CheckoutStep1Page = require ('../pageobjects/checkoutstep1.page');
const LoginData = require('../../data/logindata');

describe('UserStory: Checkout', () => {

    //TODO: Investigate: Running all the tests together is causing second test to fail
    //      Do I need to logout after one test?

    // State Machine:
    // X 1 A 2 4 B 6 C <incomplete cust info> <should see error>
    it("TestCase_4: should error out when customer information is missing", async ()=>{ 
        let stepnum = 0;
        await LoginPage.open();
        await LoginPage.login(LoginData.userName, LoginData.password);
 
        await InventoryPage.ensureOnPage();
        stepnum += 3;
        console.log(`TestCase_4: S${stepnum} Logged in`)
 
        await CartPage.addItemToCart('#add-to-cart-sauce-labs-backpack');
        stepnum += 1;
        console.log(`TestCase_4: S${stepnum} Added item to cart`);

        // This check  is done on inventory page
        await CartPage.checkNumCartItems(1);
        await CartPage.clickOnCartIcon();

        await CartPage.ensureOnPage();
        // Checking count again on next page.
        await CartPage.checkNumCartItems(1);
        stepnum += 4;
        console.log(`TestCase_4: S${stepnum} Checked 1 item in cart, clicked on Cart Icon,ensured On CartPage`);
      
        await CartPage.clickOnCheckout();
        stepnum += 1;
        console.log(`TestCase_4: S${stepnum} Clicked on Checkout from CartPage`);
        
        await CheckoutStep1Page.ensureOnPage();
        stepnum += 1;
        console.log(`TestCase_4: S${stepnum} Ensured on CheckoutStep1Page`);
 
        await CartPage.checkNumCartItems(1);
 
        await CheckoutStep1Page.fillInCustomerInfo("", "Doe", "90210");
        stepnum += 2;
        console.log(`TestCase_4: S${stepnum} CheckoutStep1Page: Filled in customer info`);
        
        // This should throw an error as customer info is missing
        await CheckoutStep1Page.clickOnContinue();
        await CheckoutStep1Page.validateCustomerSeesError();

        stepnum += 2;
        console.log(`TestCase_4: S${stepnum} CheckoutStep1Page: Got error as expected`);
        // TODO: Reset App State for next test
        console.log(`TestCase_4: S${stepnum} END`);
    })
});


