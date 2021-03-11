require("dotenv").config();
const express = require("express");
const path = require("path");
const tasterController = require("./controllers/taster");
const tastingController = require("./controllers/tasting");
const app = express();

app.set("view engine", "ejs");

/**
 * notice above we are using dotenv. We can now pull the values from our environment
 */

const { WEB_PORT } = process.env;

app.use(express.static(path.join(__dirname, "public")));
var bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); 

app.get("/", (req, res) => {
  res.render("index");
});

//Create an error object
app.get("/create-taster", (req, res) => {
  res.render("create-taster", {errors: {}});
});
 
app.post("/create-taster", tasterController.create);

app.get("/tasters", tasterController.list);
app.get("/tasters/delete/:id", tasterController.delete);
app.get("/tasters/update/:id", tasterController.edit);
app.post("/tasters/update/:id", tasterController.update);

/* app.get("/tasters", (req, res) => {
  res.render("tasters");
}); */

app.get("/tastings", tastingController.list);

/*app.get("/create-taster",(req, res) => {
  res.render("create-taster");
});*/


app.listen(WEB_PORT, () => {
  console.log(`Example app listening at http://localhost:${WEB_PORT}`);
});


const mongoose = require("mongoose");
const {MONGODB_URI } = process.env;
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

mongoose.connection.on("error", (err) => {
  console.error(err);
  console.log(
    "MongoDB connection error. Please make sure MongoDB is running.",
  );
  process.exit();
});
