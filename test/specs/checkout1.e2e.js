const LoginPage = require('../pageobjects/login.page');
const InventoryPage = require('../pageobjects/inventory.page');

describe('UserStory: Checkout', () => {

    //TODO: Investigate: Running all the tests together is causing second test to fail
    //      Do I need to logout after one test?
    it.only('TestCase_1: should be able to add one item to cart and remove it from inventory page', async()=> {
        await LoginPage.open();
        await LoginPage.login('standard_user', 'secret_sauce');
        await expect(InventoryPage.secondaryTitle).toHaveTextContaining('PRODUCTS');

        // const elItem1 = await $("[data-test='add-to-cart-sauce-labs-backpack']");
        // const elItem1 = await $('#add-to-cart-sauce-labs-backpack')
        const elItem1 = await $('#add-to-cart-sauce-labs-backpack')
        await elItem1.click();
        await browser.pause(5000);
        
        const elRemoveItem = await $('#remove-sauce-labs-backpack')

        await expect(elRemoveItem).toExist();
        await expect(elRemoveItem).toBeClickable();
        await elRemoveItem.click();
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

    it.skip("TestCase_2: should be able to add one item to cart and check it out successfully", async ()=>{
        // Sequence:
        // Login
        // ADD TO CART
        // Check for REMOVE button
        // TODO: Check that cart has 1 item
        // Click on Cart Icon
        // Should go to checkout page
        // Check URL of cart
        // TODO: The cart should show 1 item
        // Click on CHECKOUT button
        // Confirm checkout page URL
        // Enter FirstName, LastName, Postal Code
        // Click on 'CONTINUE' button
        // Make sure we are in second step of checkout
        // TODO: - Check that the item in cart matches what we selected
        // Click on 'FINISH' button
        // Make sure you are on the final confirmation page
 
        // Login
        await LoginPage.open();
        await LoginPage.login('standard_user', 'secret_sauce');
        await expect(InventoryPage.secondaryTitle).toHaveTextContaining('PRODUCTS');

        console.log(`TestCase_2: Logged in`)
        // TODO: Use data-test id's; More robust
        // Add a product to cart by clicking ADD TO CART
        const elItem1 = await $('#add-to-cart-sauce-labs-backpack')

        // TODO: Get name of this item and store it for later
        // const elItem1Name = await elItem1.previousElement();
        // await elItem1Name.toHaveElementClassContaining('inventory_item_label');

        await elItem1.click();
        // await browser.pause(5000);
        console.log("TestCase_2: Added item to cart");

        // Ensure that it shows as added by checking for REMOVE button
        const elRemoveItem = await $('#remove-sauce-labs-backpack')
        await browser.pause(5000);
        await expect(elRemoveItem).toExist();
        await expect(elRemoveItem).toBeClickable();

        // Clicking on cart icon should take you to checkout page
        const elCartIcon = await $('#shopping_cart_container')
        
        // TODO: P1: The cart should show 1 item on the icon
                
        await elCartIcon.click();
        
        // Check that url is that of cart.html
        expect(await browser.getUrl()).toHaveTextContaining("cart.html"); 
        
        //TODO: Check that the cart has:
        //      - the right item in it. Need the name of the item
        //      - the right quantity
        //      - the right price
        //TODO: Check that the cart has 1 item in it

        // Click on CHECKOUT button
        const elCheckout = await $('#checkout')
        await elCheckout.click();

        // Ensure that the checkout url is correct
        // https://www.saucedemo.com/checkout-step-one.html
        expect(await browser.getUrl()).toHaveTextContaining("checkout-step-one.html"); 

        // Enter FirstName, LastName,PostalCode
        // TODO: Parameterize
        const elFirstName = await $('input[data-test="firstName"]');
        const elLastName = await $('input[data-test="lastName"]');
        const elPostalCode = await $('input[data-test="postalCode"]');

        // TODO: Try checkout before entering all values, should fail
        await elFirstName.setValue("Jane");
        await elLastName.setValue("Doe");
        await elPostalCode.setValue("90210");

        // Ensure Values typed match what was typed
        // Hard coded for now
        // TODO: Input values are not validated
        await expect(elFirstName).toHaveValue("Jane", {ignoreCase: true});
        await expect(elLastName).toHaveValue("Doe", {ignoreCase: true});
        await expect(elPostalCode).toHaveValue("90210", {ignoreCase: true});
        
        // Click on the CONTINUE button
        const elContinue = await $('input[type="submit"]');
        await elContinue.click();

        // Get to second step of checkout
        // Ensure that the second step of checkout url is correct
        // https://www.saucedemo.com/checkout-step-two.html
        expect(await browser.getUrl()).toHaveTextContaining("checkout-step-two.html"); 
    
        // TODO: Add a wait > 10 mins and check that you are logged out

        // TODO: Check that item in cart matches the description of the item we selected
        // Click on FINISH button
        const elFinish = await $('[data-test="finish"]');
        await elFinish.click();

        // Check url is checkout complete
        // https://www.saucedemo.com/checkout-complete.html
        expect(await browser.getUrl()).toHaveTextContaining("checkout-complete.html"); 
 
        const elHeaderOnCheckout = await $("h2")
        await expect(elHeaderOnCheckout).toHaveText("THANK YOU FOR YOUR ORDER");


        // This is just to see it visually in action
        // await browser.pause(1000);
        // await LoginPage.logout();
        // await LoginPage.resetAppStateAndLogout();
        // console.log("TestCase_2: Successfully resetAppStateAndLogout")
        // await LoginPage.logout();
        // console.log("TestCase_2: Successfully logged out")
    })

    // Other Tests to write:
    // Not specifying FirstName/Last Name/ZipCode on checkout should fail the checkout
    // should be able to add more than one item to cart from inventory page
    // should not be able to checkout with problem_user
});


