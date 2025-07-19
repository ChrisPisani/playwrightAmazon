const { test } = require('@playwright/test');
const Init = require('../../libs/modules/Init');
const Search = require('../../libs/modules/Search');
const Filter = require('../../libs/modules/Filter');
const config = process.env.TEST_CONFIG ? JSON.parse(process.env.TEST_CONFIG) : require('../searchFiltering/configs/1.json');

test('Amazon Searching & Filtering', async ({ page }) => {

  // Set default test timeout to prevent stalls
  test.setTimeout(60000);
  const init = new Init(page);
  const search = new Search(page);
  const filter = new Filter(page);
  await page.setViewportSize({ width: 2048, height: 1010 });

  // reload page on test start to reset to default
  await init.openAmazon();
  await page.reload();

  await search.searchFrontPage(config.searchKey);

  await filter.filterSearchResults(config);

});
