import React, { useState } from "react";
import "../Course/Addcourse.css";
import { useNavigate, Link } from "react-router-dom";
import { addCourse, getCourses } from "../../../api/courseApi.js";
import NavBar from "../Navbar/Navbar.js";
import { AdminGuard } from "../../../AuthGuard/AdminGuard"


const Course = () => {
  const [courseId, setCourseId] = useState("");
  const [courseName, setCourseName] = useState("");
  const [courseDuration, setCourseDuration] = useState("");
  const [courseTiming, setCourseTiming] = useState("");
  const [courseEnrolled, setCourseEnrolled] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const navigate = useNavigate();
  const [popup, setPopup] = useState(false);

  const handlePop = (e) => {
    e.preventDefault();
    setPopup(true);
  }

  const handleClick = (event) => {
    handleSubmit(event).then((data) => {
      console.log(data);

    })
      .catch((error) => {
        console.error(error);
      });
    fetchData().then((data) => {
      console.log("fetched course data success ", data);
    })
      .catch((error) => {
        console.error(error);
      });
    navigate('/admin/viewCourse');
  }


  const fetchData = async () => {
    const data = await getCourses();
  }


  const handleSubmit = async (event) => {
    event.preventDefault();
    const newCourse = {
      "courseId": courseId,
      "courseName": courseName,
      "courseDescription": courseDescription,
      "courseDuration": courseDuration,
      "courseTiming": courseTiming,
      "courseEnrolled": courseEnrolled
    };

    console.log("course js ", newCourse)
    const addedCourse = await addCourse(newCourse)
    console.log("response in course js", addedCourse)
    setCourseId('');
    setCourseName('');
    setCourseDuration('');
    setCourseTiming('');
    setCourseEnrolled('');
    setCourseDescription('');
  };

  return (

    <>

      <NavBar />

      {
        popup && (
          <div className="admin-popup-body noHover">
            <div className="admin-popup-overlay">

            </div>
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
                confirm add
              </button>
              <button
                className="cancel-button"
                type="submit"
                onClick={() => {
                  setPopup(false);
                }}
              >
                cancel
              </button>
            </div>
          </div>
        )
      }

      {/* <Link to="/admin/viewCourse" className="course-back-to-home">Back To Home</Link> */}
      <div
        data-testid="add Course"
        className='course'>
        <h2
          className="head-container">
          Add Course Details</h2>
        <form>
          <div
            className="form-group">
            <label
              htmlFor="courseId"
              className='label-heading'>
              Course Id:</label>
            <input
              id="courseId"
              type="text"
              placeholder='Enter courseId'
              value={courseId}
              onChange={(event) => setCourseId(event.target.value)}
              data-testid="courseId"
            />
          </div>
          <div className="form-group">
            <label htmlFor="courseName" className='label-heading'>Course Name:</label>
            <input
              id="courseName"
              type="text"
              placeholder='Enter courseName'
              value={courseName}
              onChange={(event) => setCourseName(event.target.value)}
              data-testid="courseName"
            />
          </div>
          <div className="form-group">
            <label htmlFor="courseDuration" className='label-heading'>Course Duration:</label>
            <input
              id="courseDuration"
              type="text"
              placeholder='Enter courseDuration'
              value={courseDuration}
              onChange={(event) => setCourseDuration(event.target.value)}
              data-testid="courseDuriation"
            />
          </div>
          <div className="form-group">
            <label htmlFor="courseTiming" className='label-heading'>Course Timing:</label>
            <input
              id="courseTiming"
              type="text"
              placeholder='Enter courseTiming'
              value={courseTiming}
              onChange={(event) => setCourseTiming(event.target.value)}
              data-testid="courseTiming"
            />
          </div>
          <div className="form-group">
            <label htmlFor="courseEnrolled" className='label-heading'>Course Enrolled:</label>
            <input
              id="courseEnrolled"
              type="text"
              placeholder='courseEnrolled'
              value={courseEnrolled}
              onChange={(event) => setCourseEnrolled(event.target.value)}
              data-testid="courseEnrolled"
            />
          </div>
          <div className="form-group">
            <label htmlFor="courseDescription" className='label-heading'>Course Description:</label>
            <textarea
              id="courseDescription"
              type="text"
              placeholder='courseDescription'
              value={courseDescription}
              onChange={(event) => setCourseDescription(event.target.value)}
              data-testid="courseDescription"
            />
          </div>
          <div
            className="button-container">
            <button
              className="btn-primary"
              type="submit"
              id="addCourse"
              data-testid="addCourse"
              onClick={(e) => {
                handlePop(e)
              }}>
              Add Course</button>
            <Link
              to="/admin/viewCourse"
              className="btn-secondary">
              Cancel</Link>
          </div>
        </form>
      </div>

    </>
  );
};


export default Course;