import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faConnectdevelop } from "@fortawesome/free-brands-svg-icons";
import { applyForJob } from "../APIs/RegistrationAPIs/RegistrationAPIs";
import { Link } from "react-router-dom";

export default function JobsApply(props) {
  const userID = localStorage.getItem("user_id");

  return (
    <>
      <div className="job-app-section-connections">
        <div className="job-app-section-bg-img">
          <img src="/Assets/back.jpg" alt="" />
        </div>
        <div className="job-app-section-all-user-data">
          <div className="job-app-section-profile-img">
            <Link to={`/app-info/${props.university_id}/${props.job_id}`}>
              <img src={props.university_img} alt="" />
            </Link>
          </div>
          <Link to={`/app-info/${props.university_id}/${props.job_id}`}>
            <div className="job-app-section-user-name">
              {props.title.slice(0, 20)}
            </div>
          </Link>

          <div className="job-app-section-user-info">
            {props.description.slice(0, 130)}
          </div>
          <div className="job-app-section-follow-button">
            <button
              onClick={() => {
                try {
                  applyForJob(props.job_id, props.university_id, userID);
                } catch (err) {
                  console.log(err);
                }
              }}
            >
              Apply{" "}
              <FontAwesomeIcon
                icon={faConnectdevelop}
                pulse={true}
                color="gray"
              />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
