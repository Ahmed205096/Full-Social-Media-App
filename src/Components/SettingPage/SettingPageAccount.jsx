import React, { useState } from "react";
import "./Style/SettingPage.css";
import { useParams } from "react-router-dom";
import {
  showTost,
  updateAnyAttribute,
} from "../APIs/RegistrationAPIs/RegistrationAPIs";
import Select from "react-select";
import {
  languageOptions,
  skillsOptions,
  titleOptions,
} from "../Registration/Signup/skillOptions";

export default function SettingsPageAccount() {
  const [about, setAbout] = useState("");
  const [edu, setEdu] = useState("");
  const [title, setTitle] = useState("");
  const [cv, setCV] = useState("");
  const [coverPhoto, setCoverPhoto] = useState(null);
  const [personalPhoto, setPersonalPhoto] = useState(null);

  const user_rule = localStorage.getItem("user_rule");
  const [selectedLang, setSelectedLang] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  // accreditation
  function handleTitleChange(event) {
    setTitle(event.value);
  }

  let { ID } = useParams();
  console.log(ID);

  //   export async function updateAnyAttribute(user_id, object_of_attributes)

  async function sendChanges() {
    const requestData = {
      about: about,
      title,
      cv,
      language: selectedLang,
      education: edu,
      skills: selectedOptions,
      user_img: personalPhoto,
      user_bg_img: coverPhoto,
    };

    // Filter out empty values
    const filteredRequestData = Object.fromEntries(
      Object.entries(requestData).filter(([_, value]) => {
        return value !== "" && value !== null;
      })
    );

    const data = await updateAnyAttribute(ID, filteredRequestData);
    if (data === 200 && Object.keys(filteredRequestData).length !== 0) {
      showTost("The update was successful");
    } else {
      showTost("No changes were made");
    }
  }

  const handleSelectedLangChange = (selected) => {
    if (selected.length < 4) setSelectedLang(selected);
  };
  const handleSelectedOptionsChange = (selected) => {
    if (selected.length < 5) setSelectedOptions(selected);
  };

  const handleSaveChanges = () => {
    sendChanges();
    setAbout("");
    setCV("");
    setEdu("");
    setTitle("");
    setSelectedLang("");
    setSelectedOptions("");
    setCoverPhoto(null);
    setPersonalPhoto(null);
  };

  const handleCoverImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setCoverPhoto(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleProfileImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setPersonalPhoto(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleCV = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setCV(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  //   For the react select
  const customStyles = {
    control: (provided) => ({
      ...provided,
      textAlign: "center",
      marginTop: "5px",
      marginBottom: "10px",
    }),
  };

  return (
    <div className="settings-container">
      <h1>Settings</h1>
      <div className="settings-section">
        <div style={{ display: "flex", width: "100%", flexWrap: "wrap" }}>
          <h2>Account Settings</h2>
          <p>
            "Just enter what you need to modify and don't worry about the rest"
          </p>
        </div>
        <div className="setting-item">
          <label htmlFor="title">Title:</label>
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
        </div>
        {/* About */}
        <div className="setting-item">
          <label htmlFor="about">About:</label>
          <textarea
            id="about"
            rows="3"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          ></textarea>
        </div>
        {/* Education */}
        <div className="setting-item">
          <label htmlFor="edu">Education:</label>
          <input
            type="text"
            id="edu"
            value={edu}
            onChange={(e) => setEdu(e.target.value)}
          />
        </div>
        {/* Language */}
        <div style={{ marginTop: "20px", marginBottom: "20px", width: "100%" }}>
          <label style={{ fontWeight: "bold" }} htmlFor="lang">
            Language:
          </label>
          <Select
            styles={customStyles}
            isMulti={true}
            id="lang"
            name="languages"
            value={selectedLang}
            onChange={handleSelectedLangChange}
            options={languageOptions}
            placeholder="Change Languages"
            className="basic-multi-select"
            classNamePrefix="select"
          />
        </div>

        {/* Skills */}
        <div style={{ marginTop: "20px", width: "100%" }}>
          <label style={{ fontWeight: "bold" }} htmlFor="skills">
            Skills:
          </label>
          <Select
            styles={customStyles}
            isMulti={true}
            id="skills"
            name="skills"
            value={selectedOptions}
            onChange={handleSelectedOptionsChange}
            options={skillsOptions}
            placeholder="Select Skills"
            className="basic-multi-select"
            classNamePrefix="select"
          />
        </div>

        <div className="files-upload-from-settings">
          {/* CV */}
          {user_rule !== "university" ? (
            <div className="setting-item">
              <label
                className="upload-cv-label"
                style={{ cursor: "pointer" }}
                htmlFor="cv"
              >
                Upload CV
              </label>
              <input type="file" id="cv" accept=".pdf" onChange={handleCV} />
            </div>
          ) : null}

          {/* Photo */}
          <div className="setting-item">
            <label
              className="upload-photo"
              style={{ cursor: "pointer" }}
              htmlFor="personalPhoto"
            >
              Upload Personal Photo
            </label>
            <input
              type="file"
              id="personalPhoto"
              accept="image/*"
              onChange={handleProfileImage}
            />
          </div>

          {/* Cover */}
          <div className="setting-item">
            <label
              className="upload-cover"
              style={{ cursor: "pointer" }}
              htmlFor="coverPhoto"
            >
              Upload Cover Photo
            </label>
            <input
              type="file"
              id="coverPhoto"
              accept="image/*"
              onChange={handleCoverImage}
            />
          </div>
        </div>
        <div className="setting-outer-container-button">
          <button className="save-button" onClick={handleSaveChanges}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
