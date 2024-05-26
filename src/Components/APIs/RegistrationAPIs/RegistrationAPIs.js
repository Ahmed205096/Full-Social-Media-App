import axios from "axios";
import { toast } from "react-toastify";

const registration_url_teachers = "http://localhost:5000/api/teacher/";
const registration_url_teachers_posts = "http://localhost:5100/api/posts";
const teacher_student_login = "http://localhost:5000/api/login/";

const get_specific_application = "http://localhost:5200/api/universities/";

const return_the_rule_of_the_user = "http://localhost:5000/api/teacher/rule/";

// takes id1/id2
const updateAnyAttribute_url = "http://localhost:5000/api/teacher/";

const jobApp_url = "http://localhost:5200/api/universities/";

// To make post request on the teachers - users API
export const make_post_request = (api_url, arr) => {
  return axios
    .post(api_url, ...arr)
    .then(() => {
      console.log("added sucessfully");
      return true;
    })
    .catch((err) => {
      console.log("ERROR ");
      return false;
    });
};

// Make user posts array [empty]
export async function CreateEmptyPosts(
  id,
  email,
  rule,
  name,
  api = registration_url_teachers_posts
) {
  make_post_request(api, [
    {
      id: `${id}`,
      rule,
      name,
      email,
      posts: [],
    },
  ]);
}

// Make university apps array [empty]
export async function CreateEmptyApplication(id, name) {
  make_post_request(jobApp_url, [
    {
      id,
      name,
      job_apps: [],
    },
  ]);
}

// Search on the users list by email
export async function searchUserByEmail(email) {
  try {
    const all_users = await displayAllUsersNamesAndIds();

    const search_result = all_users
      .map((user) => {
        if (user.email === email) {
          return user.id;
        }
        return undefined;
      })
      .filter((i) => i !== undefined);

    return search_result;
  } catch (e) {
    console.log("Error ", e);
  }
}

// Registration for Teacher - Student (Signup)
export async function Register(
  username,
  email,
  password,
  rule,
  name,
  user_img,
  user_bg_img,
  title,
  about,
  accreditation,
  skills,
  language,
  education
) {
  // #################################
  // Put request to add the teacher information in the teachers API
  const randomNumber = Math.floor(Math.random() * 1000000000000) + 1;
  let nextId = randomNumber;

  const registration_res = await make_post_request(registration_url_teachers, [
    {
      id: nextId,
      rule,
      name,
      email,
      password,
      user_img,
      user_bg_img,
      title,
      about,
      accreditation,
      skills,
      language,
      education,
      profile_views: 0,
      post_views: 0,
      recent: [],
      friend_list: [],
      friend_requests: [],
      followers_list: [],
    },
  ]);

  if (registration_res) {
    console.log("Register res: " + registration_res);
    CreateEmptyPosts(nextId, email, rule, name);

    if (rule === "university") CreateEmptyApplication(nextId, name);
  }
  return registration_res;
}

export async function Authorization(email, password) {
  try {
    const response = await axios.post(teacher_student_login, {
      email,
      password,
    });
    try {
      return response.data.id;
    } catch (e) {
      console.log("ERROR ", response.error);
      return false;
    }
  } catch (e) {}
}

export async function AuthorizeUniversity(email, password) {
  const res = await Authorization(email, password);
  return res;
}
// export async function Authorization(
//   email,
//   password,
//   url = registration_url_teachers
// ) {
//   try {
//     const response = await axios.get(url);
//     const data = response.data;

//     let user;

//     try {
//       user = data.find((user) => {
//         return user.email === email && user.password === password;
//       });
//       return user.id;
//     } catch (_) {
//       user = [data].find((user) => {
//         return user.email === email && user.password === password;
//       });
//     }

//     try {
//       return user.id;
//     } catch (_) {
//       return false;
//     }
//   } catch (err) {
//     return false;
//   }
// }

// export async function AuthorizeUniversity(email, password) {
//   try {
//     const response = await Authorization(
//       email,
//       password,
//       registration_url_university
//     );
//     console.log(response);
//   } catch (err) {}
// }

export async function getUserRule(email) {
  try {
    const response = await axios.get(registration_url_teachers);
    const rule = response.data.filter((user) => user.email === email)[0].rule;
    return rule;
  } catch (err) {
    return "student";
  }
}

// ##########
// Must change
export async function getImage(university_id) {
  const university_img = await axios.get(
    registration_url_teachers + university_id
  );

  return university_img.data.user_img;
}

// Make job App (For universities)
export function makeJobApp(
  university_id,
  title,
  department,
  location,
  description,
  requirements,
  deadline
) {
  axios
    .get(jobApp_url + university_id)
    .then(async (response) => {
      let university_apps = response.data;

      const university_img = await getImage(university_id);
      const randomNumber = Math.floor(Math.random() * 1000000000000) + 1;

      const job_apps_next_id = randomNumber;

      university_apps.job_apps.push({
        app_id: `${job_apps_next_id}`,
        university_id: `${university_id}`,
        university_img: `${university_img}`,
        title,
        department,
        location,
        description,
        requirements,
        deadline,
        received_requests: [],
        approved: [],
      });

      axios
        .put(jobApp_url + university_id, university_apps)
        .then((response) => console.log(response))
        .catch((err) => console.log(err));
    })
    .catch((err) => {
      console.log(err);
    });
}
// ################## Start Block ###################

// Get All Ids of apps In the same university
export async function getAllAppsIDsInTheSameUniversity(university_id) {
  const response = await axios.get(jobApp_url + university_id);
  return response.data.job_apps.map((job_app) => job_app.app_id);
}

// Call the job apps of specific university
export async function getUniversityApps(university_id) {
  const university_apps = await Promise.all(
    university_id.map(async (id) => {
      const response = await axios.get(jobApp_url + id);
      return response.data.job_apps;
    })
  );
  return university_apps;
}

export async function getAllUniversities_ids() {
  const universities = await axios.get(jobApp_url);
  return universities.data.map((university) => university.id);
}
// Call the university Jobs to the teacher return an attay of jobs
export async function getAllJobApps() {
  try {
    const universities_ids = await getAllUniversities_ids();
    const universities_job_apps = await getUniversityApps(universities_ids);

    return universities_job_apps;
  } catch (e) {}
}

// ################## End Block ###################

// Get the university job application (Single university)
export async function getSingleUniversityApps(university_id) {
  try {
    if (university_id) {
      const response = await axios.get(jobApp_url + university_id);
      const university_data = response.data.job_apps;

      return university_data;
    }
    return false;
  } catch (e) {
    console.log(e);
    return false;
  }
}

// ###############################################

export const showTost = (text) => {
  return toast.info(text, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });
};

// Apply for job applications
export async function applyForJob(app_id, university_id, userId) {
  // Get all job applications for the university
  const response = await axios.get(jobApp_url + university_id);
  const all_apps = response.data;

  // Find the specific job application by app_id
  const jobApp = all_apps.job_apps.find((app) => +app.app_id === +app_id);

  // Check if the user has already applied
  const hasApplied = jobApp.received_requests.some(
    (req) => +req.teacher_id === +userId
  );
  // Check if the user has already approved
  const hasApProced = jobApp.approved.some(
    (req) => +req.teacher_id === +userId
  );

  // If the user hasn't applied, add their application
  if (!hasApplied && !hasApProced) {
    jobApp.received_requests.push({ teacher_id: userId });

    showTost("Request Sent.");

    // Update the job application with the new list of received requests
    await axios.put(jobApp_url + university_id, all_apps);
  } else {
    showTost("You have already applied for this job");
  }

  // Return the updated list of received requests
  return jobApp.received_requests;
}

// ################################################

// Delete Application
export async function deleteUniversityApp(university_id, app_id) {
  try {
    const allApps = await getUniversityApps([university_id]);

    console.log("All Applications ", allApps);

    const res = allApps[0].filter((app) => {
      return +app.app_id !== +app_id;
    });

    const getAllData = await axios.get(jobApp_url + university_id);
    getAllData.data.job_apps = res;

    await axios.put(jobApp_url + university_id, getAllData.data);

    console.log(res);

    return res;
  } catch (e) {
    console.log("Error  33 ");
    return false;
  }
}

// Retrive the applicants in specific app
export async function retrieveApplicants(university_id, app_id) {
  try {
    const response = await axios.get(jobApp_url + university_id);
    const all_apps = response.data;

    const needed_application = all_apps.job_apps.filter((data) => {
      return +data.app_id === +app_id;
    });

    return needed_application[0].received_requests.map(
      (data) => data.teacher_id
    );
  } catch (_) {
    return [];
  }
}

// Retrive the user information by id
export async function getUserInfoById(ids) {
  try {
    const response = await Promise.all(
      ids.map((id) => axios.get(registration_url_teachers + id))
    );

    return response.map((res) => ({
      name: res.data.name,
      email: res.data.email,
      title: res.data.title,
      img: res.data.user_img,
      bg_img: res.data.user_bg_img,
      id: res.data.id,
    }));
  } catch (e) {
    console.log("Error in getUserInfoById:", e);
    return [];
  }
}

// Remove teachers from the applicant
export async function removeTeacherFromApp(university_id, app_id, teacher_id) {
  try {
    const response = await axios.get(jobApp_url + university_id);
    const all_apps = response.data;

    const needed_application = all_apps.job_apps.filter((data, index) => {
      return +data.app_id === +app_id;
    });

    needed_application[0].received_requests =
      needed_application[0].received_requests.filter((data) => {
        return +data.teacher_id !== +teacher_id;
      });

    all_apps.job_apps = all_apps.job_apps.filter((data, index) => {
      return +data.app_id !== +app_id;
    });

    all_apps.job_apps.push(needed_application[0]);

    await axios.put(jobApp_url + university_id, all_apps);
  } catch (_) {
    return [];
  }
}

// Approve teacher from the application
export async function approveTeacherFromApp(university_id, app_id, teacher_id) {
  await removeTeacherFromApp(university_id, app_id, teacher_id);

  const response = await axios.get(jobApp_url + university_id);
  const all_apps = response.data;

  const needed_application = all_apps.job_apps.filter((data, index) => {
    return +data.app_id === +app_id;
  });

  needed_application[0].approved.push({ teacher_id: teacher_id });

  all_apps.job_apps = all_apps.job_apps.filter((data, index) => {
    return +data.app_id !== +app_id;
  });

  all_apps.job_apps.push(needed_application[0]);

  await axios.put(jobApp_url + university_id, all_apps);
}

// Display All Approved Teachers
export async function DisplayAllApprovedTeachers(university_id) {
  try {
    const response = await axios.get(jobApp_url + university_id);
    const all_apps = response.data;

    const approved_teachers = all_apps.job_apps.map((data) => {
      return data.approved.map((teacher) => {
        return teacher.teacher_id;
      });
    });

    const user_data = await getUserInfoById(approved_teachers.flat());
    return user_data;
  } catch (e) {}
}

// Displat The Application Information
export async function DisplayApplicationInformation(university_id, app_id) {
  try {
    const response = await axios.get(jobApp_url + university_id);
    const all_apps = response.data;

    return {
      img: all_apps.university_img,
      title: all_apps.title,
      department: all_apps.department,
      location: all_apps.location,
      description: all_apps.description,
      requirements: all_apps.requirements,
      deadline: all_apps.deadline,
    };
  } catch (e) {
    console.log("Error ", e);
  }
}

// Display all users names and ids
export async function displayAllUsersNamesAndIds() {
  try {
    const response = await axios.get(registration_url_teachers);
    const all_users = response.data;

    return all_users.map((data) => {
      return {
        id: data.id,
        name: data.name,
        email: data.email,
      };
    });
  } catch (e) {
    console.log("Error ", e);
  }
}

// Find the Application by university id and user id
export async function getApplicationByUidAndUserIdAndAPPID(
  universityId,
  appId
) {
  const res = await axios.get(
    get_specific_application + universityId + "/" + appId
  );

  return res.data;
}

// Find the rule of the user
export async function whatIsTheRuleOf(user_id) {
  try {
    const res = await axios.get(return_the_rule_of_the_user + user_id);
    return res.data;
  } catch (e) {
    console.log("Error ", e);
  }
}

// Update any attribute in the user api
export async function updateAnyAttribute(user_id, object_of_attributes) {
  try {
    const res = await axios.put(
      updateAnyAttribute_url + user_id + "/" + user_id,
      object_of_attributes
    );

    return res.status;
  } catch (e) {
    console.log(e);
  }
}

// Get the user skills and languages and education information
export async function getUserSkillsLanguagesAndEducationCVInformation(user_id) {
  const res = await axios.get(registration_url_teachers + user_id);
  const skills = res.data.skills.map((item) => item.label);
  const lang = res.data.language.map((item) => item.label);
  const edu = res.data.education;
  const cv = res.data.cv;

  return {
    skills,
    lang,
    edu,
    cv,
  };
}
