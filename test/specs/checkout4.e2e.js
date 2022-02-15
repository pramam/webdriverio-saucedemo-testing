const LoginPage = require('../pageobjects/login.page');
const InventoryPage = require('../pageobjects/inventory.page');
const CartPage = require('../pageobjects/cart.page');
const CheckoutStep1Page = require ('../pageobjects/checkoutstep1.page');
const LoginData = require('../../data/logindata');
const allureReporter = require('@wdio/allure-reporter').default;

describe('UserStory: Checkout: Should error out when customer information is missing', () => {
    allureReporter.addFeature('Checkout');
    // State Machine:
    // X 1 A 2 4 B 6 C <incomplete cust info> <should see error>
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
    describe(`Add 1 item to cart`, ()=>{
        it(`should add 1 item to cart`, async ()=>{
            await CartPage.addItemToCart('#add-to-cart-sauce-labs-backpack');
        })
        it(`cart should have 1 item`, async ()=>{
            await CartPage.checkNumCartItems(1);
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
        it(`should have 1 item in cart`, async ()=>{
            await CartPage.checkNumCartItems(1);
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
        it(`should have 1 item in cart`, async ()=>{
            await CartPage.checkNumCartItems(1);
        })
    })
    describe(`Don't fill all customer info`, ()=>{
        it(`fill in customer info with missing first name`, async ()=>{
            await CheckoutStep1Page.fillInCustomerInfo("", "Doe", "90210");
        })
        it(`validate customer info`, async ()=>{
            await expect(CheckoutStep1Page.firstName).toHaveValue('');
            await expect(CheckoutStep1Page.lastName).toHaveValue('Doe');
            await expect(CheckoutStep1Page.postalCode).toHaveValue('90210');
        })
    })
    describe(`Click on Continue`, () => {
        it(`click on Continue`, async ()=> {
            await CheckoutStep1Page.clickOnContinue();
        })
    })
    describe(`Validate customer sees error`, ()=>{
        it(`should see error`, async ()=>{
            await CheckoutStep1Page.validateCustomerSeesError();
        })
    })
});


