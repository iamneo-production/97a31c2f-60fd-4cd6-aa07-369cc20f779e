import React, { useState, useEffect } from "react";
import { store } from "../../../store";
import "./AdminHomePage.css";
import { Navigate } from "react-router";
import { useNavigate, useParams, NavLink, Link } from "react-router-dom";
import { baseUrl } from "../../../api/authService";
import Navbar from "../Navbar/Navbar";



let auth = "";
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
      {/* <NavBar /> */}
      <Adminacademy />
    </>
  );
};

const Adminacademy = () => {
  const [fetchedAcademyData, setFetchedAcademyData] = useState([]);

  const [academyData, setAcademyData] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [isError, setIsError] = useState({
    state: false,
    msg: ""
  });

  const [searchTerm, setSearchTerm] = useState("");

  const [popup, setPopup] = useState({
    state: false,
    delid: null
  });

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
    try {
      const response = await fetch(`${baseUrl}/admin/institute`, {
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


  const handleDelete = async (id) => {
    setPopup({ state: true, delid: id });
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
    <>
      {
        popup.state && (
          <div className="admin-popup-body noHover">
            <div className="admin-popup-overlay">

            </div>
            <div className="admin-institute-popup">
              <h1>Are you sure to delete this data ?</h1>
              <button
                className="confirm-button"
                type="submit"
                onClick={() => {
                  deleteAcademy(popup.delid)
                    .then(() => {
                      console.log("deleted Academy");
                    })
                    .catch((error) => {
                      console.log(error);
                    });
                  setPopup({
                    state: false,
                    delid: null
                  });
                }}
              >
                Confirm Delete
              </button>
              <button
                className="cancel-button"
                type="submit"
                onClick={() => {
                  setPopup({
                    state: false,
                    delid: null
                  });
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        )
      }
      <div className="admin-search-container">
        <input
          type="text"
          name="search"
          value={searchTerm}
          className="search-input"
          placeholder="Type here to Search Institute"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          type="button"
          className="search-btn"
          onClick={() => filterAcademyData()}
        >
          Search
        </button>
      </div>

      <div className="admin-academy-container">
        {/* loading effect */}
        {isLoading &&
          <>
            <div class="loadingio-spinner-double-ring-amot1w4ku1j"><div class="ldio-14cancim8ocq">
              <div></div>
              <div></div>
              <div><div></div></div>
              <div><div></div></div>
            </div></div>
          </>
        }

        {isError.state && <h4>{isError.msg}</h4>}
        {!isLoading && <div className="student-heading"  >
          <h1> <i class="fa-solid fa-building-columns"></i> List of Institutes</h1>
        </div>}
        <div className="academy-display-container" data-testid="instituteName" >
          {academyData.map((eachAcademy, index) => {
            const { instituteId, instituteName, instituteAddress, imageUrl } =
              eachAcademy;
            return (
              <div key={instituteId} className=".admin-institute-grid-container">
                <div
                  id={"adminInstituteGrid" + (index + 1)}
                  className="each-academy-cell"
                >
                  <img src={imageUrl} alt={instituteName} />
                  <h4 className="admin-institute-name" >{instituteName}</h4>
                  <h4 className="admin-institute-address">
                    Place : {instituteAddress}
                  </h4>
                  <div className="action-btn">
                    <button
                      type="submit"
                      className="admin-edit-btn"
                      id="editInstitute"
                      onClick={() => handleEdit(instituteId)}
                    >
                      <i className="fa-regular fa-pen-to-square"></i>
                    </button>
                    <button
                      type="submit"
                      className="admin-delete-btn"
                      id="deleteInstitute"
                      onClick={() => handleDelete(instituteId)}
                    >
                      <i className="fa-regular fa-trash-can"></i>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <NavLink
          exact="true"
          to="/admin/addInstitute"
          className="nav-link"
          id="addinstitute"
          data-testid="addInstitute"
          activeclassname="active">
          <div className="admin-add-academy-button">
            <div className='admin-add-institute-icon' >
              <i className="fa-solid fa-circle-plus"></i>
            </div>
          </div>
        </NavLink>
      </div>
    </>
  );
};

export const AcademyForm = ({ type }) => {
  const [formData, setFormData] = useState(initialData);

  const [error, setError] = useState(false);

  const [popup, setPopup] = useState(false);

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
    const response = await fetch(`${baseUrl}/admin/institute`, {
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
    if (formData.instituteName) {
      setPopup(true);
    }
    else {
      setError(true);
    }
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
    console.log("Edited Data :", formData);
    setPopup(true);
  };

  const editAcademy = async () => {
    const response = await fetch(`${baseUrl}/admin/editInstitute?instituteId=${id}`, {
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
    <>
      <Navbar />
      {
        popup && (
          <div className="admin-popup-body">
            <div className="admin-popup-overlay">

            </div>
            <div className="admin-institute-popup">
              {type === "ADD" ? (
                <h1>Are you sure to add the data ?</h1>
              ) : (
                <h1>Are you sure to edit the data ?</h1>
              )}
              {
                type === "ADD" ? (
                  <button className="confirm-button"
                    type="submit"
                    onClick={() => {
                      addAcademy()
                        .then((data) => {
                          console.log("added academy ", data);
                        })
                        .catch((error) => {
                          console.error(error);
                        });
                    }}
                  >
                    Confirm Add
                  </button>
                ) : (
                  <button className="confirm-button"
                    type="submit"
                    onClick={() => {
                      editAcademy()
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
                className="cancel-button"
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
        className="admin-institute-back-to-home"
        type="submit"
        onClick={() => {
          navigate("/admin/dashboard");
        }}
      >
        <i class="fa-solid fa-house"></i> Back to Home
      </button>
      <div className="admin-academy-form">
        {type === "ADD" ? (
          <h1 className="admin-institute-head-container">Add Academy Details</h1>
        ) : (
          <h1 className="admin-institute-head-container"> <i class="fa-solid fa-pen-to-square"></i> Edit Academy Details</h1>
        )}
        <form className="admin-academy-form-container">
          <div className="form-group">
            <label className="label-heading">Academy Name : </label>
            <input
              type="text"
              id="academyName"
              name="academyName"
              value={formData.instituteName}
              placeholder="Enter Academy Name"
              onChange={(e) => handleChange(e, "instituteName")}
              required
            />
            {!formData.instituteName && (
              <div className="validation-message"></div>
            )}
          </div>
          <div className="form-group">
            <label className="label-heading">Contact Number : </label>
            <input
              type="text"
              id="contactNumber"
              name="contactNumber"
              value={formData.mobile}
              placeholder="Enter Contact Number"
              onChange={(e) => handleChange(e, "mobile")}
              required
            />
          </div>
          <div className="form-group">
            <label className="label-heading">Image Url : </label>
            <input
              type="text"
              id="imageUrl"
              name="imageUrl"
              value={formData.imageUrl}
              placeholder="Enter Academy Image Url"
              onChange={(e) => handleChange(e, "imageUrl")}
            />
          </div>
          <div className="form-group">
            <label className="label-heading">Email Id : </label>
            <input
              type="text"
              id="emailId"
              name="emailId"
              value={formData.email}
              placeholder="Enter Academy Email Id"
              onChange={(e) => handleChange(e, "email")}
            />
          </div>
          <div className="form-group">
            <label className="label-heading">Academy Location : </label>
            <input
              type="text"
              id="academyLocation"
              name="academyLocation"
              value={formData.instituteAddress}
              placeholder="Enter Academy Location"
              onChange={(e) => handleChange(e, "instituteAddress")}
            />
          </div>
          <div className="form-group">
            <label className="label-heading">Academy Description : </label>
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
          {error && <div className="errorfields"> All Fileds Requried</div>}
          <div className="admin-institute-btn-container">
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
            <Link
              to="/admin/dashboard"
              className="admin-btn-secondary">
              Cancel</Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default AdminHomePage;