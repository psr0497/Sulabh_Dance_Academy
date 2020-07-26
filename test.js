var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/sulabh";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("sulabh");
  dbo.createCollection("customers", function(err, res) {
    if (err) throw err;
    console.log("Collection created!");
    db.close();
  });
});