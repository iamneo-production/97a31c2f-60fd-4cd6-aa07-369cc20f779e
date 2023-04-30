import React from 'react'
import { Link } from 'react-router-dom'
import { UseLogout } from '../../../hooks/UseLogout'
import './Navpage.css'
const Navpage = () => {
    const { logout } = UseLogout()
    const handleLogout = () => {
        logout()
    }
    return (
        <>
            <div className="nvbar">
                <h2>PG Admission</h2>
               
                <div className="link">
                    <Link to="/Viewacademy">Institute</Link>
                </div>
                <div className="link">
                    <Link to="/Enrolledcourse">Enrolled course</Link>
                </div>
                <div className="out">
                    <button data-testid="logout" name='logout' onClick={handleLogout} >Logout</button>
                </div>
            </div>
            <div className="img">
                <img src="https://media.istockphoto.com/id/953481084/photo/thats-a-wrap-folks.jpg?s=612x612&w=0&k=20&c=voXx6DEoIT7nHe6f90n4heMTCTiZFFha7FRnvkbvWvs=" alt="pic" />
            </div>
        </>
    );
}
export default Navpage