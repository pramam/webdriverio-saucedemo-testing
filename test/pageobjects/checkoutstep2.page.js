const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class CheckoutStep2Page extends Page {

    async ensureOnPage(){
        let url = await browser.getUrl();

        if (url !== "https://www.saucedemo.com/checkout-step-two.html")
            throw Error(`CheckoutStep2Page.ensureOnPage: Not on correct page on page ${url}`)
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
