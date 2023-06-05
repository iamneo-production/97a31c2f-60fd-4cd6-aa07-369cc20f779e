import React, { useState } from "react";
import "../Course/Addcourse.css";
import { useNavigate, Link } from "react-router-dom";
import { addCourse, getCourses } from "../../../api/courseApi.js";
import NavBar from "../Navbar/Navbar.js";

const Course = () => {
  const [courseId, setCourseId] = useState("");
  const [courseName, setCourseName] = useState("");
  const [courseDuration, setCourseDuration] = useState("");
  const [courseTiming, setCourseTiming] = useState("");
  const [courseEnrolled, setCourseEnrolled] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [popup, setPopup] = useState(false);
  const navigate = useNavigate();
  const [validationErrors, setValidationErrors] = useState({});

  const handlePop = (e) => {
    e.preventDefault();
    setPopup(true);
  };

  const handleClick = (event) => {
    event.preventDefault();
    const isValid = validateFields();
    if (isValid) {
      handleSubmit();
      fetchData();
      navigate("/admin/viewCourse"); 
    }
  };

  const fetchData = async () => {
    const data = await getCourses();
    console.log(data);
  };

  const handleSubmit = async () => {
    const newCourse = {
      courseId,
      courseName,
      courseDescription,
      courseDuration,
      courseTiming,
      courseEnrolled,
    };

    console.log("course js ", newCourse);
    const addedCourse = await addCourse(newCourse);
    console.log("response in course js", addedCourse);
    setCourseId("");
    setCourseName("");
    setCourseDuration("");
    setCourseTiming("");
    setCourseEnrolled("");
    setCourseDescription("");
  };

  const validateFields = () => {
    const errors = {};

    if (!courseId) {
      errors.courseId = "Course Id is required.";
    }

    if (!courseName) {
      errors.courseName = "Course Name is required.";
    }

    if (!courseDuration) {
      errors.courseDuration = "Course Duration is required.";
    }

    if (!courseTiming) {
      errors.courseTiming = "Course Timing is required.";
    }

    if (!courseEnrolled) {
      errors.courseEnrolled = "Course Enrolled is required.";
    }

    if (!courseDescription) {
      errors.courseDescription = "Course Description is required.";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  return (
    <>
      <NavBar />

      {popup && (
        <div className="admin-popup-body noHover">
          <div className="admin-popup-overlay"></div>
          <div className="admin-course-popup">
            <h1>Are you sure to add the data ?</h1>
            <button
              className="confirm-button"
              type="submit"
              onClick={(e) => {
                handleClick(e);
                setPopup(false);
              }}
            >
              <navigate to="/admin/viewCourse">
              Confirm Add
            </navigate>
            </button>
            <button
              className="cancel-button"
              type="submit"
              onClick={() => {
                setPopup(false);
              }}
            >
              Cancel
            </button>
          </div>

        </div>
      )}

      <div className="course">
        <h2 className="head-container">Add Course Details</h2>
    
        <form>
          <div className="form-group">
            <label htmlFor="courseId" className="label-heading">
              Course Id:
            </label>
            <input
              id="courseId"
              type="text"
              placeholder="Enter courseId"
              value={courseId}
              onChange={(event) => setCourseId(event.target.value)}
              data-testid="courseId"
            />
            {validationErrors.courseId && (
              <div className="validation-message">
                {validationErrors.courseId}
              </div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="courseName" className="label-heading">
              Course Name:
            </label>
            <input
              id="courseName"
              type="text"
              placeholder="Enter courseName"
              value={courseName}
              onChange={(event) => setCourseName(event.target.value)}
              data-testid="courseName"
            />
            {validationErrors.courseName && (
              <div className="validation-message">
                {validationErrors.courseName}
              </div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="courseDuration" className="label-heading">
              Course Duration:
            </label>
            <input
              id="courseDuration"
              type="text"
              placeholder="Enter courseDuration"
              value={courseDuration}
              onChange={(event) => setCourseDuration(event.target.value)}
              data-testid="courseDuriation"
            />
            {validationErrors.courseDuration && (
              <div className="validation-message">
                {validationErrors.courseDuration}
              </div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="courseTiming" className="label-heading">
              Course Timing:
            </label>
            <input
              id="courseTiming"
              type="text"
              placeholder="Enter courseTiming"
              value={courseTiming}
              onChange={(event) => setCourseTiming(event.target.value)}
              data-testid="courseTiming"
            />
            {validationErrors.courseTiming && (
              <div className="validation-message">
                {validationErrors.courseTiming}
              </div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="courseEnrolled" className="label-heading">
              Course Enrolled:
            </label>
            <input
              id="courseEnrolled"
              type="text"
              placeholder="courseEnrolled"
              value={courseEnrolled}
              onChange={(event) => setCourseEnrolled(event.target.value)}
              data-testid="courseEnrolled"
            />
            {validationErrors.courseEnrolled && (
              <div className="validation-message">
                {validationErrors.courseEnrolled}
              </div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="courseDescription" className="label-heading">
              Course Description:
            </label>
            <textarea
              id="courseDescription"
              type="text"
              placeholder="courseDescription"
              value={courseDescription}
              onChange={(event) => setCourseDescription(event.target.value)}
              data-testid="courseDescription"
            />
            {validationErrors.courseDescription && (
              <div className="validation-message">
                {validationErrors.courseDescription}
              </div>
            )}
          </div>
          <div className="button-container">
            <button
              className="btn-primary"
              type="submit"
              id="addCourse"
              data-testid="addCourse"
              onClick={(e) => {
                handlePop(e);
              }}
            >
              Add Course
            </button>
            <Link to="/admin/viewCourse" className="btn-secondary">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Course;