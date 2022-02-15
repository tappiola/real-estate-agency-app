const City = require("../models/city");

exports.getCities = async (req, res) => {
  const cities = await City.findAll();
  res.status(200).json(cities);
};
