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

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

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
                <div>
                    <div className="user-icon-container">
                        <i
                            className={`fa-solid fa-bars ${isSidebarOpen ? "user-icon-hidden" : ""}`}
                            onClick={toggleSidebar}
                        ></i>
                        <NavLink to="/Navpage" className="user-nav-pg">
                            <h1>PG Admission Portal</h1>
                        </NavLink>
                        <NavLink to="/HomePage" className="user-navlink-buttons">
                            <i className="fa-solid fa-university"></i>
                            Institutes
                        </NavLink>
                        <NavLink to="/Enrolledcourse" className="user-navlink-buttons">
                            <i className="fa-solid fa-book"></i>
                            EnrolledCourses
                        </NavLink>
                        <NavLink to="/FeedBack" className="user-navlink-buttons">
                            <i className="fa-solid fa-comment"></i>
                            FeedBack
                        </NavLink>
                        <button data-testid="logout" name='logout' onClick={handleLogout} className="user-logout-button">
                            <i className="fa-solid fa-sign-out"></i>Logout</button>
                    </div>


                    <div className={`user-nav-container ${isSidebarOpen ? "user-show-sidebar" : ""}`}>
                        <nav>
                            <i
                                className={`fa-solid fa-bars ${isSidebarOpen ? "user-icon-hidden" : ""}`}
                                onClick={toggleSidebar}
                            ></i>
                            <div>
                                <NavLink to="/Navpage">
                                    <h2 className="pg-admission-heading">PG Admission</h2>
                                </NavLink>
                            </div>
                            <div className="user-navlinks-container">
                                <div className="user-navlink-box">
                                    <i class="fa-solid fa-building-columns"></i>
                                    <NavLink to="/HomePage">
                                        Institutes
                                    </NavLink>
                                </div>
                                <div className="user-navlink-box">
                                    <i className="fa-solid fa-book"></i>
                                    <NavLink to="/Enrolledcourse">
                                        EnrolledCourses
                                    </NavLink>
                                </div>
                                <div className="user-navlink-box">
                                    <i class="fa-solid fa-comments"></i>
                                    <NavLink to="/FeedBack">
                                        FeedBack
                                    </NavLink>
                                </div>
                                <div className="user-navlink-box user-bottom" onClick={handleLogout}>
                                    <i class="fa-solid fa-arrow-right-from-bracket"></i>
                                    <button data-testid="logout" name='logout'  >Logout</button>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
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
                                Confirm Delete
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
                                Cancel
                            </button>
                        </div>
                    </div>
                }
                <div className="bth">
                    <Link to="/Enrolledcourse">
                        <h5><i class="fa-solid fa-house"></i> Back to Home</h5>
                    </Link>
                </div>
                <div>
                    <h2 className='user-heading-student' align="center"><h2><i class="fa-solid fa-user"></i>  STUDENT DETAILS  </h2></h2>
                </div>
                <div className="student-details-container">
                    {studentdetails && studentdetails.length > 0 ? (
                        <div className="row">
                            {studentdetails.map((studentdetail, index) => (
                                <div key={studentdetail.id} className="column">
                                    <div className='user-enrolled-courses'>
                                        <table className='user-enrolled-course-table'>
                                            <tbody>
                                                <tr>
                                                    <th className='user-table-head courseID'>Course Id:</th>
                                                    <td className='user-table-data courseID'>{studentdetail.courseId}</td>
                                                </tr>
                                                <tr>
                                                    <th className='user-table-head studentID'>Student Id:</th>
                                                    <td className='user-table-data studentID'>{studentdetail.studentIdNumber}</td>
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
                                                    <th className='user-table-head'>Date of Birth :</th>
                                                    <td className='user-table-data'>{new Date(studentdetail.studentDOB).toLocaleDateString()}</td>
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