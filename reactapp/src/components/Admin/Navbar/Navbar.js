import React from "react";
import { NavLink } from "react-router-dom";
import { UseLogout } from "../../../hooks/UseLogout";
import './Navbar.css';
const NavBar = () => {

  const { logout } = UseLogout();

  const navigateToLogout = () => {
    logout()
  };

  return (
    <nav className="nav-container">
      <h1>PG Admission</h1>
      <div className="navlinks-container">
        <NavLink to="/admin/dashboard">Institute</NavLink>
        <NavLink to="/admin/viewCourse">Course</NavLink>
        <NavLink to="/admin/Viewstudent">Students</NavLink>
      </div>
      <button type="submit" onClick={navigateToLogout} style={{cursor: 'pointer'}}>
        Logout
      </button>
    </nav>
  );
};

export default NavBar;