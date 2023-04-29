import React from 'react';
import { Link } from 'react-router-dom';
import './Enrollcourse.css';
import { UseLogout } from '../../../hooks/UseLogout'
function Enrollcourse() {
    const { logout } = UseLogout()
    const handleLogout = () => {
        logout()
    }
    return (
        <>
            <div className="nvbar">
                <h2>PG Admission</h2>
                <h4>Enrollcourse</h4>
                <div className="link">
                    <Link to="/Viewacademy">Institute</Link>
                </div>
                <div className="out">
                    <button data-testid="logout" name='logout' onClick={handleLogout} >Logout</button>
                </div>
            </div>

            <div className="form">
                <div className="form-body">
                    <div class="flex-conatiner">
                        <div className="username">
                            <label className="form__label" for="firstName">First Name </label>
                            <input className="form__input" type="text" id="firstName" placeholder=" Enter Your First Name" />
                        </div>
                        <div className="lastname">
                            <label className="form__label" for="lastName">Last Name </label>
                            <input type="text" name="" id="lastName" className="form__input" placeholder="Enter Your LastName" />
                        </div>
                        <div className="fathername">
                            <label className="form__label" for="fatherName">Father Name </label>
                            <input type="text" name="" id="fatherName" className="form__input" placeholder="Enter Your fatherName" />
                        </div>
                        <div className="mothername">
                            <label className="form__label" for="motherName">Mother Name </label>
                            <input type="text" name="" id="motherName" className="form__input" placeholder="Enter Your MotherName" />
                        </div>
                        <div className="gender">
                            <label className="form__label" for="gender">Gender </label>
                            <input type="text" name="" id="malefemale" className="form__input" placeholder="Enter male or female" />
                        </div>
                        <div className="email">
                            <label className="form__label" for="email">Email </label>
                            <input type="email" id="email" className="form__input" placeholder="Enter Your Email" />
                        </div>
                        <div className="phonenumber">
                            <label className="form__label" for="phonenumber">Phonenumber </label>
                            <input className="form__input" type="text" id="phonenumber" placeholder="Enter your phonenumber" />
                        </div>
                        <div className="alternativenumber">
                            <label className="form__label" for="alternativenumber">Alternativenumber </label>
                            <input className="form__input" type="text" id="alternativenumber" placeholder="Enter your alternativenumber" />
                        </div>
                        <div className="age">
                            <label className="form__label" for="age">Age </label>
                            <input type="text" name="" id="age" className="form__input" placeholder="Enter Your age" />
                        </div>
                        <div className="marks">
                            <label className="form__label" for="marks">Marks </label>
                            <input type="text" name="" id="marks" className="form__input" placeholder="Enter SSLC/HSC marks" />
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
                    <button type="submit" class="btn"><h2>Enroll now</h2></button>
                </div>
            </div>

        </>
    );
}
export default Enrollcourse;