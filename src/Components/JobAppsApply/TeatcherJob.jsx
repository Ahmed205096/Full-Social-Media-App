import { useEffect, useState } from "react";
import JobsApply from "./JobsApply";
import { getAllJobApps } from "../APIs/RegistrationAPIs/RegistrationAPIs";
import { getSimilarJobs } from "../APIs/Recommender/Recommender";

export default function TeatcherJob() {
  const [jobs, setJops] = useState([]);
  const [josRecommendationsId, SetjobsrecommendationsId] = useState([]);

  useEffect(() => {
    async function FindAllJops() {
      const jobs = await getAllJobApps();
      setJops(jobs);
    }
    FindAllJops();
    getSimilarJobs().then((res) => {
      SetjobsrecommendationsId(res);
    });
  }, []);

  const displatJops = jobs.map((jobs) => {
    return jobs.map((job) => {
      return (
        <JobsApply
          university_img={job.university_img}
          title={job.title}
          description={job.description}
          university_id={job.university_id}
          job_id={job.app_id}
        />
      );
    });
  });

  const displayRecommendedJops = josRecommendationsId.map((job) => {
    return (
      <JobsApply
        university_img={job.university_img}
        title={job.title}
        description={job.description}
        university_id={job.university_id}
        job_id={job.app_id}
      />
    );
  });

  return (
    <div className="job-app-section-outer-container">
      <div
        className="job-app-section-inner-recommendation-title"
        style={{ width: "100%", justifyContent: "center" }}
      >
        <p
          style={{
            backgroundColor: "black",
            color: "white",
            borderRadius: "5px",
            padding: "5px",
          }}
        >
          Recommended
        </p>
      </div>
      <div className="job-app-section-inner-container job-app-section-inner-recommendation ">
        {displayRecommendedJops}
      </div>
      <div className="job-app-section-end-of-recommendations"></div>
      <div
        className="job-app-section-inner-recommendation-title"
        style={{ width: "100%", justifyContent: "center" }}
      >
        <p
          style={{
            backgroundColor: "black",
            color: "white",
            borderRadius: "5px",
            padding: "5px",
          }}
        >
          All Jobs
        </p>
      </div>
      <div className="job-app-section-inner-container">{displatJops}</div>
    </div>
  );
}
