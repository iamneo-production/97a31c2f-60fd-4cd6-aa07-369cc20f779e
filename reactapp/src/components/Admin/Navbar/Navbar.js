import React from "react";
import { NavLink ,useNavigate} from "react-router-dom";
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
     <NavLink to="/Firstpage">PG Admission</NavLink>
      <div className="navlinks-container">
      <NavLink id="adminInstitute" to="/admin/dashboard">Institute</NavLink>
        <NavLink id="adminCourse" to="/admin/viewCourse">Course</NavLink>
        <NavLink id="adminStudents" to="/admin/Viewstudent">Students</NavLink>
      </div>
      <button id="logout" type="submit" onClick={navigateToLogout}>
        Logout
      </button>
    </nav>
  );
};

export default NavBar;