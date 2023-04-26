import React, { useState,useEffect } from 'react';
import { useParams,Link } from 'react-router-dom';
import {getCourses, editCourse} from '../../../api/courseApi.js';

function Editcourse(props) {
  const { id } = useParams();
  const [courseId, setCourseId] = useState(props.course?.courseId || '');
  const [courseName, setCourseName] = useState(props.course?.courseName || '');
  const [courseDuration, setCourseDuration] = useState(props.course?.CourseDuration || '');
  const [courseTiming, setCourseTiming] = useState(props.course?.CourseTiming || '');
  const [courseEnrolled, setCourseEnrolled] = useState(props.course?.CourseEnrolled || '');
  const [courseDescription, setCourseDescription] = useState(props.course?.CourseDescription || '');
  const [course, setCourse] = useState({
    courseId: '',
    courseName: '',
    courseDescription: '',
    courseDuration: ''
  });

  
  useEffect(() => {
    async function fetchCourse() {
      const data = await getCourses(id);
      setCourse(data);
      setCourseId(data.courseId)
      setCourseName(data.courseName);
      setCourseDuration(data.courseDuration);
      setCourseTiming(data.courseTiming);
      setCourseEnrolled(data.courseEnrolled);
      setCourseDescription(data.courseDescription);
    }
    fetchCourse();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedCourse = {
        ...course,
        "courseId":courseId,
        "courseName": courseName,
        "courseDescription":courseDescription ,
        "courseDuration": courseDuration
      };
      await editCourse(id, updatedCourse);
      alert('Course updated successfully');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Edit Course</h1>
      <form >
      <div>
          <label htmlFor="courseId">Course Id:</label>
          <input
            id="courseId"
            type="text"
            defaultValue={courseId}
            onChange={(e) => setCourseId(e.target.value)}
            data-testid="courseId"
          />
        </div>
      <div>
          <label htmlFor="courseName">Course Name:</label>
          <input
            id="courseName"
            type="text"
            defaultValue={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            data-testid="courseName"
          />
        </div>
        <div>
          <label htmlFor="courseDuration">Course Duration:</label>
          <input
            id="courseDuration"
            type="text"
            defaultValue={courseDuration}
            onChange={(e) => setCourseDuration(e.target.value)}
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
            defaultValue={courseDescription}
            onChange={(e) => setCourseDescription(e.target.value)}
            data-testid="courseDescription"
          />
        </div>
        <button type="submit" onClick={handleSubmit}>Update Course</button>
        <Link to="/admin/viewCourse" className="btn btn-secondary">Cancel</Link>
      </form>
    </div>
  );
}

export default Editcourse;