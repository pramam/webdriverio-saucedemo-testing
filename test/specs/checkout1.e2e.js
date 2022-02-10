const LoginPage = require('../pageobjects/login.page');
const InventoryPage = require('../pageobjects/inventory.page');

describe('UserStory: Checkout: Add one item to cart and remove it from cart from Inventory page', () => {

    //TODO: Investigate: Running all the tests together is causing second test to fail
    //      Do I need to logout after one test?
    // State machine info:
    // X 1 A 2 3
    describe(`Login`, ()=>{
        it(`should login user`, async ()=> {
            await LoginPage.open();
            await LoginPage.login('standard_user', 'secret_sauce');
        })
    })
    describe(`Inventory Page`, ()=>{
        it(`should be on Inventory Page`, async ()=>{
            await InventoryPage.ensureOnPage();
        })

    })
    describe(`Add, Remove item from cart`, ()=>{
        it(`should add item to cart`, async ()=>{
            await InventoryPage.addItemToCart('#add-to-cart-sauce-labs-backpack');
        })
        it(`should remove item from cart`, async ()=> {
            await InventoryPage.removeItemFromCart("#remove-sauce-labs-backpack");
        })
    })
});


