import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import { store } from "../../../store";
import { AdminGuard } from "../../../AuthGuard/AdminGuard";
import "./AdminHomePage.css";
import { Navigate } from "react-router";
import { useNavigate, useParams } from "react-router-dom";

const baseUrl = "https://8080-daefaebebcbbfafccddecaeebaeccc.project.examly.io";
let auth = ""
store.subscribe(() => {
  auth = store.getState().auth;
  console.log(auth);
});

const initialData = {
  instituteName: "",
  mobile: "",
  imageUrl: "",
  email: "",
  instituteAddress: "",
  instituteDescription: "",
};

const AdminHomePage = () => {
  if (auth.token === "") {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Navbar />
      <Adminacademy />
    </>
  );
};

const Adminacademy = () => {
  const [fetchedAcademyData, setFetchedAcademyData] = useState([]);

  const [academyData, setAcademyData] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [isError, setIsError] = useState({ state: false, msg: "" });

  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchAcademyData()
      .then((data) => {
        console.log("fetched academy data success ", data);
      })
      .catch((error) => {
        console.error(error);
      });
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
    console.log(`Bearer ${auth.token}`);
    try {
      const response = await fetch(`${baseUrl}/admin/viewInstitutes`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${auth.token}`,
          "Content-type": "application/json",
        },
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
      setIsError({
        state: true,
        msg: error.message || "Something Went Wrong !",
      });
    }
  };

  const handleAdd = () => {
    navigate("/admin/addInstitute");
  };

  const handleDelete = async (id) => {
    deleteAcademy(id)
      .then(() => {
        console.log("deleted Academy");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteAcademy = async (id) => {
    const response = await fetch(`${baseUrl}/admin/deleteInstitutes?id=${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${auth.token}`,
      },
    });
    console.log(response);
    fetchAcademyData()
      .then((data) => {
        console.log("fetched academy data success ", data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleEdit = (id) => {
    navigate(`/admin/editInstitute/${id}`);
  };

  return (
    <AdminGuard>
      <div className="admin-academy-container">
        <div className="admin-search-container">
          <input
            type="text"
            name="search"
            value={searchTerm}
            placeholder="Type here to Search Institute"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="button" onClick={() => filterAcademyData()}>
            Search
          </button>
        </div>
        {isLoading && <h4>Loading...</h4>}
        {isError.state && <h4>{isError.msg}</h4>}
        <div className="academy-display-container">
          {academyData.map((eachAcademy, index) => {
            const { instituteId, instituteName, instituteAddress, imageUrl } =
              eachAcademy;
            return (
              <div
                id={"adminInstituteGrid" + (index + 1)}
                className="each-academy-cell"
                key={instituteId}
              >
                <img src={imageUrl} alt={instituteName} />
                <h4>{instituteName}</h4>
                <h4>{instituteAddress}</h4>
                <button
                  type="submit"
                  id="editInstitute"
                  onClick={() => handleEdit(instituteId)}
                >
                  📝
                </button>
                <button
                  type="submit"
                  id="deleteInstitute"
                  onClick={() => handleDelete(instituteId)}
                >
                  🗑️
                </button>
              </div>
            );
          })}
        </div>
        <div className="admin-add-academy-button">
          <button type="submit" onClick={() => handleAdd()}>
            {" "}
            ➕ Add Institute
          </button>
        </div>
      </div>
    </AdminGuard>
  );
};

export const AcademyForm = ({ type }) => {
  const [formData, setFormData] = useState(initialData);

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    fetchData()
      .then((data) => {
        console.log("fetched academy data success ", data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const fetchData = async () => {
    const response = await fetch(`${baseUrl}/admin/viewInstitutes`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${auth.token}`,
        "Content-type": "application/json",
      },
    });
    const data = await response.json();
    const editData = data.find((eachAcademy) => {
      return eachAcademy.instituteId == id;
    });
    console.log(editData);
    if (type === "EDIT") {
      setFormData(editData);
    }
  };

  const handleChange = (e, key) => {
    const currentData = {
      ...formData,
    };
    currentData[key] = e.target.value;
    setFormData(currentData);
  };

  const handleFormAdd = (e) => {
    e.preventDefault();
    console.log(formData);
    addAcademy()
      .then((data) => {
        console.log("added academy ", data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const addAcademy = async () => {
    const response = await fetch(`${baseUrl}/admin/addInstitute`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${auth.token}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    console.log(response);
    navigate("/admin/dashboard");
  };

  const handleFormEdit = (e) => {
    e.preventDefault();
    console.log(formData);
    editAcademy()
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const editAcademy = async () => {
    const response = await fetch(`${baseUrl}/admin/editInstitute/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${auth.token}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    console.log(response);
    navigate("/admin/dashboard");
  };

  return (
    <AdminGuard>
      <Navbar />
      <div className="admin-academy-form">
        {type === "ADD" ? <h1>Add Academy</h1> : <h1>Edit Academy</h1>}
        <button
          type="submit"
          onClick={() => {
            navigate("/admin/dashboard");
          }}
        >
          Back to Home
        </button>
        <form className="admin-academy-form-container">
          <div>
            <label>Academy Name : </label>
            <input
              type="text"
              id="academyName"
              name="academyName"
              value={formData.instituteName}
              placeholder="Enter Academy Name"
              onChange={(e) => handleChange(e, "instituteName")}
            />
          </div>
          <div>
            <label>Contact Number : </label>
            <input
              type="text"
              id="contactNumber"
              name="contactNumber"
              value={formData.mobile}
              placeholder="Enter Contact Number"
              onChange={(e) => handleChange(e, "mobile")}
            />
          </div>
          <div>
            <label>Image Url : </label>
            <input
              type="text"
              id="imageUrl"
              name="imageUrl"
              value={formData.imageUrl}
              placeholder="Enter Academy Image Url"
              onChange={(e) => handleChange(e, "imageUrl")}
            />
          </div>
          <div>
            <label>Email Id : </label>
            <input
              type="text"
              id="emailId"
              name="emailId"
              value={formData.email}
              placeholder="Enter Academy Email Id"
              onChange={(e) => handleChange(e, "email")}
            />
          </div>
          <div>
            <label>Academy Location : </label>
            <input
              type="text"
              id="academyLocation"
              name="academyLocation"
              value={formData.instituteAddress}
              placeholder="Enter Academy Location"
              onChange={(e) => handleChange(e, "instituteAddress")}
            />
          </div>
          <div>
            <label>Academy Description : </label>
            <textarea
              rows={5}
              cols={50}
              type="text"
              id="academyDescription"
              name="academyDescription"
              value={formData.instituteDescription}
              placeholder="Enter Academy Description"
              onChange={(e) => handleChange(e, "instituteDescription")}
            />
          </div>
          {type === "ADD" ? (
            <button
              className="admin-form-submit-button"
              type="submit"
              id="addAcademy"
              onClick={(e) => handleFormAdd(e)}
            >
              Add Academy
            </button>
          ) : (
            <button
              className="admin-form-submit-button"
              type="submit"
              id="updateAcademy"
              onClick={(e) => handleFormEdit(e)}
            >
              Update Academy
            </button>
          )}
        </form>
      </div>
    </AdminGuard>
  );
};

export default AdminHomePage;