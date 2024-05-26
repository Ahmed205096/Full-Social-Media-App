import { Link } from "react-router-dom";

export default function DisplayApplicant(props) {
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
            {props.name.slice(0, 30)}
            <p className="show-email-in-apps-section">Email: {props.email}</p>
          </div>
        </Link>

        <div className="apps-section-user-info goto-up-from-app-section">
          {props.title.slice(0, 120)} ...
        </div>
      </div>
    </div>
  );
}
