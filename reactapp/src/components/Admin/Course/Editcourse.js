import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getCourses, editCourse } from "../../../api/courseApi.js";
import { AdminGuard } from "../../../AuthGuard/AdminGuard";
import "../Course/Addcourse.css";
import Navbar from "../Navbar/Navbar";



function Editcourse(props) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState({
    id: '',
    courseId: '',
    courseName: '',
    courseDescription: '',
    courseDuration: '',
    courseTiming: '',
    courseEnrolled: ''

  });

  const [popup, setPopup] = useState(false);

  const handlePop = (e) => {
    e.preventDefault();
    setPopup(true);
  }

  const handleClick = (event) => {
    handleSubmit(event).then((data) => {
      console.log("edited successfully ", data);
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
    console.log(data);
  }
  useEffect(() => {
    async function fetchCourse() {
      const data = await getCourses(id);
      const d1 = data.find((eachdata) => {
        return eachdata.courseId == id;
      });
      console.log(d1);
      setCourse(d1);
    }
    fetchCourse()
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await editCourse(id, course);
    } catch (error) {
      console.error(error);
    }
  };



  return (


    <AdminGuard>
      <Navbar />
      {
        popup && (
          <div className="admin-popup-body noHover">
            <div className="admin-popup-overlay">

            </div>
            <div className="admin-course-popup">
              <h1>Are you sure to edit the data ?</h1>
              <button
                className="confirm-button"
                type="submit"
                onClick={(e) => {
                  handleClick(e);
                  setPopup(false);
                }}
              >
                Confirm Edit
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
        )
      }
      <button
        className="admin-course-back-to-home"
        type="submit"
        onClick={() => {
          navigate("/admin/dashboard");
        }}
      >
        <i class="fa-solid fa-house"></i> Back to Home
      </button>
      <div className='course'>
        <h1 class="admin-course-head-container" ><i class="fa-solid fa-pen-to-square"></i> Edit Course</h1>
        <form>
          <div className="form-group">
            <label htmlFor="courseId" className='label-heading'>Course Id:</label>
            <input
              id="courseId"
              type="text"
              defaultValue={course.courseId}
              onChange={(e) =>
                setCourse({ ...course, courseId: e.target.value })
              }
              data-testid="courseId"
            />
          </div>
          <div className="form-group">
            <label htmlFor="courseName" className='label-heading'>Course Name:</label>
            <input
              id="courseName"
              type="text"
              defaultValue={course.courseName}
              onChange={(e) =>
                setCourse({ ...course, courseName: e.target.value })
              }
              data-testid="courseName"
            />
          </div>
          <div className="form-group">
            <label htmlFor="courseDuration" className='label-heading'>Course Duration:</label>
            <input
              id="courseDuration"
              type="text"
              defaultValue={course.courseDuration}
              onChange={(e) =>
                setCourse({ ...course, courseDuration: e.target.value })
              }
              data-testid="courseDuration"
            />
          </div>
          <div className="form-group">
            <label htmlFor="courseTiming" className='label-heading'>Course Timing:</label>
            <input
              id="courseTiming"
              type="text"
              defaultValue={course.courseTiming}
              onChange={(e) => setCourse({ ...course, courseTiming: e.target.value })}
              data-testid="courseTiming"
            />
          </div>
          <div className="form-group">
            <label htmlFor="courseEnrolled" className='label-heading'>Course Enrolled:</label>
            <input
              id="courseEnrolled"
              type="text"
              defaultValue={course.courseEnrolled}
              onChange={(e) => setCourse({ ...course, courseEnrolled: e.target.value })}
              data-testid="courseEnrolled"
            />
          </div>
          <div className="form-group">
            <label htmlFor="courseDescription" className='label-heading'>Course Description:</label>
            <textarea
              id="courseDescription"
              type="text"
              defaultValue={course.courseDescription}
              onChange={(e) =>
                setCourse({ ...course, courseDescription: e.target.value })
              }
              data-testid="courseDescription"
            />
          </div>
          <div>
            <div
              className="button-container">
              <button
                className="btn-primary"
                type="submit"
                onClick={(e) => {
                  handlePop(e)
                }}>
                Update Course
              </button>
              <Link
                to="/admin/viewCourse"
                className="btn-secondary">
                Cancel
              </Link>
            </div>
          </div>
        </form>
      </div>
    </AdminGuard>

  );
}



export default Editcourse;