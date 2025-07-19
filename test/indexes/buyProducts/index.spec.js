const { test } = require('@playwright/test');
const Init = require('../../libs/modules/Init');
const Product = require('../../libs/modules/Product');
const Filter = require('../../libs/modules/Filter');
const config = process.env.TEST_CONFIG ? JSON.parse(process.env.TEST_CONFIG) : require('../buyProducts/configs/1.json');

test('Amazon viewing categories and product options', async ({ page }) => {

  // Set default test timeout to prevent stalls
  test.setTimeout(60000);
  const init = new Init(page);
  const product = new Product(page);
  const filter = new Filter(page);
  await page.setViewportSize({ width: 2048, height: 1010 });

  // reload page on test start to reset to default
  await init.openAmazon();
  await page.reload();

  await filter.selectCategory(config.categoryListType);

  await product.selectProduct(config.productNumber);
  await product.selectProductOption(config.productOption);
});
