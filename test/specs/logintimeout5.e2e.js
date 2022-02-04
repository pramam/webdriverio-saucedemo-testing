const LoginPage = require('../pageobjects/login.page');
const InventoryPage = require('../pageobjects/inventory.page');
const delay = require ('delay');

describe("Login Timeout", ()=>{
    it("TestCase_5: logged in user should be kicked out after 10 minutes", async()=>{
        
        // https://www.npmjs.com/package/delay

        await LoginPage.open();

        await LoginPage.login('standard_user', 'secret_sauce');
        await InventoryPage.ensureOnPage();
        
        console.log(`TestCase_5: Logged in with  user account at ${Date.now()}`);
    
        await InventoryPage.addItemToCart('#add-to-cart-sauce-labs-backpack');
    
        console.log("TestCase_5: Added item to cart");

        // wait 10 mins + a bit
        await delay(10 * 60 * 1000 +5000)

        // await browser.debug();
        // check if You see the logout error
        await LoginPage.checkIfOnErroredLogoutPage();

        console.log(`TestCase_5: Finished test at ${Date.now()}`)
    })
})