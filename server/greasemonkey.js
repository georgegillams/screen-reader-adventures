const express = require('express');
const path = require('path');
const wget = require('wget-improved');

const router = express.Router();

function sendGreasemonkeyFile(fileName, req, res) {
  const download = wget.download(
    `https://raw.githubusercontent.com/georgegillams/dotfiles/master/greasemonkey/${fileName}`,
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
}

function register(scriptId, fileName) {
  router.get(`/greasemonkey/${scriptId}`, (req, res) => {
    sendGreasemonkeyFile(fileName, req, res);
  });

  router.get(`/api/greasemonkey/${scriptId}`, (req, res) => {
    sendGreasemonkeyFile(fileName, req, res);
  });
}

register('github_WIP_reminder', 'Github WIP Reminder.js');
register('jira_github_links', 'Jira Github Links.js');
register('geektastic_identifiers', 'Geektastic identifiers.js');
register('github_travis_new_tab', 'GitHub Travis links new tab.js');
register('find_backpack_components', 'Find Backpack components.js');
register('github_squash_reminder', 'GitHub squash reminder.js');
register('gurushots_boost', 'GuruShots boost.js');
register('secureEcs_download', 'secure ecs.js');
register('skyscanner_buttons', 'skyscanner buttons.js');
register('github_highlight_name', 'Github highlight my name.js');
register('github_expand_comments', 'Github expand all hidden comments.js');
register('hackthis_coding_1', 'Hackthis.co.uk coding level 1.js');
register('hackthis_coding_2', 'Hackthis.co.uk coding level 2.js');

export default router;
