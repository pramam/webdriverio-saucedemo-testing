const LoginPage = require('../pageobjects/login.page');
const InventoryPage = require('../pageobjects/inventory.page');
const CartPage = require('../pageobjects/cart.page');
const CheckoutStep1Page = require ('../pageobjects/checkoutstep1.page');
const CheckoutStep2Page = require('../pageobjects/checkoutstep2.page');
const CheckoutCompletePage = require ('../pageobjects/checkoutcomplete.page');

describe('UserStory: Checkout : Add one item to cart and check it out successfully', () => {

    // State machine info:
    // X 1 A 2 4 B 6 C 9 D 12 E
    describe(`Login`, ()=>{
        it(`should login user`, async ()=>{
            await LoginPage.open();
            await LoginPage.login('standard_user', 'secret_sauce');
        })
    })
    describe(`Inventory Page`, ()=> {
        it(`should ensure user is on Inventory Page`, async ()=> {
            await InventoryPage.ensureOnPage();
        })
    })
    describe(`Add item to cart`, ()=>{
        it(`should add item to cart`, async ()=> {
            await InventoryPage.addItemToCart('#add-to-cart-sauce-labs-backpack');
            await CartPage.checkNumCartItems(1);
        })
    })
    describe(`Click on Cart Icon`, ()=>{
        it(`click on Cart Icon`, async ()=>{
            await CartPage.clickOnCartIcon();
        })
        it(`should be on Cart Page`, async ()=>{
            await CartPage.ensureOnPage();
        })
        it(`should have 1 item in Cart`, async ()=>{
            await CartPage.checkNumCartItems(1);
        })
    })

    describe(`Click on Checkout`, ()=>{
        it(`click on Checkout`, async ()=>{
            await CartPage.clickOnCheckout();
        })
    })
    describe(`Checkout Step1 Page`, ()=> {
        it(`should be on Checkout Step1 Page`, async()=>{
            await CheckoutStep1Page.ensureOnPage();
        })
        it(`should have 1 item in cart`, async ()=>{
            await CartPage.checkNumCartItems(1);
        })
        it(`fill in customer info`, async ()=>{
            await CheckoutStep1Page.fillInCustomerInfo("Jane", "Doe", "90210");
        })
    })
    describe (`Click on Continue`, ()=>{
        it(`click on Continue`, async ()=>{
            await CheckoutStep1Page.clickOnContinue();
        })
    })
    describe(`Checkout Step2 Page`, ()=>{
        it(`should be on Checkout Step2 Page`, async ()=>{
            await CheckoutStep2Page.ensureOnPage();
        })
        it(`should have 1 item in cart`, async ()=>{
            await CartPage.checkNumCartItems(1);
        })
    })
    describe(`Click on Finish`, ()=>{
        it(`click on Finish`, async ()=>{
            await CheckoutStep2Page.clickOnFinish();
        })
    })
    describe(`Checkout Complete Page`, ()=>{
        it(`should be on Checkout Complete page`, async ()=>{
            await CheckoutCompletePage.ensureOnPage();
        })
        it(`cart should be empty`, async ()=>{
            await CartPage.checkCartIsEmpty();
        })
    })
});


