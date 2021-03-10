const MongoClient = require('mongodb').MongoClient;

//mongodb提供了一个objectId的方法
const ObjectId = require('mongodb').ObjectId;

// Connection URL
const url = 'mongodb://127.0.0.1:27017';

// Database Name
const dbName = 'myproject';

module.exports = {

    find(collectionName, query, callback) {
        MongoClient.connect(url, { useNewUrlParser: true },function (err, client) {

            const db = client.db(dbName);

            const collection = db.collection(collectionName);

            collection.find(query).toArray(function (err, docs) {
                callback(docs);
                client.close();
            });
        });
    },
    insertOne(collectionName, query, callback) {
        MongoClient.connect(url,{ useNewUrlParser: true },function (err, client) {
            const db = client.db(dbName);

            const collection = db.collection(collectionName);

            collection.insertOne(query, function (err, result) {
                callback(result);
                client.close();
            });
        })
    },
    updateOne(collectionName, query, update, callback) {
        MongoClient.connect(url, { useNewUrlParser: true },function (err, client) {
            const db = client.db(dbName);

            const collection = db.collection(collectionName);

            collection.updateOne(query
                , { $set: update }, function (err, result) {
                    callback(result);
                    client.close();
                });
        })
    },
    deleteOne(collectionName,query,callback){
        MongoClient.connect(url, { useNewUrlParser: true },function (err, client) {
            const db = client.db(dbName);

            const collection = db.collection(collectionName);

            collection.deleteOne(query, function(err, result) {
              callback(result);
              client.close();
            });
        })
    },
    //暴露ObjectId
    ObjectId
}

