import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useNavigate } from "react-router";
import { store } from "../../../store";
import "./UserCourse.css";
import { baseUrl } from "../../../api/authService";

let auth = "";
store.subscribe(() => {
  auth = store.getState().auth;
  console.log(auth);
});
const UserCourse = () => {
  const [viewdata, setViewdata] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    getdata()
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  const getdata = async () => {
    const response = await fetch(`${baseUrl}/user/courses`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${auth.token}`,
        "Content-type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    setViewdata(data);
  };
  const navigate = useNavigate();
  const handleLogout = () => {
    store.dispatch({ type: "LOGOUT" });
    navigate("/login");
  };
  const handleenroll = (courseId) => {
    navigate(`/ApplyForm/${courseId}`);
  };

  return (
    <>
      <div>
        <div className="user-icon-container">
          <i
            className={`fa-solid fa-bars ${isSidebarOpen ? "user-icon-hidden" : ""}`}
            onClick={toggleSidebar}
          ></i>
          <NavLink to="/Navpage" className="user-nav-pg">
            <h1>PG Admission Portal</h1>
          </NavLink>
          <NavLink to="/Enrolledcourse" className="user-navlink-buttons">
            <i className="fa-solid fa-book"></i>
            EnrolledCourses
          </NavLink>
          <NavLink to="/HomePage" className="user-navlink-buttons">
            <i className="fa-solid fa-university"></i>
            Institutes
          </NavLink>
          <NavLink to="/FeedBack" className="user-navlink-buttons">
            <i className="fa-solid fa-comment"></i>
            FeedBack
          </NavLink>
          <button data-testid="logout" name='logout' onClick={handleLogout} className="user-logout-button">
            <i className="fa-solid fa-sign-out"></i>Logout</button>
        </div>


        <div className={`user-nav-container ${isSidebarOpen ? "user-show-sidebar" : ""}`}>
          <nav>
            <i
              className={`fa-solid fa-bars ${isSidebarOpen ? "user-icon-hidden" : ""}`}
              onClick={toggleSidebar}
            ></i>
            <div>
              <NavLink to="/Navpage">
                <h2 className="pg-admission-heading">PG Admission</h2>
              </NavLink>
            </div>
            <div className="user-navlinks-container">
              <div className="user-navlink-box">
              <i class="fa-solid fa-building-columns"></i>
                <NavLink  to="/HomePage">
                  Institutes
                </NavLink>
              </div>
              <div className="user-navlink-box">
              <i className="fa-solid fa-book"></i>
                <NavLink to="/Enrolledcourse">
                  EnrolledCourses
                </NavLink>
              </div>
              <div className="user-navlink-box">
                <i class="fa-solid fa-comments"></i>
                <NavLink  to="/FeedBack">
                  FeedBack
                </NavLink>
              </div>
              <div className="user-navlink-box user-bottom" onClick={handleLogout}>
                <i class="fa-solid fa-arrow-right-from-bracket"></i>
                <button data-testid="logout" name='logout'  >Logout</button>
              </div>
            </div>
          </nav>
        </div>
      </div>
      <div className="bth">
        <Link to="/HomePage">
          <h5><i class="fa-solid fa-house"></i> Back To Home</h5>
        </Link>
      </div>
      <div id="userCourseGrid1" className="usercoursecontainer">
        <div className="user-headtxt">
        <h1>
         
      List of Courses<i class="fa-solid fa-person-military-pointing"></i>
        </h1>
        </div>

        <table className="user-usercourse-table">
          <thead>
            <tr>
              <th className="user-usercourse-th">Course Id</th>
              <th className="user-usercourse-th">Course Name</th>
              <th className="user-usercourse-th">Course Description</th>
              <th className="user-usercourse-th">Course Duration</th>
              <th className="user-usercourse-th"><i class="fa-solid fa-hand-point-down fa-beat"></i></th>
            </tr>
          </thead>
        </table>

        <div className="onesec">
          {viewdata.map((course, index) => {
            const {
              id,
              courseName,
              courseDescription,
              courseDuration,
              courseId,
            } = course;

            return (



              <div className="courseinfo" key={id}>

                <table className="user-usercourse-table">
                  <tbody>
                    <tr id={`userCourseGrid` + (index + 1)} className="row hover">
                      <td className="user-usercourse-td">{courseId}</td>
                      <td className="user-usercourse-td">{courseName}</td>
                      <td className="user-usercourse-td">{courseDescription}</td>
                      <td className="user-usercourse-td">{courseDuration}</td>
                      <button type="button" className="enroll" onClick={() => handleenroll(courseId)}>
                        <td className="user-usercourse-td">EnrollNow</td>
                      </button>
                    </tr>
                  </tbody>
                </table>
              </div>


            );
          })}
        </div>
      </div>
    </>
  );
};

export default UserCourse;