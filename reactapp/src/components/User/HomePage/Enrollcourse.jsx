import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Enrollcourse.css';
import { useNavigate } from 'react-router';
import { UserGuard } from "../../../AuthGuard/UserGuard"

import { store } from '../../../store';
const baseUrl = "https://8080-fcffeccfcdbefebcbbfafccddecaeebaeccc.project.examly.io";
let auth =""
store.subscribe( () => {
  auth = store.getState().auth;
  console.log(auth)
});
function Enrollcourse() {
    const navigate = useNavigate();

    const handleLogout = () => { 
      store.dispatch({ type: 'LOGOUT' })
      navigate('/login');
    }    
    const data = {

        firstName: '',
        lastName: '',
        fatherName: '',
        motherName: '',
        gender: '',
        phonenumber: '',
        alternativenumber: '',
        email: '',
        age: '',
        marks: '',

    };
    const [inputData, setInputData] = useState(data)
    const [flag, setFlag] = useState(false)
    useEffect(() => {
        console.log("registered")

    }, [flag])
    function handledata(e) {
        console.log(e.target.id)
        setInputData({ ...inputData, [e.target.id]: e.target.value })
        console.log(inputData)

    }
    function handleSubmit(e) {

        e.preventDefault();
        postdata()

        if (!inputData.firstName || !inputData.lastName || !inputData.fatherName || !inputData.motherName || !inputData.gender || !inputData.phonenumber || !inputData.alternativenumber || !inputData.age || !inputData.marks) {
            alert("All fields are Mandatory")
        }
        else {
            setFlag(true)
            navigate('/Enrolledcourse')

        }


    }
    const postdata = async () => {
         await fetch(`${baseUrl}/admin/addStudent`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.token}`,
                'Content-type': 'application/json'

            },
            body: JSON.stringify(inputData)
        })
    }





    return (
        <UserGuard>
            <pre>{(flag) ? <h2 className='ui-define'>Hello {inputData.firstName},registered successfully</h2> : ""}</pre>

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
            <form className='info' onSubmit={handleSubmit}>

                <div className="form" >
                    <div className="form-body">
                        <div className="flex-conatiner">
                            <div className="username">
                                <label className="form__label" for="firstName">First Name </label>
                                <input className="form__input" type="text" id="firstName" placeholder=" Enter Your First Name" value={inputData.firstName} onChange={handledata} />
                            </div>
                            <div className="lastname">
                                <label className="form__label" for="lastName">Last Name </label>
                                <input type="text" name="" id="lastName" className="form__input" placeholder="Enter Your LastName" value={inputData.lastName} onChange={handledata} />
                            </div>
                            <div className="fathername">
                                <label className="form__label" for="fatherName">Father Name </label>
                                <input type="text" name="" id="fatherName" className="form__input" placeholder="Enter Your fatherName" value={inputData.fatherName} onChange={handledata} />
                            </div>
                            <div className="mothername">
                                <label className="form__label" for="motherName">Mother Name </label>
                                <input type="text" name="" id="motherName" className="form__input" placeholder="Enter Your MotherName" value={inputData.motherName} onChange={handledata} />
                            </div>
                            <div className="gender">
                                <label className="form__label" for="gender">Gender </label>
                                <input type="text" name="" id="gender" className="form__input" placeholder="Enter male or female" value={inputData.gender} onChange={handledata} />
                            </div>
                            <div className="email">
                                <label className="form__label" for="email">Email </label>
                                <input type="email" id="email" className="form__input" placeholder="Enter Your Email" value={inputData.email} onChange={handledata} />
                            </div>
                            <div className="phonenumber">
                                <label className="form__label" for="phonenumber">Phonenumber </label>
                                <input className="form__input" type="text" id="phonenumber" placeholder="Enter your phonenumber" value={inputData.phonenumber} onChange={handledata} />
                            </div>

                            <div className="alternativenumber">
                                <label className="form__label" for="alternativenumber">Alternativenumber </label>
                                <input className="form__input" type="text" id="alternativenumber" placeholder="Enter your alternativenumber" value={inputData.alternativenumber} onChange={handledata} />
                            </div>
                            <div className="age">
                                <label className="form__label" for="age">Age </label>
                                <input type="text" name="" id="age" className="form__input" placeholder="Enter Your age" value={inputData.age} onChange={handledata} />
                            </div>
                            <div className="marks">
                                <label className="form__label" for="marks">Marks </label>
                                <input type="text" name="" id="marks" className="form__input" placeholder="Enter SSLC/HSC marks" value={inputData.marks} onChange={handledata} />
                            </div>
                            <div className="add">
                                <h4>Address information</h4>
                                <div className="houseno">
                                    <label className="form__label" for="houseno">HouseNo </label>
                                    <input type="text" id="houseno" className="form__input" />
                                </div>
                                <div className="streetname">
                                    <label className="form__label" for="streetname">Street Name </label>
                                    <input type="text" id="streetname" className="form__input" />
                                </div>
                                <div className="areaname">
                                    <label className="form__label" for="areaname">AreaName </label>
                                    <input type="text" id="areaname" className="form__input" />
                                </div>
                                <div className="state">
                                    <label className="form__label" for="state">State </label>
                                    <input type="text" id="state" className="form__input" />
                                </div>
                                <div className="pincode">
                                    <label className="form__label" for="pincode">Pincode </label>
                                    <input type="text" id="" className="form__input" />
                                </div>
                                <div className="nationality">
                                    <label className="form__label" for="nationality">Nationality </label>
                                    <input type="text" id="nationality" className="form__input" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="footer">
                    <button type="submit">Submit</button>
                </div>
            </div>
        </form>
    </UserGuard>
    );
}
export default Enrollcourse;