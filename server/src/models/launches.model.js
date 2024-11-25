const launchesDb = require("./launches.mongo");
const planets = require("./planets.mongo");
const DEFAULT_FLIGHT_NUMBER = 100;

async function existsLaunchWithId(launchId) {
  return await launchesDb.findOne({ flightNumber: launchId });
}
async function saveLaunch(launch) {
  const planet = await planets.findOne({ keplerName: launch.target });
  if (!planet) {
    throw new Error("No matching planet was found");
  }
  await launchesDb.findOneAndUpdate(
    { flightNumber: launch.flightNumber },
    launch,
    {
      upsert: true,
    }
  );
}
// saveLaunch(launch);
// const SPACEX_API_URL = "https://api.spacexdata.com/v4/launches/query";

// load spaceX data
// async function loadLaunchesData() {
//   console.log("Downloading launch data...");
//   const response = await axios.post(SPACEX_API_URL, {
//     query: {},
//     options: {
//       populate: [
//         {
//           path: "rocket",
//           select: {
//             name: 1,
//           },

//         },
//         {
//           path: "payloads",
//           select: {
//             customers: 1,
//           },

//         },
//       ],
//     },
//   });
// }

async function getLatestFlightNumber() {
  const latestLaunch = await launchesDb.findOne().sort("-flightNumber");
  if (!latestLaunch) {
    return DEFAULT_FLIGHT_NUMBER;
  }
  return latestLaunch.flightNumber;
}

async function getAllLaunches() {
  return await launchesDb.find({}, { __id: 0, __v: 0 });
}

async function scheduleNewLaunch(launch) {
  const newFlightNumber = (await getLatestFlightNumber()) + 1;
  const newLaunch = Object.assign(launch, {
    flightNumber: newFlightNumber,
    customers: ["ZTM", "NASA"],
    upcoming: true,
    success: true,
  });

  await saveLaunch(newLaunch);
}

// function addNewLaunch(launch) {
//   latestFlightNumber++;
//   launches.set(
//     latestFlightNumber,
//     Object.assign(launch, {
//       flightNumber: latestFlightNumber,
//       customers: ["ZTM", "NASA"],
//       upcoming: true,
//       success: true,
//     })
//   );
// }
async function abortLaunchById(launchId) {
  const aborted = await launchesDb.updateOne(
    { flightNumber: launchId },
    { upcoming: false, success: false }
  );
  return aborted.modifiedCount === 1;
}

module.exports = {
  getAllLaunches,
  existsLaunchWithId,
  abortLaunchById,
  scheduleNewLaunch,
  // loadLaunchesData,
};
