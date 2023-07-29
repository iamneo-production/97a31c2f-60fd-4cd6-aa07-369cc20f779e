import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { store } from "../../../store";

import "./Navbar.css";

const NavBar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const navigate = useNavigate();

  const navigateToLogout = () => {
    store.dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  return (
    <div>
      <div className="icon-container">
        <i
          className={`fa-solid fa-bars ${isSidebarOpen ? "icon-hidden" : ""}`}
          onClick={toggleSidebar}
        ></i>
        <NavLink to="/Firstpage" className="nav-pg">
          <h1><i class="fa-solid fa-graduation-cap"></i>PG Admission Portal</h1>
        </NavLink>
        <NavLink id="adminInstitute" to="/admin/dashboard" className="navlink-buttons">
          <i data-testid="userName" class="fa-solid fa-building-columns "> </i>
          Institutes
        </NavLink>
        <NavLink id="adminCourse" to="/admin/viewCourse" className="navlink-buttons">
          <i class="fa-solid fa-book-atlas"></i>
          Courses
        </NavLink>
        <NavLink id="adminStudents" to="/admin/Viewstudent" className="navlink-buttons">
          <i data-testid="mobile" className="fa-solid fa-user-graduate"></i>
          Students
        </NavLink>
        <NavLink id="adminApprove" to="/admin/approveUser" className="navlink-buttons">
          <i data-testid="qualification" className="fa-solid fa-user-graduate"></i>

          Online Applications

        </NavLink>
        <NavLink id="adminFeedback" to="/admin/FeedBack" className="navlink-buttons">
          <i className="fa-solid fa-comment"></i>
          FeedBack
        </NavLink>
        <button id="logout" type="submit" onClick={navigateToLogout} className="logout-button">
          <i class="fa-solid fa-right-from-bracket"></i>
          Logout
        </button>
      </div>


      <div className={`nav-container ${isSidebarOpen ? "show-sidebar" : ""}`}>
        <nav>
          <i
            className={`fa-solid fa-bars ${isSidebarOpen ? "icon-hidden" : ""}`}
            onClick={toggleSidebar}
          ></i>
          <div>
            <NavLink to="/Firstpage">
              <h2 className="pg-admission-heading"><i class="fa-solid fa-graduation-cap"></i> PG Admission</h2>
            </NavLink>
          </div>
          <div className="navlinks-container">
            <div className="navlink-box">
              <i class="fa-solid fa-building-columns"></i>
              <NavLink id="adminInstitute" to="/admin/dashboard">
                Institutes
              </NavLink>
            </div>
            <div className="navlink-box">
              <i class="fa-solid fa-book-atlas"></i>
              <NavLink id="adminCourse" to="/admin/viewCourse">
                Courses
              </NavLink>
            </div>
            <div className="navlink-box">
              <i className="fa-solid fa-users"></i>
              <NavLink id="adminStudents" to="/admin/Viewstudent">
                Students
              </NavLink>
            </div>
            <div className="navlink-box">
              <i className="fa-solid fa-users"></i>
              <NavLink id="adminApprove" to="/admin/approveUser">

                Online Applications

              </NavLink>
            </div>
            <div className="navlink-box">
              <i class="fa-solid fa-comments"></i>
              <NavLink id="adminFeedback" to="/admin/FeedBack">
                FeedBack
              </NavLink>
            </div>
            <div className="navlink-box bottom" onClick={navigateToLogout}>
              <i class="fa-solid fa-right-from-bracket"></i>
              <button id="logout" type="submit" >
                Logout
              </button>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};



export default NavBar;
