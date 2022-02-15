const Page = require ('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
 class CartPage extends Page {
    /**
     * define selectors using getter methods
     */
     get secondaryTitle() {
        return $('#header_container > div.header_secondary_container > span')
    }

    async ensureOnPage(){
        if (await browser.getUrl() !== "https://www.saucedemo.com/cart.html")
            throw Error("CartPage.ensureOnPage: Not on correct page")
        
        let title = 'YOUR CART';
        let actualTitle = await this.secondaryTitle.getText();
        if ( actualTitle !== title)
            throw Error(`Cart.ensureOnPage: title ${actualTitle} does not match expected title ${title}`);
    }

    async clickOnCartIcon(){
        const elCartIcon = await $('#shopping_cart_container')                
        await elCartIcon.click();
    }

    async checkNumCartItems(num){
        
        if (this.#checkCartIsEmpty() && num === 0){
            // console.log(`CartPage.checkNumCartItems returning true for 0 items`)
            return true;
        }
        // num is not 0
        const elCount = await $('.shopping_cart_badge');
        
        await browser.pause(500); // so that elCount can show up if it exists

        let count = await elCount.getText();
        // console.log(`CartPage.checkNumCartItems count is ${count}`);
            
        if (count != num)
            throw Error(`CartPage.checkNumCartItems: has ${count} expecting ${num}`)
    }

    async #checkCartIsEmpty(){
        const elCount = await $('.shopping_cart_badge');
        
        await browser.pause(500); // so that elCount can show up if it exists

        // console.log(`Cart.checkCartIsEmpty: In method`)
        // If the badge doesn't exist then the cart is empty
        if (await elCount.waitForExist({reverse: true, timeout: 500})){
            // elCount does not exist
            // console.log(`CartPage.checkCartIsEmpty waitForExist returned true, cart has no items`)
            return true;
        }
        else{
            // console.log(`CartPage.checkCartIsEmpty: cart not empty`)
            return false;
        }
    }
    async checkItemsOnCartPageMatchCart(){
        // TODO: Where should added cart items be stored? In CartPage or in InventoryPage?
        console.log("TODO: To implement CartPage.checkItemsOnCartPageMatchCart");
    }

    async clickOnCheckout(){
        //TODO: Check that the cart has:
        //      - the right item in it. Need the name of the item
        //      - the right quantity
        //      - the right price
        // Should I store state in CartPage and double check it at each step?

        // Click on CHECKOUT button
        const elCheckout = await $('#checkout')
        await elCheckout.click();
    }
    async clickOnContinueShopping(){
        const elContinue = await $('#continue-shopping')
        await elContinue.click();
    }
    // This can only be done from InventoryPage, but it looks like CartPage is a better
    // home for it, so cart state can be maintained here if necessary
    // id_name starts with '#'
    async addItemToCart(id_name){
        // TODO: Use data-test id's; More robust
        // Add a product to cart by clicking ADD TO CART button next to the item
        const elItem1 = await $(id_name)

        // TODO: Get name of this item and store it for later
        // const elItem1Name = await elItem1.previousElement();
        // await elItem1Name.toHaveElementClassContaining('inventory_item_label');

        await elItem1.click();

    }
    // id_name starts with #
    // This can be called from InventoryPage or from CartPage
    async removeItemFromCart(id_name){
        const elRemoveItem = await $(id_name)
        await elRemoveItem.click();
    }
}

module.exports = new CartPage();
