const LoginPage = require('../pageobjects/login.page');
const InventoryPage = require('../pageobjects/inventory.page');
const CartPage = require('../pageobjects/cart.page');
const LoginData = require('../../data/logindata');

describe("UserStory: Reset Cart State", ()=>{

    // State machine info:
    // X 1 A 2 2 4 B 15 B
    it('Reset_2: should be able to add two items to cart and zero it out by Reset App State from burger menu on the Cart Page', async()=> {
        let stepnum = 0;
        await LoginPage.open();
        await LoginPage.login(LoginData.userName, LoginData.password);

        await InventoryPage.ensureOnPage();
        stepnum += 3;
        console.log(`Reset_2: S${stepnum} Logged in`)
 
        await CartPage.addItemToCart('#add-to-cart-sauce-labs-backpack');
        await CartPage.addItemToCart('#add-to-cart-sauce-labs-bike-light');
        stepnum += 2;
        console.log(`Reset_2: S${stepnum} Added 2 items to cart`);
 
        // This is done on Inventory page
        await CartPage.checkNumCartItems(2);

        await CartPage.clickOnCartIcon();

        await CartPage.ensureOnPage();
        stepnum += 3;
        // const elMenuButton = await $('#react-burger-menu-btn')
        // await elMenuButton.click();
        // await browser.pause(5000);
        // const elLogoutLink = await $('#logout_sidebar_link')
        // TODO: Getting: Request failed with status 400 element not interactable
        // await elLogoutLink.click();
        // await LoginPage.logout();
        await LoginPage.resetAppState();
        stepnum += 1;
        console.log(`Reset_2: S${stepnum} resetAppState from Cart page`);

        await CartPage.checkNumCartItems(0);
        stepnum += 1;
        console.log(`Reset_2: S${stepnum} Confirmed number of items in cart is 0`);
        // Ensure on same page
        await CartPage.ensureOnPage();
        stepnum += 1;
        console.log(`Reset_2: S${stepnum} END`);
    })
})