import React,{ useState } from 'react'
import '../Course/Course.css';
import { useNavigate,Link } from "react-router-dom";
import { addCourse} from "../../../api/courseApi.js";
import NavBar from '../Navbar/Navbar.js';

const Course = () => {
  const [courseId, setCourseId] = useState("");
  const [courseName, setCourseName] = useState("");
  const [courseDuration, setCourseDuration] = useState("");
  const [courseTiming, setCourseTiming] = useState("");
  const [courseEnrolled, setCourseEnrolled] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);

  const handleClick = (event)=>{
    handleSubmit(event);
    navigate('/admin/viewCourse');
  }
  const handleSubmit = async(event) => {
    event.preventDefault();
    const newCourse = {
        "courseId":courseId,
        "courseName": courseName,
        "courseDescription":courseDescription ,
        "courseDuration": courseDuration,
        "courseTiming":courseTiming,
        "courseEnrolled":courseEnrolled
    };
    
   console.log("course js ",newCourse)
    const addedCourse = await addCourse(newCourse)
    console.log("response in course js",addedCourse)
    setCourses((prevState) => [...prevState, addedCourse]);
    setCourseId('');
   setCourseName('');
    setCourseDuration('');
    setCourseTiming('');
    setCourseEnrolled('');
    setCourseDescription('');
    // navigate('/admin/dashboard');
  };

  return (
    <>
    <NavBar/>
    <div data-testid="addCourse">
      <h2>Add Course Details</h2>
      <form onSubmit={(e)=>handleClick(e)}>
      <div>
          <label htmlFor="courseId">Course Id:</label>
          <input
            id="courseId"
            type="text"
            placeholder='Enter courseId'
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
            placeholder='Enter courseName'
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
            placeholder='Enter courseDuration'
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
            placeholder='Enter courseTiming'
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
            placeholder='courseEnrolled'
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
            placeholder='courseDescription'
            value={courseDescription}
            onChange={(event) => setCourseDescription(event.target.value)}
            data-testid="courseDescription"
          />
        </div>
        
        <button type="submit" id="addCourse">Add Course</button>
        <Link to="/admin/viewCourse" className="btn btn-secondary">Cancel</Link>
      </form>
    </div>
    </>
  );
};

export default Course;
