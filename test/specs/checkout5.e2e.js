const LoginPage = require('../pageobjects/login.page');
const InventoryPage = require('../pageobjects/inventory.page');
const CartPage = require('../pageobjects/cart.page');
const CheckoutStep1Page = require ('../pageobjects/checkoutstep1.page');
const CheckoutStep2Page = require('../pageobjects/checkoutstep2.page');
const CheckoutCompletePage = require ('../pageobjects/checkoutcomplete.page');
const LoginData = require('../../data/logindata');
const allureReporter = require('@wdio/allure-reporter').default;
const {padDigits} = require('../../utils/myUtils');

describe('UserStory: Checkout: Add 5 items to cart, got to CheckoutStep1, don\'t fill in customer info, go Back to Cart, Remove an item, continue to checkout, go Back Home', () => {

    allureReporter.addFeature('Checkout');

    // State machine info:
    // Testing states 8, 13: CheckoutStep1->CartIcon->CartPage, CheckoutComplete->BackHome->InventoryPage
    // X 1 A 2 2 2 2 2 4 B 6 C [don't fill customer info] 8 B 3 B 6 C 17 9 D 12 E 13 A
    let step = 0;

    step++;
    it(`${padDigits(step,3)} Login: should login user`, async ()=>{
        await LoginPage.open();
        await LoginPage.login(LoginData.userName, LoginData.password);
    })

    step++;
    it(`${padDigits(step,3)} Inventory Page: should be on Inventory Page`, async ()=> {
        await InventoryPage.ensureOnPage();
    })

    step++;
    it(`${padDigits(step,3)} Add 1 item to cart: should add 1 item to cart`, async ()=> {
        await CartPage.addItemToCart('#add-to-cart-sauce-labs-backpack');
    })
    step++;
    it(`${padDigits(step,3)} Add 1 item to cart: should add 1 item to cart`, async ()=> {
        await CartPage.addItemToCart('#add-to-cart-sauce-labs-bike-light');
    })
    step++;
    it(`${padDigits(step,3)} Add 1 item to cart: should add 1 item to cart`, async ()=> {
        await CartPage.addItemToCart('#add-to-cart-sauce-labs-bolt-t-shirt');
    })
    step++;
    it(`${padDigits(step,3)} Add 1 item to cart: should add 1 item to cart`, async ()=> {
        await CartPage.addItemToCart('#add-to-cart-sauce-labs-fleece-jacket');
    })
    step++;
    it(`${padDigits(step,3)} Add 1 item to cart: should add 1 item to cart`, async ()=> {
        await CartPage.addItemToCart('#add-to-cart-sauce-labs-onesie');
    })
    step++;
    it(`${padDigits(step,3)} Add 1 item to cart: cart should have 5 items`, async ()=>{
        await CartPage.checkNumCartItems(5);
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
    it(`${padDigits(step,3)} Cart Page: should have 5 items in cart`, async ()=>{
        await CartPage.checkNumCartItems(5);
    })
    
    step++;
    it(`${padDigits(step,3)} Click on Checkout: click on Checkout`, async ()=>{
        await CartPage.clickOnCheckout();
    })

    step++;
    it(`${padDigits(step,3)} Checkout Step1 Page: should be on Checkout Step1 Page`, async ()=>{
        await CheckoutStep1Page.ensureOnPage();
    })
    // Don't fill in customer info on CheckoutStep1Page

    step++;
    it(`${padDigits(step,3)} Click on Cart Icon: click on Cart Icon`, async ()=>{
        await CartPage.clickOnCartIcon();
    })

    step++;
    it(`${padDigits(step,3)} Cart Page: should be on Cart Page`, async ()=>{
        await CartPage.ensureOnPage();
    })
    step++;
    it(`${padDigits(step,3)} Cart Page: should have 5 items in cart`, async ()=>{
        await CartPage.checkNumCartItems(5);
    })
    step++;
    it(`${padDigits(step,3)} Remove 1 item from Cart: remove 1 item from cart`, async ()=>{
        await CartPage.removeItemFromCart('#remove-sauce-labs-onesie');
    })
    step++;
    it(`${padDigits(step,3)} Cart Page: should have 4 items in cart`, async ()=>{
        await CartPage.checkNumCartItems(4);
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
    it(`${padDigits(step,3)} Checkout Step1 Page: should have 4 items in cart`, async ()=>{
        await CartPage.checkNumCartItems(4);
    })
    step++;
    it(`${padDigits(step,3)} Checkout Step1 Page: fill in customer info`, async ()=>{
        await CheckoutStep1Page.fillInCustomerInfo("Jane", "Doe", "90210");
    })

    step++;
    it(`${padDigits(step,3)} Click on Continue: click on Continue`, async ()=>{
        await CheckoutStep1Page.clickOnContinue();
    })   

    step++;
    it(`${padDigits(step,3)} Checkout Step2 Page: should be on Checkout Step2 Page`, async ()=>{
        await CheckoutStep2Page.ensureOnPage();
    })  
    step++;
    it(`${padDigits(step,3)} Checkout Step2 Page: should have 4 items in cart`, async ()=> {
        await CartPage.checkNumCartItems(4);
    })
    
    step++;
    it(`${padDigits(step,3)} Click on Finish: click on Finish`, async ()=>{
        await CheckoutStep2Page.clickOnFinish();
    })
    
    step++;
    it(`${padDigits(step,3)} Checkout Complete Page: should be on Checkout Complete Page`, async ()=>{
        await CheckoutCompletePage.ensureOnPage();
    })
    step++;
    it(`${padDigits(step,3)} Checkout Complete Page: cart should be empty`, async ()=>{
        await CartPage.checkNumCartItems(0);
    })
      
    step++;
    it(`${padDigits(step,3)} Checkout Complete Page: click on Back Home`, async ()=>{
        await CheckoutCompletePage.clickOnBackHome();
    })       
 
    step++;
    it(`${padDigits(step,3)} Inventory Page: should be on Inventory Page`, async ()=> {
        await InventoryPage.ensureOnPage();
    })
    step++;
    it(`${padDigits(step,3)} Inventory Page: cart should be empty`, async ()=>{
        await CartPage.checkNumCartItems(0);
    })
});


