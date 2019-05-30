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

const getAllProducts = (uuid, callback) => {
  connect.db.collection('Carousel', (err, collection) => {
    collection.findOne({_id: uuid},function(err, product) {
      if (err) {
        console.log("Cant query for uuid", err);
      } else {
        collection.find({type: product.type}).sort({_id: 1}).toArray(function(err, data) {
          if (err) {
            console.log("Cant query for uuid", err);
            callback(err);
          } else {
            callback(err, data);
          }
        });
      }
    });
  });
};

module.exports = {getAllProducts};