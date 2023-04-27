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
                    <Link to="/Enrollcourse">Enrollcourse</Link>
                </div>
                <div className="link">
                    <Link to="/Viewacademy">Institute</Link>
                </div>
                <div className="out">
                    <button data-testid="logout" name='logout' onClick={handleLogout} >Logout</button>
                </div>
            </div>

        </>
    );
}
export default Navpage