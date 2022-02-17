const LoginPage = require('../pageobjects/login.page');
const InventoryPage = require('../pageobjects/inventory.page');
const CartPage = require('../pageobjects/cart.page');
const LoginData = require('../../data/logindata');
const allureReporter = require('@wdio/allure-reporter').default;

describe("UserStory: Reset Cart State", ()=>{
    allureReporter.addFeature('Reset');

    // State machine info:
    // X 1 A 2 2 4 B 15 B
    it('Reset_2: should be able to add two items to cart and zero it out by Reset App State from burger menu on the Cart Page', async()=> {
        await LoginPage.open();
        await LoginPage.login(LoginData.userName, LoginData.password);

        await InventoryPage.ensureOnPage();
        await CartPage.addItemToCart('#add-to-cart-sauce-labs-backpack');
        await CartPage.addItemToCart('#add-to-cart-sauce-labs-bike-light');
        await CartPage.checkNumCartItems(2);

        await CartPage.clickOnCartIcon();
        await CartPage.ensureOnPage();
        await LoginPage.resetAppState();
        
        await CartPage.checkNumCartItems(0);
        // Ensure on same page
        await CartPage.ensureOnPage();
    })
})