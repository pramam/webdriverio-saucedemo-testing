const LoginPage = require('../pageobjects/login.page');
const InventoryPage = require('../pageobjects/inventory.page');
const delay = require ('delay');

describe("Login Timeout : Logged in user should be kicked out after 10 minutes", ()=>{

    describe(`Login`, ()=>{
        it(`should login user`, async ()=>{
            await LoginPage.open();
            await LoginPage.login('standard_user', 'secret_sauce');
        })
    })
    describe(`Inventory Page`, ()=>{
        it(`should be on Inventory Page`, async () =>{
            await InventoryPage.ensureOnPage();
        })
    })
    describe(`Add 1 item to cart`, ()=>{
        it(`should add 1 item to cart`, async ()=> {
            await InventoryPage.addItemToCart('#add-to-cart-sauce-labs-backpack');
        })
    })
    describe(`Wait for 10 mins + a bit`, ()=>{
        it(`delay for 10 mins + a bit`, async ()=>{
          
            // https://www.npmjs.com/package/delay
            
            // wait 10 mins + a bit
            await delay(10 * 60 * 1000 +1000)
        })
    })
    describe(`Logged out`, ()=>{
        it(`should be on login page displaying logged out error`, async ()=>{
            await LoginPage.checkIfOnErroredLogoutPage("/inventory.html");
        })
    })
})