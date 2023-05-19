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
                            <Link to="/HomePage">Institute   &nbsp;  &nbsp;  &nbsp;</Link>
                        </div>

                        <div className="link">
                            <Link to="/Enrolledcourse">Enrolledcourse   &nbsp;  &nbsp;  &nbsp;</Link>
                        </div>

                        <div className="link">
                            <Link to="/FeedBack">FeedBack</Link>
                        </div>
                    </div>
                    <div className="out">
                        <button data-testid="logout" name='logout' onClick={handleLogout} >Logout</button>
                    </div>
                </div>

                <div className='txt'>
                    <p>WELCOME TO </p>
                    <h2>PG Admission Portal</h2>
                    <h4>Bright Future Ahead </h4>
                </div>
                <div className='addon'>
                    <h1>BOOST YOUR CAREER WITH US</h1>
                    <p>we provide you a accessible virtual platform to check over various institutes,courses and let's you to chooose the best for you. We belive that exploring through neumerous institutions is important before getting into any course, This platform let's you to explore.And now it's time to CHOOSE YOUR'S!!!.</p>
                </div>
                <div className='yashaswi'>
                    <span> </span>
                </div>
            </div>
        </UserGuard >
    );
}
export default Navpage