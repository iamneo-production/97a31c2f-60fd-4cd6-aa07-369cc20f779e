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
    navigate(`/Enrollcourse/${courseId}`);
  };

  return (
    <UserGuard>
      <div className="mainbar">
        <Link to="/Navpage">
          <h1>PG Admission</h1>
        </Link>
        <div className="one">
          <Link to="/Viewacademy">Institute</Link>
        </div>

        <div className="one">
          <Link to="/Enrolledcourse">Enrolled course</Link>
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
      <div className="home">
        <Link to="/Viewacademy">
          <h5>Back To Home</h5>
        </Link>
      </div>
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
            <table>
              <div key={id}>
                <tr>
                  <th>course id</th>
                  <th>course name</th>
                  <th>course description</th>
                  <th>course duration</th>

                </tr>
                <tr>
                  <td>{courseId}</td>
                  <td>{courseName}</td>
                  <td>{courseDescription}</td>
                  <td>{courseDuration}</td>
                </tr>
                {/* <h3>course id: {courseId}</h3>
              <h3>course name:{courseName}</h3>
              <h3>course description:{courseDescription}</h3>
              <h3>course duration:{courseDuration}</h3> */}
                <div className="en">

                  <button type="button" onClick={() => handleenroll(courseId)}>
                    <td>Enroll Now</td>
                  </button>
                </div>

              </div>
            </table>
          );
        })}
      </div>
    </UserGuard>
  );
};

export default UserCourse;