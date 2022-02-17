const LoginPage = require('../pageobjects/login.page');
const InventoryPage = require('../pageobjects/inventory.page');
const CartPage = require('../pageobjects/cart.page');
const CheckoutStep1Page = require ('../pageobjects/checkoutstep1.page');
const LoginData = require('../../data/logindata');
const allureReporter = require('@wdio/allure-reporter').default;

describe('UserStory: Reset Cart State', () => {
    allureReporter.addFeature('Reset');

    // State machine info:
    // X 1 A 2 4 B 6 C 15 17 C 8 B
    it("Reset_3: should be able to reset cart state from CheckoutStep1", async ()=>{ 
        await LoginPage.open();
        await LoginPage.login(LoginData.userName, LoginData.password);
 
        await InventoryPage.ensureOnPage();
        await CartPage.addItemToCart('#add-to-cart-sauce-labs-backpack');
        await CartPage.checkNumCartItems(1);
        await CartPage.clickOnCartIcon();

        await CartPage.ensureOnPage();
        await CartPage.checkNumCartItems(1);

        await CartPage.clickOnCheckout();        
        await CheckoutStep1Page.ensureOnPage();
        await CartPage.checkNumCartItems(1);
        await CheckoutStep1Page.fillInCustomerInfo("Jane", "Doe", "90210");
        
        await LoginPage.resetAppState();
        
        await CheckoutStep1Page.ensureOnPage();

        await CartPage.checkNumCartItems(0);
        await CheckoutStep1Page.ensureOnPage();

        // extra step, go back to Cart Page and check items there too
        await CartPage.clickOnCartIcon();        
        await CartPage.ensureOnPage();
        await CartPage.checkNumCartItems(0);
    })
});


