import React, { useState, useEffect } from 'react'
import { UseLogout } from '../../hooks/UseLogout'

const baseUrl = "https://8080-fccfeeaccfaaabbebcbbfafccddecaeebaeccc.project.examly.io";


const student = {
  firstName: '',
  lastName: '',
  fatherName: '',
  motherName: '',
  phoneNumber1: '',
  phoneNumber2: '',
  studentIdNumber: '',
  studentDOB: '',
  sslc: '',
  hsc: '',
  diploma: '',
  emailId: '',
  eligibility: '',
  courseId: '',
  houseNumber: '',
  streetName: '',
  areaName: '',
  state: '',
  pincode: '',
  nationality: '',

};

const AdminStudent = () => {
  const [fetchedStudentData, setFetchedStudentData] = useState([]);

  const [studentData, setStudentData] = useState([]);

  const [adminStudentState, setAdminStudentState] = useState({
    view: { state: true },
    add: { state: false },
    edit: { state: false, data: {} },
  });

  const [isLoading, setIsLoading] = useState(false);

  const [isError, setIsError] = useState({ state: false, msg: "" });

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchStudentData();
  }, []);


  const filterStudentData = () => {
    const filteredData = fetchedStudentData.filter((eachStudent) => {
      const studentName = eachStudent.studentName.toLowerCase();
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
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.token}`,
          'Content-type': 'application/json'
        }
      });
      const data = await response.json();
      console.log(data);
      setFetchedStudentData([data]);
      setStudentData([data]);
      setIsLoading(false);
      setIsError({ state: false, msg: "" });
      if (response.status === 400) {
        throw new Error("Data Not Found");
      }
    } catch (error) {
      setIsLoading(false);
      setIsError({ state: true, msg: error.message || "Something Went Wrong !" });
    }
  };

  const handleAdd = () => {
    setAdminStudentState({
      view: { state: false },
      add: { state: true },
      edit: { state: false, data: {} },
    });
  };

  const handleDelete = async (id) => {
    deleteStudent(id);
  };

  const deleteStudent = async (id) => {
    const response = await fetch(`${baseUrl}/admin/deleteStudent/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${localStorage.token}`,
      }
    });
    console.log(response);
    fetchStudentData();
  };

  const handleEdit = (id) => {
    const currentStudentData = studentData.find((eachStudent) => {
      return eachStudent.studentId === id;
    })
    setAdminStudentState({
      view: { state: false },
      add: { state: false },
      edit: { state: true, data: currentStudentData },
    })
  };

  const CallBack = (childData) => {
    setAdminStudentState(childData);
  };

  if (adminStudentState.add.state) {
    return <StudentForm handleCallBack={CallBack} pageState={adminStudentState} refreshData={fetchStudentData} />;
  }

  if (adminStudentState.edit.state) {
    return <StudentForm handleCallBack={CallBack} pageState={adminStudentState} refreshData={fetchStudentData} />;
  }
  return (

    <div className="admin-student-container">
      <div className="admin-search-container">
        <input type="text" name="search" value={searchTerm} placeholder="Type here to Search Student" onChange={(e) => setSearchTerm(e.target.value)} />
        <button type="button" onClick={() => filterStudentData()} >Search</button>
      </div>
      {isLoading && <h4>Loading...</h4>}
      {isError.state && <h4>{isError.msg}</h4>}
      <div className="student-display-container">
        {/* <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">Student Id</th>
                                    <th scope="col">Student Name</th>
                                    <th scope="col">mobile</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            </table> */}
        {studentData.map((student1) => {
          const { studentId, firstName, phoneNumber1, emailId, actions } = student1



          return (

            <table><h4>{studentId}</h4><h5>{firstName}</h5><h6>{phoneNumber1}</h6><h5>{emailId}</h5><h4>{actions}</h4>
              <button type="submit" id="editStudent" onClick={() => handleEdit(studentId)}>📝</button>
              <button type="submit" id="deleteStudent" onClick={() => handleDelete(studentId)}>🗑️</button>
            </table>

          );
        })}

      </div>
      <div className="admin-add-student-button">
        <button type="submit" onClick={() => handleAdd()}> ➕ Add Student</button>
      </div>
    </div>
  );
};





const StudentForm = ({ handleCallBack, pageState, refreshData }) => {
  const [formData, setFormData] = useState(pageState.edit.state ? pageState.edit.data : student);

  const handleInputChange = (e, key) => {
    const currentData = {
      ...formData
    }
    currentData[key] = e.target.value;
    setFormData(currentData);
  };

  const handleFormAdd = (e) => {
    e.preventDefault();
    console.log(formData);
    addStudent();
    handleCallBack({
      view: { state: true },
      add: { state: false },
      edit: { state: false, data: {} },
    });
  };

  const addStudent = async () => {
    const request = await fetch(`${baseUrl}/admin/addStudent`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.token}`,
        'Content-type': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    console.log(request);
    refreshData();
  };

  const handleFormEdit = (e) => {
    e.preventDefault();
    console.log(formData);
    editStudent(pageState.edit.data.studentId);
    handleCallBack({
      view: { state: true },
      add: { state: false },
      edit: { state: false, data: {} },
    });
  };

  const editStudent = async (id) => {
    const request = await fetch(`${baseUrl}/admin/editStudent/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${localStorage.token}`,
        'Content-type': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    console.log(request);
    refreshData();
  };

  return (
    <>

      <button type="submit" onClick={() => handleCallBack({
        view: { state: true },
        add: { state: false },
        edit: { state: false, data: {} },
      })}>Back to Home</button>
      <form className="student-form-container">
        <div className="studentform">
          <div className="form-body">
            <div className="username">
              <label className="form__label" htmlFor="firstName"> First Name </label>
              <input className="form__input"
                type="text"
                id="firstName"
                name="studentName"
                placeholder="Enter Your First Name"
                value={formData.firstName} onChange={(e) => handleInputChange(e, "firstName")}
              />
            </div>
            <div className="username">
              <label className="form__label" htmlFor="firstName"> Last Name </label>
              <input className="form__input"
                type="text"
                id="firstName"
                name="studentName"
                placeholder="Enter Your Last Name"
                value={formData.lastName} onChange={(e) => handleInputChange(e, "lastName")}
              />
            </div>
            <div className="username">
              <label className="form__label" htmlFor="firstName"> Father Name </label>
              <input className="form__input"
                type="text"
                id="firstName"
                name="studentName"
                placeholder="Enter Your Father Name"
                value={formData.fatherName} onChange={(e) => handleInputChange(e, "fatherName")}
              />
            </div>
            <div className="username">
              <label className="form__label" htmlFor="firstName"> Mother Name </label>
              <input className="form__input"
                type="text"
                id="firstName"
                name="studentName"
                placeholder="Enter Your Mother  Name"
                value={formData.motherName} onChange={(e) => handleInputChange(e, "motherName")}
              />
            </div>

            <div className="studentDob">
              <label className="form__label" htmlFor="studentDob">Student DOB (YYYY-MM-DD)</label>
              <input
                type="text"
                id="studentDob"
                name="studentDob"
                className="form__input"
                placeholder="Enter Your DOB"
                value={formData.studentDOB}
                onChange={(e) => handleInputChange(e, "studentDOB")}
              />
            </div>
            <div className="mobile">
              <label className="form__label" htmlFor="mobile"> Phone Number </label>
              <input type="text" id="mobile"
                name="mobile"
                className="form__input"
                placeholder="Enter Your Phone Number"
                value={formData.phoneNumber1}
                onChange={(e) => handleInputChange(e, "phoneNumber1")}
              />
            </div>
            <div className="mobile">
              <label className="form__label" htmlFor="mobile">Alternative Phone Number </label>
              <input type="text" id="mobile"
                name="mobile"
                className="form__input"
                placeholder="Enter Your Phone Number"
                value={formData.phoneNumber2}
                onChange={(e) => handleInputChange(e, "phoneNumber2")}
              />
            </div>
            <div className="SSLC">
              <label className="form__label" htmlFor="SSLC"> SSLC Marks </label>
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
              <label className="form__label" htmlFor="HSC"> HSC Marks </label>
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
              <label className="form__label" htmlFor="diploma"> Diploma Marks </label>
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
              <label className="form__label" htmlFor="emailId"> email  </label>
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
              <label className="form__label" htmlFor="eligibility">  eligibility </label>
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
              <label className="form__label" htmlFor="courseid">  Course ID  </label>
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
            <div className="studentIdNumber">
              <label className="form__label" htmlFor="institueid"> Student ID Number</label>
              <input
                type="text"
                id="instituteId"
                name="InstituteId"
                className="form__input"
                placeholder="Enter Your Institute Id"
                value={formData.studentIdNumber}
                onChange={(e) => handleInputChange(e, "StudentIdNumber")}
              />
            </div>
            <h1>Address Information</h1>
            <div className="address">
              <label className="form__label" htmlFor="address"> Address </label>
              <input
                type="text"
                id="address"
                name="address"
                className="form__input"
                placeholder="Enter Your house number"
                value={formData.houseNumber}
                onChange={(e) => handleInputChange(e, "housenumber")}
              />
            </div>
            <div className="address">
              <label className="form__label" htmlFor="address"> Street Name </label>
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
              <label className="form__label" htmlFor="address"> Area Name </label>
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
              <label className="form__label" htmlFor="address"> nationality </label>
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
              <label className="form__label" htmlFor="address"> PINCODE </label>
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
              <label className="form__label" htmlFor="address"> State </label>
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


        {pageState.add.state ? <button type="submit" id="addAcademy" onClick={(e) => handleFormAdd(e)}>Add Student</button> : <button type="submit" id="updateAcademy" onClick={(e) => handleFormEdit(e)}>Update Student</button>}

      </form>
    </>
  );
};





export default AdminStudent;