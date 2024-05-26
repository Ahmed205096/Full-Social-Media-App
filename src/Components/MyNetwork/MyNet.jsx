import { useEffect, useState } from "react";
import Connection from "./Connection";
import { getSimilarUsers } from "../APIs/Recommender/Recommender";
import { Link } from "react-router-dom";
import { addToWaitingList } from "../APIs/PostAPIs/APIs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faConnectdevelop } from "@fortawesome/free-brands-svg-icons";
import { faInfo } from "@fortawesome/free-solid-svg-icons";

export default function MyNet(props) {
  const userId = localStorage.getItem("user_id");
  const [recommendationsId, SetrecommendationsId] = useState([]);

  useEffect(() => {
    getSimilarUsers(userId).then((res) => {
      SetrecommendationsId(res);
    });
  }, [userId]);

  const recommended_for_you = recommendationsId.map((user, index) => {
    if (index !== 0)
      return (
        <div className="network-section-connections" key={user.id}>
          <div className="network-section-bg-img">
            <img src="http://localhost:4500/images/signup-bg.jpg" alt="bg" />
          </div>
          <div className="network-section-all-user-data">
            <Link to={`/profile/${+user.id + 1772002}`}>
              <div className="network-section-profile-img">
                {user.img !== "" ? (
                  <img src={user.img} alt="bg" />
                ) : (
                  <img src="http://localhost:4500/images/user.png" alt="bg" />
                )}
              </div>
              <div className="network-section-user-name">{user.name}</div>
            </Link>
            <div className="network-section-user-info">
              {user.title} <p>{user.rule}</p>
            </div>
            <div className="network-section-follow-button">
              <button
                onClick={() => {
                  addToWaitingList(user.id, userId);
                }}
              >
                Connect{" "}
                <FontAwesomeIcon
                  icon={faConnectdevelop}
                  pulse={true}
                  color="gray"
                />
              </button>
            </div>
          </div>
        </div>
      );
  });

  return (
    <div className="networks-section-outer-container">
      <div className="networks-section-inner-container">
        <div
          style={{
            backgroundColor: "black",
            color: "white",
            borderRadius: "5px",
            fontSize: "15px",
            padding: "5px",
          }}
          className="recommendations-for-phones"
        >
          Recommended for you &#160;{" "}
          <span>
            <FontAwesomeIcon icon={faInfo} />
          </span>
        </div>
        <div className="networks-section-inner-container">
          <div className="networks-section-inner-container recommendations-for-phones">
            {recommended_for_you}
            <div className="end-network-recommendations"></div>
          </div>
          <Connection user_id={props.user_id} />
        </div>
      </div>
    </div>
  );
}
