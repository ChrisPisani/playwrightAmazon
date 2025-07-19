class Init {

    constructor(page) {
        this.page = page;
    }

    async openAmazon() {
        await this.page.goto('https://Amazon.com');
    }

    async catchPopup() {
       try {
            // Try to click a popup that has appeared for three seconds, otherwise continue
            await this.page.locator('button:has-text("Continue")').click({ force: true, timeout: 3000 });
            console.log('Popup clicked');
       }
       catch {
            console.log('No popup to click');
       }
    }
}

module.exports = Init