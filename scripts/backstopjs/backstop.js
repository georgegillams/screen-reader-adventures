/* eslint-disable no-console */
const backstop = require('backstopjs');

const scenarioData = require('./scenarios.json');

const PORT = process.env.PORT || 9001;
const BASE_URL = `http://127.0.0.1:${PORT}/`;

const allowFailure = process.argv.includes('--allowFailure');

const scenarios = [];

scenarioData.scenarioIds.forEach(sI => {
  let delay = 1500;
  let urlExt = sI;
  if (typeof sI === 'object') {
    urlExt = sI.url;
    delay = sI.delay;
  }
  scenarios.push({
    label: urlExt,
    url: `${BASE_URL}${urlExt}`,
    hideSelectors: scenarioData.globallyHiddenSelectors,
    delay,
  });
});

const config = {
  id: 'screen-reader-adventures-com-default',
  misMatchThreshold: 3,
  viewports: [
    {
      label: 'phone',
      width: 320,
      height: 480,
    },
    {
      label: 'tablet',
      width: 1024,
      height: 768,
    },
  ],
  onBeforeScript: 'puppet/onBefore.js',
  onReadyScript: 'puppet/onReady.js',
  scenarios,
  paths: {
    bitmaps_reference: 'backstop_data/bitmaps_reference',
    bitmaps_test: 'backstop_data/bitmaps_test',
    engine_scripts: 'backstop_data/engine_scripts',
    html_report: 'backstop_data/html_report',
    ci_report: 'backstop_data/ci_report',
  },
  report: ['browser'],
  engine: 'puppeteer',
  engineOptions: {
    args: ['--no-sandbox'],
  },
  asyncCaptureLimit: 5,
  asyncCompareLimit: 50,
  debug: false,
  debugWindow: false,
};

backstop('test', { config })
  .then(() => {
    // test successful
    console.log(`All good 👍`);
    process.exit(0);
  })
  .catch(() => {
    //       // test failed
    backstop('approve', { config }).then(() => process.exit(allowFailure ? 0 : 1));
  });
