const InitLibrary = require('../test-library/Init');

class Init {

    constructor(page) {
        this.page = page;
        this._init = new InitLibrary(page);
    }

    async openAmazon() {
        console.log('Opening Amazon website');
        await this._init.openAmazon();
        await this._init.catchPopup();
    }
}

module.exports = Init