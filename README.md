This project covers first question:

Question 1 Create a collection in which one field has a variable sub-fields in size and key values. Operations to save , retrieve and update the document.( using native mongodb driver / mongoose/ any other module of your convenience) Example the documents will be the following way: 

{ "place" : "MongoTree", "type": "resort", "cost" : { "actual_cost" : 1200, "discount_cost": 999}, "Itinerary" : { "welcome_drinks" :" yes", "breakfast" : ["egg", " bread", "jam", "south breakfast", "coffee/tea"], "games": ["table tennis", "foot ball", "dart games"], "watergames": "yes" } },
{ "place": "Mysore", "type": "tour", "cost": {"actual_cost": 5999, "discount_cost": 4999}, "Itinerary": { "Day 1": [ "sightseeing, zoo", "mysore palace"], "Day 2": ["chamundeshwari hills", "KRS dam", "brundhavan gardens"] } }

Running the Application

1. Install Node.js

2. Install Mongodb server

3. Go to "MyMongoDBProject" folder from the Node.js command prompt.

4. Run "npm install" to install app dependencies

5. Run "npm install mongodb --save" to install the mongodb driver dependency

6. Run "node index.js" to start the application. Output will display in Node.js command prompt.
