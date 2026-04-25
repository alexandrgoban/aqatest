import {expect} from "@playwright/test";

export class BascketPage {
    constructor(page, tabletNameValue, coffeMachineNameValue, tabletPriceValue, coffeMachinePriceValue) {
        this.page = page;
        this.firstProductItem = page.locator('[id="cart-item-name-6"]');
        this.secondProductItem = page.locator('[id="cart-item-name-5"]');

        this.firstItemPrice = page.locator('[id="cart-item-price-6"]');
        this.secondItemPrice = page.locator('[id="cart-item-price-5"]');

        this.totalValue = page.locator('[id="cart-total"]');
        this.chekoutButton = page.locator('[id="cart-checkout-button"]');

        this.addFirstItemButton = page.locator('[id="cart-item-increase-5"]');
        this.removeFirstItemButton = page.locator('[id="cart-item-decrease-5"]');

        this.coffeMachineNameValue = coffeMachineNameValue;
        this.tabletNameValue = tabletNameValue;

        this.coffeMachinePriceValue = coffeMachinePriceValue;
        this.tabletPriceValue = tabletPriceValue;


    }
    async compareProductsDetails(){
        await expect(this.firstProductItem).toHaveText(this.coffeMachineNameValue)
        await expect(this.secondProductItem).toHaveText(this.tabletNameValue)
        await expect(this.firstItemPrice).toHaveText(this.coffeMachinePriceValue)
        await expect(this.secondItemPrice).toHaveText(this.tabletPriceValue)


    }
    async checkTotalPrice() {
        const firstItemPriceNumber = Number((await this.firstItemPrice.innerText()).replace(/\D/g, ''));
        const secondItemPriceNumber = Number((await this.secondItemPrice.innerText()).replace(/\D/g, ''));
        const totalNumber = parseInt((await this.totalValue.innerText()).replace(/[^\d.]/g, ''), 10);
        expect(totalNumber).toBe(firstItemPriceNumber + secondItemPriceNumber);
        // if (totalNumber === firstItemPriceNumber + secondItemPriceNumber) {
        //     console.log('super');
        // }
        // await this.chekoutButton.click({trial: true});
        // await this.chekoutButton.click({force: true});
        // await this.addFirstItemButton.click({clickCount: 5, delay: 1000});
        await this.chekoutButton.waitFor({state: "visible"});
        await this.chekoutButton.click({trial: true});
        await this.chekoutButton.click({force: true});
        await this.page.waitForURL('https://aqa-app.vercel.app/checkout');
    }


}