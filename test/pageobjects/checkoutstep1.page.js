const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class CheckoutStep1Page extends Page {

    async ensureOnPage(){
        if (await browser.getUrl() !== "https://www.saucedemo.com/checkout-step-one.html")
            throw Error("CheckoutStep1Page.ensureOnPage: Not on correct page")
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
    async clickOnContinue(){
        const elContinue = await $('input[type="submit"]');
        await elContinue.click();
    }
}

module.exports = new CheckoutStep1Page();
    