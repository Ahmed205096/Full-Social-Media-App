import "./Styles/LeftSection.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClockRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { getRecentView } from "../APIs/PostAPIs/APIs";
import { useSelector } from "react-redux";
import { getId } from "../../Redux-TK/Slices/UserId";
import { useEffect, useState } from "react";
export default function LeftSection(props) {
  const [recent, setRecent] = useState([]);
  const state = useSelector(getId);
  const userID = state.payload.userId;

  useEffect(() => {
    async function getRecent() {
      const recent_values = await getRecentView(userID);
      setRecent(recent_values);
    }
    getRecent();
  }, [userID]);

  const recent_result = recent.map((val) => {
    return (
      <p>
        <FontAwesomeIcon icon={faClockRotateLeft} color="blue" size="xs" />{" "}
        {val}
      </p>
    );
  });

  return (
    <div className="outer-left-section-container">
      <div className="inner-left-section-container">
        <div className="bg-left-section">
          {props.user_bg_img !== "" ? (
            <img src={props.user_bg_img} alt="bg" />
          ) : (
            <img src="http://localhost:4500/images/signup-bg.jpg" alt="bg" />
          )}
        </div>
        <Link to={`/profile/${parseInt(props.user_id) + 1772002}`}>
          <div className="left-section-user-img">
            {props.user_img !== "" ? (
              <img src={props.user_img} alt="bg" />
            ) : (
              <img src="http://localhost:4500/images/user.png" alt="bg" />
            )}
          </div>
        </Link>
        <div className="left-section-user-data">
          <Link
            style={{ color: "black" }}
            to={`/profile/${parseInt(props.user_id) + 1772002}`}
          >
            <div className="left-section-user-name">{props.name}</div>
          </Link>
          <div className="left-section-user-title">{props.title}</div>
          <div className="left-section-user-info">
            <div className="left-section-user-info-item">
              Rule <span>{props.rule}</span>
            </div>
            <div className="left-section-user-info-item">
              Your profile views <span>{props.profile_views}</span>
            </div>

            <div
              style={{ cursor: "pointer", width: "100%" }}
              className="left-section-user-info-item"
            >
              <Link
                style={{
                  width: "100%",
                  color: "#7A7878",
                  display: "flex",
                  justifyContent: "space-between",
                }}
                to={"/my-connections"}
              >
                {" "}
                Your connections <span> {props.connections}</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="left-section-separetor1"></div>
        <div className="left-section-my-items">
          <i className="fa fa-bookmark" style={{ color: "blue" }}></i> My items
        </div>
        <div className="left-section-separetor2"></div>
        <div className="left-section-recent">
          <span className="left-section-recent-value">Recent</span>
          <div>
            {recent_result.length !== 0 ? recent_result : "No results yet"}
          </div>
        </div>
      </div>
    </div>
  );
}
