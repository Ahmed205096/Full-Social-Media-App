import { useEffect, useState } from "react";
import LeftSection from "./LeftSection";
import MidSection from "./MiddelSection";
import RightSection from "./RightSection";
import { getAllUserInfo } from "../APIs/PostAPIs/APIs";
import TeacherData from "../../InitializeData/Teachers";
import { useDispatch } from "react-redux";
import { setId } from "../../Redux-TK/Slices/UserId";
import { setUserInfo } from "../../Redux-TK/Slices/CurrentUserInfo";
import { useParams } from "react-router-dom";

export default function Home() {
  const [userData, setUserData] = useState();

  const { ID } = useParams();

  const userId = localStorage.getItem("user_id");
  const teacher_data = TeacherData(userId);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setId(userId));
    dispatch(
      setUserInfo({
        id: teacher_data.id,
        name: teacher_data.name,
        img: teacher_data.user_img,
      })
    );
  }, [
    dispatch,
    teacher_data.id,
    teacher_data.name,
    teacher_data.user_img,
    userId,
  ]);

  useEffect(() => {
    if (userId !== undefined) {
      async function getUserData() {
        const user_data = await getAllUserInfo(userId);
        setUserData(user_data);
      }
      getUserData();
    }
  }, [userId]);

  try {
    if (Number.isNaN(+ID)) return <p>Sorry this page dose'nt exists.</p>;
    else
      return (
        <div className="app-home">
          <LeftSection
            user_bg_img={teacher_data.user_bg_img}
            user_img={teacher_data.user_img}
            name={teacher_data.name}
            title={teacher_data.title}
            rule={teacher_data.rule}
            profile_views={teacher_data.profile_views}
            post_views={teacher_data.post_views}
            connections={
              userData !== undefined ? userData.friend_list.length : 0
            }
            user_id={userId}
          />

          <MidSection
            user_bg_img={teacher_data.user_bg_img}
            user_img={teacher_data.user_img}
            name={teacher_data.name}
            title={teacher_data.title}
          />

          <RightSection />
        </div>
      );
  } catch (e) {}
}
