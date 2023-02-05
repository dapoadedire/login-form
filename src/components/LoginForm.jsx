import { useState } from "react";
import EmailValidator from "email-validator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import ctl from "@netlify/classnames-template-literals";

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


    function resetAllErrors() {
        setUsernameError(false);
        setEmailError(false);
        setPasswordError(false);
    }


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
        const username = data.get("username") || "";
        const email = data.get("email") || "";
        const password = data.get("password");

        if (password.length < 8 || password.length > 25) {
            setPasswordAlert("Password must be between 8 and 25 characters");
            setPasswordError(true);
        }
        const hasLowercase = /[a-z]/.test(password);
        if (!hasLowercase) {
            setPasswordAlert("Password must contain at least one lowercase letter");
            setPasswordError(true);
        }
        const hasUppercase = /[A-Z]/.test(password);
        if (!hasUppercase) {
            setPasswordAlert("Password must contain at least one uppercase letter");
            setPasswordError(true);
        }
        const hasNumber = /\d/.test(password);
        if (!hasNumber) {
            setPasswordAlert("Password must contain at least one number");
            setPasswordError(true);
        }
        const hasSpecial = /[!@#%^&*()_+\-=[\]{};':"\\|,.<>/?`~]/.test(password);
        if (!hasSpecial) {
            setPasswordAlert("Password must contain at least one special character");
            setPasswordError(true);
        }

        if (
           
            password.length >= 8 &&
            password.length <= 25 &&
            hasLowercase &&
            hasUppercase &&
            hasNumber &&
            hasSpecial
        ) {
           
            setPasswordAlert("");
            setPasswordError(false);
        }

        if (loginMethod === "email") {
            if (email !== "" && !EmailValidator.validate(email)) {
                setEmailAlert("Please enter a valid email address");
                setEmailError(true);
            }

            if (
                EmailValidator.validate(email) &&
                password.length >= 8 &&
                password.length <= 25 &&
                hasLowercase &&
                hasUppercase &&
                hasNumber &&
                hasSpecial
            ) {
                setLoggedIn(true);
                setEmailAlert("");
                setEmailError(false);
                setPasswordAlert("");
                setPasswordError(false);
            }
        }
        if (loginMethod === "username") {
            if (username.length < 5 || username.length > 20) {
                setUsernameAlert("Username must be between 5 and 20 characters");
                setUsernameError(true);
            }
            const isAlphaNumeric = /^[a-zA-Z0-9_]+$/.test(username);
            if (!isAlphaNumeric) {
                setUsernameAlert("Username must be alphanumeric");
                setUsernameError(true);
            }

            if (
                username.length >= 5 &&
                username.length <= 20 &&
                isAlphaNumeric){

                setUsernameAlert("");
                setUsernameError(false);

                }

            if (
                username.length >= 5 &&
                username.length <= 20 &&
                isAlphaNumeric &&
                password.length >= 8 &&
                password.length <= 25 &&
                hasLowercase &&
                hasUppercase &&
                hasNumber &&
                hasSpecial
            ) {
                setLoggedIn(true);
                setUsernameAlert("");
                setUsernameError(false);
                setPasswordAlert("");
                setPasswordError(false);
            }
        }
    };
    return (
        <section>

            {loggedIn ? (
                <div>
                    <h2 >You are logged in!</h2>

                    <button

                        onClick={
                            () => {
                                setLoggedIn(false);
                                resetAllErrors();
                            }
                        
                        }
                    >
                        Log Out
                    </button>
                </div>
            ) : (

                <div>
                    

                    <form onSubmit={handleSubmit}

                    className={formStyles}

                    >
                            <div
                            className={loginMethodStyles}
                            >
                                <button onClick={() => {
                                    setLoginMethod("email");
                                    resetAllErrors();
                                }}
                            className={loginMethod === "email" ? activeLoginMethodButtonStyles : loginMethodButtonStyles}
                                

                                >
                                    Login with email
                                </button>
                                <button onClick={() => {
                                    setLoginMethod("username");
                                    resetAllErrors();
                                }
                            }
                                className={loginMethod === "username" ? activeLoginMethodButtonStyles : loginMethodButtonStyles}
                            

                                >
                                    Login with username
                                </button>


                            </div>
                        {loginMethod === "email" && (
                            <>
                                <div
                                        className={inputContainerStyles}

                                >
                                    <label htmlFor="email"
                                            className={labelSyles}
                                    >Email:</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        autoComplete="email"
                                        placeholder="Email"
                                        className={inputStyles}
                                    />

                                        {emailError && <p className={inputErrorStyles}>{emailAlert}</p>}
                                </div>
                                    <div className={inputContainerStyles}>
                                    <label htmlFor="password"
                                            className={labelSyles}
                                    >Password:</label>
                                    <input
                                        type={isVisible ? "text" : "password"}
                                        id="password"
                                        name="password"
                                        required

                                        autoComplete="current-password"
                                        placeholder="Password"
                                            className={inputStyles}

                                    />
                                    <span>
                                        <FontAwesomeIcon
                                            icon={isVisible ? faEye : faEyeSlash}
                                            onClick={toggleVisibility}
                                                className={toggleVisibilityIconStyles}
                                        />
                                    </span>

                                    {passwordError && (
                                            <p className={inputErrorStyles}>{passwordAlert}</p>
                                    )}
                                </div>
                            </>
                        )}

                        {loginMethod === "username" && (
                            <>
                                <div
                                className={inputContainerStyles}
                                >
                                    <label htmlFor="username"
                                            className={labelSyles}
                                    >Username:</label>
                                    <input
                                        type="text"
                                        id="username"
                                        name="username"
                                        required

                                        autoComplete="username"
                                        placeholder="Username"
                                            className={inputStyles}

                                    />

                                    {usernameError && (
                                        <p  className= {inputErrorStyles}>{usernameAlert}</p>
                                    )}
                                </div>
                                    <div className={inputContainerStyles}>
                                    <label htmlFor="password"
                                    className={labelSyles}
                                    >Password:</label>
                                    <input
                                        type={isVisible ? "text" : "password"}
                                        id="password"
                                        name="password"
                                        required

                                        autoComplete="current-password"
                                        placeholder="Password"
                                            className={inputStyles}
                                    />
                                    <span>
                                        <FontAwesomeIcon
                                            icon={isVisible ? faEye : faEyeSlash}
                                            onClick={toggleVisibility}
                                            className={toggleVisibilityIconStyles}
                                        />
                                    </span>
                                    
                                    {passwordError && (
                                            <p className= {inputErrorStyles}>{passwordAlert}</p>
                                    )}
                                </div>
                            </>
                        )}

                        <button
                            type="submit"
                            className={submitButtonStyles}
                        >
                            Log In
                        </button>
                    </form>
                </div>
            )
            }


        </section >
    );
}


const formStyles = ctl(`
    mx-auto mt-10
    flex
    w-full
    max-w-sm
    flex-col
    rounded-lg
    border
    bg-white
    p-6
    shadow-xl
`);

const inputStyles = ctl(`
    rounded
    border
    border-gray-400
    p-2
    pr-14
    text-base
    placeholder:text-sm
    placeholder:text-gray-400
    
    focus:border-blue-500

    focus:outline-none
    focus:ring-1
    focus:ring-blue-500
    

    

    

`);

const inputContainerStyles = ctl(`
    relative
    mb-4
    flex
    flex-col
`);


const labelSyles = ctl(`
    mb-1
    text-base
    font-bold
    text-gray-700
`);


const toggleVisibilityIconStyles = ctl(`
    absolute
    right-1
    top-8
    m-2
    cursor-pointer
    text-gray-400
    hover:text-gray-600
`);


const inputErrorStyles = ctl(`
    mt-1
    text-sm
    text-red-500
`);


const submitButtonStyles = ctl(`
    max-w-max
    rounded
    bg-blue-500
    py-2
    px-4
    font-bold
    text-white
    hover:bg-blue-600
    focus:outline-none
`);


const loginMethodStyles = ctl(`
    mb-4
    flex-1
    justify-center
    space-x-4
    text-sm
    font-bold
    text-gray-500
`);

const loginMethodButtonStyles = ctl(`
    rounded
    border
    border-gray-400
    p-2
    font-bold
    text-gray-500
    hover:bg-gray-100
    focus:outline-none
    focus:ring-1
    focus:ring-blue-500
    
`);


const activeLoginMethodButtonStyles = ctl(`
    rounded
    border
    border-blue-500
    p-2
    font-bold
    text-blue-500
    hover:bg-blue-100
    focus:outline-none
    focus:ring-1
    focus:ring-blue-500
    
`);



export default Login;
