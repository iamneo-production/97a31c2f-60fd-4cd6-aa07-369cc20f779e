import React, { useState, useEffect } from 'react'
import { UseLogout } from '../../../hooks/UseLogout'
import Navbar from '../Navbar/Navbar'
import './AdminHomePage.css'

const baseUrl = "https://8080-adbcafaeebcbbfafccddecaeebaeccc.project.examly.io";

const initialData = {
  instituteName: "",
  mobile: "",
  imageUrl: "",
  email: "",
  instituteAddress: "",
  instituteDescription: "",
};

const AdminHomePage = () => {

  // const [displayState, setDisplayState] = useState({
  //   institutePage: true,
  //   coursePage: false,
  //   studentPage: false,
  // })

  // const { logout } = UseLogout()
  // const handleLogout = () => {
  //   logout()
  // }

  return (
    <>
    <Navbar />
      {/* <div className="admin-header-container">
        <div className="admin-title-container">
          <h3>PG Admission</h3>
        </div>
        <div className="admin-academy-button">
          <button type="button" id="adminInstitute" onClick={() => setDisplayState({ institutePage: true, coursePage: false, studentPage: false, })} >Institute</button>
        </div>
        <div className="admin-course-button">
          <button type="button" id="adminCourse" onClick={() => setDisplayState({ institutePage: false, coursePage: true, studentPage: false, })} >Course</button>
        </div>
        <div className="admin-student-button">
          <button type="button" id="adminStudents" onClick={() => setDisplayState({ institutePage: false, coursePage: false, studentPage: true, })} >Students</button>
        </div>
        <div className="admin-logout-button">
          <button data-testid="logout" name='logout' onClick={handleLogout} >logout</button>
        </div>
      </div>
      <div className="admin-main-container">
        {displayState.institutePage && <Adminacademy />}
        {displayState.coursePage && <Admincourse />}
        {displayState.studentPage && <Adminstudent />}
      </div> */}
      <Adminacademy />
    </>
  )
}

// const Admincourse = () => {
//   return (
//     <h1>In Admin Course Page</h1>
//   );
// }

// const Adminstudent = () => {
//   return (
//     <h1>In Admin Student Page</h1>
//   );
// }

const Adminacademy = () => {
  const [fetchedAcademyData, setFetchedAcademyData] = useState([]);

  const [academyData, setAcademyData] = useState([]);

  const [adminAcademyState, setAdminAcademyState] = useState({
    view: { state: true },
    add: { state: false },
    edit: { state: false, data: {} },
  });

  const [isLoading, setIsLoading] = useState(false);

  const [isError, setIsError] = useState({ state: false, msg: "" });

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchAcademyData();
  }, []);


  const filterAcademyData = () => {
    const filteredData = fetchedAcademyData.filter((eachAcademy) => {
      const instituteName = eachAcademy.instituteName.toLowerCase();
      const searchName = searchTerm.toLowerCase();
      return instituteName.startsWith(searchName);
    });
    setAcademyData(filteredData);
  };

  const fetchAcademyData = async () => {
    setIsLoading(true);
    setIsError({ state: false, msg: "" });
    try {
      const response = await fetch(`${baseUrl}/admin/viewInstitutes`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.token}`,
          'Content-type': 'application/json'
        }
      });
      const data = await response.json();
      console.log(data);
      setFetchedAcademyData(data);
      setAcademyData(data);
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
    setAdminAcademyState({
      view: { state: false },
      add: { state: true },
      edit: { state: false, data: {} },
    });
  };

  const handleDelete = async (id) => {
    deleteAcademy(id);
  };

  const deleteAcademy = async (id) => {
    const response = await fetch(`${baseUrl}/admin/deleteInstitutes?id=${id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${localStorage.token}`,
      }
    });
    console.log(response);
    fetchAcademyData();
  };

  const handleEdit = (id) => {
    const currentAcademyData = academyData.find((eachAcademy) => {
      return eachAcademy.instituteId === id;
    })
    setAdminAcademyState({
      view: { state: false },
      add: { state: false },
      edit: { state: true, data: currentAcademyData },
    })
  };

  const CallBack = (childData) => {
    setAdminAcademyState(childData);
  };

  if (adminAcademyState.add.state) {
    return <AcademyForm handleCallBack={CallBack} pageState={adminAcademyState} refreshData={fetchAcademyData} />;
  }

  if (adminAcademyState.edit.state) {
    return <AcademyForm handleCallBack={CallBack} pageState={adminAcademyState} refreshData={fetchAcademyData} />;
  }

  return (
    <div className="admin-academy-container">
      <div className="admin-search-container">
        <input type="text" name="search" value={searchTerm} placeholder="Type here to Search Institute" onChange={(e) => setSearchTerm(e.target.value)} />
        <button type="button" onClick={() => filterAcademyData()} >Search</button>
      </div>
      {isLoading && <h4>Loading...</h4>}
      {isError.state && <h4>{isError.msg}</h4>}
      <div className="academy-display-container">
        {academyData.map((eachAcademy, index) => {
          const { instituteId, instituteName, instituteAddress, imageUrl } = eachAcademy;
          return (
            <div id={"adminInstituteGrid" + (index + 1)} className="each-academy-cell" key={instituteId} >
              <img src={imageUrl} alt={instituteName} />
              <h4>{instituteName}</h4>
              <h4>{instituteAddress}</h4>
              <button type="submit" id="editInstitute" onClick={() => handleEdit(instituteId)}>📝</button>
              <button type="submit" id="deleteInstitute" onClick={() => handleDelete(instituteId)}>🗑️</button>
            </div>
          );
        })}
      </div>
      <div className="admin-add-academy-button">
        <button type="submit" onClick={() => handleAdd()}> ➕ Add Institute</button>
      </div>
    </div>
  );
};

const AcademyForm = ({ handleCallBack, pageState, refreshData }) => {
  const [formData, setFormData] = useState(pageState.edit.state ? pageState.edit.data : initialData);

  const handleChange = (e, key) => {
    const currentData = {
      ...formData
    }
    currentData[key] = e.target.value;
    setFormData(currentData);
  };

  const handleFormAdd = (e) => {
    e.preventDefault();
    console.log(formData);
    addAcademy();
    handleCallBack({
      view: { state: true },
      add: { state: false },
      edit: { state: false, data: {} },
    });
  };

  const addAcademy = async () => {
    const request = await fetch(`${baseUrl}/admin/addInstitute`, {
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
    editAcademy(pageState.edit.data.instituteId);
    handleCallBack({
      view: { state: true },
      add: { state: false },
      edit: { state: false, data: {} },
    });
  };

  const editAcademy = async (id) => {
    const request = await fetch(`${baseUrl}/admin/editInstitute/${id}`, {
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
      {pageState.add.state ? <h1>Add Academy</h1> : <h1>Edit Academy</h1>}
      <button type="submit" onClick={() => handleCallBack({
        view: { state: true },
        add: { state: false },
        edit: { state: false, data: {} },
      })}>Back to Home</button>
      <form className="academy-form-container">
        <input type="text" id="academyName" name="academyName" value={formData.instituteName} placeholder="Enter Academy Name" onChange={(e) => handleChange(e, "instituteName")} /><br />
        <input type="text" id="contactNumber" name="contactNumber" value={formData.mobile} placeholder="Enter Contact Number" onChange={(e) => handleChange(e, "mobile")} /><br />
        <input type="text" id="imageUrl" name="imageUrl" value={formData.imageUrl} placeholder="Enter Academy Image Url" onChange={(e) => handleChange(e, "imageUrl")} /><br />
        <input type="text" id="emailId" name="emailId" value={formData.email} placeholder="Enter Academy Email Id" onChange={(e) => handleChange(e, "email")} /><br />
        <input type="text" id="academyLocation" name="academyLocation" value={formData.instituteAddress} placeholder="Enter Academy Location" onChange={(e) => handleChange(e, "instituteAddress")} /><br />
        <textarea type="text" id="academyDescription" name="academyDescription" value={formData.instituteDescription} placeholder="Enter Academy Description" onChange={(e) => handleChange(e, "instituteDescription")} /><br />
        {pageState.add.state ? <button type="submit" id="addAcademy" onClick={(e) => handleFormAdd(e)}>Add Academy</button> : <button type="submit" id="updateAcademy" onClick={(e) => handleFormEdit(e)}>Update Academy</button>}
      </form>
    </>
  );
};

export default AdminHomePage
