import React, { useEffect, useState } from "react";
import "../Login/Style/Login-Style.css";
import { Link, useNavigate } from "react-router-dom";
import {
  Authorization,
  AuthorizeUniversity,
  getUserRule,
  searchUserByEmail,
} from "../../APIs/RegistrationAPIs/RegistrationAPIs";
import { toast } from "react-toastify";

export default function Login() {
  const [isUniversity, setIsUniversity] = useState(false);

  function handleSwitchChange() {
    setIsUniversity(!isUniversity);
    if (isUniversity) {
      localStorage.setItem("user_rule", "university");
    }
  }

  const [email, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [email_animation, setEmailAnimation] = useState("");
  const [password_animation, setPasswordAnimation] = useState("");

  const [displayPassword, setDisplayPassword] = useState("password");

  const [isAuth, setIsAuth] = useState();

  const [userId, setUserId] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    async function handleRules() {
      const rule = await getUserRule(email);
      console.log(rule);
      localStorage.setItem("user_rule", rule);
    }
    handleRules();
  }, [email]);
  function handleUsernameChange(event) {
    setUsername((currentEmail) => {
      console.log(event.target.value); // This will log the current value being typed
      return event.target.value;
    });
  }

  function handlePasswordChange(event) {
    setPassword((currentPassword) => {
      console.log(event.target.value); // This will log the current value being typed
      return event.target.value;
    });
  }

  useEffect(() => {
    async function getID() {
      const id = await searchUserByEmail(email);
      setUserId(id);
      localStorage.setItem("user_id", id);
    }
    getID();
  }, [email, userId]);

  function handleSubmit(event) {
    event.preventDefault();
  }

  // User Authentication Fuction
  async function auth_user() {
    if (!isUniversity) {
      const data = await Authorization(email, password);
      setIsAuth(data);
    } else {
      const data2 = await AuthorizeUniversity(email, password);
      setIsAuth(data2);
    }
  }

  auth_user();

  const [showError, setSowError] = useState(false);

  useEffect(() => {
    if (showError) {
      toast.error("The email or password is incorrect.", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setSowError(false);
    }
  }, [showError]);

  return (
    <div className="login-outer-container">
      <div className="login-website-logo">
        <img src="/Assets/logo.png" alt="logo" className="login-logo" />
        <p>Academic Linkup: Revolutionizing Education In Egypt </p>
      </div>

      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-title">Login</h2>
        <div className="login-form-group">
          <label htmlFor="mail" className={email_animation}>
            Email📧
          </label>
          <input
            autoFocus
            id="mail"
            type="text"
            value={email}
            onChange={handleUsernameChange}
            onFocus={() => setEmailAnimation("animate_label_up")}
            onBlur={() => {
              if (email === "") setEmailAnimation("animate_label_down");
            }}
          />
        </div>
        <div className="login-form-group">
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
        {isAuth !== false ? (
          // <Link to={"/home"}>
          <button
            onClick={() => {
              setTimeout(() => {
                if (+userId !== 0 && !Number.isNaN(+userId)) auth_user();
                try {
                  console.log(isAuth);
                  if (+userId) {
                    navigate(`/home/${+userId + 1772002}`, {
                      state: { userID: +isAuth.id },
                    });
                  } else {
                    toast("An error occurred, please try again.");
                  }
                } catch (e) {}
              }, 2000);
            }}
            className="make-login"
            type="submit"
          >
            Login
          </button>
        ) : (
          // </Link>
          <button
            onClick={() => {
              setSowError(true);
            }}
            className="make-login"
            type="submit"
          >
            Login
          </button>
        )}
        {/* Updated JSX for radio buttons */}

        <Link to={"/signup"}>
          <button className="make-signup">Make an account</button>
        </Link>
      </form>
    </div>
  );
}
