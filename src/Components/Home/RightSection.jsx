import "./Styles/RightSection.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo } from "@fortawesome/free-solid-svg-icons";
import {
  getSimilarJobs,
  getSimilarUsers,
} from "../APIs/Recommender/Recommender";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function RightSection() {
  const userId = localStorage.getItem("user_id");
  const [recommendationsId, SetrecommendationsId] = useState([]);
  const [josRecommendationsId, SetjobsrecommendationsId] = useState([]);

  const user_rule = localStorage.getItem("user_rule");

  useEffect(() => {
    getSimilarUsers(userId).then((res) => {
      SetrecommendationsId(res);
    });
    getSimilarJobs().then((res) => {
      SetjobsrecommendationsId(res);
    });
  }, [userId]);

  const recommendationResults = recommendationsId.map((user, index) => {
    if (index !== 0)
      return (
        <div className="right-section-recommended-person">
          <span>
            <img style={{ borderRadius: "50%" }} src={user.img} alt="" /> &#160;{" "}
            {user.name}
          </span>
          {/* عشان السليكتور ميغيرش لون الزرار لانه يعتبر زوجي الرقم */}
          <p></p>
          <Link to={`/profile/${+user.id + 1772002}`}>
            {" "}
            <button>Show</button>
          </Link>
        </div>
      );
  });

  const jobRecommendationResults = josRecommendationsId.map((user, index) => {
    if (index <= 4)
      return (
        <div className="right-section-recommended-person">
          <span>
            <img
              style={{ borderRadius: "50%" }}
              src={user.university_img}
              alt=""
            />{" "}
            &#160; {user.title}
          </span>
          <p></p>
          <Link to={`/app-info/${user.university_id}/${user.app_id}`}>
            {" "}
            <button>Show</button>
          </Link>
        </div>
      );
  });

  return (
    <div className="right-section-outer-container">
      <div className="right-section-inner-container">
        <div className="right-section-title">
          Recommended for you &#160;
          <span>
            <FontAwesomeIcon icon={faInfo} />
          </span>
        </div>

        <div className="right-section-separator1" />
        <div className="right-section-recommendation-list">
          {recommendationResults}
        </div>
        <div className="right-section-separator2" />
        {user_rule === "student" ? (
          <div className="right-section-ad">
            <div className="right-section-ad-title">
              Ad &middot;&middot;&middot;
            </div>
            <p className="right-section-ad-content">
              Welcome, dear male and female students, to the Academic Linkup
              website, which aims to make your university life easier by
              facilitating communication with beautiful members of the academic
              community.
            </p>
            <div className="right-section-ad-image">
              <img src="/Assets/logo.png" alt="" />
            </div>
            <div className="right-section-btn-ad">
              {/* <button>Learn More</button> */}
            </div>
          </div>
        ) : (
          <>
            <div className="right-section-job-recommendation-title">
              {user_rule !== "university" ? (
                <p>Job Recommendations</p>
              ) : (
                <p>Top Job News</p>
              )}
            </div>
            <div className="right-section-recommendation-list">
              {jobRecommendationResults}
            </div>
          </>
        )}

        <div className="right-section-end-of-recommendations"></div>
      </div>
    </div>
  );
}
