const express = require('express');
const db = require('./db');
const routes = require('./routes');
const app = express();
const port = process.env.PORT || 3000;

app.use('/', routes);

db.createCounterTable().then(() => {
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
})