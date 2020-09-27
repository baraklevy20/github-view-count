const express = require('express');
const textToImage = require('text-to-image');

const app = express();
const port = process.env.PORT || 3000;
let counter = 0;

app.get('/counter.png', async (req, res) => {
  counter += 1;
  const dataUri = await textToImage.generate(
    `My profile was viewed ${counter} times`,
  );
  const img = Buffer.from(dataUri.split(',')[1], 'base64');

  res.writeHead(200, {
    'Content-Type': 'image/png',
    'Content-Length': img.length,
  });

  res.end(img);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
