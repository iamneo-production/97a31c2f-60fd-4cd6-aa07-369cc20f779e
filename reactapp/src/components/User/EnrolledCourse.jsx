import React,{useEffect,useState} from 'react';
import './EnrolledCourse.css'
import {store} from '../../store';
import {useNavigate,Link} from 'react-router-dom';
import { getCourses } from '../../api/courseApi';
import CourseService from "../.././api/CourseService"
import { UserGuard } from '../../AuthGuard/UserGuard';

const EnrolledCourse=()=>{
    const navigate=useNavigate();
    const [courses,setCourses] = useState([])
    const { auth } = store.getState()  
    const handleClick=()=>{
        navigate('/EnrolledCourse');
    }

    const handleLogout = () => { 
        store.dispatch({ type: 'LOGOUT' })
        navigate('/login');
      }

      useEffect(() =>  {
        console.log(auth)

        const fetchStudents  = async () => {
            const res = await  CourseService.studentDetails(); 
            const userReg = res.filter(student => student.studentIdNumber === auth.id)
            console.log(userReg, " filtered ")
            const courseId = userReg.map(user => user.courseId)
            console.log("courseId  "  , courseId)    
            fetchCourses().then((data) => {
                console.log(data);
              })
              .catch((error) => {
                console.error(error);
              });
        }

        const fetchCourses = async () => {
            const res = await getCourses();
            console.log(res,"final res")
            setCourses(res)
        }


        fetchStudents() .then((data) => {
            console.log(data);
          })
          .catch((error) => {
            console.error(error);
          });
    }, [])
    

    return(
        <UserGuard>
            
            <div>
            <div className='navbar'>
                <div className='middle'>
                <Link to="/Viewacademy"><button>Institute</button></Link>
            </div>
            <div className='middle'>
                    <button onClick={handleClick}>EnrolledCourse</button>
                </div>
            <div className='middle'>
                <button  onClick={handleLogout}>LogOut</button>
                </div>
                </div>


            {courses && courses.length > 0 ? (
                courses.map((course) => (
                <div key={course.id} className='enrolled-course'>
                    <p><b>Course id: {course.id} </b></p>
                    <p><b>Course Name: {course.courseName} </b></p>
                    <p><b>courseDuration: {course.courseDuration} </b></p>
                    <p><b>Course Description: {course.courseDescription} </b></p>
                    <Link to="/Viewacademy"><button  className="my-learning-button">My Learning</button></Link>
                </div>
            )  )
                    
                    ) :(
                    <div>No courses found</div>
                )}


            </div>
        </UserGuard>
        
         );
}
export default EnrolledCourse;
