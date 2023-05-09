import React,{useEffect,useState} from 'react';
import './EnrolledCourse.css'
import {store} from '../../store';
import {useNavigate,Link} from 'react-router-dom';
import CourseService from "../.././api/CourseService"

const EnrolledCourse=()=>{
    const navigate=useNavigate();
    const [data,setData] = useState([])
    const { auth } = store.getState()  
    const handleClick=()=>{
        navigate('/EnrolledCourse');
    }

    const handleLogout = () => { 
        store.dispatch({ type: 'LOGOUT' })
        navigate('/login');
      }

      useEffect(() => {
        console.log(auth)

        CourseService.studentDetails()
        .then((res) => {
            console.log(res)
            setData(res)
        }).catch((err) => {
            console.log(err)
        })

    }, [])
    const userReg = data.filter(student => student.studentId === auth.id)
    console.log(userReg, " filtered ")

    const courseId = userReg.map(user => user.courseId)
    console.log("courseId  "  , courseId)
   

    return(
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
        <div className='enrolled-course'>
        <p><b>Course Name:</b></p>
        <p><b>Joined Date:</b></p>
        <p><b>Course End date:</b></p>
        <button className="my-learning-button">My Learning</button>
        </div>
        </div>
        
         );
}
export default EnrolledCourse;
