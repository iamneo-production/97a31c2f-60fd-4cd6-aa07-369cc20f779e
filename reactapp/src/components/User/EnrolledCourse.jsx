import React, { useEffect, useState } from 'react';
import './EnrolledCourse.css'
import { store } from '../../store';
import { useNavigate, Link, NavLink } from 'react-router-dom';
import { getCourses } from '../../api/courseApi';
import CourseService from "../.././api/CourseService"

const EnrolledCourse = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([])
  const { auth } = store.getState()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    store.dispatch({ type: 'LOGOUT' })
    navigate('/login');
  }

  useEffect(() => {
    let courseId;
    const fetchStudents = async () => {
        const res = await CourseService.studentDetails();
        console.log("all response students ", res)
        const userReg = res.filter(student => student.studentIdNumber === auth.id)
        console.log(userReg, " filtered student as users ")
        courseId = userReg.map(user => [user.courseId,user.status])
        console.log("courseId & status ", courseId)
        fetchCourses().then((data) => {
            console.log(data);
        })
            .catch((error) => {
                console.error(error);
            });
    }

    const fetchCourses = async () => {
        const res = await getCourses();
        console.log(res, " res")
      const userCourses = res
      const userCoursesWithStatus = [];
      for (let i = 0; i < courseId.length; i++) {
        const matchingCourse = res.find(course => course.courseId === courseId[i][0]);
      
        if (matchingCourse) {
          const courseWithStatus = { ...matchingCourse, status: courseId[i][1] };
          userCoursesWithStatus.push(courseWithStatus);
        }
      }
        // .filter(course => courseId[0].includes(course.courseId))
        // .map(course => ({ ...course, status: courseId[1] }));
            // const userCourses = res.map(course => courseId[0].includes(course.courseId) ?   )
        console.log(userCoursesWithStatus, " courres")
        setCourses(userCoursesWithStatus)
    }


    fetchStudents().then((data) => {
        console.log(data);
    })
        .catch((error) => {
            console.error(error);
        });
}, [])


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
          <NavLink to="/HomePage" className="user-navlink-buttons">
            <i className="fa-solid fa-university"></i>
            Institutes
          </NavLink>
          <NavLink to="/Enrolledcourse" className="user-navlink-buttons">
            <i className="fa-solid fa-book"></i>
            EnrolledCourses
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
                <NavLink  to="/Enrolledcourse">
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
      <div id="enrolledCourse" class="course-container">
        <div class='user-ec-headtxt'>
        <i class="fa-solid fa-cash-register"></i> Registered Courses
        </div>
        <div class="enrolled-courses">
          {courses && courses.length > 0 ? (
            courses.map((course) => (
              <div key={course.courseId} class="enrolled-course">
                <p>Course id: {course.courseId}</p>
                <p>Course Name: {course.courseName}</p>
                <p>Course Duration: {course.courseDuration}</p>
                <p>Course Description: {course.courseDescription}</p>
                <div className='flex'>
                <p className="my-learning-button !bg-orange-500">Status: {course.status}</p>
                <Link to="/Admissionmodelpage"><button class="my-learning-button">My Learning</button></Link>
                </div>
              </div>
            ))
          ) : (
            <div>No courses found</div>
          )}
        </div>
      </div>
    </>
  );
}
export default EnrolledCourse;