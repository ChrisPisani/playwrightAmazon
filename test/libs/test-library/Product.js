class Product {

    constructor(page) {
        this.page = page;
    }

    async selectProduct(productNum) {
        const productSelect = this.page.locator(`.a-carousel-card`).nth(productNum);
        await productSelect.click({ trial: true });
        await productSelect.click();
    }

    async selectProductOption(optionName) {
        const productSelect = this.page.locator(`span:has-text("${optionName}") input:visible`);
        await productSelect.click({ trial: true });
        await productSelect.click();
    } 
}

module.exports = Product