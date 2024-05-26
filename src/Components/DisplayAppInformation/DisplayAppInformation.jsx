import { useEffect, useState } from "react";
import {
  applyForJob,
  getApplicationByUidAndUserIdAndAPPID,
} from "../APIs/RegistrationAPIs/RegistrationAPIs";
import "./Style/DisplayAppInformation.css";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faConnectdevelop } from "@fortawesome/free-brands-svg-icons";

export default function DisplayAppInformation() {
  const { UniversityId, AppId } = useParams();
  const [appInfo, setAppInfo] = useState({});

  const user_rule = localStorage.getItem("user_rule");

  useEffect(() => {
    async function getAppData() {
      const res = await getApplicationByUidAndUserIdAndAPPID(
        UniversityId,
        AppId
      );
      setAppInfo(res);
    }
    getAppData();
  }, [AppId, UniversityId]);

  console.log(appInfo);
  return (
    <div className="display-app-info-outer-container">
      <div className="display-app-info-inner-container">
        <div className="display-app-info-img-container">
          <Link to={`/profile/${+appInfo.university_id + 1772002}`}>
            <img src={appInfo.university_img} alt="" />
          </Link>
        </div>
        <div className="display-app-info-separate-content-from-image">
          <div className="display-app-info-content">
            <div className="display-app-info-content-title">
              <pre>
                <b>Title:</b> {appInfo.title}
              </pre>
            </div>
            <div className="display-app-info-content-description">
              <pre>
                <b>Description:</b> {appInfo.description}
              </pre>
            </div>

            <div className="display-app-info-content-requirements">
              <pre>
                <b>Requirements:</b> {appInfo.requirements}
              </pre>
            </div>
            <div className="display-app-info-content-department">
              <pre>
                <b>Department:</b> {appInfo.department}
              </pre>
            </div>

            <div className="display-app-info-content-deadline">
              <pre>
                <b>Deadline:</b> {appInfo.deadline}
              </pre>
            </div>
            {user_rule !== "university" ? (
              <div className="job-app-section-follow-button">
                <button
                  style={{ width: "100%", marginRight: "20px" }}
                  onClick={() => {
                    try {
                      // props.job_id, props.university_id, userID
                      applyForJob(
                        appInfo.app_id,
                        appInfo.university_id,
                        +localStorage.getItem("user_id")
                      );
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
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
