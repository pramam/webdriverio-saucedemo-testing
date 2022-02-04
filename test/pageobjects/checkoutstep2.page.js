const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class CheckoutStep2Page extends Page {

    async ensureOnPage(){
        if (await browser.getUrl() !== "https://www.saucedemo.com/checkout-step-two.html")
            throw Error("CheckoutStep2Page.ensureOnPage: Not on correct page")
    }
    async clickOnFinish(){
        // Click on FINISH button
        const elFinish = await $('[data-test="finish"]');
        await elFinish.click();

    }
}

module.exports = new CheckoutStep2Page();