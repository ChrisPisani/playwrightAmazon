const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const testFile = 'test/indexes/buyProducts';
const testName = path.basename(testFile);
const configsDir = path.join(__dirname, testFile, 'configs');
const resultsDir = path.join(__dirname, 'playwright-results');
const videoOutputDir = path.join(__dirname, 'videos');

const configFiles = ['1.json', '2.json', '3.json'];

function findLatestVideoPath(dir) {
  const allDirs = fs.readdirSync(dir, { withFileTypes: true }).filter(d => d.isDirectory());

  for (const d of allDirs) {
    const videoPath = path.join(dir, d.name, 'video.webm');
    if (fs.existsSync(videoPath)) {
      return {
        folderName: d.name,
        videoPath
      };
    }
  }

  return null;
}

async function run() {
  for (const configFile of configFiles) {
    const configName = path.basename(configFile, '.json');
    const configPath = path.join(configsDir, configFile);
    const configData = require(configPath);

    console.log(`\n🎬 Running test with config file: ${configFile}`);

    try {
      // Clean previous results
      if (fs.existsSync(resultsDir)) {
        fs.rmSync(resultsDir, { recursive: true, force: true });
      }

      // Run test
      execSync(
        `npx playwright test "${testFile}" --headed --timeout=60000`,
        {
          env: {
            ...process.env,
            TEST_CONFIG: JSON.stringify(configData),
          },
          stdio: 'inherit',
        }
      );

      // Find video
      const result = findLatestVideoPath(resultsDir);
      if (!result) {
        console.warn(`⚠️  No video found for config: ${configFile}`);
        continue;
      }

      const finalFileName = `${testName}_${configName}.webm`;
      const finalPath = path.join(videoOutputDir, finalFileName);

      fs.mkdirSync(videoOutputDir, { recursive: true });
      fs.renameSync(result.videoPath, finalPath);

      console.log(`✅ Video saved to: ${finalPath}`);
    } catch (err) {
      console.error(`❌ Test failed for config: ${configFile}:\n${err}`);
    }
  }
}

run();
