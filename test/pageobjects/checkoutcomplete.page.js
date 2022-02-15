const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class CheckoutCompletePage extends Page {
    /**
     * define selectors using getter methods
     */
    get secondaryTitle() {
        return $('#header_container > div.header_secondary_container > span')
    }
    get secondaryHeader(){
        return $("h2")
    }
    async ensureOnPage(){
        if (await browser.getUrl() !== "https://www.saucedemo.com/checkout-complete.html")
            throw Error("CheckoutCompletePage.ensureOnPage: Not on correct page")
     
        let title = 'CHECKOUT: COMPLETE!';
        let actualTitle = await this.secondaryTitle.getText();
        if ( actualTitle !== title)
            throw Error(`CheckoutCompletePage.ensureOnPage: title ${actualTitle} does not match expected title ${title}`);

        const elHeaderOnCheckout = await $("h2")
        let secHeader = "THANK YOU FOR YOUR ORDER";
        let actualSecHeader = await this.secondaryHeader.getText();

        if (actualSecHeader !== secHeader)
            throw Error (`CheckoutCompletePage.ensureOnPage: Header ${actualSecHeader} does not match expected header ${secHeader}`)
    }
    async clickOnBackHome(){
        console.log("CheckoutCompletePage: To implement clickOnBackHome");
    }
}

module.exports = new CheckoutCompletePage();
