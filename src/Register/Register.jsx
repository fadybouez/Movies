import React, { useState } from "react";
import axios from "axios";
import Joi from "joi";
import { useNavigate } from "react-router-dom";

export default function Register() {
  let navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [errorList, setErrorList] = useState([]);

  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    age: 0,
    email: "",
    password: "",
  });

  // get data from form
  function getUser(e) {
    let myUser = { ...user };
    myUser[e.target.name] = e.target.value;
    setUser(myUser);
  }

  // post data in API
  async function submitRegister(e) {
    e.preventDefault();
    setIsLoading(true);
    let registerResult = validateRegistration(user);

    if (registerResult.error) {
      setIsLoading(false);
      setErrorList(registerResult.error.details);
    } else{
      let { data } = await axios.post("https://route-movies-api.vercel.app/signup",user);
    if(data.message === 'success'){
      navigate("/login");
      setIsLoading(false);
    }
    else {
        setError(data.message);
        setIsLoading(false);
      }
    }
  }

  // validate in inputs
  function validateRegistration(user) {
    let schema = Joi.object({
      first_name: Joi.string().alphanum().min(3).max(8).required(),
      last_name: Joi.string().alphanum().min(3).max(8).required(),
      age: Joi.number().min(16).max(70).required(),
      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      }),
      password: Joi.string().pattern(/^[A-Z][a-z]{3,8}$/),
    });
    return schema.validate(user, { abortEarly: false });
  }

  return (
    <div className="w-75 mx-auto">
      <h2 className="my-3">Register Now</h2>
      {error ? <div className="bg-danger p-2 alert">{error} </div> : ""}
      {errorList.map((error, index) => {
        if (index === 4) {
          return <div className="bg-danger p-2 alert">Password invalid </div>;
        } else {
          return (
            <div key={index} className="bg-danger alert p-2">
              {error.message}
            </div>
          );
        }
      })}
      <form onSubmit={submitRegister}>
        <label htmlFor="first_name">first_name :</label>
        <input
          onChange={getUser}
          type="text"
          className="form-control my-3 "
          name="first_name"
          id="first_name"
        />

        <label htmlFor="last_name">last_name :</label>
        <input
          onChange={getUser}
          type="text"
          className="form-control my-3 "
          name="last_name"
          id="last_name"
        />

        <label htmlFor="age">age :</label>
        <input
          onChange={getUser}
          type="number"
          className="form-control my-3"
          name="age"
          id="age"
        />

        <label htmlFor="email">email :</label>
        <input
          onChange={getUser}
          type="email"
          className="form-control my-3"
          name="email"
          id="email"
        />

        <label htmlFor="password">password :</label>
        <input
          onChange={getUser}
          type="password"
          className="form-control my-3"
          name="password"
          id="password"
        />

        <button
          onClick={submitRegister}
          type="submit"
          className="btn btn-outline-info"
        >
          {isLoading ? 
            <i className="fa-solid fa-spinner fa-spin-pulse"></i>
           : 
            "register"
          }
        </button>
      </form>
    </div>
  );
}
