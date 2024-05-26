import React, { useEffect, useState } from "react";
import "./AddNewJob.css";
import { makeJobApp } from "../APIs/RegistrationAPIs/RegistrationAPIs";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Select from "react-select";
import { titleOptions } from "../Registration/Signup/skillOptions";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";

function AddNewJob() {
  const userID = localStorage.getItem("user_id");

  const [title, setTitle] = useState("");
  const [department, setDepartment] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [requirements, setRequirements] = useState("");
  const [deadline, setDeadline] = React.useState(null);

  const handleTitleChange = (event) => {
    setTitle(event.value);
  };
  const handleDepartmentChange = (event) => {
    setDepartment(event.target.value);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleRequirementsChange = (event) => {
    setRequirements(event.target.value);
  };

  // const handleDeadlineChange = (event) => {
  //   setDeadline(event.target.value);
  // };

  const handelDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const [showSucces, setShowSucces] = useState(false);

  useEffect(() => {
    if (showSucces) {
      toast.success("Added Successfully.", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setShowSucces(false);
    }
  }, [showSucces]);

  const handleSubmit = () => {
    if (
      title &&
      department &&
      description &&
      location &&
      requirements &&
      deadline
    ) {
      try {
        makeJobApp(
          userID,
          title,
          department,
          location,
          description,
          requirements,
          deadline
        );
        setShowSucces(true);
        setTitle("");
        setDepartment("");
        setDescription("");
        setLocation("");
        setRequirements("");
        setDeadline("");
      } catch (err) {}
    }
  };

  //   For the react select
  const customStyles = {
    control: (provided) => ({
      ...provided,
      textAlign: "center",
    }),
  };

  return (
    <div className="add-job-outer-container">
      <div className="add-job-container">
        <div className="add-job-title">New Opportunity</div>

        <label className="add-job-upload-image">
          Please fill out all the fields
        </label>

        {/* <input
          onChange={handleTitleChange}
          type="text"
          value={title}
          placeholder="Job Title"
          className="add-job-input"
        /> */}

        <div style={{ marginTop: "20px", marginBottom: "20px", width: "100%" }}>
          <Select
            options={titleOptions}
            onChange={handleTitleChange}
            styles={customStyles}
            placeholder="Select Title"
            isSearchable={true} // Allow searching within options
            isCreatable={false} // Disallow creating new options
          />
        </div>
        <textarea
          onChange={handelDescriptionChange}
          value={description}
          placeholder="Job Description"
          className="add-job-input"
        ></textarea>

        <input
          value={department}
          onChange={handleDepartmentChange}
          type="text"
          placeholder="Department"
          className="add-job-input"
        />

        <input
          value={location}
          onChange={handleLocationChange}
          type="text"
          placeholder="Location"
          className="add-job-input"
        />

        <textarea
          value={requirements}
          onChange={handleRequirementsChange}
          placeholder="Required Qualifications"
          className="add-job-input"
          style={{ height: "100px" }}
        ></textarea>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <MobileDateTimePicker
            sx={{ width: "100%", marginBottom: "10px" }}
            onChange={(newValue) => {
              setDeadline(newValue);
            }}
            label="Set Deadline"
            onError={console.log}
            inputFormat="DD/MM/YYYY HH:mm"
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>

        <button onClick={handleSubmit} className="add-job-button">
          Add
        </button>
        <Link to={"/show-apps"}>
          <button className="show-job-button">Show all applications</button>
        </Link>
      </div>
    </div>
  );
}

export default AddNewJob;
