const Page = require ('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
 class CartPage extends Page {
    /**
     * define selectors using getter methods
     */

    async ensureOnPage(){
        if (await browser.getUrl() !== "https://www.saucedemo.com/cart.html")
            throw Error("CartPage.ensureOnPage: Not on correct page")
    }

    async clickOnCartIcon(){
        // Clicking on cart icon should take you to checkout page
        const elCartIcon = await $('#shopping_cart_container')
        
        // TODO: P1: The cart should show 1 item on the icon
                
        await elCartIcon.click();
    }
    async checkNumCartItems(num){
        const elCount = await $('.shopping_cart_badge');
        const count = await elCount.getText();


        if (count != num)
            throw Error(`CartPage.checkNumCartItems: has ${count} expecting ${num}`)
        console.log(`CartPage: Cart has ${count} items`)
    }

    // // id_name starts with '#'
    // async addItemToCart(id_name){
    //     // TODO: Use data-test id's; More robust
    //     // Add a product to cart by clicking ADD TO CART
    //     const elItem1 = await $(id_name)

    //     // TODO: Get name of this item and store it for later
    //     // const elItem1Name = await elItem1.previousElement();
    //     // await elItem1Name.toHaveElementClassContaining('inventory_item_label');

    //     await elItem1.click();

    // }
    // id_name starts with #
    // async removeItemFromCart(id_name){
    //     const elRemoveItem = await $(id_name)
    //     // await browser.pause(5000);
    //     // await expect(elRemoveItem).toExist();
    //     // await expect(elRemoveItem).toBeClickable();
    //     await elRemoveItem.click();

    // }
    async clickOnCheckout(){
        // Click on CHECKOUT button
        const elCheckout = await $('#checkout')
        await elCheckout.click();
    }
}

module.exports = new CartPage();
