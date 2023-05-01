import React from 'react';
import { Link } from 'react-router-dom';
import { UseLogout } from '../../hooks/UseLogout';
function Enrolledcourse() {
    const { logout } = UseLogout()
    const handleLogout = () => {
        logout()
    }
    return (
        <>
            <div className="nvbar">
                <h2>PG Admission</h2>
                <div className="link">
                    <Link to="/Viewacademy"><h2>Institute</h2></Link>
                </div>
                <div className="link">
                    <Link to="/Enrolledcourse">Enrolled course</Link>
                </div>
                <div className="out">
                    <button data-testid="logout" name='logout' onClick={handleLogout} >Logout</button>
                </div>
            </div>
            <h1>Displaying enrolled course</h1>
        </>
    )

}
export default Enrolledcourse;