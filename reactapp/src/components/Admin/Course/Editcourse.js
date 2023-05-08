import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getCourses, editCourse } from "../../../api/courseApi.js";
import NavBar from "../Navbar/Navbar.js";
import { AdminGuard } from "../../../AuthGuard/AdminGuard";

function Editcourse(props) {
  const { id } = useParams();
  // const [courseId, setCourseId] = useState(props.course?.courseId || '');
  // const [courseName, setCourseName] = useState(props.course?.courseName || '');
  // const [courseDuration, setCourseDuration] = useState(props.course?.CourseDuration || '');
  // const [courseTiming, setCourseTiming] = useState(props.course?.CourseTiming || '');
  // const [courseEnrolled, setCourseEnrolled] = useState(props.course?.CourseEnrolled || '');
  // const [courseDescription, setCourseDescription] = useState(props.course?.CourseDescription || '');
  const navigate = useNavigate();
  const [course, setCourse] = useState({
    id:'',
    courseId: '',
    courseName: '',
    courseDescription: '',
    courseDuration: '',
    courseTiming:'',
    courseEnrolled:''

  });

  const handleClick = (event) => {
    handleSubmit(event)
      .then((data) => {
        console.log("edited successfully ", data);
      })
      .catch((error) => {
        console.error(error);
      });

    navigate("/admin/viewCourse");
  };
  useEffect(() => {
    async function fetchCourse() {
      const data = await getCourses(id);
      const d1 = data.find((eachdata) => {
        return eachdata.courseId == id;
      });
      console.log(d1);
      setCourse(d1);
    }
    fetchCourse()
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await editCourse(id, course);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AdminGuard>
      <NavBar />
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
            defaultValue={course.courseTiming}
            onChange={(e) => setCourse({...course,courseTiming:e.target.value})}
            data-testid="courseTiming"
          />
        </div>
        <div>
          <label htmlFor="courseEnrolled">Course Enrolled:</label>
          <input
            id="courseEnrolled"
            type="text"
            defaultValue={course.courseEnrolled}
            onChange={(e) => setCourse({...course,courseEnrolled:e.target.value})}
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
