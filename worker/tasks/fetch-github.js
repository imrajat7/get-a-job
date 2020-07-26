var fetch = require("node-fetch");
const redis = require("redis");
const client = redis.createClient();

const { promisify } = require("util");
const setAsync = promisify(client.set).bind(client);

const baseUrl = "https://jobs.github.com/positions.json";

const fetchGithub = async () => {
  let resultCount = 1,
    onPage = 0,
    allJobs = [];

  // fetch all pages
  while (resultCount > 0) {
    const raw = await fetch(`${baseUrl}?page=${onPage}`);
    const jobs = await raw.json();
    allJobs.push(...jobs);
    resultCount = jobs.length;
    console.log("got ", jobs.length, " jobs");
    onPage++;
  }

  console.log("got " + allJobs.length + " jobs.");

  // filter algo

  const jrJobs = allJobs.filter((job) => {
    const jobTitle = job.title.toLowerCase();

    if (
      jobTitle.includes("senior") ||
      jobTitle.includes("manager") ||
      jobTitle.includes("sr.") ||
      jobTitle.includes("architect")
    ) {
      return false;
    } else {
      return true;
    }
  });

  console.log("filtered down to ", jrJobs.length);

  //set in redis
  const success = await setAsync("github", JSON.stringify(jrJobs));
  console.log(success);
};

module.exports = fetchGithub;
