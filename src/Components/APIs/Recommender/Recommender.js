import axios from "axios";
import { getUserInfoByID, urlForUsers } from "../PostAPIs/APIs";

const recommender_url = "http://localhost:5000/api/similar-users/";
const recommender_for_jobs_url =
  "http://localhost:5200/api/universities/filter";

// Recommend People
export async function getSimilarUsers(user_id) {
  if (!Number.isNaN(+user_id)) {
    const data = await axios.get(recommender_url + user_id);
    const user_ids = data.data;

    const usersData = await Promise.all(
      user_ids.map(async (id) => {
        const user = await getUserInfoByID(id);
        return user;
      })
    );
    return usersData;
  }
}

// Recommend Jobs

export async function getSimilarJobs() {
  const userId = localStorage.getItem("user_id");
  const title = (await axios.get(urlForUsers + userId)).data.title;
  const data = await axios.post(recommender_for_jobs_url, { title });
  const recommendations = data.data;

  return recommendations;
}
