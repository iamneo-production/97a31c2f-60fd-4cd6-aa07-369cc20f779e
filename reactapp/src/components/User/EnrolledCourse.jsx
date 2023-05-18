import React, { useEffect, useState } from 'react';
import './EnrolledCourse.css'
import { store } from '../../store';
import { useNavigate, Link } from 'react-router-dom';
import { getCourses } from '../../api/courseApi';
import CourseService from "../.././api/CourseService"
import { UserGuard } from '../../AuthGuard/UserGuard';

const EnrolledCourse = () => {
    const navigate = useNavigate();
    const [courses, setCourses] = useState([])
    const { auth } = store.getState()
    const handleClick = () => {
        navigate('/EnrolledCourse');
    }

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
        <UserGuard>
            <div>
                <div className="mainbar">
                    <Link to="/Navpage">
                        <h1>PG Admission</h1>
                    </Link>
                    <div className="one">
                        <Link to="/Viewacademy">Institute</Link>
                    </div>

                    <div className="one">
                        <Link to="/Enrolledcourse">Enrolled course</Link>
                    </div>
                    <div className="one">
                        <Link to="/FeedBack">FeedBack</Link>
                    </div>
                    <div className="out">
                        <button data-testid="logout" name="logout" onClick={handleLogout}>
                            Logout
                        </button>
                    </div>
                </div>

            </div>
            <div className="home">
                <Link to="/Viewacademy">
                    <h5>Back To Home</h5>
                </Link>
            </div>



                {courses && courses.length > 0 ? (
                    courses.map((course) => (
                        <div key={course.id} className='enrolled-course'>
                            <p><b>Course id: {course.id} </b></p>
                            <p><b>Course Name: {course.courseName} </b></p>
                            <p><b>courseDuration: {course.courseDuration} </b></p>
                            <p><b>Course Description: {course.courseDescription} </b></p>
                            <Link to="/Viewacademy"><button className="my-learning-button">My Learning</button></Link>
                        </div>
                    ))
                ) : (
                    <div>No courses found</div>
                )}



        </UserGuard >

    );
}
export default EnrolledCourse;