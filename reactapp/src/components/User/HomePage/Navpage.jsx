import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router";
import { store } from "../../../store";
import './Navpage.css'

const Navpage = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        store.dispatch({ type: "LOGOUT" });
        navigate("/login");
    };

    return (
        <>
            <div className="nv" data-testid="user_navbar">
                <div className='top'>
                    <div>
                        <h2><i class="fa-solid fa-graduation-cap"></i> PG Admission</h2>
                    </div>
                    <div className='first'>
                        <div className="link">
                            <Link id='userInstitute' to="/HomePage"><i class="fa-solid fa-building-columns"></i> Institutes   &nbsp;  &nbsp;  &nbsp;</Link>
                        </div>

                        <div className="link">
                            <Link id='userEnrolledCourse' to="/Enrolledcourse"><i class="fa-solid fa-book"></i> EnrolledCourses   &nbsp;  &nbsp;  &nbsp;</Link>
                        </div>

                        <div className="link">
                            <Link to="/FeedBack"><i class="fa-solid fa-comment-dots"></i> FeedBack</Link>
                        </div>
                    </div>
                    <div className="out">
                        <button id="logout" data-testid="logout" name='logout' onClick={handleLogout} ><i class="fa-solid fa-right-to-bracket"></i> Logout</button>
                    </div>
                </div>
                <div className='txt'>
                    <p><i class="fa-solid fa-door-open"></i> WELCOME TO PG ADMISSION PORTAL <i class="fa-solid fa-trowel-bricks"></i> </p>
                    <h4><i class="fa-brands fa-pied-piper-alt"></i> Bright Future Ahead </h4>
                </div>
                <div className='last'>
                    <h1><span className="span-class-1"> </span></h1>
                    <h2><span className="span-class-2"></span></h2>
                </div>
            </div>
        </>
    );
}
export default Navpage