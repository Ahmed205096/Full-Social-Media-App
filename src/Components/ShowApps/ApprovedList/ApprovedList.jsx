import "../Style/MyApps.css";
import "../ShowApplicant/Style/ShowApplicant.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { DisplayAllApprovedTeachers } from "../../APIs/RegistrationAPIs/RegistrationAPIs";
import DisplayApplicant from "./DisplayApplicant";

export default function ApprovedList() {
  const { appId } = useParams();

  const university_id = localStorage.getItem("user_id");

  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    DisplayAllApprovedTeachers(university_id)
      .then((res) => {
        setUsersData(res);
      })
      .catch((e) => {});
  }, [university_id]);

  if (usersData) {
    const display = usersData.map((data, index) => {
      return (
        <DisplayApplicant
          key={index}
          name={data.name}
          title={data.title}
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
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
            className="show-apps-separator"
          >
            {display.length !== 0 ? display : "There are no applicants yet"}
          </div>
        </div>
      </div>
    );
  }
}
