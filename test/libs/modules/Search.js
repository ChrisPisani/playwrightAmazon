const SearchLibrary = require('../test-library/Search');

class Search {

    constructor(page) {
        this.page = page;
        this._search = new SearchLibrary(page);
    }

    async searchFrontPage(query) {
        console.log('Searching the front page');
        await this._search.searchFrontPage(query);
        await this.waitForSearchResults(query);
    }

    async waitForSearchResults(query) {
        await this._search.waitForSearchResults(query);
    }

}

module.exports = Search