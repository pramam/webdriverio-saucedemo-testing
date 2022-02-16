const LoginPage = require('../pageobjects/login.page');
const InventoryPage = require('../pageobjects/inventory.page');
const CartPage = require('../pageobjects/cart.page');
const CheckoutStep1Page = require ('../pageobjects/checkoutstep1.page');
const LoginData = require('../../data/logindata');
const allureReporter = require('@wdio/allure-reporter').default;
const {padDigits} = require('../../utils/myUtils');

describe('UserStory: Checkout: Should error out when customer information is missing', () => {
    allureReporter.addFeature('Checkout');
    // State Machine:
    // X 1 A 2 4 B 6 C <incomplete cust info> <should see error>
    let step = 0;
    step++;
    it(`${padDigits(step,3)} Login: should login user`, async ()=>{
        await LoginPage.open();
        await LoginPage.login(LoginData.userName, LoginData.password);
    })

    step++;
    it(`${padDigits(step,3)} Inventory Page: should be on Inventory Page`, async ()=>{
        await InventoryPage.ensureOnPage();
    })

    step++;
    it(`${padDigits(step,3)} Add 1 item to cart: should add 1 item to cart`, async ()=>{
        await CartPage.addItemToCart('#add-to-cart-sauce-labs-backpack');
    })
    step++;
    it(`${padDigits(step,3)} Add 1 item to cart: cart should have 1 item`, async ()=>{
        await CartPage.checkNumCartItems(1);
    })
    
    step++;
    it(`${padDigits(step,3)} Click on Cart Icon: click on Cart Icon`, async ()=>{
        await CartPage.clickOnCartIcon();
    })
    
    step++;
    it(`${padDigits(step,3)} Cart Page: should be on Cart Page`, async ()=>{
        await CartPage.ensureOnPage();
    })
    step++;
    it(`${padDigits(step,3)} Cart Page: should have 1 item in cart`, async ()=>{
        await CartPage.checkNumCartItems(1);
    })
    
    step++;
    it(`${padDigits(step,3)} Click on Checkout: click on Checkout`, async ()=>{
        await CartPage.clickOnCheckout();
    })
    
    step++;
    it(`${padDigits(step,3)} Checkout Step1 Page: should be on Checkout Step1 Page`, async ()=>{
        await CheckoutStep1Page.ensureOnPage();
    })
    step++;
    it(`${padDigits(step,3)} Checkout Step1 Page: should have 1 item in cart`, async ()=>{
        await CartPage.checkNumCartItems(1);
    })
    
    step++;
    it(`${padDigits(step,3)} Don't fill all customer info: fill in customer info with missing first name`, async ()=>{
        await CheckoutStep1Page.fillInCustomerInfo("", "Doe", "90210");
    })
    step++;
    it(`${padDigits(step,3)} Don't fill all customer info: validate customer info`, async ()=>{
        await expect(CheckoutStep1Page.firstName).toHaveValue('');
        await expect(CheckoutStep1Page.lastName).toHaveValue('Doe');
        await expect(CheckoutStep1Page.postalCode).toHaveValue('90210');
    })
    
    step++;
    it(`${padDigits(step,3)} Click on Continue: click on Continue`, async ()=> {
        await CheckoutStep1Page.clickOnContinue();
    })
    
    step++;
    it(`${padDigits(step,3)} Validate customer sees error: should see error`, async ()=>{
        await CheckoutStep1Page.validateCustomerSeesError();
    })
});


