import React,{useState} from "react";
import {  useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Login(props) {
  const navigate = useNavigate();
  const [credential, setCredential] = useState({
    email: "",
    password: "",
  });
  const login = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: credential.email,
        password: credential.password,
      }),
    });
    const json = await response.json();
    console.log(json)
    if(json.success){
       // Save the auth token and redirect
       
      localStorage.setItem('token',json.authtoken);
      navigate("/")
      props.showAlert("Logged in Successfully","success");
  }
    else{
      props.showAlert("inavlid credentials","danger");
    }
  };
  const onchange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
  };



  return (
    <div
    className="container  d-flex flex-column justify-content-center align-items-center"
    style={{ height: "50vh" }}
  >
      <h2>Login to continue....</h2>
      <form className="p-4" style={{ border: "solid 2px", borderRadius: "15px" }} onSubmit={login}>
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
        <button type="submit" className="btn btn-primary" >
          Submit
        </button>
        <p>Don't have an account? <Link to="/signup">Signup</Link></p>
      </form>
    </div>
  );
}

export default Login;









 