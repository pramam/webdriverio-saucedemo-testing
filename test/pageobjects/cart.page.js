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
        const elCount = await $('.shopping_cart_badge');
        const count = await elCount.getText();


        if (count != num)
            throw Error(`CartPage.checkNumCartItems: has ${count} expecting ${num}`)
        console.log(`CartPage: Cart has ${count} items`)
    }
    
    async clickOnCheckout(){
        // Click on CHECKOUT button
        const elCheckout = await $('#checkout')
        await elCheckout.click();
    }
}

module.exports = new CartPage();
