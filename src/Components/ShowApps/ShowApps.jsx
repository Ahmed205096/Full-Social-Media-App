import { useEffect, useState } from "react";
import Apps from "./Apps";
import "./Style/MyApps.css";
import { getSingleUniversityApps } from "../APIs/RegistrationAPIs/RegistrationAPIs";

export default function ShowApps() {
  const [apps, setApps] = useState([]);

  const universityId = localStorage.getItem("user_id");

  useEffect(() => {
    getSingleUniversityApps(universityId).then((res) => {
      setApps(res);
    });
  }, [universityId]);

  if (apps) {
    const dislpayResult = apps.map((data, index) => {
      return (
        <Apps
          key={index}
          img={data.university_img}
          title={data.title}
          description={data.description}
          id={data.university_id}
          app_id={data.app_id}
        />
      );
    });

    return (
      <div className="apps-section-outer-container">
        <div className="apps-section-inner-container"> {dislpayResult} </div>
      </div>
    );
  }
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <h4>There are no Applications for now</h4>
    </div>
  );
}
