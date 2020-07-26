import React, { useState, useEffect } from "react";
import "./App.css";

import Jobs from "./Jobs";

const JOB_API_URL = "http://localhost:3001/jobs";

const fetchJobs = async (cb_update) => {
  const raw = await fetch(JOB_API_URL);
  const result = await raw.json();

  cb_update(result);
};

function App() {
  const [jobList, setJobList] = useState([]);

  useEffect(() => {
    fetchJobs(setJobList);
  }, []);

  console.log(jobList);

  return (
    <div className="App">
      <Jobs jobs={jobList} />
    </div>
  );
}

export default App;
