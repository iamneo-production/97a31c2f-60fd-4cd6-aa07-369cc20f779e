import React, { useState } from 'react';
import { Link, NavLink } from "react-router-dom";
import { store } from "../../../store";
import { useNavigate } from "react-router";
import { baseUrl } from "../../../api/authService";
import './Review.css';

let auth = "";
store.subscribe(() => {
  auth = store.getState().auth;
  console.log(auth);
});
const Review = () => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [comments, setComments] = useState("");
  const [userPopup, setUserPopup] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const makePopup = (e) => {
    e.preventDefault();
    setUserPopup(true);
  }

  const handleLogout = () => {
    store.dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = await senddata();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
    console.log(`Name: ${name}\nMobile: ${mobile}\nEmail: ${email}\nComments: ${comments}`);
  };


  const handlecancel = () => {

    navigate("/HomePage")
  }
  const senddata = async () => {
    await fetch(`${baseUrl}/user/addFeedback`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${auth.token}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        name: name, number: mobile, email: email, comments: comments
      })

    });
  }



  const navigate = useNavigate();

  return (
    <>
      <div>
        <div className="user-icon-container">
          <i
            className={`fa-solid fa-bars ${isSidebarOpen ? "user-icon-hidden" : ""}`}
            onClick={toggleSidebar}
          ></i>
          <NavLink to="/Navpage" className="user-nav-pg">
            <h1><i class="fa-solid fa-graduation-cap"></i> PG Admission Portal</h1>
          </NavLink>
          <NavLink to="/HomePage" className="user-navlink-buttons">
            <i className="fa-solid fa-university"></i>
            Institutes
          </NavLink>
          <NavLink to="/FeedBack" className="user-navlink-buttons">
            <i className="fa-solid fa-comment"></i>
            FeedBack
          </NavLink>
          <NavLink to="/Enrolledcourse" className="user-navlink-buttons">
            <i className="fa-solid fa-book"></i>
            EnrolledCourses
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
                <NavLink  to="/HomePage">
                  Institutes
                </NavLink>
              </div>
              <div className="user-navlink-box">
              <i className="fa-solid fa-book"></i>
                <NavLink  to="/Enrolledcourse">
                  EnrolledCourses
                </NavLink>
              </div>
              <div className="user-navlink-box">
                <i class="fa-solid fa-comments"></i>
                <NavLink  to="/FeedBack">
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
      {
        userPopup && (
          <div className="user-popup-body noHover">
            <div className="user-popup-overlay">

            </div>
            <div className="user-review-popup">
              <h1>Are you sure to add the feedback ?</h1>
              <button
                className="user-review-confirm-btn"
                type="submit"
                onClick={(e) => {
                  handleSubmit(e).then(() => { console.log("hello this is safeena") })
                    .catch(error => { console.log(error) });
                  setUserPopup(false);
                  navigate('/Navpage');
                }}
              >
                Confirm Submit
              </button>
              <button
                className="user-review-cancel-btn"
                type="submit"
                onClick={() => {
                  setUserPopup(false);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        )
      }
      <div className="bth">
        <Link to="/HomePage">
          <h5><i class="fa-solid fa-house"></i> Back To Home</h5>
        </Link>
      </div>
      <div className="user-review-form">
        <div className='user-review-headtxt'>
        <i class="fa-solid fa-comments"></i>
          Your Feedback Is Most Important For Us!!<i class="fa-solid fa-comment-dots"></i>
        </div>
        <form className="user-review-form-container">
          <div className='reviewname'>
            <label className='reviewheading' htmlFor="name">Name:</label>
            <input className='reviewinput'
              id="name"
              type="text"
              value={name}
              placeholder="Enter your Name"
              onChange={(event) => setName(event.target.value)}
              data-testid="name"
            />
          </div>
          <div className='reviewname'>
            <label className='reviewheading' htmlFor="mobile">Mobile Number:</label>
            <input className='reviewinput'
              id="mobile"
              type="text"
              placeholder="Enter your Mobie Number"
              value={mobile}
              onChange={(event) => setMobile(event.target.value)}
              data-testid="mobile"
            />
          </div>
          <div className='reviewname'>
            <label className='reviewheading' htmlFor="email">Email:</label>
            <input className='reviewinput'
              id="email"
              type="text"
              placeholder="Enter your Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              data-testid="email"
            />
          </div>
          <div className='reviewname'>
            <label className='reviewheading' htmlFor="comments">Comments:</label>
            <textarea className='reviewinput'
              id="comments"
              type="text"
              placeholder="Write your comments here"
              value={comments}
              onChange={(event) => setComments(event.target.value)}
              data-testid="comments"
            />
          </div>
          <div className='btnbtn'>
            <button className='user-submitbutton' type="submit" id="submit" onClick={(e) => { makePopup(e) }}>Submit </button>
            <button className='user-cancelbutton' onClick={handlecancel}>cancel</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Review;