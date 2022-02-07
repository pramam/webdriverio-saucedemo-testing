const LoginPage = require('../pageobjects/login.page');
const InventoryPage = require('../pageobjects/inventory.page');
const CartPage = require('../pageobjects/cart.page');
const LoginData = require('../../data/logindata');

describe('UserStory: Checkout', () => {

    //TODO: Investigate: Running all the tests together is causing second test to fail
    //      Do I need to logout after one test?
    // State machine info:
    // X 1 A 2 3
    it('TestCase_1: should be able to add one item to cart and remove it, add it again from inventory page', async()=> {
        let stepnum = 0;
        await LoginPage.open();
        await LoginPage.login(LoginData.userName, LoginData.password);

        await InventoryPage.ensureOnPage();

        stepnum += 3;
        console.log(`TestCase_1: S${stepnum}: Logged in`)
 
        await CartPage.addItemToCart('#add-to-cart-sauce-labs-backpack');
        await CartPage.checkNumCartItems(1);
        stepnum += 2;
        console.log(`TestCase_1: S${stepnum}: Added item to cart`);

        await CartPage.removeItemFromCart("#remove-sauce-labs-backpack");
        await CartPage.checkNumCartItems(0);
        stepnum += 2;
        console.log(`TestCase_1: S${stepnum}: Removed item successfully`);

        await CartPage.addItemToCart('#add-to-cart-sauce-labs-backpack');
        await CartPage.checkNumCartItems(1);
        stepnum += 2;
        console.log(`TestCase_1: S${stepnum}: Added removed item to cart again`);
        console.log(`TestCase_1: S${stepnum} END`);
    })
});


