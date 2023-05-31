import React from 'react'
import { NavLink, useNavigate, Link } from "react-router-dom";
import { store } from "../../../store";
import './Firstpage.css'
import { AdminGuard } from "../../../AuthGuard/AdminGuard"
const Navpage = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        store.dispatch({ type: "LOGOUT" });
        navigate("/login");
    };

    return (
        <AdminGuard>
            <div className="nv" data-testid="user_navbar">
                <div className='top'>
                    <div>
                        <h2>PG Admission</h2>
                    </div>
                    <div className='first'>
                        <div className="link">
                        <NavLink id="adminInstitute" to="/admin/dashboard">Institutes   &nbsp;  &nbsp;  &nbsp;</NavLink>
                        </div>

                        <div className="link">
                            <Link id="adminCourse" to="/admin/viewCourse">Courses   &nbsp;  &nbsp;  &nbsp;</Link>
                        </div>

                        <div className="link">
                            <Link id= "adminStudents" to="/admin/Viewstudent">Students   &nbsp;  &nbsp;  &nbsp;</Link>
                        </div>

                        <div className="link">
                            <Link to="/admin/FeedBack">FeedBack</Link>
                        </div>
                    </div>
                    <div className="out">
                        <button id = "logout" data-testid="logout" name='logout' onClick={handleLogout} >Logout</button>
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
        </AdminGuard >
    );
}
export default Navpage