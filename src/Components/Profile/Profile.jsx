import "./Style/Profile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus,
  faEnvelope,
  faUserXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { getId } from "../../Redux-TK/Slices/UserId";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

import {
  GetProfileData,
  GetUserPosts,
  addRecentView,
  addToWaitingList,
  check_connection,
  check_waiting_list,
  setUserProfileViews,
  unfriend_connection,
} from "../APIs/PostAPIs/APIs";
import MakePost from "../Home/HelpFunctionsForHome/MakePost";
import {
  getUserSkillsLanguagesAndEducationCVInformation,
  whatIsTheRuleOf,
} from "../APIs/RegistrationAPIs/RegistrationAPIs";
import { addToMessageList } from "../APIs/MessagingAPIS/messagesAPI";

export default function Profile(props) {
  const state = useSelector(getId);
  const [is_user_exist, set_is_user_exist] = useState(false);
  const [is_user_in_waiting, set_is_user_in_waiting] = useState(false);
  const [accoundData, setAccountData] = useState(props);
  const [displayAddButton, setDisplayAddButton] = useState("block");
  const [skillsAndLang, setSkillsAndLang] = useState({});

  const [isFriend, setIsFriend] = useState(false);
  const [showConnect, setShowConnect] = useState("none");

  // View Post, CV
  const [viewPost, setViewPost] = useState("block");
  const [viewCV, setViewCV] = useState("none");

  const [showSettings, setShowSettings] = useState("none");

  let { ID } = useParams();
  ID = ID - 1772002;

  const currect_user_id = localStorage.getItem("user_id");

  useEffect(() => {
    async function checkInFriend() {
      try {
        if (currect_user_id !== 0 && ID !== 0) {
          const res = await check_connection(currect_user_id, ID);
          setIsFriend(res);
          setShowConnect("block");
        }
      } catch (e) {}
    }
    checkInFriend();
  }, [ID, currect_user_id]);

  useEffect(() => {
    async function setUserSkilles() {
      const res = await getUserSkillsLanguagesAndEducationCVInformation(ID);
      setSkillsAndLang(res);
    }
    setUserSkilles();
  }, [ID]);

  useEffect(() => {
    async function findTheRule() {
      const res = await whatIsTheRuleOf(ID);
      if (res.rule === "university") {
        setDisplayAddButton("none");
      }
    }
    findTheRule();
  }, [ID]);

  useEffect(() => {
    setDisplayAddButton("block");
  }, [ID]);

  useEffect(() => {
    async function getAccount() {
      const data = await GetProfileData(ID);
      setAccountData(data);
    }
    getAccount();
  }, [ID]);

  // Store All Posts From API
  const [getPosts, setPosts] = useState([]);

  // Get Posts For The Current User From API
  useEffect(() => {
    async function getUserPosts() {
      if (ID !== 0) {
        const AllPosts = await GetUserPosts(ID);
        setPosts(AllPosts);
      }
    }
    getUserPosts();
  }, [state, ID]);

  useEffect(() => {
    if (
      +ID !== +currect_user_id &&
      !Number.isNaN(+ID) &&
      !Number.isNaN(+currect_user_id) &&
      ID !== 0 &&
      currect_user_id !== 0
    ) {
      setUserProfileViews(ID);
    }
    async function is_user_existing() {
      if (currect_user_id !== 0 && ID !== 0) {
        const result = await check_connection(currect_user_id, ID);
        const result2 = await check_waiting_list(currect_user_id, ID);

        set_is_user_exist(result);
        set_is_user_in_waiting(result2);
      }
    }
    is_user_existing();
  }, [ID, currect_user_id]);

  useEffect(() => {
    if (props.name !== null && +ID !== +currect_user_id) {
      addRecentView(currect_user_id, props.name);
    }
  }, [props.name, ID, currect_user_id]);

  if (ID === 0 || ID === undefined || ID === null) {
    return <p>Sorry this page dosen't exist</p>;
  }

  // The Intire Posts Component Of The Current User
  let postsList = [...getPosts].map((post, index) => {
    return (
      <MakePost
        key={post.id}
        user_id={ID + 1772002}
        name={accoundData.name}
        time={post.time}
        post_img={post.img}
        post_video={post.video}
        post_file={post.file}
        user_title={accoundData.title}
        post_content={post.post_content}
        post_id={post.id}
        user_img={accoundData.user_img}
        all_comments={post.comments}
      />
    );
  });
  let setLanguages,
    education,
    setSkills,
    setCV = "";

  try {
    setLanguages = skillsAndLang.lang.map((items, index) => {
      return (
        <div key={+index + +ID + 1002} className="language">
          {items}
        </div>
      );
    });
  } catch (err) {
    setLanguages = [];
  }

  try {
    setSkills = skillsAndLang.skills.map((items, index) => {
      return (
        <div key={+index + +ID + 1002} className="skill">
          {items}
        </div>
      );
    });
  } catch (err) {
    setSkills = [];
  }
  try {
    setCV = skillsAndLang.cv;
  } catch (err) {
    setSkills = [];
  }

  try {
    education = skillsAndLang.edu;
  } catch (err) {
    education = "";
  }

  const handleSendMessage = async () => {
    await addToMessageList(currect_user_id, ID);
  };

  return (
    <>
      <div className="profile-outer-container">
        <div className="profile-inner-container">
          {/* Start Profile Upper Section */}
          <div className="profile-upper-section">
            <div className="profile-bg-container">
              {accoundData.user_bg_img !== "" ? (
                <img src={accoundData.user_bg_img} alt="" />
              ) : (
                <img src="http://localhost:4500/images/signup-bg.jpg" alt="" />
              )}
            </div>
            <div className="profile-user-info">
              <div className="profile-user-img-container">
                {accoundData.user_img !== "" ? (
                  <img src={accoundData.user_img} alt="" />
                ) : (
                  <img src="http://localhost:4500/images/user.png" alt="" />
                )}
              </div>
              <div className="profile-user-name">{accoundData.name}</div>
              <div className="profile-user-about">{accoundData.title}</div>

              <div className="profile-spacer1"></div>
              {+currect_user_id !== +ID ? (
                <div className="profile-btns">
                  {!is_user_exist ? (
                    !is_user_in_waiting ? (
                      // isFriend

                      isFriend === false ? (
                        <>
                          <button
                            style={{ display: showConnect }}
                            onClick={() => {
                              console.log(currect_user_id);
                              addToWaitingList(ID, currect_user_id);
                            }}
                            className="profile-connect-btn"
                          >
                            <FontAwesomeIcon icon={faUserPlus} /> &#160; Connect
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => {
                              Swal.fire({
                                title:
                                  "Do you want to complete the deletion process?",
                                showClass: {
                                  popup: `
                            animate__animated
                            animate__fadeInUp
                            animate__faster
                          `,
                                },
                                hideClass: {
                                  popup: `
                            animate__animated
                            animate__fadeOutDown
                            animate__faster
                          `,
                                },
                              }).then((result) => {
                                if (result.isConfirmed) {
                                  Swal.fire({
                                    position: "center",
                                    icon: "success",
                                    title: `${props.name} has been deleted`,
                                    showConfirmButton: false,
                                    timer: 1500,
                                  });
                                  unfriend_connection(currect_user_id, ID);
                                  set_is_user_exist(false);
                                }
                              });
                            }}
                            className="profile-connect-btn"
                            style={{ backgroundColor: "red" }}
                          >
                            <FontAwesomeIcon icon={faUserXmark} /> &#160;
                            Unfriend
                          </button>
                        </>
                      )
                    ) : (
                      <button
                        onClick={() => {
                          toast.info(
                            `Hey there! Looks like ${props.name} wants to be your friend, but you're leaving them hanging!`,
                            {
                              position: "bottom-center",
                              autoClose: 5000,
                              hideProgressBar: false,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined,
                              theme: "dark",
                              toastStyle: {
                                background: "#333",
                                color: "#fff",
                                borderRadius: "8px",
                              },
                            }
                          );
                        }}
                        className="profile-connect-btn"
                        style={{
                          backgroundColor: "green",
                          width: "fit-content",
                        }}
                      >
                        Check Notifications
                      </button>
                    )
                  ) : (
                    <button
                      onClick={() => {
                        Swal.fire({
                          title:
                            "Do you want to complete the deletion process?",
                          showClass: {
                            popup: `
                            animate__animated
                            animate__fadeInUp
                            animate__faster
                          `,
                          },
                          hideClass: {
                            popup: `
                            animate__animated
                            animate__fadeOutDown
                            animate__faster
                          `,
                          },
                        }).then((result) => {
                          if (result.isConfirmed) {
                            Swal.fire({
                              position: "center",
                              icon: "success",
                              title: `${props.name} has been deleted`,
                              showConfirmButton: false,
                              timer: 1500,
                            });
                            unfriend_connection(currect_user_id, ID);
                            set_is_user_exist(false);
                          }
                        });
                      }}
                      className="profile-connect-btn"
                      style={{ backgroundColor: "red" }}
                    >
                      <FontAwesomeIcon icon={faUserXmark} /> &#160; Unfriend
                    </button>
                  )}

                  <div style={{ display: "flex" }}>
                    <Link to={"/chat"}>
                      <button
                        onClick={handleSendMessage}
                        className="profile-message-btn"
                      >
                        <FontAwesomeIcon icon={faEnvelope} />
                        &#160; Messages
                      </button>
                    </Link>
                  </div>

                  {+currect_user_id === +ID ? (
                    <Link to={`/setting/${ID}`}>
                      {/* // {" "} */}
                      <>
                        <button className="profile-setting-btn">
                          &#160; Settings ⚙️
                        </button>
                      </>
                    </Link>
                  ) : null}
                </div>
              ) : (
                <div
                  style={{ cursor: "pointer" }}
                  className="profile-user-replaced-buttons"
                >
                  <p>Profile views: {props.profile_views}</p>
                  <p>Rule: {props.rule}</p>
                  <p
                    onClick={() => {
                      if (showSettings === "none") setShowSettings("flex");
                      else setShowSettings("none");
                    }}
                  >
                    &#160; Settings ⚙️
                  </p>
                </div>
              )}
              <div
                style={{ display: showSettings }}
                className="settings-options"
              >
                <div className="options-inner-container">
                  <Link to={`/setting/${ID}`}>
                    <div>privacy</div>
                  </Link>
                  <Link to={`/setting-account/${ID}`}>
                    <div>account</div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {/*End Profile Upper Section */}

          <div></div>

          {/* Start Profile About Section */}
          <div className="profile-about-section">
            <h3>About</h3>
            <pre style={{ fontSize: "13px" }}>{accoundData.about}</pre>
          </div>
          {/* End Profile About Section */}

          {/* Start User Posts */}
          <div className="profile-posts-section">
            <h3
              onClick={() => {
                viewPost === "block"
                  ? setViewPost("none")
                  : setViewPost("block");
              }}
              style={{ cursor: "pointer" }}
            >
              Posts ↕️
            </h3>
            <div
              style={{ display: viewPost }}
              className="profile-posts-section-inner"
            >
              {postsList.reverse()}
            </div>
          </div>
          {/* End User Posts */}

          {/* Start Profile Education */}
          <div
            style={{ display: displayAddButton }}
            className="profile-education-section"
          >
            <h3 className="profile-education-title">Education</h3>
            <div className="profile-education-container">
              <div className="profile-education-body">
                <h5 style={{ display: "inline" }}>{education}</h5>
              </div>
            </div>
          </div>
          {/* End Profile Education */}

          {/* Start Profile CV */}
          <div
            style={{ display: displayAddButton }}
            className="profile-education-section"
          >
            <h3
              onClick={() => {
                viewCV === "inline" ? setViewCV("none") : setViewCV("inline");
              }}
              className="profile-education-title"
              style={{ cursor: "pointer" }}
            >
              CV ↕️
            </h3>
            <div
              style={{ display: viewCV }}
              className="profile-education-container"
            >
              <div className="profile-education-body">
                <h5 style={{ display: "inline" }}>
                  {setCV ? (
                    <iframe
                      src={setCV}
                      width="100%"
                      height="600px"
                      title="PDF Viewer"
                    >
                      <p>
                        Your browser does not support iframes. Please download
                        the PDF to view it:
                        <a href={setCV}>Download PDF</a>.
                      </p>
                    </iframe>
                  ) : null}
                </h5>
              </div>
            </div>
          </div>
          {/* End Profile CV */}

          {/* Start Profile Skills*/}
          <div
            style={{ display: displayAddButton }}
            className="profile-skills-section"
          >
            <h3>Skills</h3>
            <div className="skills-container">{setSkills}</div>
          </div>
          {/* End Profile Skills*/}

          {/* Start Profile Language*/}
          <div
            style={{ display: displayAddButton }}
            className="profile-language-section"
          >
            <h3>Language</h3>
            <div className="language-container">{setLanguages}</div>
          </div>
          {/* End Profile Language */}
        </div>
      </div>
    </>
  );
}
