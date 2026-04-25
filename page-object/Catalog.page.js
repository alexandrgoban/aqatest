import {expect} from "@playwright/test";

export class CatalogPage {
    constructor(page) {
        this.page = page;
        this.coffeeMachineProdudact = page.locator('[id="product-add-6"]')
        this.tabletProduct = page.locator('[id="product-add-5"]');
        this.basketCount = page.locator('[id="cart-count"]');

        this.tabletName = page.locator('[id="product-name-5"]')
        this.coffeMachineName = page.locator('[id="product-name-6"]')
        this.tabletPrice = page.locator('[id="product-price-5"]')
        this.coffeMachinePrice = page.locator('[id="product-price-6"]')


        this.tabletNameValue = '';
        this.coffeMachineNameValue = '';

        this.tabletPriceValue = '';
        this.coffeMachinePriceValue = '';

    }

    async selectProduct() {
        await this.coffeeMachineProdudact.click({delay: 2000});
        await this.tabletProduct.click({delay: 2000});
        await this.page.waitForLoadState('networkidle');
        // const productQty = await this.basketCount.innerText();
        // expect(productQty).toBe("2");
        await this.basketCount.waitFor();
        await expect(this.basketCount).toContainText('2', {timeout: 5000});
        await this.saveProductIfo();
        await this.basketCount.click()

    }

    async saveProductIfo() {
        this.tabletNameValue = await this.tabletName.innerText()
        this.coffeMachineNameValue = await this.coffeMachineName.innerText()
        this.tabletPriceValue = await this.tabletPrice.innerText()
        this.coffeMachinePriceValue = await this.coffeMachinePrice.innerText()

        // console.log(this.tabletNameValue)
        // console.log(this.coffeMachineNameValue)
        // console.log(this.tabletPriceValue)
        // console.log(this.coffeMachinePriceValue)


    }
}