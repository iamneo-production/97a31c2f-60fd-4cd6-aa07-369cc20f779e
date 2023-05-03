import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { store } from '../../../store';
import { UserGuard } from "../../../AuthGuard/UserGuard"

import './UserCourse.css';
const baseUrl = "https://8080-fcffeccfcdbefebcbbfafccddecaeebaeccc.project.examly.io";
let auth =""
store.subscribe( () => {
  auth = store.getState().auth;
  console.log(auth)
});
const UserCourse = () => {
    const [viewdata, setViewdata] = useState([])
    useEffect(() => {
        getdata()
    }, [])
    const getdata = async () => {
        const response = await fetch(`${baseUrl}/admin/viewCourse`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${auth.token}`,
                'Content-type': 'application/json'
            }
        });
        const data = await response.json();
        console.log(data)
        setViewdata(data)
    }
    const navigate = useNavigate();
    const handleLogout = () => { 
      store.dispatch({ type: 'LOGOUT' })
      navigate('/login');
    }
    const handleenroll = () => {
        navigate('/Enrollcourse')
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
            <div className="hero sec">
                {viewdata.map((course) => {
                    const { id, courseName, courseDescription, courseDuration, courseId } = course
                    return (

                        <div key={id}>

                            <h3>course id: {courseId}</h3>
                            <h3>course name:{courseName}</h3>
                            <h3>course description:{courseDescription}</h3>
                            <h3>course duration:{courseDuration}</h3>
                            <div className="out">
                                <button type="button" onClick={() => handleenroll()} >Enroll Now</button>

                            </div>

                            
                        </div>
                        
                        
                    )
                }
                )}
            </div>

        </UserGuard>
    );

}
export default UserCourse;