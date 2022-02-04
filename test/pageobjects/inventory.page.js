const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class InventoryPage extends Page {
    /**
     * define selectors using getter methods
     */
    get secondaryTitle() {
        return $('#header_container > div.header_secondary_container > span')
    }

    async ensureOnPage(){
        if (await browser.getUrl() !== "https://www.saucedemo.com/inventory.html")
            throw Error("InventoryPage.ensureOnPage: Not on correct page")
    }
}

module.exports = new InventoryPage();
