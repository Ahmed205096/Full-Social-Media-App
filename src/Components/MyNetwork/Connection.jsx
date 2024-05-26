import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faConnectdevelop } from "@fortawesome/free-brands-svg-icons";
import { useEffect, useState } from "react";
import {
  GetNetworks,
  addToWaitingList,
  unfriend_connection,
} from "../APIs/PostAPIs/APIs";
import { Link, useLocation } from "react-router-dom";
import { getFriendList } from "../APIs/GetFriendsAPI/getFriend";

export default function Connection(props) {
  const [net, setNet] = useState([]);
  const [friendList, setFriendList] = useState([]);
  const location = useLocation();

  useEffect(() => {
    async function fetchData() {
      const networks = await GetNetworks(+props.user_id);
      setNet(networks);
    }
    fetchData();
  }, [props.user_id]);

  // Get the firends only
  useEffect(() => {
    async function getFirends() {
      if (!Number.isNaN(+props.user_id)) {
        const res = await getFriendList(+props.user_id);
        setFriendList(res);
      }
    }
    getFirends();
  }, [props.user_id]);

  if (location.pathname === "/my-networks") {
    return (
      <>
        {net.map((user) => {
          if (!user.isConnected && !user.isWaiting) {
            return (
              <div className="network-section-connections" key={user.id}>
                <div className="network-section-bg-img">
                  {user.user_bg_img !== "" ? (
                    <img src={user.user_bg_img} alt="bg" />
                  ) : (
                    <img
                      src="http://localhost:4500/images/signup-bg.jpg"
                      alt="bg"
                    />
                  )}
                </div>
                <div className="network-section-all-user-data">
                  <Link to={`/profile/${+user.id + 1772002}`}>
                    <div className="network-section-profile-img">
                      {user.user_img !== "" ? (
                        <img src={user.user_img} alt="bg" />
                      ) : (
                        <img
                          src="http://localhost:4500/images/user.png"
                          alt="bg"
                        />
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
                        addToWaitingList(user.id, props.user_id);
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
          } else {
            return null;
          }
        })}
      </>
    );
  } else if (location.pathname === "/my-connections") {
    if (friendList.length > 0) {
      return (
        <>
          {friendList.map((user) => {
            return (
              <div className="network-section-connections" key={user.id}>
                <div className="network-section-bg-img">
                  <img src="Assets/signup-bg.jpg" alt="" />
                </div>
                <div className="network-section-all-user-data">
                  <Link to={`/profile/${+user.id + 1772002}`}>
                    <div className="network-section-profile-img">
                      <img src={user.img} alt="" />
                    </div>
                    <div className="network-section-user-name">{user.name}</div>
                  </Link>
                  <div className="network-section-user-info">
                    {user.title} <p>{user.rule}</p>
                  </div>
                  <div className="network-section-follow-button">
                    <button
                      onClick={() => {
                        unfriend_connection(user.id, props.user_id);
                      }}
                    >
                      Unfriend{" "}
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
          })}
        </>
      );
    } else {
      return (
        <div className="no-connections">
          <p>You don't have any connections yet.</p>
        </div>
      );
    }
  }
}
