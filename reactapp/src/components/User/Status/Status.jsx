import React, { useEffect, useState } from 'react';
import './Status.css'
import { store } from '../../../store';
import { useNavigate, Link } from 'react-router-dom';
import { getCourses } from '../../../api/courseApi';
import CourseService from '../../../api/CourseService'

const Status = () => {
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
            <div data-testid="status">
                <div className='navbar'>
                    <Link to="/Homepage">
                        <h2>PG Admission</h2>
                    </Link>
                    <br></br>
                    <div className='middle'>
                        <Link to="/HomePage"><button>Institute</button></Link>
                    </div>

                    <div className='middle1'>
                        <button id='enrolledCourse' onClick={handleClick}>EnrolledCourse</button>
                    </div>
                    <div className='right'>
                        <button id='logout' onClick={handleLogout}>LogOut</button>
                    </div>

                </div>
                <div className='bth'>
                    <Link to="/HomePage">
                        <h5><i class="fa-solid fa-house"></i> Back To Home</h5>
                    </Link>
                </div>



                {courses && courses.length > 0 ? (
                    courses.map((course) => (
                        <div key={course.id} id='enrolledCourse' className='enrolled-course'>
                            <p><b>Course id: {course.id} </b></p>
                            <p><b>Course Name: {course.courseName} </b></p>
                            <p><b>courseDuration: {course.courseDuration} </b></p>
                            <p><b>Course Description: {course.courseDescription} </b></p>
                            <Link to="/HomePage"><button className="my-learning-button">My Learning</button></Link>
                        </div>
                    ))
                ) : (
                    <div>No courses found</div>
                )}


            </div>
        </>

    );
}
export default Status;