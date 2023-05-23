import './EnrolledCourse.css'
import { store } from '../../store'
import { useNavigate, Link, useParams } from 'react-router-dom';
import Studentservice, { editstudent, getStudents } from "../.././api/Studentservice"
import { useEffect, useState } from 'react';
import { UserGuard } from '../../AuthGuard/UserGuard';
function Updatepage() {
    const navigate = useNavigate();
    const { auth } = store.getState();
    const [studentdetail, setStudentdetail] = useState({});
    const { id } = useParams()
    const handleClick = (event) => {
        handleupdate(event).then((data) => {
            console.log("successfully edited", data)
        })
            .catch((error) => {
                console.error(error);
            });
        fetchstud().then((data) => {
            console.log("fetched student data successfully", data);
        })
            .catch((error) => {
                console.error(error)
            })
        navigate('/EnrolledCourse');
    }

    const handleLogout = () => {
        store.dispatch({ type: 'LOGOUT' })
        navigate('/login');
    }
    const fetchstud = async () => {
        const data = await getStudents();
    }
    useEffect(() => {
        console.log(auth)
        const fetchstud = async () => {
            const resp = await Studentservice.getStudents();
            console.log("all students response", resp)
            const studreg = resp.find(student => student.id == id)
            console.log("filtered", studreg)
            setStudentdetail(studreg);
        }
        fetchstud().then((data) => {
            console.log(data)
        })
            .catch((error) => {
                console.error(error)
            });
    }, [])
    const handleInput = (a, key) => {
        const currentstudentdata = {
            ...studentdetail,
        };
        currentstudentdata[key] = a.target.value;
        setStudentdetail(currentstudentdata);
    };
    const handleupdate = async (a) => {
        a.preventDefault();
        try {
            await editstudent(id, studentdetail)
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <UserGuard>
            <div>
                <div className='mainbar'>
                    <div className='one'>
                        <h1>PG Admission</h1>
                    </div>
                    <div className='one'>
                        <Link to="/HomePage"><button>Institute</button></Link>
                    </div>
                    <div className='one'>
                        <button onClick={handleClick}>Enrolled course</button>
                    </div>
                    <div className='one'>
                        <Link to="/FeedBack">FeedBack</Link>
                    </div>
                    <div className='out'>
                        <button onClick={handleLogout}>LogOut</button>
                    </div>
                </div>
                <div className='home'>
                    <Link to="/HomePage"><h5>Back To Home</h5></Link>
                </div>
                <div><h2 align="center"><b>STUDENT DETAILS</b></h2>
                </div>

                <div key={studentdetail.id} className='enrolled-course'>
                    <form>
                        <div>
                            <label>First Name:</label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={studentdetail.firstName}
                                placeholder="Enter First Name"
                                onChange={(a) => handleInput(a, "firstName")}
                            />
                        </div>
                        <div>
                            <label>Last Name:</label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={studentdetail.lastName}
                                placeholder='Enter Last Name'
                                onChange={(a) => handleInput(a, "lastName")}
                            />
                        </div>
                        <div>
                            <label>Father Name:</label>
                            <input
                                type="text"
                                id="fatherName"
                                name="fatherName"
                                value={studentdetail.fatherName}
                                placeholder="Enter Father Name"
                                onChange={(a) => handleInput(a, "fatherName")}
                            />
                        </div>
                        <div>
                            <label>Mother Name:</label>
                            <input
                                type="text"
                                id="motherName"
                                name="motherName"
                                value={studentdetail.motherName}
                                placeholder="Enter Mother Name"
                                onChange={(a) => handleInput(a, "motherName")}
                            />
                        </div>
                        <div>
                            <label>Phone Number 1:</label>
                            <input
                                type="text"
                                id="phoneNumber1"
                                name="phoneNumber1"
                                value={studentdetail.phoneNumber1}
                                placeholder="Enter Phone Number1"
                                onChange={(a) => handleInput(a, "phoneNumber1")}
                            />
                        </div>
                        <div>
                            <label>Phone Number 2:</label>
                            <input
                                type="text"
                                id="phoneNumber2"
                                name="phoneNumber2"
                                value={studentdetail.phoneNumber2}
                                placeholder="Enter Phone Number2"
                                onChange={(a) => handleInput(a, "phoneNumber2")}
                            />
                        </div>
                        <div>
                            <label>Student DOB:</label>
                            <input
                                type="text"
                                id="studentDOB"
                                name="studentDOB"
                                value={studentdetail.studentDOB}
                                placeholder="Enter Student DOB"
                                onChange={(a) => handleInput(a, "studentDOB")}
                            />
                        </div>
                        <div>
                            <label>Enter SSLC marks:</label>
                            <input
                                type="text"
                                id="sslc"
                                name="sslc"
                                value={studentdetail.sslc}
                                placeholder="Enter SSLC marks"
                                onChange={(a) => handleInput(a, "sslc")}
                            />
                        </div>
                        <div>
                            <label>Enter HSC marks:</label>
                            <input
                                type="text"
                                id="hsc"
                                name="hsc"
                                value={studentdetail.hsc}
                                placeholder="Enter HSC marks"
                                onChange={(a) => handleInput(a, "hsc")}
                            />
                        </div>
                        <div>
                            <label>Enter diploma marks:</label>
                            <input
                                type="text"
                                id="diploma"
                                name="diploma"
                                value={studentdetail.diploma}
                                placeholder="Enter diploma marks"
                                onChange={(a) => handleInput(a, "diploma")}
                            />
                        </div>
                        <div>
                            <label>Enter House Number:</label>
                            <input
                                type="text"
                                id="houseNumber"
                                name="houseNumber"
                                value={studentdetail.houseNumber}
                                placeholder="Enter House Number"
                                onChange={(a) => handleInput(a, "houseNumber")}
                            />
                        </div>
                        <div>
                            <label>Enter Street Name:</label>
                            <input
                                type="text"
                                id="streetName"
                                name="streetName"
                                value={studentdetail.streetName}
                                placeholder="Enter Street Name"
                                onChange={(a) => handleInput(a, "streetName")}
                            />
                        </div>
                        <div>
                            <label>Enter Area Name:</label>
                            <input
                                type="text"
                                id="areaName"
                                name="areaName"
                                value={studentdetail.areaName}
                                placeholder="Enter Area Name"
                                onChange={(a) => handleInput(a, "areaName")}
                            />
                        </div>
                        <div>
                            <label>Enter Pincode:</label>
                            <input
                                type="text"
                                id="pincode"
                                name="pincode"
                                value={studentdetail.pincode}
                                placeholder="Enter Pincode"
                                onChange={(a) => handleInput(a, "pincode")}
                            />
                        </div>
                        <div>
                            <label>Enter State:</label>
                            <input
                                type="text"
                                id="state"
                                name="state"
                                value={studentdetail.state}
                                placeholder="Enter State"
                                onChange={(a) => handleInput(a, "state")}
                            />
                        </div>
                        <div>
                            <label>Enter Nationality:</label>
                            <input
                                type="text"
                                id="nationality"
                                name="nationality"
                                value={studentdetail.nationality}
                                placeholder="Enter Nationality"
                                onChange={(a) => handleInput(a, "nationality")}
                            />
                        </div>
                    </form>
                    <button className="button" type="submit" onClick={(a) => handleClick(a)}>
                        Update
                    </button>
                    <Link to="/Admissionmodelpage" className='button'><button>Cancel</button></Link>
                </div>
            </div>
        </UserGuard>

    );

}

export default Updatepage;