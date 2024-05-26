import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import {
  approveTeacherFromApp,
  removeTeacherFromApp,
} from "../../APIs/RegistrationAPIs/RegistrationAPIs";
import { sendMessage } from "../../APIs/MessagingAPIS/messagesAPI";

export default function Applicant(props) {
  const handleDeleteTeacher = () => {
    removeTeacherFromApp(props.university_id, props.app_id, props.id);
    setTimeout(() => {
      window.location.reload();
    }, 700);
  };

  const sendMessageFromTo = async () => {
    await sendMessage(
      props.university_id,
      props.id,
      "you",
      "",
      `You are accepted in our application ${props.appTitle}`
    );
  };

  const handleSendMessage = async () => {
    await sendMessageFromTo();
  };

  const handleAproveTeacher = () => {
    approveTeacherFromApp(props.university_id, props.app_id, props.id);
    // Send the approved message
    handleSendMessage();
    setTimeout(() => {
      window.location.reload();
    }, 700);
  };

  return (
    <div className="apps-section-connections">
      <div className="apps-section-bg-img">
        <img src={props.bg_img} alt="" />
      </div>
      <div className="apps-section-all-user-data">
        <div className="apps-section-profile-img">
          <Link to={`/profile/${+props.id + 1772002}`}>
            <img style={{ cursor: "pointer" }} src={props.img} alt="" />
          </Link>
        </div>
        <Link to={`/profile/${+props.id + 1772002}`}>
          <div style={{ cursor: "pointer" }} className="apps-section-user-name">
            {props.name.slice(0, 20)}
            <p className="show-email-in-apps-section">Email: {props.email}</p>
          </div>
        </Link>

        <div className="apps-section-user-info goto-up-from-app-section">
          {props.title.slice(0, 60)} ...
        </div>
        <div
          style={{ display: "flex" }}
          className="applicant-section-follow-button apps-section-follow-button"
        >
          <button onClick={handleDeleteTeacher}>
            Delete <FontAwesomeIcon icon={faTrash} color="gray" />
          </button>
          <button onClick={handleAproveTeacher}>
            Approve <FontAwesomeIcon icon={faCircleCheck} color="gray" />
          </button>
        </div>
      </div>
    </div>
  );
}
