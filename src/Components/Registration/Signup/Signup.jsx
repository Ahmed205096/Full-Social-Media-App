import React, { useState } from "react";
import "../Login/Style/Login-Style.css";
import "../Signup/Style/Signup-Style.css";
import { Link } from "react-router-dom";
import Select from "react-select";
import { Register } from "../../APIs/RegistrationAPIs/RegistrationAPIs";
import { toast } from "react-toastify";
import { titleOptions } from "./skillOptions";
// import { languageOptions, skillsOptions, titleOptions } from "./skillOptions";

export default function Signup() {
  const [name, setUserName] = useState("");
  const [edu, setEdu] = useState("");
  const [title, setTitle] = useState("");
  const [accreditation, setAccreditation] = useState("");
  // const [about, setAbout] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [bgImagePreview, setBGImagePreview] = useState("");

  const [rule, setRule] = useState("");

  const [name_animation, setNameAnimation] = useState("");
  // const [about_animation, setAboutAnimation] = useState("");
  const [email_animation, setEmailAnimation] = useState("");
  const [password_animation, setPasswordAnimation] = useState("");

  const [edu_animation, setEduAnimation] = useState("");

  const [displayPassword, setDisplayPassword] = useState("password");

  // Selected options (from react select)
  // const [selectedOptions, setSelectedOptions] = useState([]);
  // const [selectedLang, setSelectedLang] = useState([]);

  // const handleSelectedLangChange = (selected) => {
  //   if (selected.length < 4) setSelectedLang(selected);
  // };

  // const handleSelectedOptionsChange = (selected) => {
  //   if (selected.length < 5) setSelectedOptions(selected);
  // };

  function handleNameChange(event) {
    setUserName(event.target.value);
  }

  function handleTitleChange(event) {
    setTitle(event.value);
  }

  function handleAccreditationChange(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setAccreditation(reader.result);
      };

      reader.readAsDataURL(file);
    }

    setAccreditation(file);
  }

  // function handleAboutChange(event) {
  //   setAbout(event.target.value);
  // }

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handleEduChange(event) {
    setEdu(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
    console.log(password);
    if (
      password_animation === "" ||
      password_animation === "animate_label_down"
    ) {
      setPasswordAnimation("animate_label_up");
    }
  }

  function handleImageChange(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImagePreview(reader.result);
      };

      reader.readAsDataURL(file);
    }
  }

  function handleBGImageChange(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setBGImagePreview(reader.result);
      };

      reader.readAsDataURL(file);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    // login logic here
  }

  //   For react select
  const handleChange = (selectedOption) => {
    // console.log("Selected Option:", selectedOption.value);
    setRule(selectedOption.value);
  };

  //   For the react select
  const options = [
    { value: "student", label: "student" },
    { value: "teacher", label: "teacher" },
    { value: "university", label: "university" },
  ];

  //   For the react select
  const customStyles = {
    control: (provided) => ({
      ...provided,
      textAlign: "center",
    }),
  };

  const displayImage = (url) => {
    return (
      <img
        style={{ width: "100px", height: "100px", borderRadius: "50%" }}
        src={url}
        alt="User"
        className="signup-user-img-temp"
      />
    );
  };

  const displayBGImage = (url) => {
    return (
      <img
        style={{ width: "100%", height: "100px", borderRadius: "10px" }}
        src={url}
        alt="User"
        className="signup-user-img-bg-temp"
      />
    );
  };

  // The function that check if all fields are valid
  function validateForm() {
    if (name === "" || email === "" || password === "") {
      return false;
    } else {
      return true;
    }
  }

  // Display toast message
  function displayToast(message) {
    toast.info(message, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }

  // The function that make the registration process
  async function Singup_user() {
    if (validateForm() === true) {
      if (emailRegex.test(email) && password.length >= 6) {
        const registration_res = await Register(
          name,
          email,
          password,
          rule,
          name,
          imagePreview,
          bgImagePreview,
          title,
          // about,
          accreditation,
          // Skills
          // selectedOptions,
          // selectedLang,
          edu
        );
        if (registration_res)
          displayToast("Registration is done successfully!");
        else {
          displayToast("Registration is failed, this email is taken!");
        }
      } else if (!emailRegex.test(email)) {
        displayToast("Email is not valid!");
      } else {
        displayToast("Password must be at least 6 characters!");
      }
    } else {
      displayToast("All fields must be satisfied.");
    }
  }

  // Regular expression to check on the email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return (
    <div className="login-outer-container">
      <form className="login-form signup-form" onSubmit={handleSubmit}>
        <h2 className="login-title ">Signup</h2>

        <div className="login-form-group">
          {/* User Image */}
          <label
            className="signup-user-img-temp"
            style={{ cursor: "pointer" }}
            htmlFor="user-img"
          >
            {imagePreview
              ? displayImage(imagePreview)
              : displayImage("Assets/user.png")}

            <input
              id="user-img"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
          </label>

          {/* User Bg */}
          <label
            className="signup-user-img-bg-temp"
            style={{ cursor: "pointer" }}
            htmlFor="user-bg-img"
          >
            {bgImagePreview
              ? displayBGImage(bgImagePreview)
              : displayBGImage("Assets/signup-bg.jpg")}

            <input
              id="user-bg-img"
              type="file"
              accept="image/*"
              onChange={handleBGImageChange}
              style={{ display: "none" }}
            />
          </label>

          {/* User Name */}
          <label htmlFor="name" className={name_animation}>
            User Name 👤
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={handleNameChange}
            onFocus={() => setNameAnimation("animate_label_up")}
            onBlur={() => {
              if (name === "") setNameAnimation("animate_label_down");
            }}
          />

          {/* Email */}
          <label htmlFor="mail" className={email_animation}>
            Email 📧
          </label>
          <input
            id="mail"
            type="email"
            value={email}
            onChange={handleEmailChange}
            onFocus={() => setEmailAnimation("animate_label_up")}
            onBlur={() => {
              if (email === "") setEmailAnimation("animate_label_down");
            }}
          />

          {/* Check rule */}
          <div style={{ marginTop: "20px", width: "100%" }}>
            <Select
              options={options}
              onChange={handleChange}
              styles={customStyles}
              placeholder="Select Role"
              isSearchable={false}
            />
          </div>

          {rule !== "university" ? (
            <>
              {/* Skills */}
              {/* <div style={{ marginTop: "20px", width: "100%" }}>
                <Select
                  styles={customStyles}
                  isMulti={true}
                  name="skills"
                  value={selectedOptions}
                  onChange={handleSelectedOptionsChange}
                  options={skillsOptions}
                  placeholder="Select Skills"
                  className="basic-multi-select"
                  classNamePrefix="select"
                />
              </div> */}

              {/* <div style={{ marginTop: "20px", width: "100%" }}>
                <Select
                  styles={customStyles}
                  isMulti={true}
                  name="languages"
                  value={selectedLang}
                  onChange={handleSelectedLangChange}
                  options={languageOptions}
                  placeholder="Select Language"
                  className="basic-multi-select"
                  classNamePrefix="select"
                />
              </div> */}

              <label htmlFor="edu" className={edu_animation}>
                Education 🎓
              </label>
              <input
                id="edu"
                type="text"
                value={edu}
                onChange={handleEduChange}
                onFocus={() => setEduAnimation("animate_label_up")}
                onBlur={() => {
                  if (edu === "") setEduAnimation("animate_label_down");
                }}
              />
            </>
          ) : null}

          {/* If the rule is university */}
          {rule === "university" ? (
            <>
              <label
                style={{
                  position: "relative",
                  top: "6px",
                  margin: "15px",
                  width: "100%",
                  height: "35px",
                  border: "1px solid silver",
                  borderRadius: "5px",
                  color: "gray",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                htmlFor="accreditation"
              >
                Accreditation 📂
              </label>
              <input
                id="accreditation"
                type="file"
                accept="image/jpeg,image/gif,image/png,application/pdf,image/x-eps"
                hidden
                onChange={handleAccreditationChange}
              />
            </>
          ) : (
            <>
              {/* Job title */}
              <div style={{ marginTop: "20px", width: "100%" }}>
                <Select
                  options={titleOptions}
                  onChange={handleTitleChange}
                  styles={customStyles}
                  placeholder="Select Title"
                  isSearchable={true} // Allow searching within options
                  isCreatable={false} // Disallow creating new options
                />
              </div>
            </>
          )}

          {/* About */}
          {/* <label htmlFor="about" className={about_animation}>
            About ℹ️
          </label>
          <input
            id="about"
            type="text"
            value={about}
            onChange={handleAboutChange}
            onFocus={() => setAboutAnimation("animate_label_up")}
            onBlur={() => {
              if (about === "") setAboutAnimation("animate_label_down");
            }}
          /> */}

          {/* Password */}
          <label
            onClick={() => {
              displayPassword === "password"
                ? setDisplayPassword("text")
                : setDisplayPassword("password");
            }}
            style={{ cursor: "pointer" }}
            htmlFor="password"
            className={password_animation}
          >
            Password🔒
          </label>
          <input
            id="password"
            type={displayPassword}
            value={password}
            onChange={handlePasswordChange}
            onFocus={() => setPasswordAnimation("animate_label_up")}
            onBlur={() => {
              if (password === "") setPasswordAnimation("animate_label_down");
            }}
          />
        </div>

        <button
          onClick={() => {
            Singup_user();
          }}
          className="make-signup"
          type="submit"
        >
          Signup
        </button>
        <Link to={"/"}>
          <button className="make-login">You have an account?</button>
        </Link>
      </form>
    </div>
  );
}
