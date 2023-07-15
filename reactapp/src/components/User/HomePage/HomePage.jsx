import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { NavLink } from "react-router-dom";
import { store } from "../../../store";
import "./HomePage.css";
import { baseUrl } from "../../../api/authService";

// Define a loader spinner component
const LoaderSpinner = () => {
  return (
    <div className="loader-container">
      <div className="loader"></div>
    </div>
  );
};

let auth = "";
store.subscribe(() => {
  auth = store.getState().auth;
  console.log(auth);
});

const HomePage = () => {
  const [viewdata, setViewdata] = useState([]);
  const [fetchdata, setFetchdata] = useState([]);
  const [search, setSearch] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // State to manage loading status

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    getdata()
      .then((data) => {
        console.log(data);
        setIsLoading(false); // Set loading to false once data is fetched
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false); // Set loading to false in case of an error
      });
  }, []);

  const navigate = useNavigate();
  const getdata = async () => {
    const response = await fetch(`${baseUrl}/admin/institute`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${auth.token}`,
        "Content-type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    setViewdata(data);
    setFetchdata(data);
  };
  const handle = () => {
    navigate("/UserCourse");
  };
  const handlesearch = () => {
    const data = fetchdata.filter((institute) => {
      const name = institute.instituteName.toLowerCase();
      const info = search.toLowerCase();
      return name.startsWith(info);
    });
    setViewdata(data);
  };

  const handleLogout = () => {
    store.dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  return (
    <>
    {isLoading && <LoaderSpinner />}
      <div>
        <div className="user-icon-container">
          <i
            className={`fa-solid fa-bars ${isSidebarOpen ? "user-icon-hidden" : ""}`}
            onClick={toggleSidebar}
          ></i>
          <NavLink to="/Navpage" className="user-nav-pg">
            <h1><i class="fa-solid fa-graduation-cap"></i> PG Admission Portal</h1>
          </NavLink>
          <NavLink to="/Enrolledcourse" className="user-navlink-buttons">
            <i className="fa-solid fa-book"></i>
            EnrolledCourses
          </NavLink>
          <NavLink to="/HomePage" className="user-navlink-buttons">
            <i className="fa-solid fa-university"></i>
            Institutes
          </NavLink>
          <NavLink to="/FeedBack" className="user-navlink-buttons">
            <i className="fa-solid fa-comment"></i>
            FeedBack
          </NavLink>
          <button data-testid="logout" name='logout' onClick={handleLogout} className="user-logout-button">
            <i className="fa-solid fa-sign-out"></i>Logout</button>
        </div>


        <div className={`user-nav-container ${isSidebarOpen ? "user-show-sidebar" : ""}`}>
          <nav>
            <i
              className={`fa-solid fa-bars ${isSidebarOpen ? "user-icon-hidden" : ""}`}
              onClick={toggleSidebar}
            ></i>
            <div>
              <NavLink to="/Navpage">
                <h2 className="pg-admission-heading"><i class="fa-solid fa-graduation-cap"></i> PG Admission</h2>
              </NavLink>
            </div>
            <div className="user-navlinks-container">
              <div className="user-navlink-box">
                <i class="fa-solid fa-building-columns"></i>
                <NavLink to="/HomePage">
                  Institutes
                </NavLink>
              </div>
              <div className="user-navlink-box">
                <i className="fa-solid fa-book"></i>
                <NavLink to="/Enrolledcourse">
                  EnrolledCourses
                </NavLink>
              </div>
              <div className="user-navlink-box">
                <i class="fa-solid fa-comments"></i>
                <NavLink to="/FeedBack">
                  FeedBack
                </NavLink>
              </div>
              <div className="user-navlink-box user-bottom" onClick={handleLogout}>
                <i class="fa-solid fa-arrow-right-from-bracket"></i>
                <button data-testid="logout" name='logout'  >Logout</button>
              </div>
            </div>
          </nav>
        </div>
      </div>
      <div className="searchsec">
        <input
          type="text"
          name="search"
          value={search}
          data-testid="courseName"
          className="searchinp"
          placeholder="Type to Search Institutes"
          onChange={(e) => setSearch(e.target.value)}
        />
        <div>
          <button type="button" className="searchbtn" onClick={() => handlesearch()}>
            Search
          </button>
        </div>
      </div>
      <div className=" userstudent-heading"  >
        <h1> 
          
        <i class="fa-solid fa-building-columns"></i> Click On Your Dream Institute
         </h1>
      </div>
      <div id="userInstituteGrid1" data-testid="instituteName" className="herosec">
        {viewdata.map((institute, index) => {
          const { instituteId, instituteName, instituteAddress, imageUrl } =
            institute;
          return (
            <div
              className="card"
              id={`userInstituteGrid` + (index + 1)}
              onClick={() => {
                handle();
              }}
              key={instituteId}
            >
              <img src={imageUrl} alt="img" />
              <h2>{instituteName}</h2>
              <h4>Place:{instituteAddress}</h4>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default HomePage;