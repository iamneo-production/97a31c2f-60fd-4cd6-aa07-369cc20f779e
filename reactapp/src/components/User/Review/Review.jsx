import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { store } from "../../../store";
import { useNavigate } from "react-router";
import { UserGuard } from "../../../AuthGuard/UserGuard";
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

  const handleLogout = () => {
    store.dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Name: ${name}\nMobile: ${mobile}\nEmail: ${email}\nComments: ${comments}`);
  };


  const handlecancel = () => {

    navigate("/HomePage")
  }

  const navigate = useNavigate();
  return (
    <UserGuard>
      <div className="mainbar">
        <Link to="/Navpage">
          <h1>PG Admission</h1>
        </Link>
        <div className="one">
          <Link to="/HomePage">Institute</Link>
        </div>

        <div className="one1">

          <Link to="/FeedBack">FeedBack</Link>
        </div>
        <div className="one">

          <Link to="/Enrolledcourse">Enrolled course</Link>
        </div>
        <div className="out">
          <button data-testid="logout" name="logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
      <div className='bth'>
        <Link to="/HomePage">Back To Home</Link>
      </div>
      <div className='headtxt'>
        Your Feedback Is Most Important For US!!
      </div>
      <form onSubmit={handleSubmit}>
        <div className='ffform'>
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
            <button className='submitbutton' type="submit" id="submit">Submit </button>
            <button className='cancelbutton' onClick={handlecancel}>cancel</button>
          </div>
        </div>
      </form>

    </UserGuard>
  );
};

export default Review;
