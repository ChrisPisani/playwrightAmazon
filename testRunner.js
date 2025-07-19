const path = require('path');
const { execSync } = require('child_process');

const testFile = 'test/indexes/buyProducts';
//const index = path.join(testFile, 'index.spec.js')
const configsDir = path.join(__dirname, testFile, 'configs');

const configFiles = [
  '1.json', '2.json', '3.json'
];

async function run() {
  for (const configFile of configFiles) {
    const configPath = path.join(configsDir, configFile);
    const configData = require(configPath);

    console.log(`\n Running test with config file: ${configFile}`);

    try {
      execSync(
        `npx playwright test "${testFile}" --headed --timeout=60000`,
        {
          env: { ...process.env, TEST_CONFIG: JSON.stringify(configData)},
          stdio: 'inherit',
        }
      );
    } catch (err) {
      console.error(`Test failed for config: ${configFile}: ${err}`);
    }
  }
}

run();
