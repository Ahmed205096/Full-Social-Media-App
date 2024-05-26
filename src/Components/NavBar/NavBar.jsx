/* eslint-disable jsx-a11y/anchor-is-valid */
import "./NavBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faGlobe,
  faEnvelope,
  faBell,
  faMagnifyingGlass,
  faBriefcase,
} from "@fortawesome/free-solid-svg-icons";
import Notifications from "./Notification";
import { Link } from "react-router-dom";
import { createContext, useState } from "react";
import TeacherData from "../../InitializeData/Teachers";

export const MyContext = createContext();

export default function NavBar() {
  const [showNotificaation, setShowNotification] = useState("hidden");
  const [itemsColor, setItemsColor] = useState({
    home: "gold",
    net: "white",
    job: "white",
    message: "white",
    noti: "white",
    search: "white",
  });

  const userID = localStorage.getItem("user_id");

  const teacher_data = TeacherData(userID);

  let got_to_job_app_page = "/job-apps";

  if (teacher_data.rule === "university") {
    got_to_job_app_page = "/new-opportunity";
  }

  const user_rule = teacher_data.rule;

  return (
    <MyContext.Provider value={showNotificaation}>
      <div className="nav-outer-container">
        <div className="nav-inner-container">
          <div className="nav-logo-container">
            <img src="/Assets/logo.png" alt="logo" className="nav-logo" />
          </div>
          <div className="nav-links-container">
            <Link
              onClick={() => {
                setItemsColor({
                  home: "gold",
                  net: "white",
                  job: "white",
                  message: "white",
                  noti: "white",
                  search: "white",
                });
              }}
              style={{ color: itemsColor.home }}
              className="nav-home"
              to={`/home/${parseInt(userID) + 1772002}`}
            >
              <FontAwesomeIcon icon={faHome} />
              <span className="nav-items-name"> Home</span>
            </Link>
            <Link
              onClick={() => {
                setItemsColor({
                  home: "white",
                  net: "gold",
                  job: "white",
                  message: "white",
                  noti: "white",
                  search: "white",
                });
              }}
              style={{ color: itemsColor.net }}
              className="nav-network"
              to="/my-networks"
            >
              <FontAwesomeIcon icon={faGlobe} />
              <span className="nav-items-name"> My Network</span>
            </Link>

            {user_rule !== "student" ? (
              <Link
                to={got_to_job_app_page}
                onClick={() => {
                  setItemsColor({
                    home: "white",
                    net: "white",
                    job: "gold",
                    message: "white",
                    noti: "white",
                    search: "white",
                  });
                }}
                style={{ color: itemsColor.job }}
                className="nav-message"
              >
                <FontAwesomeIcon icon={faBriefcase} />
                <span className="nav-items-name"> Job Apps</span>
              </Link>
            ) : null}

            <Link
              to={"/chat"}
              onClick={() => {
                setItemsColor({
                  home: "white",
                  net: "white",
                  job: "white",
                  message: "gold",
                  noti: "white",
                  search: "white",
                });
              }}
              style={{ color: itemsColor.message }}
              className="nav-message"
            >
              <FontAwesomeIcon icon={faEnvelope} />
              <span className="nav-items-name"> Messaging</span>
            </Link>

            <Link
              onClick={() => {
                if (showNotificaation === "visible") {
                  setShowNotification("hidden");
                } else {
                  setShowNotification("visible");
                }
              }}
              style={{ cursor: "pointer", color: "white" }}
              className="nav-notification"
            >
              <FontAwesomeIcon icon={faBell} />
              <span className="nav-items-name"> Notification</span>
            </Link>

            <Link
              to={"/search"}
              onClick={() => {
                setItemsColor({
                  home: "white",
                  net: "white",
                  job: "white",
                  message: "white",
                  noti: "white",
                  search: "gold",
                });
              }}
              style={{ color: itemsColor.search }}
              className="nav-search"
              href="/resume"
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} />
              <span className="nav-items-name"> Search</span>
            </Link>
          </div>
          <div className="nav-user-img-container">
            <Link to={`/profile/${parseInt(userID) + 1772002}`}>
              {teacher_data.user_img !== "" ? (
                <img src={teacher_data.user_img} alt="" />
              ) : (
                <img src="http://localhost:4500/images/user.png" alt="" />
              )}
            </Link>
          </div>
        </div>
      </div>
      <Notifications />
    </MyContext.Provider>
  );
}
