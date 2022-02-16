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
    // Testing states 8, 13: CheckoutStep1->CartIcon->CartPage, CheckoutComplete->BackHome->InventoryPage
    // X 1 A 2 2 2 2 2 4 B 6 C [don't fill customer info] 8 B 3 B 6 C 17 9 D 12 E 13 A
    
    it(`TestCase_5: Add 5 items to cart, got to CheckoutStep1, don\'t fill in customer info, go Back to Cart, Remove an item, continue to checkout, go Back Home`, async ()=>{
        await LoginPage.open();
        await LoginPage.login(LoginData.userName, LoginData.password);
    
        await InventoryPage.ensureOnPage();
    
        await CartPage.addItemToCart('#add-to-cart-sauce-labs-backpack');
    
        await CartPage.addItemToCart('#add-to-cart-sauce-labs-bike-light');
    
        await CartPage.addItemToCart('#add-to-cart-sauce-labs-bolt-t-shirt');
    
        await CartPage.addItemToCart('#add-to-cart-sauce-labs-fleece-jacket');
    
        await CartPage.addItemToCart('#add-to-cart-sauce-labs-onesie');
    
        await CartPage.checkNumCartItems(5);
    
        await CartPage.clickOnCartIcon();
        await CartPage.ensureOnPage();
    
        await CartPage.checkNumCartItems(5);
        await CartPage.clickOnCheckout();
        await CheckoutStep1Page.ensureOnPage();
        // Don't fill in customer info on CheckoutStep1Page

        await CartPage.clickOnCartIcon();
        await CartPage.ensureOnPage();
        await CartPage.checkNumCartItems(5);
        await CartPage.removeItemFromCart('#remove-sauce-labs-onesie');
        await CartPage.checkNumCartItems(4);
    
        await CartPage.clickOnCheckout();
        await CheckoutStep1Page.ensureOnPage();
        await CartPage.checkNumCartItems(4);
        await CheckoutStep1Page.fillInCustomerInfo("Jane", "Doe", "90210");
    
        await CheckoutStep1Page.clickOnContinue();
    
        await CheckoutStep2Page.ensureOnPage();
        await CartPage.checkNumCartItems(4);
        await CheckoutStep2Page.clickOnFinish();
    
        await CheckoutCompletePage.ensureOnPage();
        await CartPage.checkNumCartItems(0);
        await CheckoutCompletePage.clickOnBackHome();
    
        await InventoryPage.ensureOnPage();
        await CartPage.checkNumCartItems(0);
    })
});


