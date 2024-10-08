const { getAllPlanets } = require("../../models/planets.model");

const httpGetAllPlanets = async (req, res) => {
  return res.json(await getAllPlanets());
};

module.exports = httpGetAllPlanets;
