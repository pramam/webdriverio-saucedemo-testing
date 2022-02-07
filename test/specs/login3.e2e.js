const LoginPage = require('../pageobjects/login.page');
const InventoryPage = require('../pageobjects/inventory.page');
const LoginData = require('../../data/logindata');

describe("Login-Logout", ()=>{
    it('Login_3:should be able to login, logout, login', async () => {
        await LoginPage.open();

        await LoginPage.login(LoginData.userName, LoginData.password);
        await InventoryPage.ensureOnPage();
        console.log(`Login_3: Logged in successfully`);

        await LoginPage.logout();
        console.log(`Login_3: Logged out successfully`);
        
        await LoginPage.open();

        await LoginPage.login(LoginData.userName, LoginData.password);
        await InventoryPage.ensureOnPage();
        console.log(`Login_3: Logged in again successfully`);
        
        // const elMenuButton = await $('#react-burger-menu-btn')
        // await elMenuButton.click();
        // await browser.pause(5000);
        // const elLogoutLink = await $('#logout_sidebar_link')
        // await elLogoutLink.click();
    });
})