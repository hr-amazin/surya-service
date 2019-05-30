require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database/index.js');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4568;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client/dist'));

app.get('/api/carousel', (req, res) => {
  let uuid = parseInt(req.query._id);
  db.getAllProducts(uuid, (err, prodData) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.status(200).send(prodData);
    }
  });
});

app.listen(PORT, function() {
  console.log(`listening on port ${PORT}`);
});