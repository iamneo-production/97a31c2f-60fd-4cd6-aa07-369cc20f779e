import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { store } from "../../../store";

import './Navbar.css';
const NavBar = () => {

  const navigate = useNavigate();

  const navigateToLogout = () => {
    store.dispatch({ type: 'LOGOUT' })
    navigate('/login');
  }

  return (
    <nav className="nav-container">
      <div>
        <NavLink to="/Firstpage" >
          <h2 className="pg-admission-heading">PG Admission</h2>
        </NavLink>
      </div>
      <div className="navlinks-container">
        <NavLink to="/admin/dashboard">Institutes</NavLink>
        <NavLink to="/admin/viewCourse">Courses</NavLink>
        <NavLink to="/admin/Viewstudent">Students</NavLink>
      </div>
      <button type="submit" onClick={navigateToLogout}>
        Logout
      </button>
    </nav>
  );
};

export default NavBar;