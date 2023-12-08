const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(
    "mongodb+srv://cheekatisarath:Saketh1234@cluster0.vnp9m5r.mongodb.net/shop?retryWrites=true&w=majority"
  )
    .then((client) => {
      console.log("Connected to the Database Successfully");
      _db = client.db();
      callback();
    })
    .catch((error) => {
      console.log("Connected to the Database Failed", error.message);
      throw error;
    });
};

const getDB = () => {
  if (_db) return _db;
  throw "No Database Found!";
};

exports.mongoConnect = mongoConnect;
exports.getDB = getDB;
