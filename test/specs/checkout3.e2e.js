const LoginPage = require('../pageobjects/login.page');
const InventoryPage = require('../pageobjects/inventory.page');
const CartPage = require('../pageobjects/cart.page');
const CheckoutStep1Page = require ('../pageobjects/checkoutstep1.page');
const CheckoutStep2Page = require('../pageobjects/checkoutstep2.page');
const CheckoutCompletePage = require ('../pageobjects/checkoutcomplete.page');
const LoginData = require('../../data/logindata');
const allureReporter = require('@wdio/allure-reporter').default;

describe('UserStory: Checkout: Add multiple items to cart, Continue shopping from cart and remove 1 item, Cancel from Checkout1, to successful checkout', () => {
    allureReporter.addFeature('Checkout');
    // State machine info:
    // X 1 A 2 2 2 4 B 5 A 3 4 B 6 C 7 B 6 C 9 D 12
    describe(`Login`, ()=>{
        it(`should login user`, async ()=>{
            await LoginPage.open();
            await LoginPage.login(LoginData.userName, LoginData.password);
        })
    })
    describe(`Inventory Page`, ()=>{
        it(`should be on Inventory Page`, async ()=>{
            await InventoryPage.ensureOnPage();
        })
    })
    describe(`Add 3 items to cart`, ()=>{
        it(`add 1 item to cart`, async ()=>{
            await CartPage.addItemToCart('#add-to-cart-sauce-labs-backpack');
        })
        it(`add 1 item to cart`, async ()=>{
            await CartPage.addItemToCart('#add-to-cart-sauce-labs-bike-light');            
        })
        it(`add 1 item to cart`, async ()=>{
            await CartPage.addItemToCart('#add-to-cart-sauce-labs-bolt-t-shirt');
        })
        it(`cart should have 3 items`, async ()=>{
            await CartPage.checkNumCartItems(3);
        })
    })
    describe(`Click on Cart Icon`, ()=>{
        it(`click on Cart Icon`, async ()=>{
            await CartPage.clickOnCartIcon();
        })
    })
    describe(`Cart Page`, ()=>{
        it(`should be on Cart Page`, async ()=>{
            await CartPage.ensureOnPage();
        })
        it(`should have 3 items in cart`, async ()=>{
            await CartPage.checkNumCartItems(3);
        })
    })
    describe(`Click on Continue Shopping`, ()=>{
        it(`click on Continue Shopping`, async ()=> {
            await CartPage.clickOnContinueShopping();
        })
    })
    describe(`Inventory Page`, ()=>{
        it(`should be on Inventory Page`, async ()=>{
            await InventoryPage.ensureOnPage();
        })
    })
    describe(`Remove 1 item from cart`, ()=>{
        it(`remove 1 item from cart`, async ()=>{
            await CartPage.removeItemFromCart('#remove-sauce-labs-bolt-t-shirt');
        })
        it(`should have 2 items in cart`, async ()=>{
            await CartPage.checkNumCartItems(2);
        })
    })
    describe(`Click on Cart Icon`, ()=>{
        it(`click on Cart Icon`, async ()=>{
            await CartPage.clickOnCartIcon();
        })
    })
    describe(`Cart Page`, ()=>{
        it(`should be on Cart Page`, async ()=>{
            await CartPage.ensureOnPage();
        })
        it(`should have 2 items in cart`, async ()=>{
            await CartPage.checkNumCartItems(2);
        })
    })
    describe(`Click on Checkout`, ()=>{
        it(`click on Checkout`, async ()=>{
            await CartPage.clickOnCheckout();
        })
    })
    
    describe(`Checkout Step1 Page`, ()=>{
        it(`should be on Checkout Step1 Page`, async ()=>{
            await CheckoutStep1Page.ensureOnPage();
        })
        it(`should have 2 items in cart`, async ()=>{
            await CartPage.checkNumCartItems(2);
        })
    })
    describe(`Click on Cancel`, ()=>{
        it(`click on Cancel`, async ()=>{
            await CheckoutStep1Page.clickOnCancel1();
        })
    })
    describe(`Cart Page`, ()=>{
        it(`should be on Cart Page`, async ()=>{
            await CartPage.ensureOnPage();
        })    
        it(`cart should have 2 items`, async ()=>{
            await CartPage.checkNumCartItems(2);
        })
    })
    describe(`Click on Checkout`, ()=>{
        it(`click on Checkout`, async ()=>{
            await CartPage.clickOnCheckout();
        })
    })
    describe(`Checkout Step1 Page`, ()=>{
        it(`should be on Checkout Step1 Page`, async ()=>{
            await CheckoutStep1Page.ensureOnPage();
        })
        it(`should have 2 items in cart`, async ()=>{
            await CartPage.checkNumCartItems(2);
        })
        it(`fill in customer info`, async ()=>{
            await CheckoutStep1Page.fillInCustomerInfo("Jane", "Doe", "90210");
        })
        it(`validate customer info`, async ()=>{
            await expect(CheckoutStep1Page.firstName).toHaveValue('Jane');
            await expect(CheckoutStep1Page.lastName).toHaveValue('Doe');
            await expect(CheckoutStep1Page.postalCode).toHaveValue('90210');
        })
    })
    describe(`Click on Continue`, ()=>{
        it(`click on Continue`, async ()=>{
            await CheckoutStep1Page.clickOnContinue();
        })
    })
    describe(`Checkout Step2 Page`, ()=>{
        it(`should be on Checkout Step2 Page`, async ()=>{
            await CheckoutStep2Page.ensureOnPage();
        })  
        it(`should have 2 items in cart`, async ()=> {
            await CartPage.checkNumCartItems(2);
        })
    })
    describe(`Click on Finish`, ()=>{
        it(`click on Finish`, async ()=>{
            await CheckoutStep2Page.clickOnFinish();
        })
    })
    describe(`Checkout Complete Page`, ()=>{
        it(`should be on Checkout Complete Page`, async ()=>{
            await CheckoutCompletePage.ensureOnPage();
        })
        it(`cart should be empty`, async ()=>{
            await CartPage.checkNumCartItems(0);
        })
    })
});


