import "../Style/MyApps.css";
import "./Style/ShowApplicant.css";
import Applicant from "./Applicant";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getUserInfoById,
  retrieveApplicants,
} from "../../APIs/RegistrationAPIs/RegistrationAPIs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboardCheck } from "@fortawesome/free-solid-svg-icons";

export default function ShowApps() {
  const { appId } = useParams();
  const { appTitle } = useParams();

  const university_id = localStorage.getItem("user_id");

  const [applicantsData, setApplicantsData] = useState([]);

  useEffect(() => {
    retrieveApplicants(university_id, appId).then((res) => {
      if (res) {
        getUserInfoById(res).then((userInfo) => {
          setApplicantsData(userInfo);
        });
      }
    });
  }, [appId, university_id]);

  const display = applicantsData.map((data, index) => {
    return (
      <Applicant
        key={index}
        name={data.name}
        title={data.title}
        appTitle={appTitle}
        img={data.img}
        bg_img={data.bg_img}
        email={data.email}
        // Teacher ID
        id={data.id}
        app_id={appId}
        university_id={university_id}
      />
    );
  });

  return (
    <div className="apps-section-outer-container">
      <div className="apps-section-inner-container">
        <Link to={"/approved-list"}>
          <button className="all-approved-app-section">
            <FontAwesomeIcon icon={faClipboardCheck} size="2x" color="white" />{" "}
            Approved List
          </button>
        </Link>
        <div className="show-apps-separator"></div>
        {display.length !== 0 ? display : "There are no applicants yet"}
      </div>
    </div>
  );
}
