import axios from "axios";
import { urlForUsers } from "../PostAPIs/APIs";

const search_users = "http://localhost:5000/api/search/users";

// Search user by name
export async function search_user(user_name) {
  const data = await axios.post(search_users, { name: user_name });
  const user_data = data.data;
  return user_data;
}

// Get the user password by his id

export async function get_user_password(user_id) {
  const data = await axios.get(urlForUsers + user_id);
  const user_data = data.data.password;
  return user_data;
}
