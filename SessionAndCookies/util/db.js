const mongodb = require("mongodb");
let _db;

const mongoConnect = (callback) => {
  const MongoClient = mongodb.MongoClient;
  MongoClient.connect(
    // "mongodb+srv://nodeg:nodeg@mongoatlascluster-4ebqp.gcp.mongodb.net/shop?retryWrites=true&w=majority",
    "mongodb://nodeg:<nodeg>@mongoatlascluster-shard-00-00-4ebqp.gcp.mongodb.net:27017,mongoatlascluster-shard-00-01-4ebqp.gcp.mongodb.net:27017,mongoatlascluster-shard-00-02-4ebqp.gcp.mongodb.net:27017/shop?ssl=true&replicaSet=MongoAtlasCluster-shard-0&authSource=admin&retryWrites=true&w=majority",

    { useUnifiedTopology: true }
  )
    .then((client) => {
      console.log("Connected to MongoDB ! :) ");
      _db = client.db();

      callback();
    })
    .catch((err) => {
      console.log(err);
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "No db found !!!";
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
