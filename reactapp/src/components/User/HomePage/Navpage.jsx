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

            <div className="nv" data-testid="user_navbar">
                <div className='top'>
                    <div>
                        <h2>PG Admission</h2>
                    </div>
                    <div className='first'>
                        <div className="link">
                            <Link id='userInstitute' to="/HomePage">Institute   &nbsp;  &nbsp;  &nbsp;</Link>
                        </div>

                        <div className="link">
                            <Link id='userEnrolledCourse' to="/Enrolledcourse">Enrolledcourse   &nbsp;  &nbsp;  &nbsp;</Link>
                        </div>

                        <div className="link">
                            <Link to="/FeedBack">FeedBack</Link>
                        </div>
                    </div>
                    <div className="out">
                        <button id="logout" data-testid="logout" name='logout' onClick={handleLogout} >Logout</button>
                    </div>
                </div>

                <div className='txt'>
                    <p>WELCOME TO PG ADMISSION PORTAL </p>
                    <h4>Bright Future Ahead </h4>
                </div>
                <div className='last'>
                    <h1><span> </span></h1>
                </div>
            </div>
        </UserGuard >
    );
}
export default Navpage