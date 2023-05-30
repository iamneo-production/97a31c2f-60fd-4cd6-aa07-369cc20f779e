import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { store } from "../../../store";
import { useNavigate } from "react-router";

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
  };
  
  const handleCancel = () => {
  navigate("/viewacademy");
  };
  
  const navigate = useNavigate();
  
  return (
  <>
      <div className="navbar">
      <Link to="/Viewacademy">PG Admission</Link>
      <h4>Institute</h4>
      <div className="link">
      <Link to="/Enrolledcourse">Enrolled course</Link>
      </div>
      <div className="out">
      <button data-testid="logout" name="logout" onClick={handleLogout}>
      Logout
      </button>
      </div>
      </div>
      <Link to="/Viewacademy">Back To Home</Link>
      <form onSubmit={handleSubmit}>
        <div>
        <label htmlFor="name">Name</label>
        <input
        id="name"
        type="text"
        value={name}
        placeholder="Enter your Name"
        onChange={(event) => setName(event.target.value)}
        data-testid="userName"
        />
        </div>
        <div>
        <label htmlFor="mobile">Mobile Number</label>
        <input
        id="mobile"
        type="text"
        placeholder="Enter your Mobile Number"
        value={mobile}
        onChange={(event) => setMobile(event.target.value)}
        data-testid="mobile"
        />
        </div>
        <div>
        <label htmlFor="email">Email:</label>
        <input
        id="email"
        type="text"
        placeholder="Enter your Email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        data-testid="email"
        />
        </div>
        <div>
        <label htmlFor="comments">Comments:</label>
        <textarea
        id="comments"
        type="text"
        placeholder="Write your comments here"
        value={comments}
        onChange={(event) => setComments(event.target.value)}
        data-testid="comments"
        />
        </div>
        <button type="submit" id="submit">Submit</button>
        <button onClick={handleCancel}>Cancel</button>
      </form>
  </>
  );

};
  
export default Review;