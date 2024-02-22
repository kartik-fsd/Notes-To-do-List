import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  let location = useLocation();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <nav
        className="navbar sticky-top navbar-expand-lg "
        style={{ backgroundColor: "#9db2e0" }}
      >
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img
              src="./notes.png"
              alt="Bootstrap"
              width="30"
              height="24"
              className="d-inline-block align-text-top"
            />
            MY NOTES
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
          {/* if content needed to be at centre use:  justify-content-center erase me-auto in ul tag */}
          <div
            className="collapse navbar-collapse "
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/About" ? "active" : ""
                  }`}
                  to="/About"
                >
                  About
                </Link>
              </li>
            </ul>
            {!localStorage.getItem("token") ? (
              <form className="d-flex" role="search">
                <Link
                  className="btn btn-light btn-sm mx-3"
                  to="/login"
                  role="button"
                  aria-disabled="true"
                >
                  Login
                </Link>
                <Link
                  className="btn btn-light btn-sm mx-3"
                  to="/signup"
                  role="button"
                  aria-disabled="true"
                >
                  SignUp
                </Link>
              </form>
            ) : (
              <button className="btn btn-light" onClick={handleLogout}>
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
