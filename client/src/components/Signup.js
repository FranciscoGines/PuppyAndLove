import { Link } from "react-router-dom";
import React, { useState } from "react";
// import img from "../assets/img/PomeraniaToy.jpg";
import logo from "../assets/img/logo.png";
import axios from "axios";
// import { response } from "express";

const Signup = () => {
  let [info, setInfo] = useState({
    name: "",
    surname: "",
    birth_date: "",
    direction: "",
    email: "",
    password: "",
  });

  let [message, setMessage] = useState({
    text: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    let respuesta = await axios.post(
      "http://localhost:5000/user/Registration",
      info
    );
    console.log(respuesta.data);
    if (respuesta.data.user === "true") {
      window.localStorage.token = respuesta.data.token;
    } else {
      setMessage({
        text: respuesta.data.message,
      });
    }
  };

  const handleChange = (event) => {
    setInfo({
      ...info,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className="formularioRegistro">
      {console.log(info)}
      <img src={logo} alt="" />
      <Link to="/">Home</Link>
      <h2>Sign up</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            onChange={handleChange}
            placeholder="...."
          />
          <div>
            <label>Surname</label>
            <input
              type="text"
              name="surname"
              onChange={handleChange}
              placeholder="........"
            />
          </div>
          <div>
            <label>birth_date</label>
            <input
              type="text"
              name="birth_date"
              onChange={handleChange}
              placeholder="user@gmail.com"
            />
          </div>
          <div>
            <label>direction</label>
            <input
              type="text"
              name="direction"
              onChange={handleChange}
              placeholder="********"
            />
          </div>
          <div>
            <label>Email</label>
            <input
              type="text"
              name="email"
              onChange={handleChange}
              placeholder="1234 Main St"
            />
          </div>
          <div>
            <label>password</label>
            <input
              type="text"
              name="password"
              onChange={handleChange}
              placeholder="Apartment, studio, or floor"
            />
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="gridCheck"
            />
            <label>Recuerdame</label>
          </div>
          <button>Sign in</button>
          <span>{message.text}</span>
        </div>
      </form>
    </div>
  );
};

export default Signup;
