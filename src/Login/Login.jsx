import React, { useState } from "react";
import axios from "axios";
import Joi from "joi";
import { useNavigate } from "react-router-dom";

export default function Login(props) {
  let navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [errorList, setErrorList] = useState([]);

  const [user, setUser] = useState({
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
  async function submitLogin(e) {
    e.preventDefault();
    setIsLoading(true);
    let LoginResult = validateRegistration(user);

    if (LoginResult.error) {
      setIsLoading(false);
      setErrorList(LoginResult.error.details);
    } else{
      let { data } = await axios.post("https://route-movies-api.vercel.app/signin",user);
    if(data.message === 'success')
    {
      localStorage.setItem('userToken',data.token)
      navigate("/home");
      props.userData()
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
      <h2 className="my-3">Login Now</h2>
      {error ? <div className="bg-danger p-2 alert">{error} </div> : ""}
      {errorList.map((error, index) => {
        if (index === 0) {
          return <div className="bg-danger p-2 alert">Password invalid </div>;
        } else {
          return (
            <div key={index} className="bg-danger alert p-2">
              {error.message}
            </div>
          );
        }
      })}
      <form onSubmit={submitLogin}>
  
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
          onClick={submitLogin}
          type="submit"
          className="btn btn-outline-info"
        >
          {isLoading ? <i className="fa-solid fa-spinner fa-spin-pulse"></i>:"Login"}
        </button>
      </form>
    </div>
  );
}
