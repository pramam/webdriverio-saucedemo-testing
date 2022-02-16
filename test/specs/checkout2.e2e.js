const LoginPage = require('../pageobjects/login.page');
const InventoryPage = require('../pageobjects/inventory.page');
const CartPage = require('../pageobjects/cart.page');
const CheckoutStep1Page = require ('../pageobjects/checkoutstep1.page');
const CheckoutStep2Page = require('../pageobjects/checkoutstep2.page');
const CheckoutCompletePage = require ('../pageobjects/checkoutcomplete.page');
const LoginData = require('../../data/logindata');
const allureReporter = require('@wdio/allure-reporter').default;

describe('UserStory: Checkout', () => {
    allureReporter.addFeature('Checkout');

    // State machine info:
    // X 1 A 2 4 B 6 C 9 D 12 E
    it(`TestCase_2: Add one item to cart and check it out successfully`, async ()=>{
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
        await expect(CheckoutStep1Page.firstName).toHaveValue('Jane');
        await expect(CheckoutStep1Page.lastName).toHaveValue('Doe');
        await expect(CheckoutStep1Page.postalCode).toHaveValue('90210');
        await CheckoutStep1Page.clickOnContinue();
        
        await CheckoutStep2Page.ensureOnPage();
        await CartPage.checkNumCartItems(1);
        await CheckoutStep2Page.clickOnFinish();
        
        await CheckoutCompletePage.ensureOnPage();
        await CartPage.checkNumCartItems(0);
    })
});


