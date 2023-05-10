import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { store } from "../../../store";

import "./Navbar.css";
const NavBar = () => {
  const navigate = useNavigate();

  const navigateToLogout = () => {
    store.dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  return (
    <nav className="nav-container">
      <NavLink to="/admin/dashboard">PG Admission</NavLink>
      <div className="navlinks-container">
        <NavLink to="/admin/dashboard">Institute</NavLink>
        <NavLink to="/admin/viewCourse">Course</NavLink>
        <NavLink to="/admin/Viewstudent">Students</NavLink>
      </div>
      <button
        type="submit"
        onClick={navigateToLogout}
        style={{ cursor: "pointer" }}
      >
        Logout
      </button>
    </nav>
  );
};

export default NavBar;
