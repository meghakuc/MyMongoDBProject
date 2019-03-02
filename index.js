const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'MyMongoDBProject';

// Use connect method to connect to the server
MongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);

  insertDocuments(db, function() {
    findDocuments(db, function() {
		updateDocument(db, function() {
			findDocuments(db, function() {
				removeDocument(db, function() {
					findDocuments(db, function() {
						client.close();
					});
				});
			});
		});
    });
  });
});

const insertDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('documents');
  // Insert some documents
  collection.insertMany([
{ "place" : "MongoTree", "type": "resort", "cost" : { "actual_cost" : 1200, "discount_cost": 999}, "Itinerary" : { "welcome_drinks" :" yes", "breakfast" : ["egg", " bread", "jam", "south breakfast", "coffee/tea"], "games": ["table tennis", "foot ball", "dart games"], "watergames": "yes" } },
{ "place": "Mysore", "type": "tour", "cost": {"actual_cost": 5999, "discount_cost": 4999}, "Itinerary": { "Day 1": [ "sightseeing, zoo", "mysore palace"], "Day 2": ["chamundeshwari hills", "KRS dam", "brundhavan gardens"] } }  
  ], function(err, result) {
    assert.equal(err, null);
    assert.equal(2, result.result.n);
    assert.equal(2, result.ops.length);
    console.log("Inserted documents into the collection");
    callback(result);
  });
}

const findDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('documents');
  // Find some documents
  collection.find({}).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(docs)
    callback(docs);
  });
}

const updateDocument = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('documents');
  // Update document where actual_cost is 1200, set actual_cost equal to 1500
  collection.updateOne({ "place" : "MongoTree", "type": "resort", "cost" : { "actual_cost" : 1200, "discount_cost": 999}, "Itinerary" : { "welcome_drinks" :" yes", "breakfast" : ["egg", " bread", "jam", "south breakfast", "coffee/tea"], "games": ["table tennis", "foot ball", "dart games"], "watergames": "yes" } }
    , { $set: { "place" : "MongoTree", "type": "resort", "cost" : { "actual_cost" : 1500, "discount_cost": 999}, "Itinerary" : { "welcome_drinks" :" yes", "breakfast" : ["egg", " bread", "jam", "south breakfast", "coffee/tea"], "games": ["table tennis", "foot ball", "dart games"], "watergames": "yes" } } }, function(err, result) {
    assert.equal(err, null);
    console.log("Updated the document with the field actual_cost : 1200 to actual_cost : 1500");
    callback(result);
  });
}

const removeDocument = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('documents');
  // Delete document where games values are table tennis, foot ball, dart games. Since we have updated actual_cost: 1500, so we are giving actual_cost: 1500
  collection.deleteOne({ "place" : "MongoTree", "type": "resort", "cost" : { "actual_cost" : 1500, "discount_cost": 999}, "Itinerary" : { "welcome_drinks" :" yes", "breakfast" : ["egg", " bread", "jam", "south breakfast", "coffee/tea"], "games": ["table tennis", "foot ball", "dart games"], "watergames": "yes" } }, function(err, result) {
    assert.equal(err, null);
    console.log("Removed the document with the field games values are table tennis, foot ball, dart games");
    callback(result);
  });
}