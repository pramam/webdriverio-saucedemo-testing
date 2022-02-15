const LoginPage = require('../pageobjects/login.page');
const InventoryPage = require('../pageobjects/inventory.page');

describe('Login: Should be able to login with valid credentials', () => {
    describe(`Login`, ()=> {
        it(`should login user`, async ()=>{
            await LoginPage.open();
            await LoginPage.login('standard_user', 'secret_sauce');
        })
    })
    describe(`Inventory Page`, ()=>{
        it(`should be on Inventory Page`, async ()=>{
            await expect(InventoryPage.secondaryTitle).toHaveTextContaining('PRODUCTS');
        })
    })    
});

describe(`Login Logout: Should be able to login, then logout`, ()=>{
    describe(`Login`, ()=>{
        it(`should login user`, async ()=>{
            await LoginPage.open();
            await LoginPage.login('standard_user', 'secret_sauce');
        })
    })
    describe(`Inventory Page`, ()=>{
        it(`should be on Inventory Page`, async ()=>{
            await expect(InventoryPage.secondaryTitle).toHaveTextContaining('PRODUCTS');
        })
    })
    describe(`Logout`, ()=>{
        it(`should logout user`, async ()=>{
            await LoginPage.logout();
        })
    })
})

