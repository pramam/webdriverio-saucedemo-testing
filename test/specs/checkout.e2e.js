const LoginPage = require('../pageobjects/login.page');
const InventoryPage = require('../pageobjects/inventory.page');

describe('Sauce Demo', () => {
    // Here for reference only
    it.skip('should login with valid credentials', async () => {
        await LoginPage.open();

        await LoginPage.login('standard_user', 'secret_sauce');
        await expect(InventoryPage.secondaryTitle).toHaveTextContaining('PRODUCTS');
    });

    it('should be able to add one item to cart from inventory page', async()=> {
        await LoginPage.open();
        await LoginPage.login('standard_user', 'secret_sauce');
        await expect(InventoryPage.secondaryTitle).toHaveTextContaining('PRODUCTS');

        // const elItem1 = await $("[data-test='add-to-cart-sauce-labs-backpack']");
        const elItem1 = await $('#add-to-cart-sauce-labs-backpack')
        await elItem1.click();
        await browser.pause(5000);
        
        const elRemoveItem = await $('#remove-sauce-labs-backpack')

        await expect(elRemoveItem).toExist();
    })

    it.only("should be able to add one item to cart and check it out successfully", async ()=>{
        // Login
        await LoginPage.open();
        await LoginPage.login('standard_user', 'secret_sauce');
        await expect(InventoryPage.secondaryTitle).toHaveTextContaining('PRODUCTS');

        // Add a product to cart by clicking ADD TO CART
        const elItem1 = await $('#add-to-cart-sauce-labs-backpack')

        // TODO: Get name of this item and store it for later
        // const elItem1Name = await elItem1.previousElement();
        // await elItem1Name.toHaveElementClassContaining('inventory_item_label');

        await elItem1.click();
        await browser.pause(5000);
   
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
        
        //TODO: Check that the cart has the right item in it
        //      Need the name of the item
        //TODO: Check that the cart has 1 item in it

        // Click on CHECKOUT button
        const elCheckout = await $('#checkout')
        await elCheckout.click();

        // Ensure that the checkout url is correct
        // https://www.saucedemo.com/checkout-step-one.html
        expect(await browser.getUrl()).toHaveTextContaining("checkout-step-one.html"); 

    })


    // should be able to add more than one item to cart from inventory page
    // shou
});


