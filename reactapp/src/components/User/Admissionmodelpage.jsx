import './Admissionmodelpage.css'
import { store } from '../../store'
import { useNavigate, Link, NavLink } from 'react-router-dom';
import { getStudents, deletestud } from "../.././api/Studentservice"
import { useEffect, useState } from 'react';
import { UserGuard } from '../../AuthGuard/UserGuard';

function Admissionmodelpage() {
    const navigate = useNavigate();
    const { auth } = store.getState();
    const [studentdetails, setStudentdetails] = useState([]);

    const [userPopup, setUserPopup] = useState({ state: false, deleteId: null });

    const handleClick = () => {
        navigate('/EnrolledCourse');
    }

    const handleLogout = () => {
        store.dispatch({ type: 'LOGOUT' })
        navigate('/login');
    }

    useEffect(() => {
        console.log(auth)

        fetchstud().then((data) => {
            console.log(data)
        })
            .catch((error) => {
                console.error(error)
            });
    }, [])
    const fetchstud = async () => {
        const resp = await getStudents();
        console.log("all students response", resp)
        const studreg = resp.filter(student => student.studentIdNumber === auth.id)
        console.log("filtered", studreg)
        setStudentdetails(studreg);
    }
    const handleDeletestudent = async (id) => {
        try {
            await deletestud(id)

            fetchstud()
                .then((data) => {
                    console.log(data)
                })
                .catch((error) => {
                    console.error(error)
                });
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <UserGuard>
            <div>
                <nav className="user-nav-container">
                    <div>
                        <NavLink to="/Navpage" >
                            <h2 className="pg-admission-heading">PG Admission</h2>
                        </NavLink>
                    </div>
                    <div className="user-navlinks-container">
                        <NavLink to="/HomePage">Institute</NavLink>
                        <NavLink to="/Enrolledcourse">Enrolledcourse</NavLink>
                        <NavLink to="/FeedBack">FeedBack</NavLink>
                    </div>
                    <button data-testid="logout" name='logout' onClick={handleLogout} >Logout</button>
                </nav>
                {
                    userPopup.state &&
                    <div className="user-popup-body noHover">
                        <div className="user-popup-overlay">

                        </div>
                        <div className="user-admissionmodel-popup">
                            <h1>Are you sure to delete the data ?</h1>
                            <button
                                className='user-admissionmodel-confirm-btn'
                                type="submit"
                                onClick={() => {
                                    handleDeletestudent(userPopup.deleteId)
                                        .then(() => {
                                            console.log("deleted Course");
                                        })
                                        .catch((error) => {
                                            console.log(error);
                                        });
                                    setUserPopup({
                                        state: false,
                                        deleteId: null
                                    });
                                }}
                            >
                                confirm delete
                            </button>
                            <button
                                className='user-admissionmodel-cancel-btn'
                                type="submit"
                                onClick={() => {
                                    setUserPopup({
                                        state: false,
                                        deleteId: null
                                    });
                                }}
                            >
                                cancel
                            </button>
                        </div>
                    </div>
                }
                <div className="bth">
                    <Link to="/HomePage">
                        <h5>Back To Home</h5>
                    </Link>
                </div>
                <div>
                    <h2 class='user-heading-student' align="center"><h2>STUDENT DETAILS</h2></h2>
                </div>
                <div class="student-details-container">
                    {studentdetails && studentdetails.length > 0 ? (
                        <div class="row">
                            {studentdetails.map((studentdetail, index) => (
                                <div key={studentdetail.id} class="column">
                                    <div class='enrolled-courses'>
                                        <table class='user-enrolled-course-table'>
                                            <tbody>
                                                <tr>
                                                    <th className='user-table-head'>Course Id:</th>
                                                    <td className='user-table-data'>{studentdetail.courseId}</td>
                                                </tr>
                                                <tr>
                                                    <th className='user-table-head'>Student Id:</th>
                                                    <td className='user-table-data'>{studentdetail.studentIdNumber}</td>
                                                </tr>
                                                <tr>
                                                    <th className='user-table-head'>First Name:</th>
                                                    <td className='user-table-data'>{studentdetail.firstName}</td>
                                                </tr>
                                                <tr>
                                                    <th className='user-table-head'>Last Name:</th>
                                                    <td className='user-table-data'>{studentdetail.lastName}</td>
                                                </tr>
                                                <tr>
                                                    <th className='user-table-head'>Father Name:</th>
                                                    <td className='user-table-data'>{studentdetail.fatherName}</td>
                                                </tr>
                                                <tr>
                                                    <th className='user-table-head'>Mother Name:</th>
                                                    <td className='user-table-data'>{studentdetail.motherName}</td>
                                                </tr>
                                                <tr>
                                                    <th className='user-table-head'>Phone Number 1:</th>
                                                    <td className='user-table-data'>{studentdetail.phoneNumber1}</td>
                                                </tr>
                                                <tr>
                                                    <th className='user-table-head'>Phone Number 2:</th>
                                                    <td className='user-table-data'>{studentdetail.phoneNumber2}</td>
                                                </tr>
                                                <tr>
                                                    <th className='user-table-head'>Student DOB:</th>
                                                    <td className='user-table-data'>{studentdetail.studentDOB}</td>
                                                </tr>
                                                <tr>
                                                    <th className='user-table-head'>SSLC:</th>
                                                    <td className='user-table-data'>{studentdetail.sslc}</td>
                                                </tr>
                                                <tr>
                                                    <th className='user-table-head'>HSC:</th>
                                                    <td className='user-table-data'>{studentdetail.hsc}</td>
                                                </tr>
                                                <tr>
                                                    <th className='user-table-head'>Diploma:</th>
                                                    <td className='user-table-data'>{studentdetail.diploma}</td>
                                                </tr>
                                                <tr>
                                                    <th className='user-table-head'>House Number:</th>
                                                    <td className='user-table-data'>{studentdetail.houseNumber}</td>
                                                </tr>
                                                <tr>
                                                    <th className='user-table-head'>Street Name:</th>
                                                    <td className='user-table-data'>{studentdetail.streetName}</td>
                                                </tr>
                                                <tr>
                                                    <th className='user-table-head'>Area Name:</th>
                                                    <td className='user-table-data'>{studentdetail.areaName}</td>
                                                </tr>
                                                <tr>
                                                    <th className='user-table-head'>Pincode:</th>
                                                    <td className='user-table-data'>{studentdetail.pincode}</td>
                                                </tr>
                                                <tr>
                                                    <th className='user-table-head'>State:</th>
                                                    <td className='user-table-data'>{studentdetail.state}</td>
                                                </tr>
                                                <tr>
                                                    <th className='user-table-head'>Nationality:</th>
                                                    <td className='user-table-data'>{studentdetail.nationality}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <div class='button-container'>
                                            <Link to={`/Updatepage/${studentdetail.id}`} className='update-button'>Update</Link>
                                            <button className='delete-button' onClick={() => { setUserPopup({ state: true, deleteId: studentdetail.id }) }}>Delete</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No student details found.</p>
                    )}
                </div>
            </div>
        </UserGuard>

    );

}

export default Admissionmodelpage;