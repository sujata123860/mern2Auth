import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { handleSuccess, handleError } from "../utils/utils.jsx";
export default function Login() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const validate = () => {
    let newCheckErrors = {};
    if (!loginData.email) {
      newCheckErrors.email = "Email is reuired";
    }
    if (!loginData.password) {
      newCheckErrors.password = "Password is required";
    } else {
      newCheckErrors.password = "Password must be at least 8 characters";
    }
    setErrors(newCheckErrors);
    return Object.keys(newCheckErrors).length === 0;
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      if (validate()) {
        console.log("test1");
        const { email, password } = loginData;
        const response = await fetch("http://localhost:8080/auth/login", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
          handleError("Not Authorized");
        }

        const data = await response.json();
        if (data.success) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("LoggedIn");
          handleSuccess("Logged in succefully");
          navigate("/dashboard");
        }
      }
    } catch (err) {
      handleError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="main">
      <div className="signup">
        <label htmlFor="chk" aria-hidden="true">
          Login
        </label>
        <form onSubmit={handleLogin}>
          <div>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter you email"
              value={loginData.email}
              onChange={(e) =>
                setLoginData({ ...loginData, email: e.target.value })
              }
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>
          <div>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your Password"
              value={loginData.password}
              onChange={(e) =>
                setLoginData({ ...loginData, password: e.target.value })
              }
            />
            {errors.password && <p className="error">{errors.password}</p>}
          </div>
          <button type="submit">Submit</button>
        </form>
        <div className="signuplink">
          <p className="paralogin">
            Don't have an account ? <Link to="/signup"> Sign In </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
