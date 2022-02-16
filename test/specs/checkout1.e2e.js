const LoginPage = require('../pageobjects/login.page');
const InventoryPage = require('../pageobjects/inventory.page');
const CartPage = require('../pageobjects/cart.page');
const LoginData = require('../../data/logindata');
const allureReporter = require('@wdio/allure-reporter').default;
const {padDigits} = require('../../utils/myUtils');

describe('UserStory: Checkout: Add one item to cart, remove it, add it again', () => {
    allureReporter.addFeature('Checkout');
    // State machine info:
    // X 1 A 2 3
    let step = 0;
    step++;
    it(`${padDigits(step,3)} Login: should login user ${LoginData.userName}`, async ()=> {
        await LoginPage.open();
        await LoginPage.login(LoginData.userName, LoginData.password);
    })
    step++;
    it(`${padDigits(step,3)} Inventory Page: should be on Inventory Page`, async ()=>{
        await InventoryPage.ensureOnPage();
    })
    step++;
    it(`${padDigits(step,3)} Add,Remove,Add: should add item to cart`, async ()=>{
        await CartPage.addItemToCart('#add-to-cart-sauce-labs-backpack');
        await CartPage.checkNumCartItems(1);
    })
    step++;
    it(`${padDigits(step,3)} Add,Remove,Add: should remove item from cart`, async ()=>{
        await CartPage.removeItemFromCart("#remove-sauce-labs-backpack");
        await CartPage.checkNumCartItems(0);
    })
    step++;
    it(`${padDigits(step,3)} Add,Remove,Add: should add item to cart again`, async ()=>{
        await CartPage.addItemToCart('#add-to-cart-sauce-labs-backpack');
        await CartPage.checkNumCartItems(1);
    })
});


