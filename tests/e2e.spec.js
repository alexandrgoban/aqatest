import { test, expect } from '@playwright/test';
import { RegisterPage } from "../page-object/Register.page";
import {newUser1} from "../data/testData";
import {cardData} from "../data/testData";
import { LoginPage } from "../page-object/Login.page";
import { CatalogPage } from "../page-object/Catalog.page";
import { BascketPage} from "../page-object/Bascket.page";
import { CheckoutPage } from "../page-object/Checkout.page";

test.setTimeout(70 * 1000);
test('user can register successfully', async ({ page }) => {
    // Pass 'page' into the constructor here:
    const registerPage = new RegisterPage(page);
    const loginPage = new LoginPage(page);
    const catalogPage = new CatalogPage(page);
    const checkoutPage = new CheckoutPage(page);


    await registerPage.navigate();
    await registerPage.fillRegistrationForm(newUser1);
    await loginPage.login(newUser1.email, newUser1.password);
    await catalogPage.selectProduct();
    const bascketPage = new BascketPage(page, catalogPage.tabletNameValue, catalogPage.coffeMachineNameValue, catalogPage.tabletPriceValue, catalogPage.coffeMachinePriceValue);
    await bascketPage.compareProductsDetails();
    await bascketPage.checkTotalPrice();
    await checkoutPage.fillPaymentData(cardData.cardNumber, cardData.cardDate, cardData.cardCVV);


});
