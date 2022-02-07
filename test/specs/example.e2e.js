const LoginPage = require('../pageobjects/login.page');
const InventoryPage = require('../pageobjects/inventory.page');
const LoginData = require('../../data/logindata');

describe('Sauce Demo', () => {
    it('Login_1:should login with valid credentials', async () => {
        await LoginPage.open();

        await LoginPage.login(LoginData.userName, LoginData.password);
        await expect(InventoryPage.secondaryTitle).toHaveTextContaining('PRODUCTS');
    });
    it('Login_2:should be able to logout after login', async () => {
        await LoginPage.open();

        await LoginPage.login(LoginData.userName, LoginData.password);
        await expect(InventoryPage.secondaryTitle).toHaveTextContaining('PRODUCTS');

        await LoginPage.logout();
    });
});


