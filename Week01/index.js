const http = require("http");
const server = http.createServer();
const MongoClient = require("mongodb").MongoClient;

const url = "mongodb://localhost:27017";
const dbName = "wineTasting";
const client = new MongoClient(url, { useNewUrlParser: true });

server.on("request", async (req, res) => {
  const { url, headers } = req;
  try {

      await client.connect();
      const db = client.db(dbName);
      const collection = db.collection('tastes');
      var cursor = collection.find({country:"Italy"});
      console.log(cursor);
      res.end("request ended");
  } catch (e) {
    console.log(e);
    res.end("could not request");
  }
});

server.listen(8080);