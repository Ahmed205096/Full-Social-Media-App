import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import {
  DeleteComment,
  getAllCommentsByUserIdAndPostId,
} from "../../APIs/PostAPIs/APIs";
import { useEffect, useState } from "react";
import { getUserInfoById } from "../../APIs/RegistrationAPIs/RegistrationAPIs";

export default function MakeComment(props) {
  const [comments, setComments] = useState(props.comment);
  const [deleteCommentAnimation, setDeletePostCommentAnimation] = useState("");
  const [deleteComment, setDeletePostComment] = useState("flex");
  const [userName, setUserName] = useState("");
  const [userImg, setUserImg] = useState("");

  useEffect(() => {
    async function fetchUserData() {
      const res = await getUserInfoById([+props.user_id_of_comment]);
      setUserImg(res[0].img);
      setUserName(res[0].name);
      return res;
    }
    fetchUserData();
  }, [props.user_id_of_comment]);


  useEffect(() => {
    try {
      async function getTheComments() {
        const res = await getAllCommentsByUserIdAndPostId(
          props.post_id.split("/")[0],
          props.post_id.split("/")[0]
        );
        return res;
      }

      getTheComments().then((result) => {
        if (result) {
          setComments(result.comments); // Assuming the API returns an array of comments
        }
      });
    } catch (e) {
      console.log(e);
    }
  }, [props.post_id]);

  const handleDeleteComment = async (commentId) => {
    setDeletePostCommentAnimation("DistroyComment");
    setDeletePostComment("none");
    console.log(props.post_id);
    setTimeout(async () => {
      try {
        await DeleteComment(
          props.post_id.split("/")[0],
          props.post_id.split("/")[1],
          commentId
        );
        const res = await getAllCommentsByUserIdAndPostId(
          props.post_id.split("/")[0],
          props.post_id.split("/")[0]
        );
        if (res) {
          setComments(res.comments); // Update comments after deletion
        }
      } catch (e) {
        console.log("error ", e);
      }
    }, 600);
  };

  return (
    <>
      <div
        style={{
          animationName: deleteCommentAnimation,
          display: deleteComment,
        }}
        className="comments-section-container"
      >
        <div className="comment">
          <span style={{width:"100%"}}>
            <div className="comment-user-img">
              <img src={userImg} alt="" />
            </div>
            <span  className="comment-user-info">
              <div className="comment-user-name">&#160;{userName}</div>
              <div className="comment-time">&#160;{props.time}</div>
            </span>
          </span>

          {+props.user_id_of_comment === +props.current_user_id ? (
            <FontAwesomeIcon
              style={{ cursor: "pointer" }}
              icon={faTrash}
              onClick={() => handleDeleteComment(props.comment_id)}
            />
          ) : null}
        </div>
        <div className="comment-body">{comments}</div>
      </div>
    </>
  );
}
