import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import {
  deleteUniversityApp,
  showTost,
} from "../APIs/RegistrationAPIs/RegistrationAPIs";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Apps(props) {
  const [deleteApp, setDeleteApp] = useState(false);

  const handleDeleteApp = async () => {
    const delete_return = await deleteUniversityApp(props.id, props.app_id);
    setDeleteApp(delete_return);
  };

  useEffect(() => {
    if (deleteApp) {
      showTost("App Deleted");
      setTimeout(() => {
        window.location.reload();
      }, 700);
    }
  }, [deleteApp]);

  return (
    <div className="apps-section-connections">
      <div className="apps-section-bg-img">
        <img src="Assets/universities_bg.jpg" alt="" />
      </div>
      <div className="apps-section-all-user-data">
        <div className="apps-section-profile-img">
          <Link to={`/show-applicant/${props.app_id}/${props.title}`}>
            <img style={{ cursor: "pointer" }} src={props.img} alt="" />
          </Link>
        </div>
        <Link to={`/show-applicant/${props.app_id}/${props.title}`}>
          <div style={{ cursor: "pointer" }} className="apps-section-user-name">
            {props.title.slice(0, 35)}
          </div>
        </Link>

        <div className="apps-section-user-info">
          {props.description.slice(0, 100)}
        </div>
        <div className="apps-section-follow-button">
          <button onClick={handleDeleteApp}>
            Delete <FontAwesomeIcon icon={faTrash} color="gray" />
          </button>
        </div>
      </div>
    </div>
  );
}
