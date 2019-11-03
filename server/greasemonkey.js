const fs = require('fs');
const path = require('path');

const express = require('express');
const wget = require('wget-improved');

const router = express.Router();

function getMeta(cb) {
  const download = wget.download(
    'https://raw.githubusercontent.com/georgegillams/browser-scripts/master/scripts.json',
    path.join(__dirname, './server_content/greasemonkey', 'scripts.json'),
    {},
  );
  download.on('end', () => {
    const metaData = JSON.parse(
      fs.readFileSync(
        path.join(__dirname, './server_content/greasemonkey', 'scripts.json'),
        'utf8',
      ),
    );
    cb(metaData);
  });
}

function createWorkingDirectories() {
  var serverContentDir = path.join(__dirname, './server_content');
  var greasemonkeyDir = path.join(__dirname, './server_content/greasemonkey');

  if (!fs.existsSync(serverContentDir)) {
    fs.mkdirSync(serverContentDir);
  }
  if (!fs.existsSync(greasemonkeyDir)) {
    fs.mkdirSync(greasemonkeyDir);
  }
}

function sendGreasemonkeyFile(scriptId, req, res) {
  try {
    createWorkingDirectories();
    getMeta(metaData => {
      const matchingScripts = metaData.filter(m => m.id === scriptId);
      if (matchingScripts.length > 0) {
        const { fileName } = matchingScripts[0];
        const download = wget.download(
          `https://raw.githubusercontent.com/georgegillams/browser-scripts/master/src/${fileName}`,
          path.join(__dirname, './server_content/greasemonkey', fileName),
          {},
        );
        download.on('end', () => {
          res.sendFile(
            path.join(__dirname, './server_content/greasemonkey', fileName),
            {
              headers: { 'Content-Type': 'text/plain' },
            },
          );
        });
      } else {
        res
          .status(500)
          .send({ error: 'An error occured fetching resources from GitHub.' });
      }
    });
  } catch (e) {
    console.err(`An error occured fetching resources from GitHub`, err);
  }
}

router.get(`/greasemonkey/*`, (req, res) => {
  const pathValues = req.path.split('/');
  const scriptId = pathValues[pathValues.length - 1];
  sendGreasemonkeyFile(scriptId, req, res);
});

router.get(`/api/greasemonkey/*`, (req, res) => {
  const pathValues = req.path.split('/');
  const scriptId = pathValues[pathValues.length - 1];
  sendGreasemonkeyFile(scriptId, req, res);
});

export default router;
