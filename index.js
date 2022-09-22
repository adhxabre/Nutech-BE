// dotenv
require('dotenv').config();

// express
const express = require('express');

// router
const router = require('./src/routes');

// cors
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api/v1', router);

app.get('/', (req, res) => {
  res.send('Hello Developer!');
});

app.listen(process.env.PORT || 5000, function () {
  console.log('Server is listenin on port');
});
