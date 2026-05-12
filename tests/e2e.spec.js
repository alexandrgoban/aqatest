import { test, expect } from '@playwright/test';
import {cardData} from "../data/testData";
import {CatalogPage} from "../page-object/Catalog.page";
import {BascketPage} from "../page-object/Bascket.page";
import {CheckoutPage} from "../page-object/Checkout.page";
import {MyAccountPage} from "../page-object/MyAccount.page";

test.setTimeout(70 * 1000);
test.describe('E2E order flow', () => {
    test.beforeAll(async () => {
        console.log('beforeAll: prepare test data');
        console.log('beforeAll: generate users');
        console.log('beforeAll: prepare test data');
    });

    test.beforeEach(async ({page}) => {
        console.log('beforeEach: preconditions');
        console.log('beforeEach: ready');
        await page.goto('/');
    });
    test.afterEach(async ({page}, testInfo) => {
        if (testInfo.status !== testInfo.expectedStatus) {
            console.log(`afterEach: test failed: ${testInfo.title}`);

            await page.screenshot({
                path: `test-results/${testInfo.title}-failed.html`,
                fullPage: true,
            })
        }

    })
    test.afterAll(async () => {
        console.log('afterAll: complete');
    })
    test('Create user, login, order to items, payment', async ({ page }) => {
        const catalogPage = new CatalogPage(page);
        const checkoutPage = new CheckoutPage(page);
        const myAccountPage = new MyAccountPage(page);
        const bascketPage = new BascketPage(page);

        let items;

        await test.step('Select two items' , async () => {
            items = await catalogPage.selectProduct();
        })
        await test.step('Verify basket counter(visible, qty)' , async () => {
            await expect(catalogPage.basketCount).toBeVisible();
            await expect(catalogPage.basketCount).toContainText('2', {timeout: 3000});
        })
        await test.step('Go to basket' , async () => {
            await catalogPage.goToBasket();
        })
        await test.step('Verify products details in basket' , async () => {
            // Check products details
            await expect(bascketPage.firstProductItem).toHaveText(items.secondProduct.name)
            await expect(bascketPage.secondProductItem).toHaveText(items.firstProduct.name)
            await expect(bascketPage.firstItemPrice).toHaveText(items.secondProduct.price)
            await expect(bascketPage.secondItemPrice).toHaveText(items.firstProduct.price)
        })
        await test.step('Verify total price' , async () => {    const firstItemPriceNumber = Number((await bascketPage.firstItemPrice.innerText()).replace(/\D/g, ''));
            const secondItemPriceNumber = Number((await bascketPage.secondItemPrice.innerText()).replace(/\D/g, ''));
            const totalNumber = parseInt((await bascketPage.totalValue.innerText()).replace(/[^\d.]/g, ''), 10);
            expect(totalNumber).toBe(firstItemPriceNumber + secondItemPriceNumber);
        })
        await test.step('Go to checkout page' , async () => {
            await bascketPage.goToChekoutPage();
        })
        await test.step('Fill payment data and submit payment' , async () => {
            await checkoutPage.fillPaymentData(cardData.cardNumber, cardData.cardDate, cardData.cardCVV);
        })
        await test.step('Verify successfull order' , async () => {
            await expect(checkoutPage.successOrder).toBeVisible({timeout: 8000});
            await expect(checkoutPage.page).toHaveURL('/checkout');
        })
        await test.step('Go to my account page' , async () => {
            await checkoutPage.goToMyAccount();
            await expect(checkoutPage.page).toHaveURL('/account');
        })
        await test.step('Verify total amount in my account page' , async () => {
            const totalPrice = Number(items.firstProduct.price.replace('$','')) + Number(items.secondProduct.price.replace('$',''));
            await expect(myAccountPage.totalAmountField).toContainText(`${totalPrice}`);
        })
        await test.step('Verify items list' , async () => {
            await expect(myAccountPage.items.first()).toBeVisible();
            await expect(myAccountPage.items.last()).toBeVisible();
            await expect(myAccountPage.logoutButton).toBeEnabled();
        })
        await test.step('Logout' , async () => {
            await myAccountPage.logout();
        })

    });
})
