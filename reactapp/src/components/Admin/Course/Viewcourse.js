import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { getCourses,deleteCourse } from "../../../api/courseApi.js";


function Viewcourse() {
  const [courses, setCourses] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      const data = await getCourses();
      console.log(data)
      setCourses(data);
    };
    fetchData();
  }, []);

  // const handleAddCourse = async (newCourse) => {
  //   const addedCourse = await addCourse(newCourse);
  //   setCourses((prevState) => [...prevState, addedCourse]);
    
  // };

  // const handleEdit = async (id, updatedCourse) => {
  //   try {
  //     const editedCourse = await editCourse(id, updatedCourse);
  //     setCourses((prevState) => prevState.map((course) => {
  //       if (course.id === editedCourse.id) {
  //         return editedCourse;
  //       }
  //       return course;
  //     }));
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const handleDelete = async (id) => {
    try {
      await deleteCourse(id);
      setCourses((prevState) => prevState.filter((course) => course.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>List of Courses</h1>
      {courses && courses.length > 0 ? (
        <div className="courses-grid">
          {courses.map((course) => (
            <div key={course.id} className="course-card">
              <div className="course-card-body">
              <div className="course-card-text">Course Id: {course.courseId}</div>
                <div className="course-card-text">Course Name: {course.courseName}</div>
                <div className="course-card-text">Course Duration: {course.courseDuration}</div>
                <div className="course-card-text">Course Available Timings: {course.timing}</div>
                <div className="course-card-text">Number of Students: {course.enrolled}</div>
                <div className="course-card-text">Course Description: {course.courseDescription}</div>
              </div>
              <div className="course-card-footer">
                <NavLink exact="true" to={`/admin/editCourse/${course.courseId}`} className="nav-link" id="editcourse"  activeclassname="active">
                  <i className="fa-regular fa-pen-to-square" style={{ color: '#050505' }}></i>
                </NavLink>
                 <span className="nav-link" id="deletecourse" onClick={() => handleDelete(course.id)}>
                <i className="fa-regular fa-trash-can" style={{ color: '#050505', cursor: 'pointer' }}></i>
              </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>No courses found</div>
      )}
      <NavLink exact="true" to="/admin/addCourse" className="nav-link" id="addcourse"  activeclassname="active">
        <button id="add-course"><i className="fa-solid fa-circle-plus"></i> Add Course</button>
      </NavLink>
    </div>
  );
}

export default Viewcourse;