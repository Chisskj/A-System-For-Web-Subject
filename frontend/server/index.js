const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();

app.use(express.static(path.join(__dirname, '..', 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

const { PORT } = process.env;
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on port ${PORT}`);
});
