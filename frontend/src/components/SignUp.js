import React from "react";
import {  useNavigate } from "react-router-dom";
function SignUp(props) {
  const navigate = useNavigate();
  const [credential, setCredential] = React.useState({
    name:"",
    email: "",
    password: "",
    cpassword:""
  });
  const handleSubmit = async (e) => {
  const  {name,email,password} = credential;
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/createUser", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({name,email,password}),
    });
    const json = await response.json();
    console.log(json);
    if(json.success){
       // Save the auth token and redirect
      localStorage.setItem('token',json.Authtoken);
      navigate("/")
      props.showAlert("Account created successfully","success");
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
      className="container d-flex flex-column justify-content-center align-items-center"
      style={{ height: "80vh" }}
    >
     
      <form
        className="p-4"
        style={{ border: "solid 2px", borderRadius: "15px" }}
        onSubmit={handleSubmit}
      >
         <h3 className="header">Create an account</h3>
        <div className="col-auto ">
          <label htmlFor="name" className="col-form-label">
            Name
          </label>
        </div>

        <div className="col-auto ">
          <input
            type="text"
            className="form-control"
            name="name"
            id="name"
            aria-describedby="emailHelp"
            onChange={onchange}
            required
          />
        </div>

        <div className="col-auto">
          <label htmlFor="email" className="col-form-label">
            Email address
          </label>
        </div>

        <div className="col-auto ">
          <input
            type="email"
            className="form-control"
            name="email"
            id="email"
            aria-describedby="emailHelp"
            onChange={onchange}
            required
          />
        </div>

        <div className="col-auto ">
          <span id="passwordHelpInline" className="form-text">
            We'll never share your email with anyone else.
          </span>
        </div>

        <div className="col-auto ">
          <label htmlFor="password" className="col-form-label">
            Password
          </label>
        </div>

        <div className="col-auto ">
          <input
            type="password"
            id="password"
            name="password"
            className="form-control"
            aria-describedby="passwordHelpInline"
            onChange={onchange}
            required
            minLength={8}
          />
        </div>
        <div className="col-auto ">
          <label htmlFor="CPassword" className="col-form-label">
            Confirm Password
          </label>
        </div>
        <div className="col-auto ">
          <input
            type="password"
            id="CPassword"
            name="cpassword"
            className="form-control"
            aria-describedby="passwordHelpInline"
            onChange={onchange}
            required
            minLength={8}
          />
        </div>
        <button type="submit" className="btn btn-primary mt-2">
          Submit
        </button>
      </form>
    </div>
  );
}

export default SignUp;
