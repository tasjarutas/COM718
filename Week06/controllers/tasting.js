const Tasting = require("../models/Tasting");

exports.list = async (req, res) => {
  try {
    const tastings = await Tasting.find({});
    res.render("tastings", { tastings: tastings });
  } catch (e) {
    res.status(404).send({ message: "could not list tasting" });
  }
};

exports.delete = async (req, res) => {
  const id = req.params.id;
  try {
    await Taster.findByIdAndRemove(id);
    res.redirect("/tasting");
  } catch (e) {
    res.status(404).send({
      message: `could not delete  record ${id}.`,
    });
  }
};