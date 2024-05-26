import LeftSection from "../Home/LeftSection";
import TeatcherJob from "./TeatcherJob";
import "./Style/JobAppsApply.css";
import { useEffect, useState } from "react";
import { getAllUserInfo } from "../APIs/PostAPIs/APIs";
import TeacherData from "../../InitializeData/Teachers";

export default function JobsGeneral() {
  const [userData, setUserData] = useState();

  const userId = localStorage.getItem("user_id");

  const teacher_data = TeacherData(userId);

  useEffect(() => {
    if (userId !== undefined) {
      async function getUserData() {
        const user_data = await getAllUserInfo(userId);
        setUserData(user_data);
      }
      getUserData();
    }
  }, [userId]);
  return (
    <div className="app-home">
      <LeftSection
        user_bg_img={teacher_data.user_bg_img}
        user_img={teacher_data.user_img}
        name={teacher_data.name}
        title={teacher_data.title}
        profile_views={teacher_data.profile_views}
        post_views={teacher_data.post_views}
        connections={userData !== undefined ? userData.friend_list.length : 0}
        user_id={userId}
      />

      <TeatcherJob />
    </div>
  );
}
