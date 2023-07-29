import React from 'react'
import { NavLink, useNavigate, Link } from "react-router-dom";
import { store } from "../../../store";
import './AdminDashboard.css'


const AdminDashboard = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        store.dispatch({ type: "LOGOUT" });
        navigate("/login");
    };

    return (
        <div className="nv1" data-testid="user_navbar">
            <div className='top1'>
                <div className='anime'>
                    <h2> <i class="fa-solid fa-graduation-cap fa-beat"></i> PG Admission</h2>
                </div>
                <div className='first1'>
                    <div className="link1">
                        <NavLink id="adminInstitute" to="/admin/dashboard"> <i class="fa-solid fa-building-columns"></i> Institutes   &nbsp;  &nbsp;  &nbsp;</NavLink>
                    </div>

                    <div className="link1">
                        <Link id="adminCourse" to="/admin/viewCourse"> <i className="fa-solid fa-book-atlas"></i>  Courses   &nbsp;  &nbsp;  &nbsp;</Link>
                    </div>

                    <div className="link1">
                        <Link id="adminStudents" to="/admin/Viewstudent"> <i class="fa-solid fa-user-graduate"> </i> Students   &nbsp;  &nbsp;  &nbsp;</Link>
                    </div>

                    <div className="link1">

                        <Link id="adminApprove" to="/admin/approveUser"> <i class="fa-solid fa-user-graduate"> </i> Online Applications &nbsp;  &nbsp;  &nbsp;</Link>

                    </div>

                    <div className="link1">
                        <Link to="/admin/FeedBack"> <i class="fa-solid fa-comment-dots"></i> FeedBack</Link>
                    </div>
                </div>
                <div className="out">
                    <button id="logout" data-testid="logout" name='logout' onClick={handleLogout} > <i class="fa-solid fa-right-from-bracket fa-beat"></i> Logout</button>
                </div>
            </div>

            <div className='txt1'>
                <p> <i class="fa-solid fa-earth-americas"></i> WELCOME TO PG ADMISSION PORTAL </p>
                <h4><i class="fa-solid fa-sun"></i>  Bright Future Ahead </h4>
            </div>
            <div className='last1'>
                <h1><span className="admin-span-class-1"> </span></h1>
            </div>
        </div>

    );
}
export default AdminDashboard