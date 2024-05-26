import axios from "axios";

const friends_api_url = "http://localhost:5000/api/teacher/:id/friends";

export async function getFriendList(user_id) {
  const data = await axios.get(friends_api_url.replace(":id", user_id));
  if (data) return data.data.friend_list;
}
