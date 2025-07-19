const FilterLibrary = require('../test-library/Filter');

class Filter {

    constructor(page) {
        this.page = page;
        this._filter = new FilterLibrary(page);
    }

    async filterSearchResults(options) {
        console.log('Filtering on search results');

       for (const [key, value] of Object.entries(options)) {
            if (value !== null) {
                await this._filter.filterSearchResults(key, value);
            }
        }
    }

    async selectCategory(categoryName) {
        console.log(`Opening and selecting category: ${categoryName}`);
        await this._filter.openCategoryList();
        await this._filter.selectCategoryOption(categoryName);
    }
}

module.exports = Filter