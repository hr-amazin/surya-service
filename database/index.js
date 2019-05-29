const mongoose = require('mongoose');

const mongoUser = process.env.MONGO_USER;
const mongoPass = process.env.MONGO_PASS;

const connectionString = `mongodb+srv://${mongoUser}:${mongoPass}@fecamazin-msyg8.mongodb.net/fecamazin?retryWrites=true/`;

mongoose.connect(connectionString, {useNewUrlParser: true});

const connect = mongoose.connection;

connect.on('error', console.error.bind(console, 'mongo connection error'));
connect.once('open', () => {
  console.log('Connected to mongo db');
});

const getAllProducts = (callback) => {
  connect.db.collection('Carousel', (err, collection) => {
    collection.find().sort( {_id: 1} ).toArray(function(err, data) {
      if (err) {
        callback(err);
        console.log("Cant query for results", err);
      } else {
        callback(null, data);
      }
    });
  });
};

module.exports = {getAllProducts};