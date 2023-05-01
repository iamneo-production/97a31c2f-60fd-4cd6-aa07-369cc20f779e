import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { UseLogout } from '../../../hooks/UseLogout'
import './Viewacademy.css';
const baseUrl = "https://8080-daefaebebcbbfafccddecaeebaeccc.project.examly.io";
const Viewacademy = () => {
    const [viewdata, setViewdata] = useState([])
    const [fetchdata, setFetchdata] = useState([])
    const [search, setSearch] = useState([])
    useEffect(() => {
        getdata()
    }, [])
    const navigate = useNavigate();
    const getdata = async () => {
        const response = await fetch(`${baseUrl}/admin/viewInstitutes`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.token}`,
                'Content-type': 'application/json'
            }
        });
        const data = await response.json();
        console.log(data)
        setViewdata(data)
        setFetchdata(data)
    }
    const handle = () => {
        navigate('/UserCourse')
    }
    const handlesearch = () => {
        const data = fetchdata.filter((institute) => {
            const name = institute.instituteName.toLowerCase()
            const info = search.toLowerCase()
            return name.startsWith(info)
        })
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
                    <Link to="/Enrolledcourse">Enrolled course</Link>
                </div>
                <div className="out">
                    <button data-testid="logout" name='logout' onClick={handleLogout} >Logout</button>
                </div>
            </div>
            <div className="searchsec">
                <input type="text" name="search" value={search} placeholder="Type here to Search Institute" onChange={(e) => setSearch(e.target.value)} />
                <button type="button" onClick={() => handlesearch()} >Search</button>

            </div>
            <div className="herosec">
                {
                    viewdata.map((institute) => {
                        const { instituteId, instituteName, instituteAddress, imageUrl } = institute
                        return (
                            <div className="card" onClick={() => { handle() }} key={instituteId}>
                                <img src={imageUrl} alt="img" />
                                <h2>{instituteName}</h2>
                                <h4>{instituteAddress}</h4>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )

}
export default Viewacademy;