const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class CheckoutCompletePage extends Page {

    async ensureOnPage(){
        if (await browser.getUrl() !== "https://www.saucedemo.com/checkout-complete.html")
            throw Error("CheckoutCompletePage.ensureOnPage: Not on correct page")
        
        const elHeaderOnCheckout = await $("h2")

        if (await elHeaderOnCheckout.getText() !== "THANK YOU FOR YOUR ORDER")
            throw Error ("CheckoutCompletePage.ensureOnPage: Did not find text THANK YOU FOR YOUR ORDER")
    }
    async clickOnBackHome(){
        console.log("CheckoutCompletePage: To implement clickOnBackHome");
    }
}

module.exports = new CheckoutCompletePage();
