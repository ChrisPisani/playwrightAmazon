class Filter {

    constructor(page) {
        this.page = page;
    }

    async filterSearchResults(key, value) {
        switch (key) {
            case "sortBy":
                await this.applySortBy(value);
                break;
            case "primeOnly":
                await this.filterPrimeOnly(value);
                break;
            case "delivery":
                await this.filterDelivery(value);
                break;
            case "ageRange":
                await this.filterAgeRange(value);
                break;
            case "priceRange":
                await this.filterPriceRange(value);
                break;
            case "deals":
                await this.filterDeals(value);
                break;
            case "fourStarsUp":
                await this.filterFourStarsUp(value);
                break;
            default:
                break;
        }
    }

    async applySortBy(value) {
        await this.page.locator('select#s-result-sort-select').selectOption(value);
    }

    async filterPrimeOnly(value) {
        if (value) {
            await this.page.getByRole('link', { name: 'Apply Free Shipping by Amazon' }).click();
        }
    }

    async filterDelivery(value) {
        if (value === "Get it by Tomorrow") {
              await this.page.getByRole('link', { name: 'Apply Get It by Tomorrow' }).click();

        }
    }

    async filterAgeRange(value) {
        await this.page.locator(`#filter-p_n_age_range li:has-text("${value}") input`).click({ force: true });
    }

    async filterPriceRange(value) {
        if (value.low) {
            await this.page.locator('.s-lower-bound input').fill(value.low);
        }
        if (value.high) {
            await this.page.locator('.s-upper-bound input').fill(value.high);
        }
        await this.page.locator('[aria-label="Go - Submit price range"]').click();
    }

    async filterDeals(value) {
        if (value.includes('Today')) {
            value = 'Today\'s deals';
        }
        if (await this.page.locator('#filter-p_n_deal_type').isVisible()) {
            await this.page.locator(`span a:has-text("${value}")`).click({ trial:true });
            await this.page.locator(`#filter-p_n_deal_type span a:has-text("${value}")`).click({ force: true });
        }
        else {
            console.log('There is no deal filter visible');
        }
    }

    async filterFourStarsUp(value) {
        if (value) {
            const starsSelector = '#reviewsRefinements a';
            if (await this.page.locator(starsSelector).isVisible()){
                await this.page.locator(starsSelector).click();
            }
            else {
                console.log('There is no star filter visible');
            }
        } 
    }

    async openCategoryList() {
        const hamburgerList = this.page.locator('#nav-hamburger-menu');
        await hamburgerList.click({ trial: true });
        await hamburgerList.click();
    }

    async selectCategoryOption(category) {
        const categoryOption = this.page.locator(`section.category-section a:has-text("${category}"):visible`);
        await categoryOption.click({ trial: true });
        await categoryOption.click();
    }
}

module.exports = Filter