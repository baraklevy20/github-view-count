const express = require('express');
const Mustache = require('mustache');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3000;
let counter = 0;

app.get('/view-count', async (req, res) => {
  counter += 1;
  const template = fs.readFileSync('./view-count.svg').toString();
  const viewSvg = Mustache.render(template, { counter });
  res.setHeader('content-type', 'image/svg+xml');
  res.send(viewSvg);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
