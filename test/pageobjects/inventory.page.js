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

    // id_name starts with '#'
    async addItemToCart(id_name){
        // TODO: Use data-test id's; More robust
        // Add a product to cart by clicking ADD TO CART button next to the item
        const elItem1 = await $(id_name)

        // TODO: Get name of this item and store it for later
        // const elItem1Name = await elItem1.previousElement();
        // await elItem1Name.toHaveElementClassContaining('inventory_item_label');

        await elItem1.click();

    }
    // id_name starts with #
    async removeItemFromCart(id_name){
        const elRemoveItem = await $(id_name)
        await elRemoveItem.click();
    }
}

module.exports = new InventoryPage();
