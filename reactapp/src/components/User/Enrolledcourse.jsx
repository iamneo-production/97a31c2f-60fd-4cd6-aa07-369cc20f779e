import React from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { store } from '../../store';
import { UserGuard } from "../../AuthGuard/UserGuard"

function Enrolledcourse() {
    const navigate = useNavigate();

  const handleLogout = () => { 
    store.dispatch({ type: 'LOGOUT' })
    navigate('/login');
  }
    return (
        <UserGuard>
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
        </UserGuard>
    )

}
export default Enrolledcourse;