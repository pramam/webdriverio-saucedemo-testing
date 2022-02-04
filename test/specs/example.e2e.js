const LoginPage = require('../pageobjects/login.page');
const InventoryPage = require('../pageobjects/inventory.page');

describe('Sauce Demo', () => {
    it('Login_1:should login with valid credentials', async () => {
        await LoginPage.open();

        await LoginPage.login('standard_user', 'secret_sauce');
        await expect(InventoryPage.secondaryTitle).toHaveTextContaining('PRODUCTS');
    });
    it('Login_2:should be able to logout after login', async () => {
        await LoginPage.open();

        await LoginPage.login('standard_user', 'secret_sauce');
        await expect(InventoryPage.secondaryTitle).toHaveTextContaining('PRODUCTS');

        await LoginPage.logout();
        // const elMenuButton = await $('#react-burger-menu-btn')
        // await elMenuButton.click();
        // await browser.pause(5000);
        // const elLogoutLink = await $('#logout_sidebar_link')
        // await elLogoutLink.click();
    });
});


