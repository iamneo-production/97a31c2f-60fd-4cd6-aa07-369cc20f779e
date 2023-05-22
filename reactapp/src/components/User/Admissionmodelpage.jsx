import './EnrolledCourse.css'
import { store } from '../../store'
import { useNavigate, Link } from 'react-router-dom';
import { getStudents, deletestud } from "../.././api/Studentservice"
import { useEffect, useState } from 'react';
import { UserGuard } from '../../AuthGuard/UserGuard';

function Admissionmodelpage() {
    const navigate = useNavigate();
    const { auth } = store.getState();
    const [studentdetails, setStudentdetails] = useState([]);

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
                <div className='mainbar'>
                    <div className='one'>
                        <Link to="/Homepage"><button>Institute</button></Link>
                    </div>
                    <div className='one'>
                        <button onClick={handleClick}>EnrolledCourse</button>
                    </div>
                    <div className='out'>
                        <button onClick={handleLogout}>LogOut</button>
                    </div>
                </div>
                <div className='home'>
                    <Link to="/HomePage"><h2>Back to Home</h2></Link>
                </div>
                <div><h2 align="center"><b>STUDENT DETAILS</b></h2>
                </div>
                {studentdetails && studentdetails.length > 0 ? (
                    studentdetails.map((studentdetail) => (
                        <div key={studentdetail.id} className='enrolled-course'>
                            <form>
                            <p>Course Id:{studentdetail.courseId}</p>
                            <p>Student Id:{studentdetail.studentIdNumber}</p>
                            <p>First Name:{studentdetail.firstName}</p>
                            <p>Last Name:{studentdetail.lastName}</p>
                            <p>Father Name:{studentdetail.fatherName}</p>
                            <p>Mother Name:{studentdetail.motherName}</p>
                            <p>Phone Number 1:{studentdetail.phoneNumber1}</p>
                            <p>Phone Number 2:{studentdetail.phoneNumber2}</p>
                            <p>Student DOB:{studentdetail.studentDOB}</p>
                            <p>SSLC :{studentdetail.sslc}</p>
                            <p>HSC :{studentdetail.hsc}</p>
                            <p>Diploma :{studentdetail.diploma}</p>
                            <p>House Number:{studentdetail.houseNumber}</p>
                            <p>Street Name:{studentdetail.streetName}</p>
                            <p>Area Name:{studentdetail.areaName}</p>
                            <p>Pincode :{studentdetail.pincode}</p>
                            <p>State :{studentdetail.state}</p>
                            <p>Nationality :{studentdetail.nationality}</p>
                            </form>
                            <Link to={`/Updatepage/${studentdetail.id}`} className='button'>Update</Link>
                            <button onClick={() => handleDeletestudent(studentdetail.id)}>Delete</button>
                        </div>
                    ))
                ) : (
                    <div>No details found</div>
                )}
            </div>
        </UserGuard>

    );

}

export default Admissionmodelpage;