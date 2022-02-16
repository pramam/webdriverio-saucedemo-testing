const LoginPage = require('../pageobjects/login.page');
const InventoryPage = require('../pageobjects/inventory.page');
const CartPage = require('../pageobjects/cart.page');
const CheckoutStep1Page = require ('../pageobjects/checkoutstep1.page');
const CheckoutStep2Page = require('../pageobjects/checkoutstep2.page');
const CheckoutCompletePage = require ('../pageobjects/checkoutcomplete.page');
const LoginData = require('../../data/logindata');
const allureReporter = require('@wdio/allure-reporter').default;
const {padDigits} = require('../../utils/myUtils');

describe('UserStory: Checkout', () => {
        
    // State machine info:
    // Testing states 10, 11: CartIcon from CheckoutStep2, Cancel from CheckoutStep2
    // X 1 A 2 2 2 4 B 6 C 17 9 D 10 B 6 C 17 9 D 11 
    // ...A 4 B 6 C 17 9 D 12 E
    describe("Testing CartIcon from CheckoutStep2, Cancel from CheckoutStep2", async ()=>{ 
        allureReporter.addFeature('Checkout');
        let step = 0;
        
        step++;
        it(`${padDigits(step,3)} Login: should login user\n`, async ()=>{
            await LoginPage.open();
            await LoginPage.login(LoginData.userName, LoginData.password);
        })
        step++;
        it(`${padDigits(step,3)} Inventory Page: should be on Inventory Page`, async ()=> {
            await InventoryPage.ensureOnPage();
        })
        step++;
        it(`${padDigits(step,3)} Add 3 items to cart: should add 1 item to cart`, async ()=> {
            await CartPage.addItemToCart('#add-to-cart-sauce-labs-bolt-t-shirt');
            await CartPage.checkNumCartItems(1);
        })
        step++;
        it(`${padDigits(step,3)} Add 3 items to cart: should add 1 item to cart`, async ()=> {
            await CartPage.addItemToCart('#add-to-cart-sauce-labs-fleece-jacket');
            await CartPage.checkNumCartItems(2);
        })
        step++;
        it(`${padDigits(step,3)} Add 3 items to cart: should add 1 item to cart\n`, async ()=> {
            await CartPage.addItemToCart('#add-to-cart-sauce-labs-onesie');
            await CartPage.checkNumCartItems(3);
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
        it(`${padDigits(step,3)} Cart Page: should have 3 items in Cart\n`, async ()=>{
            await CartPage.checkNumCartItems(3);
        })

        step++;
        it(`${padDigits(step,3)} Click on Checkout: click on Checkout\n`, async ()=>{
            await CartPage.clickOnCheckout();
        })

        step++;
        it(`${padDigits(step,3)} Checkout Step1 Page: should be on Checkout Step1 Page`, async()=>{
            await CheckoutStep1Page.ensureOnPage();
        })
        step++;
        it(`${padDigits(step,3)} Checkout Step1 Page: fill in customer info\n`, async ()=>{
            await CheckoutStep1Page.fillInCustomerInfo("Jane", "Doe", "90210");
        })

        step++;
        it(`${padDigits(step,3)} Click on Continue: click on Continue\n`, async ()=>{
            await CheckoutStep1Page.clickOnContinue();
        })
    
        step++;
        it(`${padDigits(step,3)} Checkout Step2 Page: should be on Checkout Step2 Page`, async ()=>{
            await CheckoutStep2Page.ensureOnPage();
        })
        step++;
        it(`${padDigits(step,3)} Checkout Step2 Page: should have 3 items in cart\n`, async ()=>{
            await CartPage.checkNumCartItems(3);
        })
    
        // Go back to Cart from CheckoutStep2
        step++;
        it(`${padDigits(step,3)} Click on Cart Icon: click on Cart Icon, go back to CartPage from CheckoutStep2\n`, async ()=>{
            await CartPage.clickOnCartIcon();
        })

        step++;
        it(`${padDigits(step,3)} Cart Page: should be on Cart Page`, async ()=>{
            await CartPage.ensureOnPage();
        })
        step++;
        it(`${padDigits(step,3)} Cart Page: should have 3 items in Cart\n`, async ()=>{
            await CartPage.checkNumCartItems(3);
        })
    
        step++;
        it(`${padDigits(step,3)} Click on Checkout: click on Checkout\n`, async ()=>{
            await CartPage.clickOnCheckout();
        })
    
        step++;
        it(`${padDigits(step,3)} Checkout Step1 Page: should be on Checkout Step1 Page`, async()=>{
            await CheckoutStep1Page.ensureOnPage();
        })
        step++;
        it(`${padDigits(step,3)} Checkout Step1 Page: should have 3 items in cart`, async ()=>{
            await CartPage.checkNumCartItems(3);
        })
        step++;
        it(`${padDigits(step,3)} Checkout Step1 Page: fill in customer info\n`, async ()=>{
            await CheckoutStep1Page.fillInCustomerInfo("Jane", "Doe", "90210");
        })

        step++;
        it(`${padDigits(step,3)} Click on Continue: click on Continue\n`, async ()=>{
            await CheckoutStep1Page.clickOnContinue();
        })
    
        step++;
        it(`${padDigits(step,3)} Checkout Step2 Page: should be on Checkout Step2 Page`, async ()=>{
            await CheckoutStep2Page.ensureOnPage();
        })
        step++;
        it(`${padDigits(step,3)} Checkout Step2 Page: should have 3 items in cart\n`, async ()=>{
            await CartPage.checkNumCartItems(3);
        })
    
        step++;
        it(`${padDigits(step,3)} Checkout Step2 Page: click on Cancel2 and go back to InventoryPage\n`, async ()=>{
            await CheckoutStep2Page.clickOnCancel2();
        })

        // Now we're back on Inventory page
        // Do a single file walk through to checkout
        step++;
        it(`${padDigits(step,3)} Inventory Page: should be on Inventory Page\n`, async ()=> {
            await InventoryPage.ensureOnPage();
        })

        step++;
        it(`${padDigits(step,3)} Click on Cart Icon: click on Cart Icon\n`, async ()=>{
            await CartPage.clickOnCartIcon();
        })

        step++;
        it(`${padDigits(step,3)} Cart Page: should be on Cart Page\n`, async ()=>{
            await CartPage.ensureOnPage();
        })
        step++;
        it(`${padDigits(step,3)} Click on Checkout: click on Checkout\n`, async ()=>{
            await CartPage.clickOnCheckout();
        })
     
        step++;
        
        it(`${padDigits(step,3)} Checkout Step1 Page: should be on Checkout Step1 Page`, async()=>{
            await CheckoutStep1Page.ensureOnPage();
        })
        step++;
        it(`${padDigits(step,3)} Checkout Step1 Page: should have 3 items in cart`, async ()=>{
            await CartPage.checkNumCartItems(3);
        })
        step++;
        it(`${padDigits(step,3)} Checkout Step1 Page: fill in customer info\n`, async ()=>{
            await CheckoutStep1Page.fillInCustomerInfo("Hello", "World", "90000");
        })

        step++;
        it(`${padDigits(step,3)} Click on Continue: click on Continue\n`, async ()=>{
            await CheckoutStep1Page.clickOnContinue();
        })
        step++;
        it(`${padDigits(step,3)} Checkout Step2 Page: should be on Checkout Step2 Page`, async ()=>{
            await CheckoutStep2Page.ensureOnPage();
        })
        step++;
        it(`${padDigits(step,3)} Checkout Step2 Page: should have 3 items in cart\n`, async ()=>{
            await CartPage.checkNumCartItems(3);
        })

        step++;
        it(`${padDigits(step,3)} Click on Finish: click on Finish\n`, async ()=>{
            await CheckoutStep2Page.clickOnFinish();
        })

        step++;
        it(`${padDigits(step,3)} Checkout Complete Page: should be on Checkout Complete page`, async ()=>{
            await CheckoutCompletePage.ensureOnPage();
        })
        step++;
        it(`${padDigits(step,3)} Checkout Complete Page: cart should be empty`, async ()=>{
            await CartPage.checkNumCartItems(0);
        })
    })
});


