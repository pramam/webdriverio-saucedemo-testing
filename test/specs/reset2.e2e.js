const LoginPage = require('../pageobjects/login.page');
const InventoryPage = require('../pageobjects/inventory.page');
const CartPage = require('../pageobjects/cart.page');

describe("UserStory: Reset Cart State", ()=>{

    // State machine info:
    // X 1 A 2 2 4 B 15 B
    it('Reset_2: should be able to add two items to cart and zero it out by Reset App State from burger menu on the Cart Page', async()=> {
        await LoginPage.open();
        await LoginPage.login('standard_user', 'secret_sauce');

        await InventoryPage.ensureOnPage();

        console.log(`Reset_2: Logged in`)
 
        await InventoryPage.addItemToCart('#add-to-cart-sauce-labs-backpack');
        await InventoryPage.addItemToCart('#add-to-cart-sauce-labs-bike-light');
        console.log("Reset_2: Added 2 items to cart");
 
        // This is done on Inventory page
        await CartPage.checkNumCartItems(2);

        await CartPage.clickOnCartIcon();

        await CartPage.ensureOnPage();

        // const elMenuButton = await $('#react-burger-menu-btn')
        // await elMenuButton.click();
        // await browser.pause(5000);
        // const elLogoutLink = await $('#logout_sidebar_link')
        // TODO: Getting: Request failed with status 400 element not interactable
        // await elLogoutLink.click();
        // await LoginPage.logout();
        await LoginPage.resetAppState();
        console.log(`Reset_2: resetAppState from Cart page`);

        await CartPage.checkNumCartItems(0);
        console.log(`Reset_2: Confirmed number of items in cart is 0`);
        // Ensure on same page
        await CartPage.ensureOnPage();
    })
})