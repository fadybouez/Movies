import React from "react";
import { Link } from "react-router-dom";
import Styles from './navbar.css'
export default function Navbar(props) {

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark  bg-transparent">
        <div className="container-fluid">
          <Link className="navbar-brand fw-bolder" to="home">
            MOVIES
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {props.userData?<>  <li className="nav-item">
                <Link className="nav-link" to="home">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="about">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="network">
                  Network
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="movies">
                  Movies
                </Link>
              </li></>:''}
            
            </ul>

            <ul className="navbar-nav mb-2 mb-lg-0">
            <li className="nav-item d-flex align-items-center me-3">
              <i className="fab mx-2 fa-instagram"></i>
              <i className="fab mx-2 fa-facebook"></i>
              <i className="fab mx-2 fa-youtube"></i>
              <i className="fab mx-2 fa-spotify"></i>
              </li>
              {props.userData? <li className="nav-item">
                <button className="Styles Btn" onClick={props.logout}>
                  <div className="Styles sign"><svg viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path></svg></div>
                  <div className="Styles text">Logout</div>
                </button>

              </li>:<><li className="nav-item">
                <Link className="nav-link" to="register">
                Register
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="login">
                  Login
                </Link>
              </li></>}
              
             
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
