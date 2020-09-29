const Mustache = require('mustache');
const fs = require('fs');
const db = require('./db');
const router = require('express').Router();

router.get('/', async (req, res) => {
  await db.increaseCounter();

  const counter = await db.getCounter();
  const template = fs.readFileSync('./view-count.svg').toString();
  const viewSvg = Mustache.render(template, {counter});

  res.setHeader('content-type', 'image/svg+xml');
  res.setHeader(
    'cache-control',
    'max-age=0, no-cache, no-store, must-revalidate',
  );
  res.send(viewSvg);
});

module.exports = router;