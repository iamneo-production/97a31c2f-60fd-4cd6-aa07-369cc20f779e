import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { store } from "../../../store";
import { UserGuard } from "../../../AuthGuard/UserGuard";
import "./UserCourse.css";
import { baseUrl } from "../../../api/authService";

let auth = "";
store.subscribe(() => {
  auth = store.getState().auth;
  console.log(auth);
});
const UserCourse = () => {
  const [viewdata, setViewdata] = useState([]);
  useEffect(() => {
    getdata()
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  const getdata = async () => {
    const response = await fetch(`${baseUrl}/admin/viewCourse`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${auth.token}`,
        "Content-type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    setViewdata(data);
  };
  const navigate = useNavigate();
  const handleLogout = () => {
    store.dispatch({ type: "LOGOUT" });
    navigate("/login");
  };
  const handleenroll = (courseId) => {
    navigate(`/ApplyForm/${courseId}`);
  };

  return (
    <UserGuard>
      <div className="mainbar">
        <Link to="/Navpage">
          <h1>PG Admission</h1>
        </Link>
        <div className="one">
          <Link to="/Enrolledcourse">Enrolled course</Link>

        </div>

        <div className="one1">
          <Link to="/HomePage">Institute</Link>

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
      <div className="bth">
        <Link to="/HomePage">
          <h5>Back To Home</h5>
        </Link>
      </div>
      <div className="usercoursecontainer">
        <div className="headtxt">
          Offered Courses!
          It's Time To Pick Yours
        </div>

        <table>
          <thead>
            <tr>
              <th>Course Id</th>
              <th>Course Name</th>
              <th>Course Description</th>
              <th>Course Duration</th>
              <th>Click Me</th>
            </tr>
          </thead>
        </table>

        <div className="onesec">
          {viewdata.map((course) => {
            const {
              id,
              courseName,
              courseDescription,
              courseDuration,
              courseId,
            } = course;

            return (
              


                <div  className="courseinfo" key={id}>

                  <table>
                    <tbody>
                      <tr className="row hover">
                        <td>{courseId}</td>
                        <td>{courseName}</td>
                        <td>{courseDescription}</td>
                        <td>{courseDuration}</td>
                        <button type="button" className="enroll" onClick={() => handleenroll(courseId)}>
                          <td>EnrollNow</td>
                        </button>
                      </tr>
                    </tbody>
                  </table>
                </div>
              

            );
          })}
        </div>
      </div>
    </UserGuard >
  );
};

export default UserCourse;