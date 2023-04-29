import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UseLogout } from '../../../hooks/UseLogout'
import './UserCourse.css';
const baseUrl = "https://8080-daefaebebcbbfafccddecaeebaeccc.project.examly.io";
const UserCourse = () => {
    const [viewdata, setViewdata] = useState([])
    useEffect(() => {
        getdata()
    }, [])
    const getdata = async () => {
        const response = await fetch(`${baseUrl}/admin/viewCourse`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.token}`,
                'Content-type': 'application/json'
            }
        });
        const data = await response.json();
        console.log(data)
        setViewdata(data)
    }
    const { logout } = UseLogout()
    const handleLogout = () => {
        logout()
    }

    return (
        <>
            <div className="nvbar">
                <h2>PG Admission</h2>
                <h4>Institute</h4>
                <div className="link">
                    <Link to="/Enrollcourse">Enrollcourse</Link>
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
                            <h3>enroll now</h3>
                        </div>
                    )
                }
                )}
            </div>
        

        </>
    );

}
export default UserCourse;