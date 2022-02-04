const LoginPage = require('../pageobjects/login.page');
const InventoryPage = require('../pageobjects/inventory.page');

describe('UserStory: Checkout', () => {

    //TODO: Investigate: Running all the tests together is causing second test to fail
    //      Do I need to logout after one test?
    // State machine info:
    // X 1 A 2 3
    it('TestCase_1: should be able to add one item to cart and remove it from inventory page', async()=> {
        await LoginPage.open();
        await LoginPage.login('standard_user', 'secret_sauce');

        await InventoryPage.ensureOnPage();

        console.log(`TestCase_1: Logged in`)
 
        await InventoryPage.addItemToCart('#add-to-cart-sauce-labs-backpack');

        console.log("TestCase_1: Added item to cart");

        await InventoryPage.removeItemFromCart("#remove-sauce-labs-backpack");
        
        console.log("TestCase_1: Removed item successfully")
        // const elMenuButton = await $('#react-burger-menu-btn')
        // await elMenuButton.click();
        // await browser.pause(5000);
        // const elLogoutLink = await $('#logout_sidebar_link')
        // TODO: Getting: Request failed with status 400 element not interactable
        // await elLogoutLink.click();
        // await LoginPage.logout();
        
        // await LoginPage.resetAppStateAndLogout();
        // console.log("TestCase_1: Successfully resetAppStateAndLogout out")
        // await LoginPage.logout();
        // console.log("TestCase_1: Successfully logged out")
    })

    // Other Tests to write:
    // Not specifying FirstName/Last Name/ZipCode on checkout should fail the checkout
    // should be able to add more than one item to cart from inventory page
    // should not be able to checkout with problem_user
});


