const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage extends Page {
    /**
     * define selectors using getter methods
     */
    get inputUsername() {
        return $('#user-name');
    }

    get inputPassword() {
        return $('#password');
    }

    get btnSubmit() {
        return $('#login-button');
    }

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    async login (username, password) {
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
        await this.btnSubmit.click();
    }

    /**
     * overwrite specific options to adapt it to page object
     */
    open() {
        return super.open('');
    }

    async logout(){
        const elMenuButton = await $('#react-burger-menu-btn')
        await elMenuButton.click();
        const elLogoutLink = await $('#logout_sidebar_link')
        await browser.pause(5000);
        await elLogoutLink.click();
    }
    async resetAppState(){
        // const elMenuButton = await $('#react-burger-menu-btn')
        
        // await elMenuButton.click();
        const elMenu = await $('.bm-menu');

        expect(elMenu).toBeDisplayed();

        
        const elResetLink = await $('#reset_sidebar_link')
        await browser.pause(5000);
        await elResetLink.waitForClickable({ timeout: 5000 });
        await elResetLink.click();

    }

    async resetAppStateAndLogout(){
        // const elMenuButton = await $('#react-burger-menu-btn')
        
        // await elMenuButton.click();
        const elMenu = await $('.bm-menu');
        await elMenu.scrollIntoView();
        expect(elMenu).toBeDisplayed();

        
        const elResetLink = await $('#reset_sidebar_link')
        
        await browser.pause(5000);
        await elResetLink.waitForClickable({ timeout: 5000 });
        await elResetLink.click();

        
        const elLogoutLink = await $('#logout_sidebar_link')
        await browser.pause(5000);
        await elLogoutLink.click();

    }
    async checkIfOnErroredLogoutPage(error_url){ 
        await browser.refresh();       
        const url = await browser.getUrl();

        if (url !== "https://www.saucedemo.com/")
            throw Error(`Login.checkIfOnErroredLogout: Not on correct page, current page is ${url}`);
        
        const myElem = await $('[data-test="error"]')
        await myElem.waitForDisplayed({ timeout: 3000 });

        // Error message:
        // Epic sadface: You can only access '/checkout-step-two.html' when you are logged in.
        const errMsg = await myElem.getText();
        
        if (errMsg !== `Epic sadface: You can only access '${error_url}' when you are logged in.`)
            throw Error(`LoginPage.checkIfOnErroredLogoutPage, ${errMsg} doesn't match what I expect for error_url ${error_url}`)
    }
}

module.exports = new LoginPage();
