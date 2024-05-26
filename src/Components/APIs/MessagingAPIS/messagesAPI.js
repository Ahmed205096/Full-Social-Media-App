import axios from "axios";
import { getUserInfoByID } from "../PostAPIs/APIs";

export async function sendMessage(
  senderId,
  receiverId,
  sender,
  receiver,
  message
) {
  axios
    .post("http://localhost:5300/api/messages", {
      senderId,
      receiverId,
      message,
      status: "non-set",
    })
    .catch((error) => {
      console.error(error);
    });
}

export async function getMessageBetween(senderId, receiverId) {
  try {
    if (
      !Number.isNaN(+senderId) &&
      +senderId !== 0 &&
      +receiverId !== 0 &&
      !Number.isNaN(+receiverId)
    ) {
      const res = await axios.get(
        `http://localhost:5300/api/messages/${senderId}/${receiverId}`
      );

      console.log(res.data);

      return res.data;
    }
  } catch (e) {}
}

export async function addToMessageList(user_id, message_with_id) {
  axios
    .post("http://localhost:5400/api/messages", {
      user_id,
      message_with_id,
    })
    .catch((error) => {});
}

//

export async function get_users_in_the_list(userId) {
  const res = await axios.get(`http://localhost:5400/api/messages/${userId}`);

  const usersData = await Promise.all(
    res.data.map(async (id) => {
      const user = await getUserInfoByID(id.message_with_id);
      return user;
    })
  );

  return usersData;
}
