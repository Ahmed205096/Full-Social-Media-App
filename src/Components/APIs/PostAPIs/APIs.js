import axios from "axios";
import { toast } from "react-toastify";
import {
  delete_img,
  delete_pdf,
  delete_video,
  upload_img,
  upload_pdf,
  upload_video,
} from "../AssetsAPI";
import { getImage } from "../RegistrationAPIs/RegistrationAPIs";
//
export const urlForPosts = `http://localhost:5100/api/posts/`;
export const urlForUsers = `http://localhost:5000/api/teacher/`;
const deletePostById = "http://localhost:5100/api/posts/user/";
const getAllUsersExeptFriends = "http://localhost:5000/api/all/teachers/";
const getAllUsersPosts = "http://localhost:5100/api/all/posts";
const checkIsFriend =
  "http://localhost:5000/api/teacher/:teacherId/friend/:friendId";
const checkWaitingList =
  "http://localhost:5000/api/teacher/:teacherId/friend-request/:friendId";
const getFriendIDs = "http://localhost:5000/api/teacher/:teacherID/frinds_ids";

// --------------------- Start Profile APIs ---------------------
export async function GetProfileData(user_id) {
  const data = await axios.get(urlForUsers + user_id);
  const user_data = data.data;

  return {
    name: user_data.name,
    user_img: user_data.user_img,
    user_bg_img: user_data.user_bg_img,
    title: user_data.title,
    about: user_data.about,
  };
}
// --------------------- End Profile APIs ---------------------

// --------------------- Start Networks APIs ---------------------
// export async function GetNetworks(user_id) {
//   const data = await axios.get(urlForUsers);

//   const user_data = data.data.filter((users) => +users.id !== +user_id);

//   return user_data.map((users) => {
//     return {
//       id: users.id,
//       name: users.name,
//       user_img: users.user_img,
//       user_bg_img: users.user_bg_img,
//       title: users.title,
//       about: users.about,
//       rule: users.rule,
//     };
//   });
// }

export async function GetNetworks(user_id) {
  const res = await axios.get(getAllUsersExeptFriends + user_id);
  return res.data;
}
// --------------------- End Networks APIs ---------------------

// --------------------- Start Post APIs ---------------------
// Add Posts
// export function AddPost(
//   user_id,
//   post_content,
//   img = "",
//   video = "",
//   file = ""
// ) {
//   const dateTime = new Date();

//   const time =
//     dateTime.toLocaleDateString() + " - " + dateTime.toLocaleTimeString();

//   axios
//     .get(urlForPosts + user_id)
//     .then((response) => {
//       const userPosts = response.data;
//       let nextIndex = 1;
//       if (userPosts.posts.length > 0) {
//         nextIndex =
//           +userPosts.posts[userPosts.posts.length - 1].id.split("/")[1] + 1;
//       }

//       const postContent = {
//         id: `${user_id + "/" + nextIndex}`,
//         post_content: post_content,
//         img,
//         video,
//         file,
//         time: time,
//         reactions: [],
//         comments: [],
//       };
//       userPosts.posts.push(postContent);

//       console.log("User post ", userPosts);

//       axios
//         .put(urlForPosts + user_id, userPosts)
//         .then((response) => console.log(response))
//         .catch((err) => console.log(err));
//     })
//     .catch((err) => {});
// }
export async function AddPost(
  user_id,
  post_content,
  img = "",
  video = "",
  file = "",
  stop_refresh = false
) {
  const dateTime = new Date();

  const time =
    dateTime.toLocaleDateString() + " - " + dateTime.toLocaleTimeString();

  const randomNumber = Math.floor(Math.random() * 1000000000000) + 1;
  let nextId = randomNumber;

  let newImage = "";
  if (img) {
    newImage = await upload_img(img);
  }
  let newVideo = "";
  if (video) {
    newVideo = await upload_video(video);
  }
  let newFile = "";
  if (file) {
    newFile = await upload_pdf(file);
  }

  const postContent = {
    id: `${user_id + "/" + nextId}`,
    post_content: post_content,
    img: newImage,
    video: newVideo,
    file: newFile,
    time: time,
    reactions: [],
    comments: [],
  };

  axios
    .put(urlForPosts + user_id + "/" + user_id, postContent)
    .then((response) => console.log(response))
    .catch((err) => console.log(err));

  if (!stop_refresh) window.location.reload();
}

export async function DeletePost(
  user_id,
  post_id_to_delete,
  stop_refresh = false
) {
  try {
    if (user_id) {
      axios.delete(deletePostById + user_id, {
        data: { post_id: post_id_to_delete },
      });
      // Get the video name and image name
      const get_user_data = await axios.get(urlForPosts + user_id);
      const all_posts = get_user_data.data.posts;
      const post = all_posts.find((post) => post.id === post_id_to_delete);
      const video_name = post.video.replace("videos\\", "");
      const img_name = post.img.replace("images\\", "");
      const pdf_name = post.file.replace("pdfs\\", "");

      try {
        // Delete the video from the directory
        if (video_name) await delete_video(video_name);
      } catch (e) {}
      try {
        // Delete the image from the directory
        if (img_name) await delete_img(img_name);
      } catch (e) {}
      try {
        // Delete the image from the directory
        if (pdf_name) await delete_pdf(pdf_name);
      } catch (e) {}

      if (!stop_refresh) window.location.reload();
    }
  } catch (e) {}
}

// Get User Posts
export async function GetUserPosts(user_id) {
  try {
    if (user_id) {
      const data = await axios.get(urlForPosts + +user_id);

      const allPosts = data.data.posts;
      if (allPosts) return allPosts;
      else return [];
    }
  } catch (e) {
    console.log("Check the GetUserPosts in the APIs.js file");
    window.location.href = "/";
    return [];
  }
}

// Get All Posts
// export async function GetAllPosts() {
//   try {
//     const fetch_users_id = await axios.get(urlForPosts);

//     const all_users_id = fetch_users_id.data.map((user) => user.id);

//     const all_users_posts = await Promise.all(
//       all_users_id.map(async (id) => {
//         const fetch_users_posts = await axios.get(urlForPosts + id);
//         return fetch_users_posts.data;
//       })
//     );

//     const all_users = await Promise.all(
//       all_users_id.map(async (id) => {
//         const fetch_users_posts = await axios.get(urlForUsers + id);
//         return fetch_users_posts.data;
//       })
//     );

//     const mergedArray = all_users.map((user, index) => {
//       return {
//         user: {
//           id: user.id,
//           name: user.name,
//           title: user.title,
//           user_img: user.user_img,
//         },
//         post: all_users_posts[index].posts,
//       };
//     });
//     console.log(mergedArray);

//     return mergedArray;
//   } catch (e) {
//     return [];
//   }
// }

export async function GetAllPosts1() {
  const res = await axios.get(getAllUsersPosts);
  return res.data;
}

// Function to get all posts with user images
export async function GetAllPosts() {
  try {
    const allPosts = await GetAllPosts1();

    // Map through the posts and add user_img to each user
    const allPostsWithImages = await Promise.all(
      allPosts.map(async (data) => {
        const user_img = await getImage(+data.user.id);
        return {
          ...data,
          user: {
            ...data.user,
            user_img,
          },
        };
      })
    );
    return allPostsWithImages;
  } catch (e) {
    console.log("Check the GetAllPosts in the APIs.js file");
    window.location.href = "/";
    return [];
  }
}

// Get Friend Posts
export async function GetFriendPosts(user_id) {
  try {
    const res = await axios.get(getFriendIDs.replace(":teacherID", user_id));
    return res.data.friendIds;
  } catch (e) {
    console.log("Check the GetFriendPosts in the APIs.js file");
    window.location.href = "/";
    return [];
  }
}

// --------------------- End Post APIs ---------------------

// --------------------- Start Comments APIs ---------------------
//  Add Comments
export function AddComment(currwnt_user_id, post_id, comment) {
  const dateTime = new Date();
  const user_id = +post_id.split("/")[0];
  const new_post_id = +post_id.split("/")[1];
  const time =
    dateTime.toLocaleDateString() + " - " + dateTime.toLocaleTimeString();

  axios
    .get(urlForPosts + user_id)
    .then((response) => {
      const userPosts = response.data;

      const wanted_post_index = userPosts.posts.findIndex(
        (post) => +post.id.split("/")[1] === +new_post_id
      );
      if (wanted_post_index !== -1) {
        const wanted_post = userPosts.posts[wanted_post_index];
        const comments_of_wanted_post = wanted_post.comments;

        comments_of_wanted_post.push({
          id: `${
            comments_of_wanted_post.length > 0
              ? +comments_of_wanted_post[comments_of_wanted_post.length - 1]
                  .id + 1
              : "1"
          }`,
          user_id: `${currwnt_user_id}`,
          // user_img: img,
          // user_name: name,
          time: time,
          comment: comment,
        });

        // Update the post content
        userPosts.posts[wanted_post_index] = {
          id: wanted_post.id,
          post_content: wanted_post.post_content,
          img: wanted_post.img,
          video: wanted_post.video,
          file: wanted_post.file,
          time: wanted_post.time,
          reactions: wanted_post.reactions,
          comments: comments_of_wanted_post,
        };

        // PUT request to update the userPosts object
        axios
          .put(urlForPosts + user_id, userPosts)
          .then((response) => console.log(response))
          .catch((err) => console.log(err));
      }
    })
    .catch((err) => {});
}

// Delete Comments
export function DeleteComment(user_id, post_id, comment_id_to_delete) {
  axios
    .get(urlForPosts + user_id)
    .then((response) => {
      let userPosts = response.data;

      const post_index = userPosts.posts.findIndex((post) => {
        return +post.id.split("/")[1] === +post_id;
      });

      if (post_index !== -1) {
        const comments = userPosts.posts[post_index].comments.filter(
          (comment) => {
            console.log(+comment.id, +comment_id_to_delete);
            return +comment.id !== +comment_id_to_delete;
          }
        );

        userPosts.posts[post_index].comments = comments;

        axios
          .put(urlForPosts + user_id, userPosts)
          .then((response) => console.log(response))
          .catch((err) => console.log(err));
      }
    })
    .catch((err) => {});
}

// Get Post Comments
export function getAllCommentsByUserIdAndPostId(userId, postId) {
  return axios
    .get(`${urlForPosts}${userId}`)
    .then((response) => {
      const userPosts = response.data;
      const post = userPosts.posts.find(
        (post) => +post.id.split("/")[1] === +postId
      );
      if (post) {
        return post.comments;
      }
    })
    .catch((error) => {
      return [];
    });
}
// --------------------- End Comments APIs ---------------------

// --------------------- Start Reactions APIs ---------------------
// Get Reactions
export function getReactions(user_id, post_id) {
  if (user_id !== "x" && post_id !== "x") {
    return axios.get(urlForPosts + user_id).then((response) => {
      const userPosts = response.data;
      const post = userPosts.posts.find(
        (post) => +post.id.split("/")[1] === +post_id
      );
      if (post) {
        return post.reactions;
      } else {
        return [];
      }
    });
  } else {
    return "";
  }
}

// Set Reactions
export function setReactions(user_id, post_id, new_reaction) {
  return axios.get(urlForPosts + user_id).then((response) => {
    const userPosts = response.data;
    const post = userPosts.posts.find(
      (post) => +post.id.split("/")[1] === +post_id
    );
    if (post) {
      const existingReactionIndex = post.reactions.findIndex(
        (r) => r.user_id === new_reaction.user_id
      );
      if (existingReactionIndex !== -1) {
        // If the user has already reacted, update the reaction
        post.reactions[existingReactionIndex] = new_reaction;
      } else {
        // If the user has not reacted yet, add the new reaction
        post.reactions.push(new_reaction);
      }

      return axios
        .put(urlForPosts + user_id, userPosts)
        .then((response) => response.data);
    } else {
      return null;
    }
  });
}

// Delete Reaction
export function deleteReaction(user_id, post_id, reaction_user_id) {
  return axios.get(urlForPosts + user_id).then((response) => {
    const userPosts = response.data;
    const post = userPosts.posts.find(
      (post) => +post.id.split("/")[1] === +post_id
    );
    if (post) {
      post.reactions = post.reactions.filter(
        (r) => +r.user_id !== +reaction_user_id
      );

      return axios
        .put(urlForPosts + user_id, userPosts)
        .then((response) => response.data);
    } else {
      return null;
    }
  });
}

// Get Reactions For Specific User
export function getReactionForSpecificUser(user_id, post_id, specific_user_id) {
  if (user_id !== "x" && post_id !== "x") {
    return axios.get(urlForPosts + user_id).then((response) => {
      const userPosts = response.data;
      const post = userPosts.posts.find(
        (post) => +post.id.split("/")[1] === +post_id
      );

      if (post) {
        const reaction = post.reactions.find(
          (r) => +r.user_id === +specific_user_id
        );
        return reaction ? reaction.reaction : null;
      }

      return null; // Return null if post is not found
    });
  } else {
    return "";
  }
}

// Get Reactions For Specific Post
export function getReactionForSpecificPost(user_id, post_id) {
  if (user_id !== "x" && post_id !== "x") {
    try {
      return axios.get(urlForPosts + user_id).then((response) => {
        const userPosts = response.data;
        const post = userPosts.posts.find(
          (post) => +post.id.split("/")[1] === +post_id
        );

        let reactionsNeeded;
        if (post) {
          reactionsNeeded = post.reactions.map((i) => i.reaction);
        }
        try {
          return reactionsNeeded.join();
        } catch (e) {
          return null;
        }
      });
    } catch (e) {}
  } else {
    return "";
  }
}
// --------------------- End Reactions APIs ---------------------

// --------------------- Start Views APIs ---------------------
// Get The User Views
export function setUserProfileViews(user_id) {
  try {
    axios.get(urlForUsers + user_id).then((response) => {
      try {
        const profile_views = response.data.profile_views;
        const post_views = response.data.post_views;
        const update_profile_views = response.data;

        update_profile_views.profile_views = profile_views + 1;
        update_profile_views.post_views = post_views + 1;

        try {
          axios
            .put(urlForUsers + user_id, update_profile_views)
            .catch((error) => {});
        } catch (e) {}
      } catch (e) {}
    });
  } catch (e) {}
}

// Add into recent views
export function addRecentView(user_id, recent_value) {
  if (
    recent_value !== undefined &&
    recent_value !== null &&
    recent_value !== "" &&
    user_id !== 0
  ) {
    axios.get(urlForUsers + user_id).then(
      (response) => {
        const data = response.data;
        const recent_views = data.recent;
        recent_views.push(recent_value);
        data.recent = recent_views;

        try {
          axios.put(urlForUsers + user_id, data);
        } catch (e) {}
      },
      (error) => {}
    );
  }
}

// Get the recent views
export function getRecentView(user_id) {
  return axios
    .get(urlForUsers + user_id)
    .then((response) => {
      const data = response.data;
      const recent_views = data.recent;
      return recent_views.slice(-3);
    })
    .catch((error) => {
      return [];
    });
}
// --------------------- End Views APIs ---------------------

// --------------------- Start Get User Info By ID APIs ---------------------
export function getUserInfoByID(user_id) {
  return axios.get(urlForUsers + user_id).then((response) => {
    const name = response.data.name;
    const image = response.data.user_img;
    const title = response.data.title;
    const id = response.data.id;

    return { id: id, name: name, img: image, title: title };
  });
}

export function getAllUserInfo(user_id) {
  try {
    return axios.get(urlForUsers + user_id).then((response) => {
      return response.data;
    });
  } catch (e) {}
}
// --------------------- End Get User Info By ID APIs ---------------------

// --------------------- Start Connections APIs ---------------------
// Add To Waiting List
export async function addToWaitingList(user_id_target, user_id_request) {
  try {
    const response = await axios.get(urlForUsers + user_id_target);
    const data = response.data;
    const waiting_list = data.friend_requests;

    const isExist = waiting_list.find((item) => {
      return +item.id === +user_id_request;
    });

    if (isExist === undefined) {
      const user_info = await getUserInfoByID(user_id_request);
      waiting_list.push(user_info);
      data.friend_requests = waiting_list;
      await axios.put(urlForUsers + user_id_target, data);
      toast.success("Your request has been sent successfully.", {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      toast.success("Please wait for a response from the user.", {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  } catch (error) {}
}

// Display Waiting List
export async function getFromWaitingList(user_id) {
  try {
    if (user_id !== 0) {
      const response = await axios.get(urlForUsers + user_id);
      const data = response.data;
      const waiting_list = data.friend_requests;
      return waiting_list;
    }
  } catch (error) {}
}

// Chech if the user is in connections
export async function check_connection(user_id, connection_id) {
  const response = await axios.get(
    checkIsFriend
      .replace(":teacherId", user_id)
      .replace(":friendId", connection_id)
  );
  return response.data.isFriend;
}

// Chech if the user is in waiting list
export async function check_waiting_list(user_id, connection_id) {
  // try {
  //   if (user_id !== 0) {
  //     const response = await axios.get(urlForUsers + user_id);
  //     const data = response.data.friend_requests;
  //     return data.findIndex((data) => +data.id === +connection_id) !== -1
  //       ? true
  //       : false;
  //   }
  // } catch (err) {}
  const res = await axios.get(
    checkWaitingList
      .replace(":teacherId", user_id)
      .replace(":friendId", connection_id)
  );

  return res.data.isFriendRequest;
}

// Accept / Reject Request
export async function Accept_Reject(
  user_id_target,
  user_id_request = 0,
  accepted = false
) {
  try {
    const response = await axios.get(urlForUsers + user_id_target);
    const data = response.data;
    const requests = data.friend_requests;
    const friend_list = data.friend_list;

    const userIndex = requests.findIndex(
      (user) => +user.id === +user_id_request
    );
    if (userIndex !== -1) {
      const target_user = requests[userIndex];
      requests.splice(userIndex, 1);

      if (accepted) {
        friend_list.push(target_user);
        const response2 = await axios.get(urlForUsers + user_id_request);
        const data2 = response2.data;
        const friend_list2 = data2.friend_list;
        const userInfo = await getUserInfoByID(user_id_target);
        friend_list2.push(userInfo);
        data2.friend_list = friend_list2;
        await axios.put(urlForUsers + user_id_request, data2);
      }

      data.friend_requests = requests;
      data.friend_list = friend_list;

      await axios.put(urlForUsers + user_id_target, data);
    }
  } catch (error) {
    console.error(error);
  }
}

// Unfriend user
export async function unfriend_connection(user_id, connection_id) {
  if (user_id) {
    try {
      // Delete from the current user
      const response = await axios.get(urlForUsers + user_id);
      const user_data = response.data;
      const user_friend_list = user_data.friend_list;
      const index = user_friend_list.findIndex(
        (data) => +data.id === +connection_id
      );
      if (index !== -1) {
        user_friend_list.splice(index, 1);
      }
      user_data.friend_list = user_friend_list;

      // Delete from the connection user
      const response2 = await axios.get(urlForUsers + connection_id);
      const user_data2 = response2.data;
      const user_friend_list2 = user_data2.friend_list;
      const index2 = user_friend_list2.findIndex(
        (data) => +data.id === +user_id
      );
      if (index2 !== -1) {
        user_friend_list2.splice(index2, 1);
      }
      user_data2.friend_list = user_friend_list2;

      // Put data into the API
      await axios.put(urlForUsers + user_id, user_data);
      await axios.put(urlForUsers + connection_id, user_data2);

      window.location.reload();
    } catch (err) {}
  }
}

// --------------------- End Connections APIs ---------------------
