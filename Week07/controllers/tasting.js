const Tasting = require("../models/Tasting");
const Country = require("../models/Country");
const Region = require("../models/Region");

/* exports.list = async (req, res) => {
  try {
    const tastings = await Tasting.find({});
    res.render("tastings", { tastings: tastings });
  } catch (e) {
    res.status(404).send({ message: "could not list tasting" });
  }
}; */

//Display list of tasting information in page form
exports.list = async (req, res) => {
  const perPage = 10;
  const limit = parseInt(req.query.limit) || 10; // Make sure to parse the limit to number
  const page = parseInt(req.query.page) || 1;



  try {
    const tastings = await Tasting.find({}).skip((perPage * page) - perPage).limit(limit);
    const count = await Tasting.find({}).count();
    const numberOfPages = Math.ceil(count / perPage);

    res.render("tastings", {
      tastings: tastings,
      numberOfPages: numberOfPages,
      currentPage: page
    });
  } catch (e) {
    res.status(404).send({ message: "could not list tastings" });
  }
};


exports.delete = async (req, res) => {
  const id = req.params.id;
  try {
    await Tasting.findByIdAndRemove(id);
    res.redirect("/tastings");
  } catch (e) {
    res.status(404).send({
      message: `could not delete  record ${id}.`,
    });
  }
};

exports.createView = async (req, res) => {
  try {
    const countries = await Country.find({});
    const regions = await Region.find({});
    res.render("create-tasting", {
      countries: countries,
      regions: regions,
      errors: {}
    });
    console.log("hello world")
  } catch (e) {
    res.status(404).send({
      message: `could not generate create data`,
    });
  }
};