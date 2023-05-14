import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router";
import { store } from "../../../store";
import './Navpage.css'
import { UserGuard } from '../../../AuthGuard/UserGuard';
const Navpage = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        store.dispatch({ type: "LOGOUT" });
        navigate("/login");
    };

    return (
        <UserGuard>

            <div className="nvbar" data-testid="user_navbar">
                

                <h2>PG Admission</h2>

                <div className="link">
                    <Link to="/Viewacademy">Institute</Link>
                </div>
                <div className="link">
                    <Link to="/Enrolledcourse">Enrolled course</Link>
                </div>
                <div className="link">
                    <Link to="/FeedBack">FeedBack</Link>
                </div>
                <div className="out">
                    <button data-testid="logout" name='logout' onClick={handleLogout} >Logout</button>
                </div>
            </div>

            <div className="image">
                <div className='txt'>
                    <h1>WELCOME TO PG ADMISSION PORTAL!!!</h1>
                    <h6>Navigate to your future with us</h6>
                </div>
            </div>

        </UserGuard>
    );
}
export default Navpage