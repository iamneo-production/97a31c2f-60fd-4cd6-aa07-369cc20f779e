import React,{ useState } from 'react'
import '../Course/Course.css';
import { useNavigate } from "react-router-dom";
import { addCourse} from "../../../api/courseApi.js";
import NavBar from '../Navbar/Navbar.js';
import { AdminGuard } from "../../../AuthGuard/AdminGuard"


const Course = () => {
  const [courseId, setCourseId] = useState("");
  const [courseName, setCourseName] = useState("");
  const [courseDuration, setCourseDuration] = useState("");
  const [courseTiming, setCourseTiming] = useState("");
  const [courseEnrolled, setCourseEnrolled] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const navigate = useNavigate();

  const handleClick = (event)=>{
    handleSubmit(event).then((data) => {
      console.log(data)
    })
    .catch((error) => {
      console.error(error);
    });

    navigate('/admin/viewCourse');
  }
  const handleSubmit = async(event) => {
    event.preventDefault();
    const newCourse = {
        "courseId":courseId,
        "courseName": courseName,
        "courseDescription":courseDescription ,
        "courseDuration": courseDuration
    };
    
   console.log("course js ",newCourse)
    const addedCourse = await addCourse(newCourse)
    console.log("response in course js",addedCourse)
    setCourseId('');
   setCourseName('');
    setCourseDuration('');
    setCourseTiming('');
    setCourseEnrolled('');
    setCourseDescription('');
  };

  return (
    <AdminGuard>
    <NavBar/>
    <div data-testid="addCourse">
      <h2>Add Course Details</h2>
      <form onSubmit={(e)=>handleClick(e)}>
      <div>
          <label htmlFor="courseId">Course Id:</label>
          <input
            id="courseId"
            type="text"
            value={courseId}
            onChange={(event) => setCourseId(event.target.value)}
            data-testid="courseId"
          />
        </div>
        <div>
          <label htmlFor="courseName">Course Name:</label>
          <input
            id="courseName"
            type="text"
            value={courseName}
            onChange={(event) => setCourseName(event.target.value)}
            data-testid="courseName"
          />
        </div>
        <div>
          <label htmlFor="courseDuration">Course Duration:</label>
          <input
            id="courseDuration"
            type="text"
            value={courseDuration}
            onChange={(event) => setCourseDuration(event.target.value)}
            data-testid="courseDuration"
          />
        </div>
        <div>
          <label htmlFor="courseTiming">Course Timing:</label>
          <input
            id="courseTiming"
            type="text"
            value={courseTiming}
            onChange={(event) => setCourseTiming(event.target.value)}
            data-testid="courseTiming"
          />
        </div>
        <div>
          <label htmlFor="courseEnrolled">Course Enrolled:</label>
          <input
            id="courseEnrolled"
            type="text"
            value={courseEnrolled}
            onChange={(event) => setCourseEnrolled(event.target.value)}
            data-testid="courseEnrolled"
          />
        </div>
        <div>
          <label htmlFor="courseDescription">Course Description:</label>
          <textarea
            id="courseDescription"
            type="text"
            value={courseDescription}
            onChange={(event) => setCourseDescription(event.target.value)}
            data-testid="courseDescription"
          />
        </div>
        
        <button type="submit" id="addCourse">Add Course</button>
      </form>
    </div>
    </AdminGuard>
  );
};

export default Course;
