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
        console.log(`CartPage: Cart has ${count} items`)
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
}

module.exports = new CartPage();
