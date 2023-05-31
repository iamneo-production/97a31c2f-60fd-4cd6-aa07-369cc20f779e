import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import { store } from "../../../store";
import { Navigate } from "react-router";
import { useNavigate, useParams, NavLink } from "react-router-dom";
import { baseUrl } from "../../../api/authService";
import './AdminStudent.css';

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
  houseNumber: "",
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

  const [isLoading, setIsLoading] = useState(false);

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
      const response = await fetch(`${baseUrl}/admin/viewStudent`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
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
      const response = await fetch(`${baseUrl}/admin/viewCourse`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
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
        Authorization: `Bearer ${localStorage.token}`,
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
        {isLoading && <h4>Loading...</h4>}
        {isError.state && <h4>{isError.msg}</h4>}
        <div className="student-heading"  >
          <h1>List of Students</h1>
        </div>
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

  const { id } = useParams();
  useEffect(() => {
    fetchData()
      .then((data) => {
        console.log("fetched student data success ", data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const fetchData = async () => {
    const response = await fetch(`${baseUrl}/admin/viewStudent`, {
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
    setPopup(true);
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
        Back
      </button>
      {type === "ADD" ? (
        <h1 className="head-container">Add Student Details</h1>
      ) : (
        <h1 className="head-container">Edit Student Details</h1>
      )}
      <form className="student-form-container">
        <div className="studentform">
          <div className="form-body">
            <div className="username" >
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
                type="text"
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
                type="input"
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
                Diploma Marks{" "}
              </label>
              <input
                type="text"
                id="diploma"
                name="Diploma"
                className="form__input"
                placeholder="Enter Your Diploma Marks"
                value={formData.diploma}
                onChange={(e) => handleInputChange(e, "diploma")}
              />
            </div>
            <div className="emailId">
              <label className="form__label" htmlFor="emailId">
                {" "}
                email{" "}
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
                eligibility{" "}
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
                placeholder="Enter Your Course Id"
                value={formData.courseId}
                onChange={(e) => handleInputChange(e, "courseId")}
              />
            </div>
            <div className="address-container">
              <h2>Address Information</h2>
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
                  nationality{" "}
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
              <div className="address">
                <label className="form__label" htmlFor="address">
                  {" "}
                  PINCODE{" "}
                </label>
                <input
                  type="text"
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
            </div>
          </div>
        </div>

        {type === "ADD" ? (
          <button
            className="add-academy-btn"
            type="submit"
            id="addStudent"
            onClick={(e) => handleFormAdd(e)}
          >
            Add Student
          </button>
        ) : (
          <button
            className="add-academy-btn"
            type="submit"
            id="updateStudent"
            onClick={(e) => handleFormEdit(e)}
          >
            Update Student
          </button>
        )}
      </form>
    </>
  );
};
export default User;