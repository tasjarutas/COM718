const http = require("http");
const server = http.createServer();
const MongoClient = require("mongodb").MongoClient;

const url = "mongodb://localhost:27017";
const dbName = "wineTasting";
const client = new MongoClient(url, { useNewUrlParser: true });

server.on("request", async (req, res) => {
  const { url, headers } = req;
  try {
      const fs = require('fs');
      let rawdata = fs.readFileSync('wine-data.json');
      let winedata = JSON.parse(rawdata)
      //console.log(winedata)
    //   let winedata = JSON.parse(JSON.stringify(rawdata));
      await client.connect();
      const db = client.db(dbName);
      const collection = db.collection('tastes');
      await collection.insertMany(winedata);
      res.end("request ended");
  } catch (e) {
    console.log(e);
    res.end("could not update");
  }
});

server.listen(8080);