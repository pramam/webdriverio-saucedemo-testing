const LoginPage = require('../pageobjects/login.page');
const InventoryPage = require('../pageobjects/inventory.page');
const CartPage = require('../pageobjects/cart.page');
const LoginData = require('../../data/logindata');
const allureReporter = require('@wdio/allure-reporter').default;

describe('UserStory: Checkout', () => {
    allureReporter.addFeature('Checkout');
    // State machine info:
    // X 1 A 2 3

    it(`TestCase_1: Add one item to cart, remove it, add it again`, async ()=>{
        await LoginPage.open();
        await LoginPage.login(LoginData.userName, LoginData.password);

        await InventoryPage.ensureOnPage();

        await CartPage.addItemToCart('#add-to-cart-sauce-labs-backpack');
        await CartPage.checkNumCartItems(1);

        await CartPage.removeItemFromCart("#remove-sauce-labs-backpack");
        await CartPage.checkNumCartItems(0);

        await CartPage.addItemToCart('#add-to-cart-sauce-labs-backpack');
        await CartPage.checkNumCartItems(1);
    })
});


