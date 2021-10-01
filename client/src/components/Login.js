import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/img/logo.png";

const Login = () => {
  let [info, setInfo] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setInfo({
      ...info,
      [event.target.name]: event.target.value,
    });
  };
  return (
    <div className="Login-container">
      <img className="img" src={logo} alt="" />
      <div className="linkhome">
      <Link to="/">Home</Link>
      </div>
        <div className="linksignup">
        <Link to="/">Signup</Link>
        </div>
      <h2 className="title">login</h2>
      <form>
        <div class="">
          
          <label for="exampleInputEmail1">Email address</label>
          
          <input
            type="text"
            name="email"
            onChange={handleChange}
            placeholder="Enter email"
          />
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input type="text" name="password" onChange={handleChange} placeholder="Password"/>
        </div>
        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>
      
    </div>
     

  );
};
export default Login;
