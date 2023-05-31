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

    const handleLogout = () => {
        store.dispatch({ type: 'LOGOUT' })
        navigate('/login');
    }

    useEffect(() => {
        console.log(auth)
        let courseId;
        const fetchStudents = async () => {
            const res = await CourseService.studentDetails();
            console.log("all response students ", res)
            const userReg = res.filter(student => student.studentIdNumber === auth.id)
            console.log(userReg, " filtered student as user ")
            courseId = userReg.map(user => user.courseId)
            console.log("courseId  ", courseId)
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
            const userCourses = res.filter(course => courseId.includes(course.courseId))
            console.log(userCourses, " courres")
            setCourses(userCourses)
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
            <nav className="user-nav-container">
                <div>
                    <NavLink to="/Navpage" >
                        <h2 className="pg-admission-heading">PG Admission</h2>
                    </NavLink>
                </div>
                <div className="user-navlinks-container">
                    <NavLink to="/HomePage">Institutes</NavLink>
                    <NavLink to="/Enrolledcourse">EnrolledCourses</NavLink>
                    <NavLink to="/FeedBack">FeedBack</NavLink>
                </div>
                <button data-testid="logout" id ="logout" name='logout' onClick={handleLogout} >Logout</button>
            </nav>
            <div className="bth">
                <Link to="/HomePage">
                    <h5>Back To Home</h5>
                </Link>
            </div>
            <div id="enrolledCourse" class="course-container">
                <div class='user-enrolledcourse-headtxt'>
                    These Are The Courses You Have Enrolled
                </div>
                <div class="enrolled-courses">
                    {courses && courses.length > 0 ? (
                        courses.map((course) => (
                            <div class="enrolled-course">
                                <p>Course id: {course.courseId}</p>
                                <p>Course Name: {course.courseName}</p>
                                <p>Course Duration: {course.courseDuration}</p>
                                <p>Course Description: {course.courseDescription}</p>
                                <Link to="/Admissionmodelpage"><button class="my-learning-button">My Learning</button></Link>
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