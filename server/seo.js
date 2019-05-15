const express = require("express");
const path = require("path");
const wget = require("wget-improved");

const router = express.Router();

router.get("/robots.txt", (req, res) => {
  res.sendFile(path.join(__dirname, "./server_content", "robots.txt"), {
    headers: { "Content-Type": "text/plain" }
  });
});

router.get("/sitemap.xml", (req, res) => {
  res.sendFile(path.join(__dirname, "./server_content", "sitemap.xml"), {
    headers: { "Content-Type": "text/xml" }
  });
});

export default router;
