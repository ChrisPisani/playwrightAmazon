class Search {

    constructor(page) {
        this.page = page;
    }

    async searchFrontPage(query) {
        const searchBar = this.page.locator('.nav-search-field #twotabsearchtextbox');
        await searchBar.click({ trial: true });
        await searchBar.fill(query);
        const searchSubmit = this.page.locator('#nav-search-submit-button');
        await searchSubmit.click({ trial: true});
        await searchSubmit.click({});
    }

     async waitForSearchResults(query) {
        await this.page.locator(`[data-component-type="s-result-info-bar"]:has-text("${query}")`).waitFor();
    }
}

module.exports = Search