import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./Enrollcourse.css";
import { useNavigate } from "react-router";
import { UserGuard } from "../../../AuthGuard/UserGuard";
import { store } from "../../../store";
import { baseUrl } from "../../../api/authService";

let auth = "";
store.subscribe(() => {
  auth = store.getState().auth;
  console.log(auth);
});
function Enrollcourse() {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const handlecancel = () => {
    navigate("/viewacademy")
  }

  const handleLogout = () => {
    store.dispatch({ type: "LOGOUT" });
    navigate("/login");
  };
  const data = {
    firstName: "",
    lastName: "",
    fatherName: "",
    motherName: "",
    phoneNumber1: "",
    phoneNumber2: "",
    emailId: "",
    studentDOB: "",
    sslc: "",
    hsc: "",
    diploma: "",
    houseNumber: "",
    streetName: "",
    areaName: "",
    state: "",
    pincode: "",
    nationality: "",
  };
  const [inputData, setInputData] = useState(data);
  const [flag, setFlag] = useState(false);
  useEffect(() => {
    console.log("registered");
  }, [flag]);
  function handledata(e) {
    console.log(e.target.id);
    setInputData({ ...inputData, [e.target.name]: e.target.value });
    console.log(inputData);
  }
  function handleSubmit(e) {
    e.preventDefault();
    postdata()
      .then(() => {
        console.log("success");
      })
      .catch((error) => {
        console.error(error);
      });

    if (
      !inputData.firstName ||
      !inputData.lastName ||
      !inputData.fatherName ||
      !inputData.motherName ||
      !inputData.phoneNumber1 ||
      !inputData.phoneNumber2 ||
      !inputData.emailId ||
      !inputData.studentDOB ||
      !inputData.streetName ||
      !inputData.areaName ||
      !inputData.state ||
      !inputData.pincode ||
      !inputData.nationality ||
      !inputData.sslc ||
      !inputData.hsc
    ) {
      alert("All fields are Mandatory");
    } else {
      setFlag(true);
      navigate("/Enrolledcourse");
    }
  }
  const postdata = async () => {
    await fetch(`${baseUrl}/user/studentForm`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        ...inputData,
        courseId: courseId,
        studentIdNumber: auth.id,
      }),
    });
  };
  return (
    <UserGuard>
      <pre>
        {flag ? (
          <h2 className="ui-define">
            Hello {inputData.firstName},registered successfully
          </h2>
        ) : (
          ""
        )}
      </pre>

      <div className="nvbar">
        <h2>PG Admission</h2>
        <div className="link">
          <Link to="/Viewacademy">
            <h2>Institute</h2>
          </Link>
        </div>
        <div className="link">
          <Link to="/Enrolledcourse">Enrolled course</Link>
        </div>
        <div className="out">
          <button data-testid="logout" name="logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
      <form className="info" onSubmit={handleSubmit}>
        <div className="form">
          <div className="form-body">
            <div className="flex-conatiner">
              <div className="courseId">
                <label className="form__label" for="courseId">
                  courseId{" "}
                </label>
                <input
                  type="text"
                  name="courseId"
                  id="courseId"
                  className="form__input"
                  value={courseId}
                />
              </div>
              <div className="studentIdNumber">
                <label className="form__label" for="studentIdNumber">
                  studentIdNumber
                </label>
                <input
                  type="text"
                  name="studentIdNumber"
                  id="lastName"
                  className="form__input"
                  value={auth.id}
                />
              </div>
              <div className="username">
                <label className="form__label" for="firstName">
                  First Name{" "}
                </label>
                <input
                  className="form__input"
                  name="firstName"
                  type="text"
                  id="firstName"
                  placeholder=" Enter Your First Name"
                  value={inputData.firstName}
                  onChange={handledata}
                />
              </div>
              <div className="lastname">
                <label className="form__label" for="lastName">
                  Last Name{" "}
                </label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  className="form__input"
                  placeholder="Enter Your LastName"
                  value={inputData.lastName}
                  onChange={handledata}
                />
              </div>
              <div className="fathername">
                <label className="form__label" for="fatherName">
                  Father Name{" "}
                </label>
                <input
                  type="text"
                  name="fatherName"
                  id="fatherName"
                  className="form__input"
                  placeholder="Enter Your fatherName"
                  value={inputData.fatherName}
                  onChange={handledata}
                />
              </div>
              <div className="mothername">
                <label className="form__label" for="motherName">
                  Mother Name{" "}
                </label>
                <input
                  type="text"
                  name="motherName"
                  id="motherName"
                  className="form__input"
                  placeholder="Enter Your MotherName"
                  value={inputData.motherName}
                  onChange={handledata}
                />
              </div>
              {/* <div className="gender">
                                <label className="form__label" for="gender">Gender </label>
                                <input type="text" name="" id="gender" className="form__input" placeholder="Enter male or female" value={inputData.gender} onChange={handledata} />
                            </div> */}
              <div className="emailId">
                <label className="form__label" for="emailId">
                  Email{" "}
                </label>
                <input
                  type="email"
                  name="emailId"
                  id="emailId"
                  className="form__input"
                  placeholder="Enter Your Email"
                  value={inputData.emailId}
                  onChange={handledata}
                />
              </div>
              <div className="phoneNumber1">
                <label className="form__label" for="phoneNumber1">
                  phonenumber{" "}
                </label>
                <input
                  className="form__input"
                  name="phoneNumber1"
                  type="text"
                  id="phoneNumber1"
                  placeholder="Enter your phonenumber"
                  value={inputData.PhoneNumber1}
                  onChange={handledata}
                />
              </div>

              <div className="phoneNumber2">
                <label className="form__label" for="phoneNumber2">
                  Alternativenumber{" "}
                </label>
                <input
                  className="form__input"
                  name="phoneNumber2"
                  type="text"
                  id="phoneNumber2"
                  placeholder="Enter your alternativenumber"
                  value={inputData.phoneNumber2}
                  onChange={handledata}
                />
              </div>
              <div className="studentDOB">
                <label className="form__label" for="studentDOB">
                  Age{" "}
                </label>
                <input
                  type="text"
                  name="studentDOB"
                  id="studentDOB"
                  className="form__input"
                  placeholder="Enter Your age"
                  value={inputData.studentDOB}
                  onChange={handledata}
                />
              </div>
              <div className="sslc">
                <label className="form__label" for="sslc">
                  sslc{" "}
                </label>
                <input
                  type="text"
                  name="sslc"
                  id="sslc"
                  className="form__input"
                  placeholder="Enter SSLC marks"
                  value={inputData.sslc}
                  onChange={handledata}
                />
              </div>
              <div className="hsc">
                <label className="form__label" for="hsc">
                  hsc{" "}
                </label>
                <input
                  type="text"
                  name="hsc"
                  id="hsc"
                  className="form__input"
                  placeholder="Enter HSC marks"
                  value={inputData.hsc}
                  onChange={handledata}
                />
              </div>
              <div className="diploma">
                <label className="form__label" for="diploma">
                  diploma{" "}
                </label>
                <input
                  type="text"
                  name="diploma"
                  id="diploma"
                  className="form__input"
                  placeholder="Enter diploma marks"
                  value={inputData.diploma}
                  onChange={handledata}
                />
              </div>
              <div className="add">
                <h4>Address information</h4>
                <div className="houseNumber">
                  <label className="form__label" for="houseNumber">
                    HouseNo{" "}
                  </label>
                  <input
                    type="text"
                    name="houseNumber"
                    id="houseNumber"
                    className="form__input"
                    placeholder="Enter Housenumber"
                    value={inputData.houseNumber}
                    onChange={handledata}
                  />
                </div>
                <div className="streetName">
                  <label className="form__label" for="streetName">
                    Street Name{" "}
                  </label>
                  <input
                    type="text"
                    id="streetName"
                    name="streetName"
                    className="form__input"
                    placeholder="Enter the Streetname"
                    value={inputData.streetName}
                    onChange={handledata}
                  />
                </div>
                <div className="areaname">
                  <label className="form__label" for="areaname">
                    AreaName{" "}
                  </label>
                  <input
                    type="text"
                    id="areaName"
                    name="areaName"
                    placeholder="Enter the Areaname"
                    className="form__input"
                    value={inputData.areaName}
                    onChange={handledata}
                  />
                </div>
                <div className="state">
                  <label className="form__label" for="state">
                    State{" "}
                  </label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    className="form__input"
                    placeholder="Enter the State"
                    value={inputData.state}
                    onChange={handledata}
                  />
                </div>
                <div className="pincode">
                  <label className="form__label" for="pincode">
                    Pincode{" "}
                  </label>
                  <input
                    type="text"
                    id="pincode"
                    name="pincode"
                    className="form__input"
                    placeholder="Enter the Pincode"
                    value={inputData.pincode}
                    onChange={handledata}
                  />
                </div>
                <div className="nationality">
                  <label className="form__label" for="nationality">
                    Nationality{" "}
                  </label>
                  <input
                    type="text"
                    id="nationality"
                    name="nationality"
                    placeholder="Enter Nationality"
                    className="form__input"
                    value={inputData.nationality}
                    onChange={handledata}
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="footer">
            <button type="submit">Submit</button>
            <br>
            </br>
            <button onClick={handlecancel}>cancel</button>
          </div>
        </div>
      </form>
    </UserGuard>
  );
}
export default Enrollcourse;