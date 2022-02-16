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
    // Testing states 10, 11: CartIcon from CheckoutStep2, Cancel from CheckoutStep2
    // X 1 A 2 2 2 4 B 6 C 17 9 D 10 B 6 C 17 9 D 11 
    // ...A 4 B 6 C 17 9 D 12 E
    it("TestCase_6: Testing CartIcon from CheckoutStep2, Cancel from CheckoutStep2", async ()=>{ 
        await LoginPage.open();
        await LoginPage.login(LoginData.userName, LoginData.password);
    
        await InventoryPage.ensureOnPage();
        await CartPage.addItemToCart('#add-to-cart-sauce-labs-bolt-t-shirt');
        await CartPage.checkNumCartItems(1);
        await CartPage.addItemToCart('#add-to-cart-sauce-labs-fleece-jacket');
        await CartPage.checkNumCartItems(2);
        await CartPage.addItemToCart('#add-to-cart-sauce-labs-onesie');
        await CartPage.checkNumCartItems(3);
    
        await CartPage.clickOnCartIcon();
        await CartPage.ensureOnPage();
        await CartPage.checkNumCartItems(3);
        await CartPage.clickOnCheckout();
    
        await CheckoutStep1Page.ensureOnPage();
        await CheckoutStep1Page.fillInCustomerInfo("Jane", "Doe", "90210");
        await CheckoutStep1Page.clickOnContinue();
    
        await CheckoutStep2Page.ensureOnPage();
        await CartPage.checkNumCartItems(3);
    
        // Go back to Cart from CheckoutStep2
        await CartPage.clickOnCartIcon();
        await CartPage.ensureOnPage();
        await CartPage.checkNumCartItems(3);
        // Continue checkout
        await CartPage.clickOnCheckout();
        await CheckoutStep1Page.ensureOnPage();
        await CartPage.checkNumCartItems(3);
        await CheckoutStep1Page.fillInCustomerInfo("Jane", "Doe", "90210");
        await CheckoutStep1Page.clickOnContinue();

        await CheckoutStep2Page.ensureOnPage();
        await CartPage.checkNumCartItems(3);
        // Cancel2
        await CheckoutStep2Page.clickOnCancel2();
    
        // Now we're back on Inventory page
        // Do a single file walk through to checkout
        await InventoryPage.ensureOnPage();
        await CartPage.clickOnCartIcon();
        await CartPage.ensureOnPage();
        await CartPage.clickOnCheckout();
        await CheckoutStep1Page.ensureOnPage();
        await CartPage.checkNumCartItems(3);
        await CheckoutStep1Page.fillInCustomerInfo("Hello", "World", "90000");
        await CheckoutStep1Page.clickOnContinue();
        await CheckoutStep2Page.ensureOnPage();
        await CartPage.checkNumCartItems(3);
        await CheckoutStep2Page.clickOnFinish();
        await CheckoutCompletePage.ensureOnPage();
        await CartPage.checkNumCartItems(0);
    })
});


