const express = require("express");
const path = require("path");

const app = express();
// const port = 3000;
const port = 20000;

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname,"public")));

app.get("/", (req, res) => {
    res.render("index");
  });

app.get("/contact", (req, res) => {
    res.render("contact");
  });

app.get("/home", (req, res) => {
    res.render("index");
  });

app.get("/about", (req, res) => {
    res.render("about");
  });
/* app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "index.html"));
});

app.get("/contact", (req, res) => {
    res.sendFile(path.resolve(__dirname, "contact.html"));
  }); */

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});