import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Home from "./Components/Home/Home";
import NavBar from "./Components/NavBar/NavBar";
import MyNetworks from "./Components/MyNetwork/MyNetwork";
import ProfileWithBar from "./Components/Profile/ProfileWithBar";
import JobsGeneral from "./Components/JobAppsApply/JobsGeneral";
import { useEffect, useState } from "react";
import Notifications from "./Components/NavBar/Notification";
import { toast } from "react-toastify";
import GeneralPage from "./Components/AddNewJob/GeneralPage";
import Login from "./Components/Registration/Login/Login";
import Signup from "./Components/Registration/Signup/Signup";
import ShowApps from "./Components/ShowApps/ShowApps";
import ShowApplicant from "./Components/ShowApps/ShowApplicant/ShowApplicant";
import ApprovedList from "./Components/ShowApps/ApprovedList/ApprovedList";
import Search from "./Components/Search/Search";
import ChatRoom from "./Components/ChatBot/Chat/ChatRoom";
import DisplayAppInformation from "./Components/DisplayAppInformation/DisplayAppInformation";
import SettingsPage from "./Components/SettingPage/SettingPage";
import ChatApp from "./Components/ChatBot/Messaging/ChatApp";
import SettingsPageAccount from "./Components/SettingPage/SettingPageAccount";

function App() {
  const location = useLocation();
  // 401966370405

  // const userID = 13;

  const userRule = localStorage.getItem("user_rule");

  // const teacher_data = TeacherData(userID);
  const [showWelcome, setWelcomeState] = useState(true);

  useEffect(() => {
    if (showWelcome) {
      toast.success("Academic Linkup.", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setWelcomeState(false);
    }
  }, [showWelcome]);

  try {
    const isLoginPage = location.pathname === "/";
    const isSignupPage = location.pathname === "/signup";

    if (isLoginPage || isSignupPage) {
      return (
        <div className="App">
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Login />} />
          </Routes>
        </div>
      );
    }
    return (
      <div className="App">
        <NavBar user_rule={userRule} />
        <div className="app-separator1" />
        <Routes>
          <Route path="/home/:ID" element={<Home />} />
          <Route path="/show-apps" element={<ShowApps />}></Route>
          <Route path="/approved-list" element={<ApprovedList />}></Route>
          <Route
            path="/show-applicant/:appId/:appTitle"
            element={<ShowApplicant />}
          ></Route>
          <Route path="/my-networks" element={<MyNetworks />} />
          <Route path="/my-connections" element={<MyNetworks />} />

          <Route path="/profile/:ID" element={<ProfileWithBar />} />

          <Route path="/search" element={<Search />}></Route>

          <Route path="/job-apps" element={<JobsGeneral />} />

          <Route
            path="/app-info/:UniversityId/:AppId"
            element={<DisplayAppInformation />}
          />

          <Route path="/chat" element={<ChatApp />} />
          <Route path="/chat-with-echo" element={<ChatRoom />} />

          <Route path="/setting/:ID" element={<SettingsPage />} />
          <Route
            path="/setting-account/:ID"
            element={<SettingsPageAccount />}
          />

          <Route path="/new-opportunity" element={<GeneralPage />} />
        </Routes>
        <Notifications />
        <div className="app-separator2" />
      </div>
    );
  } catch (e) {
    console.log(e);
  }
}

export default App;
