const {test} = require(`@playwright/test`);
const {newUser1} = require("../data/testData");
const {RegisterPage} = require("../page-object/Register.page.js");
const {LoginPage} = require("../page-object/Login.page.js");

test('setup: loging and save storageState', async ({page, context}) => {
    const registerPage = new RegisterPage(page);
    const loginPage = new LoginPage(page);

    await test.step('Open log in page' , async () => {
        await registerPage.openLoginPage();
    })
    await test.step('Register new user' , async () => {
        await registerPage.fillRegistrationForm(newUser1);
    })
    await test.step('Login with created user' , async () => {
        await loginPage.login(newUser1.email, newUser1.password);
    })

    await test.step('Save storage state' , async () => {
        await context.storageState({path: 'data/storageState.json'})
    })

})