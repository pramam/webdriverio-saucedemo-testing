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
    // Testing states 5, 7:
    // X 1 A 2 2 2 4 B 5 A 3 4 B 6 C 7 B 6 C 17 9 D 12
    it(`TestCase_3: Add multiple items to cart, Continue shopping from cart and remove 1 item, Cancel from Checkout1, to successful checkout`, async ()=>{
        // allureReporter.addStep(`Login`);
        await LoginPage.open();
        await LoginPage.login(LoginData.userName, LoginData.password);

        await InventoryPage.ensureOnPage();
        await CartPage.addItemToCart('#add-to-cart-sauce-labs-backpack');
        await CartPage.addItemToCart('#add-to-cart-sauce-labs-bike-light');            
        await CartPage.addItemToCart('#add-to-cart-sauce-labs-bolt-t-shirt');
        await CartPage.checkNumCartItems(3);

        await CartPage.clickOnCartIcon();
        await CartPage.ensureOnPage();
        await CartPage.checkNumCartItems(3);
        await CartPage.clickOnContinueShopping();

        await InventoryPage.ensureOnPage();
        await CartPage.removeItemFromCart('#remove-sauce-labs-bolt-t-shirt');
        await CartPage.checkNumCartItems(2);
        await CartPage.clickOnCartIcon();

        await CartPage.ensureOnPage();
        await CartPage.checkNumCartItems(2);
        await CartPage.clickOnCheckout();

        await CheckoutStep1Page.ensureOnPage();
        await CartPage.checkNumCartItems(2);
        await CheckoutStep1Page.clickOnCancel1();

        await CartPage.ensureOnPage();
        await CartPage.checkNumCartItems(2);
        await CartPage.clickOnCheckout();

        await CheckoutStep1Page.ensureOnPage();
        await CartPage.checkNumCartItems(2);
        await CheckoutStep1Page.fillInCustomerInfo("Jane", "Doe", "90210");
        await expect(CheckoutStep1Page.firstName).toHaveValue('Jane');
        await expect(CheckoutStep1Page.lastName).toHaveValue('Doe');
        await expect(CheckoutStep1Page.postalCode).toHaveValue('90210');
        await CheckoutStep1Page.clickOnContinue();

        await CheckoutStep2Page.ensureOnPage();
        await CartPage.checkNumCartItems(2);
        await CheckoutStep2Page.clickOnFinish();

        await CheckoutCompletePage.ensureOnPage();
        await CartPage.checkNumCartItems(0);
    })
});


