import path from 'path';

import express from 'express';

const router = express.Router();

router.get('/robots.txt', (req, res) => {
  res.sendFile(path.join(__dirname, 'robots.txt'), {
    headers: { 'Content-Type': 'text/plain' },
  });
});

router.get('/sitemap.xml', (req, res) => {
  res.sendFile(path.join(__dirname, 'sitemap.xml'), {
    headers: { 'Content-Type': 'text/xml' },
  });
});

export default router;
