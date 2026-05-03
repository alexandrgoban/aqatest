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

    }

    async selectProduct() {
        await this.coffeeMachineProdudact.click({delay: 2000});
        await this.tabletProduct.click({delay: 2000});
        await this.page.waitForLoadState('networkidle');
        // const productQty = await this.basketCount.innerText();
        // expect(productQty).toBe("2");
        await this.basketCount.waitFor();
        const itemInfo = await this.getProductIfo();
        return itemInfo;
    }
    async goToBasket() {
        await this.basketCount.click()
    }

    async getProductIfo() {
        return {
            firstProduct: {
                name: await this.tabletName.innerText(),
                price: await this.tabletPrice.innerText(),
            },
            secondProduct: {
                name: await this.coffeMachineName.innerText(),
                price: await this.coffeMachinePrice.innerText(),
            }
        }
    }
}