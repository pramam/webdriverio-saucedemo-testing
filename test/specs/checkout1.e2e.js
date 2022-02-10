const LoginPage = require('../pageobjects/login.page');
const InventoryPage = require('../pageobjects/inventory.page');
const CartPage = require('../pageobjects/cart.page');
const LoginData = require('../../data/logindata');
const allureReporter = require('@wdio/allure-reporter').default;


describe('UserStory: Checkout: Add one item to cart and checkout successfully', () => {
    allureReporter.addFeature('Checkout');

    //TODO: Investigate: Running all the tests together is causing second test to fail
    //      Do I need to logout after one test?
    // State machine info:
    // X 1 A 2 3
    describe('Login', ()=>{
        it(`should login user ${LoginData.userName}`, async ()=> {
            await LoginPage.open();
            await LoginPage.login(LoginData.userName, LoginData.password);
        })
    })
    describe('Inventory Page', ()=> {
        it(`should ensure user is on Inventory Page`, async ()=> {
            await InventoryPage.ensureOnPage();
        })
        it(`should ensure the Inventory page has the right content`, async ()=>{

        })
    })

    describe(`Add, Remove, Add item to cart`, ()=>{
        it(`should add item to cart`, async ()=>{
            await CartPage.addItemToCart('#add-to-cart-sauce-labs-backpack');
            await CartPage.checkNumCartItems(1);
        })
        it(`should remove item from cart`, async ()=>{
            await CartPage.removeItemFromCart("#remove-sauce-labs-backpack");
            await CartPage.checkNumCartItems(0);
        })
        it(`should add item to cart again`, async ()=>{
            await CartPage.addItemToCart('#add-to-cart-sauce-labs-backpack');
            await CartPage.checkNumCartItems(1);
        })
    })
});


