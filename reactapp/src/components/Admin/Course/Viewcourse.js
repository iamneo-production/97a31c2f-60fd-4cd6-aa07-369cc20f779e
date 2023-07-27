import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { getCourses, deleteCourse } from "../../../api/courseApi.js";
import "../Course/Viewcourse.css";
import Navbar from "../Navbar/Navbar";

function Viewcourse() {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [popup, setPopup] = useState({
    state: false,
    deleteId: null,
  });

  const fetchData = async () => {
    const data = await getCourses();
    console.log(data);
    return data;
  };
  useEffect(() => {
    fetchData()
      .then((data) => {
        setCourses(data);
        console.log(data, ".....1st time use effect");
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
      getCourses()
        .then((data) => {
          setCourses(data);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      const filteredCourses = courses.filter((course) => {
        return (
          course.courseId
            .toString()
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
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
    <>
      <Navbar />
      {popup.state && (
        <div className="admin-popup-body noHover">
          <div className="admin-popup-overlay"></div>
          <div className="admin-course-popup">
            <h1>Are you sure to delete the data ?</h1>
            <button
              className="confirm-button"
              type="submit"
              onClick={() => {
                handleDelete(popup.deleteId)
                  .then(() => {
                    console.log("deleted Course");
                  })
                  .catch((error) => {
                    console.log(error);
                  });
                setPopup({
                  state: false,
                  deleteId: null,
                });
              }}
            >
              Confirm Delete
            </button>
            <button
              className="cancel-button"
              type="submit"
              onClick={() => {
                setPopup({
                  state: false,
                  deleteId: null,
                });
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      <div className="search-box">
        <input
          className="search-input"
          type="text"
          placeholder="Search course by Name or Id"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          data-testid="search"
        />
        <button className="search-btn" onClick={handleSearch}>
          Search
        </button>
      </div>

      <div>
        <h1 class="course-heading" id="courseGrid1">
          <i className="fa-solid fa-book"></i> List of Courses
        </h1>
        {courses && courses.length > 0 ? (
          <div className="courses-grid">
            {courses.map((course, index) => (
              <div
                id={`courseGrid` + (index + 1)}
                key={course.id}
                className="course-card"
              >
                <div className="course-card-info">
                  <div className="course-card-text course-id">
                    Course ID: {course.courseId}
                  </div>
                  <div className="course-card-text course-name">
                    Course Name:{course.courseName}
                  </div>
                  <div className="course-card-text course-duration">
                    Course Duration: {course.courseDuration} months
                  </div>
                  <div className="course-card-text course-timing">
                    Course Available Timings: {course.courseTiming}
                  </div>
                </div>
                <div className="course-card-details">
                  <div className="course-card-text course-students">
                    Number of Students: {course.courseEnrolled}
                  </div>
                  <div className="course-card-text course-description">
                    Course Description: {course.courseDescription}
                  </div>
                  <div className="course-card-footer">
                    <NavLink
                      exact="true"
                      to={`/admin/editCourse/${course.courseId}`}
                      className="nav-link"
                      id="editcourse"
                      activeclassname="active"
                    >
                      <button
                        id="edit-course"
                        onClick={() => handleEditCourse(course.courseId)}
                      >
                        <i className="fa-regular fa-pen-to-square"></i>
                      </button>
                    </NavLink>
                    <button
                      className="nav-link"
                      id="deletecourse"
                      onClick={() => {
                        setPopup({
                          state: true,
                          deleteId: course.id,
                        });
                      }}
                    >
                      <i className="fa-regular fa-trash-can"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center">
            <div class="  loadingio-spinner-double-ring-amot1w4ku1j">
              <div class="ldio-14cancim8ocq">
                <div></div>
                <div></div>
                <div>
                  <div></div>
                </div>
                <div>
                  <div></div>
                </div>
              </div>
            </div>
          </div>
        )}
        <NavLink
          exact="true"
          to="/admin/addCourse"
          className="nav-link"
          id="addcourse"
          activeclassname="active"
        >
          <div className="add-course-btn">
            <div className="icon">
              <i className="fa-solid fa-circle-plus "></i>
            </div>
            <span>Add Course</span>
          </div>
        </NavLink>
      </div>
    </>
  );
}

export default Viewcourse;
