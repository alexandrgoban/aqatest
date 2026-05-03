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


    }
    // async compareProductsDetails(items){
    //     await expect(this.firstProductItem).toHaveText(items.secondProduct.name)
    //     await expect(this.secondProductItem).toHaveText(items.firstProduct.name)
    //     await expect(this.firstItemPrice).toHaveText(items.secondProduct.price)
    //     await expect(this.secondItemPrice).toHaveText(items.firstProduct.price)
    //
    //
    // }
    async checkTotalPrice() {
        // if (totalNumber === firstItemPriceNumber + secondItemPriceNumber) {
        //     console.log('super');
        // }
        // await this.chekoutButton.click({trial: true});
        // await this.chekoutButton.click({force: true});
        // await this.addFirstItemButton.click({clickCount: 5, delay: 1000});
        await this.chekoutButton.waitFor({state: "visible"});
        await this.chekoutButton.click({trial: true});
        await this.chekoutButton.click({force: true});
        await this.page.waitForURL('/checkout');
    }


}