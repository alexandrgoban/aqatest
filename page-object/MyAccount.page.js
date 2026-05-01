import {expect} from "@playwright/test";

export class MyAccountPage {
    constructor(page) {
        this.page = page;

        this.items = page.locator('#account-order-0 ul > li');
        this.totalAmountField = page.locator('#account-order-0 p', {hasText: 'Total Amount:'});
        this.logoutButton = page.locator('[id="account-logout-button"]');
    }

    async checkFinalOrder(firstItemPrice, lastItemPrice) {
        const totalPrice = Number(firstItemPrice.replace('$','')) + Number(lastItemPrice.replace('$',''));
        console.log(totalPrice);
        await expect(this.totalAmountField).toContainText(`${totalPrice}`);
        // const totalAmount = await this.totalAmountField.innerText();
        // console.log(`Total Amount: ${totalAmount}`);
    }

    async checkToItem() {
        await expect(this.items.first()).toBeVisible();
        await expect(this.items.last()).toBeVisible();
        await expect(this.logoutButton).toBeEnabled();

        // await this.items.last().scrollIntoViewIfNeeded();
        // await this.page.mouse.wheel(0, 500);
    }

    async logout() {
        await this.page.pause()
        await this.logoutButton.click();
    }
}