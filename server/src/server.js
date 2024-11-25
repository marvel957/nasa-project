const PORT = process.env.PORT || 5000;
const { connectMongo } = require("./services/mongo.js");
const http = require("http");
const { loadPlanetsData } = require("./models/planets.model");
const app = require("./app.js");
const server = http.createServer(app);
// const {loadLaunchData} = require('./models/launches.model');

async function startServer() {
  await connectMongo();
  await loadPlanetsData();
  // await loadLaunchData();

  server.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`);
  });
}
startServer();
