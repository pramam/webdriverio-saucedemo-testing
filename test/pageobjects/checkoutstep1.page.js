const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class CheckoutStep1Page extends Page {

    get secondaryTitle() {
        return $('#header_container > div.header_secondary_container > span')
    }

    async ensureOnPage(){
        if (await browser.getUrl() !== "https://www.saucedemo.com/checkout-step-one.html")
            throw Error("CheckoutStep1Page.ensureOnPage: Not on correct page")

        let title = 'CHECKOUT: YOUR INFORMATION';
        let actualTitle = await this.secondaryTitle.getText();
        if ( actualTitle !== title)
            throw Error(`CheckoutStep1Page.ensureOnPage: title ${actualTitle} does not match expected title ${title}`);
    }

    async fillInCustomerInfo(first_name, last_name, postal_code){
        // Enter FirstName, LastName,PostalCode
        const elFirstName = await $('input[data-test="firstName"]');
        const elLastName = await $('input[data-test="lastName"]');
        const elPostalCode = await $('input[data-test="postalCode"]');

        // TODO: Try checkout before entering all values, should fail
        await elFirstName.setValue(first_name);
        await elLastName.setValue(last_name);
        await elPostalCode.setValue(postal_code);

        // Ensure Values typed match what was typed
        await expect(elFirstName).toHaveValue(first_name) ; //, {ignoreCase: true});
        await expect(elLastName).toHaveValue(last_name); //, {ignoreCase: true});
        await expect(elPostalCode).toHaveValue(postal_code); //, {ignoreCase: true});
    }
    async validateCustomerSeesError(){
        const elError = await $('[data-test="error"]');
        // TODO: Is it safe to specify timeout in code?
        await elError.waitForDisplayed({timeout: 600});
    }
    async clickOnContinue(){
        const elContinue = await $('input[type="submit"]');
        await elContinue.click();
    }
    async clickOnCancel1(){
        const elCancel1 = await $('#cancel');
        await elCancel1.click();
    }
}

module.exports = new CheckoutStep1Page();
    