const PORT = process.env.PORT || 5000;
const mongoose = require("mongoose");
const http = require("http");
const { loadPlanetsData } = require("./models/planets.model");
const app = require("./app.js");
const server = http.createServer(app);
const db_URI = "mongodb://127.0.0.1:27017/nasa";
const {loadLaunchData} = require('./models/launches.model');


mongoose.connection.once("open", () => {
  console.log("connection successful");
});
mongoose.connection.on("error", (error) => {
  console.log(error.message);
});

async function startServer() {
  await mongoose.connect(db_URI);
  await loadPlanetsData();
  await loadLaunchData();

  server.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`);
  });
}
startServer();
