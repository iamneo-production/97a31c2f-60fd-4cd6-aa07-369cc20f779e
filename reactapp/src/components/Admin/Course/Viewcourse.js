import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { getCourses, deleteCourse } from "../../../api/courseApi.js";
import NavBar from "../Navbar/Navbar.js";
import { AdminGuard } from "../../../AuthGuard/AdminGuard";
import "../Course/Viewcourse.css";


function Viewcourse() {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [popup, setPopup] = useState({ state: false, deleteId: null });

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCourses();
      console.log(data)
      setCourses(data);
    };
    fetchData().then((data) => {
      console.log(data)
    })
      .catch((error) => {
        console.error(error);
      });

  }, []);


  const handleEditCourse = async (courseId) => {
    navigate(`/admin/editCourse/${courseId}`);
  };


  const handleSearch = () => {
    console.log(searchTerm);
    if (searchTerm === "") {
      getCourses().then((data) => {
        setCourses(data);
      }).catch((error) => {
        console.error(error);
      });
    } else {
      const filteredCourses = courses.filter((course) => {
        return (
          course.courseId.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.courseName.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
      setCourses(filteredCourses);
    }
  };



  const handleDelete = async (id) => {
    try {
      await deleteCourse(id);
      setCourses((prevState) => prevState.filter((course) => course.id !== id));
    } catch (error) {
      console.error(error);
    }
  };


  return (

    <AdminGuard>
      <NavBar />
      {popup.state &&
        <div className="admin-popup-body noHover">
          <div className="admin-popup-overlay"></div>
          <div className="admin-institute-popup">
            <h1>Are you sure to delete the data ?</h1>
            <button
              type="submit"
              onClick={() => {
                handleDelete(popup.deleteId);
                setPopup({ state: false, deleteId: null });
              }}
            >
              confirm delete
            </button>
            <br />
            <button
              type="submit"
              onClick={() => {
                setPopup({ state: false, deleteId: null });
              }}
            >
              cancel
            </button>
          </div>
        </div>
      }
      <div className="search-box">
        <input
          className="search-input"
          type="text"
          placeholder='Search course by name or ID'
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          data-testid="search"
        />
        <button
          className="search-btn"
          onClick={handleSearch}>
          Search
        </button>
      </div>

      <div>
        <h1
          class="course-heading">
          List of Courses
        </h1>
        {courses && courses.length > 0 ? (
          <div className="courses-grid">
            {courses.map((course) => (
              <div key={course.id} className="course-card">
                <div className="course-card-info">
                  <div
                    className="course-card-text course-id">
                    Course ID: {course.courseId}
                  </div>
                  <div
                    className="course-card-text course-name">
                    Course Name:{course.courseName}
                  </div>
                  <div
                    className="course-card-text course-duration">
                    Course Duration: {course.courseDuration}
                  </div>
                  <div
                    className="course-card-text course-timing">
                    Course Available Timings: {course.courseTiming}
                  </div>
                </div>
                <div className="course-card-details">
                  <div
                    className="course-card-text course-students">
                    Number of Students: {course.courseEnrolled}
                  </div>
                  <div
                    className="course-card-text course-description">
                    Course Description: {course.courseDescription}
                  </div>
                  <div
                    className="course-card-footer">
                    <NavLink
                      exact="true" to={`/admin/editCourse/${course.courseId}`}
                      className="nav-link"
                      id="editcourse"
                      activeclassname="active">
                      <button
                        id="edit-course"
                        onClick={() => handleEditCourse(course.courseId)}>
                        <i
                          className="fa-regular fa-pen-to-square">
                        </i>
                      </button>
                    </NavLink>
                    <button
                      className="nav-link"
                      id="deletecourse"
                      onClick={() => setPopup({ state: true, deleteId: course.id })}>
                      <i
                        className="fa-regular fa-trash-can">
                      </i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>No courses found</div>
        )}
        <NavLink
          exact="true"
          to="/admin/addCourse"
          className="nav-link"
          id="addcourse"
          activeclassname="active">
          <div
            className='add-course-btn'>
            <div
              className='icon'>
              <i className="fa-solid fa-circle-plus ">
              </i></div>
            <span>Add Course</span>
          </div>
        </NavLink>
      </div>
    </AdminGuard>
  );
}



export default Viewcourse;