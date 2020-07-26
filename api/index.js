const express = require("express");
const app = express();
const cors = require('cors');

app.use(cors());

const redis = require("redis");
const client = redis.createClient();

const { promisify } = require("util");
const getAsync = promisify(client.get).bind(client);

const port = 3001 || process.env.port;

app.get('/jobs',async(req,res)=>{

  const jobs = await getAsync('github');
  return res.send(jobs);
})

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
