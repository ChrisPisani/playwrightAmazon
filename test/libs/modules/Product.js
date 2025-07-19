const ProductLibrary = require('../test-library/Product');

class Product {

    constructor(page) {
        this.page = page;
        this._product = new ProductLibrary(page);
    }

    async selectProduct(num) {
        console.log(`Selecting product: ${num}`);
        await this._product.selectProduct(num)
    }

  async selectProductOption(optionName) {
        console.log(`Selecting product option: ${optionName}`);
        await this._product.selectProductOption(optionName)
    } 
}

module.exports = Product