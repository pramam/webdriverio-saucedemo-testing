const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class CheckoutStep2Page extends Page {
    /**
     * define selectors using getter methods
     */
     get secondaryTitle() {
        return $('#header_container > div.header_secondary_container > span')
    }

    

    async ensureOnPage(){
        let url = await browser.getUrl();

        if (url !== "https://www.saucedemo.com/checkout-step-two.html")
            throw Error(`CheckoutStep2Page.ensureOnPage: Not on correct page on page ${url}`)

        let title = 'CHECKOUT: OVERVIEW';
        let actualTitle = await this.secondaryTitle.getText();
        if ( actualTitle !== title)
            throw Error(`CheckoutStep2Page.ensureOnPage: title ${actualTitle} does not match expected title ${title}`);
    }
    async clickOnFinish(){
        // Click on FINISH button
        const elFinish = await $('[data-test="finish"]');
        await elFinish.click();

    }
    async clickOnCancel2(){
        const elCancel2 = await $('[data-test="cancel"]');
        await elCancel2.click();
    }
    async checkItemsOnCheckoutStep2PageMatchCart(){
        // Should not allow CheckoutStep2 if 0 items in cart
        console.log("TODO: To implement CheckoutStep2Page.checkItemsOnPageCheckOutStep2PageMatchCart");
    }
}

module.exports = new CheckoutStep2Page();
