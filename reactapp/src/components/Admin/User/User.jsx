import React, { useState, useEffect, useRef } from "react";
import { store } from "../../../store";
import { Navigate } from "react-router";
import { useNavigate, useParams, NavLink, Link } from "react-router-dom";
import { baseUrl } from "../../../api/authService";
import './AdminStudent.css';
import Navbar from "../Navbar/Navbar";
import emailjs from '@emailjs/browser';


let auth = "";
store.subscribe(() => {
  auth = store.getState().auth;
  console.log(auth);
});

const student = {
  firstName: "",
  lastName: "",
  fatherName: "",
  motherName: "",
  phoneNumber1: "",
  phoneNumber2: "",
  studentIdNumber: "",
  studentDOB: "",
  sslc: "",
  hsc: "",
  diploma: "",
  emailId: "",
  eligibility: "",
  courseId: "",
  instituteId: "",
  streetName: "",
  areaName: "",
  state: "",
  pincode: "",
  nationality: "",
};

const User = () => {
  if (auth.token === "") {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <AdminStudent1 />
    </>
  );
};

const AdminStudent1 = () => {
  const [fetchedStudentData, setFetchedStudentData] = useState([]);

  const [studentData, setStudentData] = useState([]);

  const [course1, setCourse1] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const [isError, setIsError] = useState({ state: false, msg: "" });

  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  const [popup, setPopup] = useState({
    state: false,
    deleteId: null
  });



  useEffect(() => {
    fetchCourseName()
      .then((data) => {
        console.log("fetched course data success ", data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const filterStudentData = () => {
    const filteredData = fetchedStudentData.filter((eachStudent) => {
      const studentName = eachStudent.firstName.toLowerCase();
      const searchName = searchTerm.toLowerCase();
      return studentName.startsWith(searchName);
    });
    setStudentData(filteredData);
  };

  const fetchStudentData = async () => {
    setIsLoading(true);
    setIsError({ state: false, msg: "" });
    try {
      const response = await fetch(`${baseUrl}/admin/student`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${auth.token}`,
          "Content-type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);
      setFetchedStudentData(data);
      setStudentData(data);
      setIsLoading(false);
      setIsError({ state: false, msg: "" });
      if (response.status === 400) {
        throw new Error("Data Not Found");
      }
    } catch (error) {
      setIsLoading(false);
      setIsError({
        state: true,
        msg: error.message || "Something Went Wrong !",
      });
    }
  };

  async function fetchCourseName() {
    try {
      const response = await fetch(`${baseUrl}/admin/courses`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${auth.token}`,
          "Content-type": "application/json",
        },
      });

      const data = await response.json();
      console.log(data);
      setCourse1(data);
      fetchStudentData()
        .then((dataa) => {
          console.log("fetched student data success ", dataa);
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.error("Error fetching course data:", error);
    }
  }

  const handleDelete = async (id) => {
    setPopup({ state: true, deleteId: id });
  };

  const deleteStudent = async (id) => {
    const response = await fetch(`${baseUrl}/admin/deleteStudent/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${auth.token}`,
      },
    });
    console.log(response);
    fetchStudentData()
      .then((data) => {
        console.log("fetched student data success ", data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleEdit = (id) => {
    navigate(`/admin/editStudent/${id}`);
  };

  return (
    <>
      <Navbar />

      {
        popup.state && (
          <div className="admin-popup-body noHover">
            <div className="admin-popup-overlay">

            </div>
            <div className="admin-student-popup">
              <h1>Are you sure to delete the data ?</h1>
              <button
                className="admin-student-confirm-btn"
                type="submit"
                onClick={() => {
                  deleteStudent(popup.deleteId)
                    .then((data) => {
                      console.log("delete student data success ", data);
                    })
                    .catch((error) => {
                      console.error(error);
                    });
                  setPopup({
                    state: false,
                    deleteId: null
                  });
                }}
              >
                Confirm Delete
              </button>
              <button
                className="admin-student-cancel-btn"
                type="submit"
                onClick={() => {
                  setPopup({
                    state: false,
                    deleteId: null
                  });
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        )
      }
      <div className="admin-student-container">
        <div className="admin-search-container">
          <input
            type="text"
            name="search"
            className="search-input"
            value={searchTerm}
            placeholder="Type here to Search Student"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            type="button"
            className="search-btn"
            onClick={() => filterStudentData()}
          >
            Search
          </button>
        </div>
        {isError.state && <h4>{isError.msg}</h4>}
        <div className="student-heading"  >
          <h1> <i class="fa-solid fa-users-line"></i> List of Students</h1>
        </div>
        {isLoading && <>
          <div className="flex justify-center">
            <div className="loadingio-spinner-double-ring-amot1w4ku1j"><div className="ldio-14cancim8ocq">
              <div></div>
              <div></div>
              <div><div></div></div>
              <div><div></div></div>
            </div></div>
          </div>
        </>}

        {!isLoading &&
          <>
            <table className="admin-student-table">
              <thead>
                <tr>
                  <th className="admin-student-th">Student ID</th>
                  <th data-testid="userName" className="admin-student-th">Name</th>
                  <th data-testid="qualification" className="admin-student-th">Course Name</th>
                  <th data-testid="mobile" className="admin-student-th">Phone Number</th>
                  <th className="admin-student-th">Actions</th>
                </tr>
              </thead>
            </table>
            <div className="student-display-container">
              {studentData.map((student1) => {
                const { studentId, firstName, phoneNumber1, courseId, lastName } =
                  student1;
                const course = course1.find((eachCourse) => {
                  return eachCourse.courseId == courseId;
                });
                console.log(course);

                return (
                  <>
                    <div className="student-card-info">
                      <table className="admin-student-table">
                        <tbody>
                          <tr>
                            <td className="admin-student-td">{studentId}</td>
                            <td className="admin-student-td">{firstName + " " + lastName}</td>
                            <td className="admin-student-td">{(course != null) ? course.courseName : "Course Not Found"}</td>
                            <td className="admin-student-td">{phoneNumber1}</td>
                            <td className="admin-student-td">
                              <button
                                type="submit"
                                id="editStudent"
                                className="edit-btn"
                                onClick={() => handleEdit(studentId)}
                              >
                                <i className="fa-regular fa-pen-to-square"></i>
                              </button>
                              <button
                                type="submit"
                                id="deleteStudent"
                                className="delete-btn"
                                onClick={() => handleDelete(studentId)}
                              >
                                <i className="fa-regular fa-trash-can"></i>
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </>
                );
              })}
            </div>
          </>
        }

        <NavLink
          exact="true"
          to="/admin/addStudent"
          className="nav-link"
          id="addStudent"
          activeclassname="active">
          <div className="admin-add-student-button">
            <div className='admin-add-student-icon' >
              <i className="fa-solid fa-circle-plus"></i>
            </div>
          </div>
        </NavLink>
      </div>
    </>
  );
};

export const StudentForm = ({ type }) => {
  const [formData, setFormData] = useState(student);
  const navigate = useNavigate();
  const [popup, setPopup] = useState(false);
  const [course, setCourse] = useState([]);
  const [institute, setInstitute] = useState([]);
  const [coursePopup, setCoursePopup] = useState(false);
  const [institutePopup, setInstitutePopup] = useState(false);

  const form = useRef();

  const { id } = useParams();
  useEffect(() => {
    fetchData()
      .then((data) => {
        console.log("fetched student data success ", data);
      })
      .catch((error) => {
        console.error(error);
      });
    fetchCourse()
      .then((data) => {
        console.log("fetched course data success ", data);
      })
      .catch((error) => {
        console.error(error);
      });
    fetchInstitute()
      .then((data) => {
        console.log("fetched Institute data success ", data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);


  const fetchData = async () => {
    const response = await fetch(`${baseUrl}/admin/student`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${auth.token}`,
        "Content-type": "application/json",
      },
    });
    const data = await response.json();
    const editData = data.find((eachStudent) => {
      return eachStudent.studentId == id;
    });
    console.log(editData);
    if (type === "EDIT") {
      setFormData(editData);
    }
  };



  const fetchCourse = async () => {
    const response = await fetch(`${baseUrl}/admin/courses`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${auth.token}`,
        "Content-type": "application/json",
      },
    });
    const data = await response.json();
    setCourse(data);
  }
  const fetchInstitute = async () => {
    const response = await fetch(`${baseUrl}/admin/institute`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${auth.token}`,
        "Content-type": "application/json",
      },
    });
    const data = await response.json();
    setInstitute(data);
  }

  const handleInputChange = (e, key) => {
    const currentData = {
      ...formData,
    };
    currentData[key] = e.target.value;
    setFormData(currentData);
  };

  const handleFormAdd = (e) => {
    e.preventDefault();
    console.log(formData);
    if (formData.firstName &&
      formData.lastName &&
      formData.fatherName &&
      formData.motherName &&
      formData.phoneNumber1 &&
      formData.phoneNumber2 &&
      formData.studentDOB &&
      formData.sslc &&
      formData.hsc &&
      formData.diploma &&
      formData.emailId &&
      formData.eligibility &&
      formData.courseId &&
      formData.instituteId &&
      formData.streetName &&
      formData.areaName &&
      formData.state &&
      formData.pincode &&
      formData.nationality
    ) { setPopup(true); }
    else {
      alert("All fields are mandatory")
    }
    emailjs.sendForm('service_lmsokkj', 'template_6k92fc5', form.current, 'ryVJfM_L3_9s5b_X6')
      .then((result) => {
        console.log(result.text);
      }, (error) => {
        console.log(error.text);
      });
  };

  const addStudent = async () => {
    const response = await fetch(`${baseUrl}/admin/addStudent`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${auth.token}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    console.log(response);
    navigate("/admin/Viewstudent");
  };

  const handleFormEdit = (e) => {
    e.preventDefault();
    console.log("Edited Data : ", formData);
    setPopup(true);
  };

  const editStudent = async () => {
    const response = await fetch(`${baseUrl}/admin/editStudent/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${auth.token}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    console.log(response);
    navigate("/admin/Viewstudent");
  };
  return (
    <>
      <Navbar />
      {
        coursePopup && (
          <div className="admin-popup-body">
            <div className="admin-popup-overlay">

            </div>
            <div className="admin-student-popup">
              {course.map((eachCourse) => {
                return (
                  <div key={eachCourse.courseId} onClick={() => { setFormData({ ...formData, courseId: eachCourse.courseId }); setCoursePopup(false); }}>
                    <h1>{eachCourse.courseId} : {eachCourse.courseName}</h1>
                  </div>
                )
              })}
            </div>
          </div>
        )

      }


      {
        institutePopup && (
          <div className="admin-popup-body">
            <div className="admin-popup-overlay"></div>
            <div className="admin-student-popup">
              {institute.map((eachInstitute) => {
                console.log(eachInstitute);
                return (
                  <div
                    key={eachInstitute.id}
                    onClick={() => {
                      setFormData({ ...formData, instituteId: eachInstitute.instituteId });
                      setInstitutePopup(false);
                    }}
                  >
                    <h1>{eachInstitute.instituteId} : {eachInstitute.instituteName}</h1>
                  </div>
                );
              })}

            </div>
          </div>
        )
      }


      {
        popup && (
          <div className="admin-popup-body">
            <div className="admin-popup-overlay">

            </div>
            <div className="admin-student-popup">
              {type === "ADD" ? (
                <h1>Are you sure to add the data ?</h1>
              ) : (
                <h1>Are you sure to edit the data ?</h1>
              )}
              {type === "ADD" ? (
                <button
                  className="admin-student-confirm-btn"
                  type="submit"
                  onClick={() => {
                    addStudent()
                      .then((data) => {
                        console.log("added student ", data);
                      })
                      .catch((error) => {
                        console.error(error);
                      });
                  }}
                >
                  Confirm Add
                </button>
              ) : (
                <button
                  className="admin-student-confirm-btn"
                  type="submit"
                  onClick={() => {
                    editStudent()
                      .then((data) => {
                        console.log(data);
                      })
                      .catch((error) => {
                        console.error(error);
                      });
                  }}
                >
                  Confirm Edit
                </button>
              )}
              <button
                className="admin-student-cancel-btn"
                type="submit"
                onClick={() => {
                  setPopup(false);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        )
      }
      <button
        type="submit"
        className="back-to-home"
        onClick={() => {
          navigate("/admin/Viewstudent");
        }}
      >
        <i class="fa-solid fa-house"></i> Back to Home
      </button>
      {type === "ADD" ? (
        <h1 className="head-container" ><i class="fa-solid fa-user-plus"> </i> Add Student Details</h1>
      ) : (
        <h1 className="head-container"><i class="fa-solid fa-pen-to-square"></i> Edit Student Details</h1>
      )}
      <form className="student-form-container m-2 lg:m-12" ref={form} >
        <div className="studentform p-4 lg:18 ">
          <div className="form-body">
            <div className="courseId">
              <label className="form__label" htmlFor="courseid">
                {" "}
                Course ID{" "}
              </label>
              <input
                type="text"
                id="courseId"
                name="courseId"
                className="form__input"
                placeholder="Select Course Id"
                autoComplete="off"
                value={formData.courseId}
                onClick={() => { setCoursePopup(true) }}
              />
            </div>
            <div className="instituteId">
              <label className="form__label" htmlFor="instituteid">
                {" "}
                Institute ID{" "}
              </label>
              <input
                type="text"
                id="instituteId"
                name="instituteId"
                className="form__input"
                placeholder="Select Institute"
                autoComplete="off"
                value={formData.instituteId}
                onClick={() => { setInstitutePopup(true) }}


              />
            </div>
            <div data-testid="userName" className="username" >
              <label className="form__label" htmlFor="firstName">
                {" "}
                First Name{" "}
              </label>
              <input
                className="form__input"
                type="text"
                id="firstName"
                name="studentName"
                placeholder="Enter Your First Name"
                value={formData.firstName}
                onChange={(e) => handleInputChange(e, "firstName")}
              />
            </div>
            <div className="username">
              <label className="form__label" htmlFor="firstName">
                {" "}
                Last Name{" "}
              </label>
              <input
                className="form__input"
                type="text"
                id="firstName"
                name="studentName"
                placeholder="Enter Your Last Name"
                value={formData.lastName}
                onChange={(e) => handleInputChange(e, "lastName")}
              />
            </div>
            <div className="username">
              <label className="form__label" htmlFor="firstName">
                {" "}
                Father Name{" "}
              </label>
              <input
                className="form__input"
                type="text"
                id="firstName"
                name="studentName"
                placeholder="Enter Your Father Name"
                value={formData.fatherName}
                onChange={(e) => handleInputChange(e, "fatherName")}
              />
            </div>
            <div className="username">
              <label className="form__label" htmlFor="firstName">
                {" "}
                Mother Name{" "}
              </label>
              <input
                className="form__input"
                type="text"
                id="firstName"
                name="studentName"
                placeholder="Enter Your Mother  Name"
                value={formData.motherName}
                onChange={(e) => handleInputChange(e, "motherName")}
              />
            </div>

            <div className="studentDob">
              <label className="form__label" htmlFor="studentDob">
                Student DOB
              </label>
              <input
                type="text"
                id="studentDob"
                name="studentDob"
                className="form__input"
                placeholder="Enter Your DOB (YYYY-MM-DD)"
                value={formData.studentDOB}
                onChange={(e) => handleInputChange(e, "studentDOB")}
              />
            </div>
            <div className="mobile" >
              <label className="form__label" htmlFor="mobile">
                {" "}
                Phone Number{" "}
              </label>
              <input
                type="text"
                id="mobile"
                name="mobile"
                className="form__input"
                placeholder="Enter Your Phone Number"
                value={formData.phoneNumber1}
                onChange={(e) => handleInputChange(e, "phoneNumber1")}
              />
            </div>
            <div className="mobile">
              <label className="form__label" htmlFor="mobile">
                Alternative Phone Number{" "}
              </label>
              <input
                type="text"
                id="mobile"
                name="mobile"
                className="form__input"
                placeholder="Enter Your Phone Number"
                value={formData.phoneNumber2}
                onChange={(e) => handleInputChange(e, "phoneNumber2")}
              />
            </div>
            <div className="SSLC">
              <label className="form__label" htmlFor="SSLC">
                {" "}
                SSLC Marks{" "}
              </label>
              <input
                type="number"
                id="SSLC"
                name="SSLC"
                className="form__input"
                placeholder="Enter Your SSLC Marks"
                value={formData.sslc}
                onChange={(e) => handleInputChange(e, "sslc")}
              />
            </div>
            <div className="HSC">
              <label className="form__label" htmlFor="HSC">
                {" "}
                HSC Marks{" "}
              </label>
              <input
                type="number"
                id="HSC"
                name="HSC"
                className="form__input"
                placeholder="Enter Your HSC Marks"
                value={formData.hsc}
                onChange={(e) => handleInputChange(e, "hsc")}
              />
            </div>
            <div className="diploma">
              <label className="form__label" htmlFor="diploma">
                {" "}
                UG Percentage{" "}
              </label>
              <input
                type="number"
                id="diploma"
                name="Diploma"
                className="form__input"
                placeholder="Enter Degree or B-tech Percentage"
                value={formData.diploma}
                onChange={(e) => handleInputChange(e, "diploma")}
              />
            </div>
            <div className="emailId">
              <label className="form__label" htmlFor="emailId">
                {" "}
                E-Mail{" "}
              </label>
              <input
                type="input"
                id="emailId"
                name="emailId"
                className="form__input"
                placeholder="Enter Your emailId"
                value={formData.emailId}
                onChange={(e) => handleInputChange(e, "emailId")}
              />
            </div>
            <div className="eligibility">
              <label className="form__label" htmlFor="eligibility">
                {" "}
                Eligibility{" "}
              </label>
              <input
                type="text"
                id="eligibility"
                name="eligibility"
                className="form__input"
                placeholder="Enter Yes/No"
                value={formData.eligibility}
                onChange={(e) => handleInputChange(e, "eligibility")}
              />
            </div>

            <div className="address-container">
              <h2>📍 Address Information</h2>
              <div className="address">
                <label className="form__label" htmlFor="address">
                  {" "}
                  Street Name{" "}
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  className="form__input"
                  placeholder="Enter Your street name"
                  value={formData.streetName}
                  onChange={(e) => handleInputChange(e, "streetName")}
                />
              </div>
              <div className="address">
                <label className="form__label" htmlFor="address">
                  {" "}
                  Area Name{" "}
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  className="form__input"
                  placeholder="Enter Your area name"
                  value={formData.areaName}
                  onChange={(e) => handleInputChange(e, "areaName")}
                />
              </div>

              <div className="address">
                <label className="form__label" htmlFor="address">
                  {" "}
                  PinCode{" "}
                </label>
                <input
                  type="number"
                  id="address"
                  name="address"
                  className="form__input"
                  placeholder="Enter Your Pincode"
                  value={formData.pincode}
                  onChange={(e) => handleInputChange(e, "pincode")}
                />
              </div>
              <div className="address">
                <label className="form__label" htmlFor="address">
                  {" "}
                  State{" "}
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  className="form__input"
                  placeholder="Enter Your state name"
                  value={formData.state}
                  onChange={(e) => handleInputChange(e, "state")}
                />
              </div>
              <div className="address">
                <label className="form__label" htmlFor="address">
                  {" "}
                  Nationality{" "}
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  className="form__input"
                  placeholder="Enter Your nationality"
                  value={formData.nationality}
                  onChange={(e) => handleInputChange(e, "nationality")}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="admin-student-btn-container">
          {type === "ADD" ? (
            <button
              className="add-student-btn"
              type="submit"
              id="addStudent"
              onClick={(e) => handleFormAdd(e)}
            >
              Add Student
            </button>
          ) : (
            <button
              className="add-student-btn"
              type="submit"
              id="updateStudent"
              onClick={(e) => handleFormEdit(e)}
            >
              Update Student
            </button>
          )}
          <Link
            to="/admin/Viewstudent"
            className="admin-btn-secondary">
            Cancel</Link>
        </div>
      </form>
    </>
  );
};
export default User;