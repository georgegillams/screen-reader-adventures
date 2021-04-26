/* eslint-disable no-console */
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs'); // Or `import fs from "fs";` with ESM

const prompt = require('prompt');

// Create backup
const defaultBoilerplatePath = '../webapp-boilerplate';
const schema = {
  properties: {
    boilerplatePath: {
      description: 'What path shall we pull common resources from?',
      default: defaultBoilerplatePath,
      pattern: /.*/,
      message: '',
      required: true,
    },
  },
};

const pullInCommonCode = async (err, { boilerplatePath }) => {
  if (err) {
    console.error(err);
    return;
  }

  const directories = execSync('find . -name common')
    .toString()
    .split('\n')
    .filter(s => {
      if (s === '') {
        return false;
      }
      if (s.startsWith('./node_modules') || s.startsWith('./coverage')) {
        return false;
      }

      return true;
    });

  directories.forEach(d => {
    execSync(`rm -rf ${d}`);

    const replacementPath = path.join(boilerplatePath, d);
    if (fs.existsSync(replacementPath)) {
      execSync(`cp -R ${replacementPath} ${d}`);
    }
  });
};

prompt.start();
prompt.get(schema, pullInCommonCode);
