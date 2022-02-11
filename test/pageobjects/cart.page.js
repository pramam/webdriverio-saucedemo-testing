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
        const elCount = await $('.shopping_cart_badge');
        const count = await elCount.getText();

        if (count != num)
            throw Error(`CartPage.checkNumCartItems: has ${count} expecting ${num}`)
    }

    async checkCartIsEmpty(){
                // TODO: checkCartIsEmpty
        // if (count === ""){
        //     if (num != 0)
        //         throw Error(`CartPage.checkNumCartItems: has ${count} expecting ${num}`)
        //     else{
        //         console.log(`CartPage: Cart has no items`)
        //         return;
        //     }
        // } 
        console.log("TODO: CartPage: To implement checkCartIsEmpty")

    }
    async clickOnCheckout(){
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
