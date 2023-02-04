import { useState } from "react";
import EmailValidator from "email-validator";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function Login() {
  const [isVisible, setVisible] = useState(false);
  const [loginMethod, setLoginMethod] = useState("email");

  const [usernameAlert, setUsernameAlert] = useState("");
  const [emailAlert, setEmailAlert] = useState("");
  const [passwordAlert, setPasswordAlert] = useState("");

  const [usernameError, setUsernameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const [loggedIn, setLoggedIn] = useState(false);

  function toggleVisibility() {
    setVisible(!isVisible);
  }

  


  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validateForm(e);
    if (isValid) {
        setLoggedIn(true);
    }


  };

  const validateForm = (e) => {
    const data = new FormData(e.target);
    if (loginMethod === "email") {
        
        const email = data.get("email");
        if (email !== "" && !EmailValidator.validate(email)) {
            setEmailAlert("Please enter a valid email address");
            setEmailError(true);
            return false;
        }
    }
    if (loginMethod === "username") {
        const username = data.get("username");
        if (username.length < 5 || username.length > 20) {
            setUsernameAlert("Username must be between 5 and 20 characters");
            setUsernameError(true);
            return false;
        }
        const isAlphaNumeric = /^[a-zA-Z0-9_]+$/.test(username);
        if (!isAlphaNumeric) {
            setUsernameAlert("Username must be alphanumeric");
            setUsernameError(true);
            return false;
        }


    }
    const password = data.get("password");
    if (password.length < 8 || password.length > 25) {
        setPasswordAlert("Password must be between 8 and 25 characters");
        setPasswordError(true);
        return false;

    }
    const hasLowercase = /[a-z]/.test(password);
    if (!hasLowercase) {
        setPasswordAlert("Password must contain at least one lowercase letter");
        setPasswordError(true);
        return false;
    }
    const hasUppercase = /[A-Z]/.test(password);
    if (!hasUppercase) {
        setPasswordAlert("Password must contain at least one uppercase letter");
        setPasswordError(true);
        return false;
    }
    const hasNumber = /\d/.test(password);
    if (!hasNumber) {
        setPasswordAlert("Password must contain at least one number");
        setPasswordError(true);
        return false;
    }
    const hasSpecial = /[!@#%^&*()_+\-=[\]{};':"\\|,.<>/?`~]/.test(password);
    if (!hasSpecial) {
        setPasswordAlert("Password must contain at least one special character");
        setPasswordError(true);
        return false;
    }
    if (!usernameError && !emailError && !passwordError) {
        return true;
    }

    console.log(usernameError, emailError, passwordError)
            
  }
  return (
    <section>
      <h1 className="text-3xl font-bold underline">React Form</h1>
     {
        loggedIn ? (
            <div className="text-center">
                <h2 className="text-2xl font-bold">You are logged in!</h2>
                <button className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700" onClick={() => setLoggedIn(false)}>Log Out</button>
            </div>
        ) : (
        <>
                          <div>

                              <button onClick={() => setLoginMethod("email")}>
                                  Login with email
                              </button>
                              <button onClick={() => setLoginMethod("username")}>
                                  Login with username
                              </button>
                          </div>
                          <form onSubmit={handleSubmit}>
                              {loginMethod === "email" && (
                                  <div>
                                      <div>
                                          <label htmlFor="email">Email</label>
                                          <input
                                              type="email"
                                              id="email"
                                              name="email"
                                              required
                                              className="border border-gray-400"
                                              autoComplete="email"
                                              placeholder="Email"
                                          />

                                          {emailError && <p className="text-red-500">{emailAlert}</p>}
                                      </div>
                                      <div>
                                          <label htmlFor="password">Password</label>
                                          <input
                                              type={isVisible ? "text" : "password"}
                                              id="password"
                                              name="password"
                                              required
                                              className="border border-gray-400"
                                              autoComplete="current-password"
                                              placeholder="Password"
                                          />
                                          <span>
                                              <FontAwesomeIcon
                                                  icon={isVisible ? faEye : faEyeSlash}
                                                  onClick={toggleVisibility}
                                              />
                                          </span>

                                          {passwordError && <p className="text-red-500">{passwordAlert}</p>}
                                      </div>
                                  </div>
                              )}

                              {loginMethod === "username" && (
                                  <div>
                                      <div>
                                          <label htmlFor="username">Username</label>
                                          <input
                                              type="text"
                                              id="username"
                                              name="username"
                                              required
                                              className="border border-gray-400"
                                              autoComplete="username"
                                              placeholder="Username"
                                          />

                                          {usernameError && <p className="text-red-500">{usernameAlert}</p>}
                                      </div>
                                      <div>
                                          <label htmlFor="password">Password</label>
                                          <input
                                              type={isVisible ? "text" : "password"}
                                              id="password"
                                              name="password"
                                              required
                                              className="border border-gray-400"
                                              autoComplete="current-password"
                                              placeholder="Password"
                                          />
                                          <span>
                                              <FontAwesomeIcon
                                                  icon={isVisible ? faEye : faEyeSlash}
                                                  onClick={toggleVisibility}
                                              />
                                          </span>
                                          {/* show password error if it's availabale */}
                                          {passwordError && <p className="text-red-500">{passwordAlert}</p>}
                                      </div>
                                  </div>
                              )}

                              <button
                                  type="submit"
                                  className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
                              >
                                  Submit
                              </button>
                          </form>
                          </>
            )
     }
    </section>
  );
}

export default Login;
