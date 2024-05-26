import axios from "axios";

const check_message_state = "http://localhost:5300/api/messages/non/sent/";
const update_message_state =
  "http://localhost:5300/api/messages/update/status/:senderId/:receiverId";

//   Check message state
export async function check_message_status(senderId) {
  try {
    const res = await axios.get(check_message_state + senderId);
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

// Update message state
export async function update_message_status(senderId, receiverId) {
  await axios.put(
    update_message_state
      .replace(":senderId", senderId)
      .replace(":receiverId", receiverId)
  );
}
