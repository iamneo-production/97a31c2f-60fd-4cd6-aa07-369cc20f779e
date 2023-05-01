import React, { useState,useEffect } from 'react';
import { useParams,Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import {getCourses, editCourse} from '../../../api/courseApi.js';
import NavBar from '../Navbar/Navbar.js';


function Editcourse(props) {
  const { id } = useParams();
  // const [courseId, setCourseId] = useState(props.course?.courseId || '');
  // const [courseName, setCourseName] = useState(props.course?.courseName || '');
  // const [courseDuration, setCourseDuration] = useState(props.course?.CourseDuration || '');
  const [courseTiming, setCourseTiming] = useState(props.course?.CourseTiming || '');
  const [courseEnrolled, setCourseEnrolled] = useState(props.course?.CourseEnrolled || '');
  // const [courseDescription, setCourseDescription] = useState(props.course?.CourseDescription || '');
  const navigate = useNavigate();
  const [course, setCourse] = useState({
    id:'',
    courseId: '',
    courseName: '',
    courseDescription: '',
    courseDuration: ''
  });

  const handleClick = (event)=>{
    handleSubmit(event);
    navigate('/admin/viewCourse');
  }
  useEffect(() => {
    async function fetchCourse() {
      const data = await getCourses(id);
      const d1=data.find((eachdata)=>{
        return (eachdata.courseId==id)
      })
      console.log(d1);
      setCourse(d1);
    }
    fetchCourse();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const updatedCourse = {
      //   ...course,
      //   "courseId":courseId,
      //   "courseName": courseName,
      //   "courseDescription":courseDescription ,
      //   "courseDuration": courseDuration
      // };
      await editCourse(id, course);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
    <NavBar/>
    <div>
      <h1>Edit Course</h1>
      <form >
      <div>
          <label htmlFor="courseId">Course Id:</label>
          <input
            id="courseId"
            type="text"
            // placeholder={`${course.courseId}`}
            defaultValue={course.courseId}
            onChange={(e) => setCourse({...course,courseId:e.target.value})}
            data-testid="courseId"
          />
        </div>
      <div>
          <label htmlFor="courseName">Course Name:</label>
          <input
            id="courseName"
            type="text"
            defaultValue={course.courseName}
            onChange={(e) => setCourse({...course,courseName:e.target.value})}
            data-testid="courseName"
          />
        </div>
        <div>
          <label htmlFor="courseDuration">Course Duration:</label>
          <input
            id="courseDuration"
            type="text"
            defaultValue={course.courseDuration}
            onChange={(e) => setCourse({...course,courseDuration:e.target.value})}
            data-testid="courseDuration"
          />
        </div>
        <div>
          <label htmlFor="courseTiming">Course Timing:</label>
          <input
            id="courseTiming"
            type="text"
            defaultValue={courseTiming}
            onChange={(e) => setCourseTiming(e.target.value)}
            data-testid="courseTiming"
          />
        </div>
        <div>
          <label htmlFor="courseEnrolled">Course Enrolled:</label>
          <input
            id="courseEnrolled"
            type="text"
            defaultValue={courseEnrolled}
            onChange={(e) => setCourseEnrolled(e.target.value)}
            data-testid="courseEnrolled"
          />
        </div>
        <div>
          <label htmlFor="courseDescription">Course Description:</label>
          <textarea
            id="courseDescription"
            type="text"
            defaultValue={course.courseDescription}
            onChange={(e) => setCourse({...course,courseDescription:e.target.value})}
            data-testid="courseDescription"
          />
        </div>
        <button type="submit" onClick={(e)=>handleClick(e)}>Update Course</button>
        <Link to="/admin/viewCourse" className="btn btn-secondary">Cancel</Link>
      </form>
    </div>
    </>
  );
}

export default Editcourse;