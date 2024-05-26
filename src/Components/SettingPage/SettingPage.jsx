import React, { useEffect, useState } from "react";
import "./Style/SettingPage.css";
import { useParams } from "react-router-dom";
import {
  showTost,
  updateAnyAttribute,
} from "../APIs/RegistrationAPIs/RegistrationAPIs";
import { get_user_password } from "../APIs/SearchAPIs/SearchAPI";

export default function SettingsPage() {
  const [showPass, setShowPass] = useState("password");
  const [showOldPass, setOldShowPass] = useState("password");
  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [name, setName] = useState("");

  const [correctOldPassword, setCorrectOldPassword] = useState("");

  let { ID } = useParams();

  useEffect(() => {
    async function setOldPass() {
      const data = await get_user_password(ID);
      setCorrectOldPassword(data);
    }
    setOldPass();
  }, [ID, correctOldPassword, oldPassword]);

  async function sendChanges() {
    if (
      correctOldPassword === oldPassword ||
      (oldPassword.trim() === "" && password.trim() === "")
    ) {
      const requestData = {
        password,
        name: name,
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
    } else {
      showTost("The old password is incorrect");
    }
  }

  const handleSaveChanges = () => {
    sendChanges();
    setPassword("");
    setOldPassword("");
    setName("");
  };

  return (
    <div className="settings-container">
      <h1>Settings</h1>
      <div className="settings-section">
        <div style={{ display: "flex", width: "100%", flexWrap: "wrap" }}>
          <h2>Privacy Settings</h2>
          <p>
            "Just enter what you need to modify and don't worry about the rest"
          </p>
        </div>
        {/* Password */}
        <div className="setting-item">
          <label
            onClick={() => {
              if (showPass === "password") setShowPass("text");
              else setShowPass("password");
            }}
            style={{ cursor: "pointer" }}
            htmlFor="password"
          >
            {password === "" ? "Change Password:" : "Show New 👁️‍🗨️"}
          </label>
          <input
            type={showPass}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Old Password */}
        <div className="setting-item">
          <label
            onClick={() => {
              if (showOldPass === "password") setOldShowPass("text");
              else setOldShowPass("password");
            }}
            style={{ cursor: "pointer" }}
            htmlFor="password"
          >
            {oldPassword === "" ? "Old Password:" : "Show Old 👁️‍🗨️"}
          </label>
          <input
            type={showOldPass}
            id="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </div>

        {/* Name */}
        <div className="setting-item">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <button className="save-button" onClick={handleSaveChanges}>
          Save Changes
        </button>
      </div>
    </div>
  );
}
