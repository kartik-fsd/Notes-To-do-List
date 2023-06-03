import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Typed from "typed.js";

function Login(props) {
  const navigate = useNavigate();
  const textRef = useRef(null);

  const [credential, setCredential] = useState({
    email: "",
    password: "",
  });
  const login = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credential.email,
        password: credential.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      // Save the auth token and redirect

      localStorage.setItem("token", json.authtoken);
      navigate("/");
      props.showAlert("Logged in Successfully", "success");
    } else {
      props.showAlert("inavlid credentials", "danger");
    }
  };
  const onchange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    const options = {
      strings: ["Login to continue...."],
      typeSpeed: 90, // typing speed in milliseconds
      showCursor: false, // hide the cursor
    };

    const typed = new Typed(textRef.current, options);

    return () => {
      typed.destroy(); // destroy the Typed instance on unmount
    };
  }, []);
  return (
    <div
      className="container  d-flex flex-column justify-content-center align-items-center"
      style={{ height: "50vh" }}
    >
      <h2 ref={textRef}></h2>
      <form
        className="p-4 mt-4"
        style={{
          border: "solid 2px #9db1e1",
          backgroundColor: "#9db1e1",
          boxShadow: "15px 15px 0px #394e74",
        }}
        onSubmit={login}
      >
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            value={credential.email}
            onChange={onchange}
            name="email"
            id="email"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            value={credential.password}
            onChange={onchange}
            name="password"
            id="password"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <p>
          Don't have an account? <Link to="/signup">Signup</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
