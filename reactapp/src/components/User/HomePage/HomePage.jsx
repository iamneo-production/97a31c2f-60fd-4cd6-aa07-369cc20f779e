import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { store } from "../../../store";
import { UserGuard } from "../../../AuthGuard/UserGuard";
import "./HomePage.css";
import { baseUrl } from "../../../api/authService";

let auth = "";
store.subscribe(() => {
  auth = store.getState().auth;
  console.log(auth);
});
const HomePage = () => {
  const [viewdata, setViewdata] = useState([]);
  const [fetchdata, setFetchdata] = useState([]);
  const [search, setSearch] = useState([]);
  useEffect(() => {
    getdata()
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  const navigate = useNavigate();
  const getdata = async () => {
    const response = await fetch(`${baseUrl}/admin/viewInstitutes`, {
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
      <div className="searchsec">
        <input
          type="text"
          name="search"
          value={search}
          className="searchinp"
          placeholder="Type to Search Institutes"
          onChange={(e) => setSearch(e.target.value)}
        />
        <srch>
          <button type="button"  className="searchbtn" onClick={() => handlesearch()}>
            Search
          </button>
        </srch>
      </div>
      <div className="herosec">
        {viewdata.map((institute) => {
          const { instituteId, instituteName, instituteAddress, imageUrl } =
            institute;
          return (
            <div
              className="card"
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
    </UserGuard>
  );
};

export default HomePage;