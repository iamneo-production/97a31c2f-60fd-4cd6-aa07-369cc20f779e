import React,{useEffect,useState} from 'react'
import Navbar from "../Navbar/Navbar";
import Studentservice from '../../../api/Studentservice';
import ViewStudent from './ViewStudent';
import { getCourses } from "../../../api/courseApi"

export const ApproveUser = () => {

    const [data, setdata] = useState([])
    const [loading, setloading] = useState(true)
    const [viewStudent, setviewStudent] = useState(false)
    const [studentDetail, setStudentDetail] = useState({})
    const [courses, setCourses] = useState([])

    useEffect(() => {
        Studentservice.getStudents().then((res) => {
            console.log(res, "logged data");
            setdata(res);
          }).catch((err) => {
            console.log(err);
          })
          
          getCourses().then((res) => { 
            setCourses(res);           
          }).catch((err) => { 
            console.log(err);
          })
          setloading(false);
      
    }, [])


    const handleApprove = (student1) => {
        console.log("Approve");
        const student = { ...student1, status: "Approved" };
        console.log(student);
        Studentservice.editstudent(student1.id, student)
          .then(() => {
                console.log(data,"before mapping");
                let temp = data.map((student2) => student2.id === student1.id ? student : student2)
                console.log(temp,"we mapped data");
                setdata(data.map((student2) => student2.id === student1.id ? student : student2));
            })
            .catch((err) => { 
                console.log(err);
            })

    }

    const handleViewStudent = (student1) => {
        console.log("View Student");
        setStudentDetail(student1);
        setviewStudent(true);
    }
    
    const handleReject = (student1) => { 
      console.log("Reject");
      const student = { ...student1, status: "Rejected" };
      console.log(student);
      Studentservice.editstudent(student1.id, student)
        .then(() => {
          console.log(data, "before mapping");
          let temp = data.map((student2) => student2.id === student1.id ? student : student2)
          console.log(temp, "we mapped data");
          setdata(data.map((student2) => student2.id === student1.id ? student : student2));
        }).catch((err) => {
          console.log(err);
        })
      }


    return (
        <>
            <Navbar></Navbar>

            <div className="student-heading mt-20"  >
              <h1> <i className="fa-solid fa-users-line"></i> List of Applications</h1>
            </div>

            {loading && <div className="flex justify-center">
                  <div className="loadingio-spinner-double-ring-amot1w4ku1j"><div className="ldio-14cancim8ocq">
                  <div></div>
                  <div></div>
                  <div><div></div></div>
                  <div><div></div></div>
                  </div></div>
            </div>}
            
            {!loading && !viewStudent &&
            <>
                    <table className="admin-student-table">
                <thead>
                  <tr>
                    <th className="admin-student-th">Student ID</th>
                    <th data-testid="userName" className="admin-student-th">Name</th>
                    <th data-testid="qualification" className="admin-student-th">Course Name</th>
                    <th data-testid="mobile" className="admin-student-th">Phone Number</th>
                    <th className="admin-student-th">Status</th>
                    <th className="admin-student-th">Actions</th>
                  </tr>
                </thead>
              </table>
              <div className="student-display-container">
                    {data.length > 0 ? 
                        data.map((student1) => {
                            const { studentIdNumber, firstName, phoneNumber1, courseId, lastName,status } = student1;
                            const course = courses.find((eachCourse) => {
                              return eachCourse.courseId === courseId;
                            });
          
                            return (
                              <>
                                <div  className="student-card-info">
                                      <table className="admin-student-table">
                                      <tbody>
                                          <tr>
                                          <td className="admin-student-td">{studentIdNumber}</td>
                                          <td className="admin-student-td">{firstName + " " + lastName}</td>
                                          {/* <td className="admin-student-td">{courseId}</td> */}
                                          <td className="admin-student-td">{(course != null) ? course.courseName : "Course Not Found"}</td>
                                          <td className="admin-student-td">{phoneNumber1}</td>
                                          <td className="admin-student-td">{status}</td>
                                          <td className="admin-student-td ">
                                              <button
                                              type="submit"
                                              id="editStudent"
                                              className="edit-btn"
                                              onClick={() => handleViewStudent(student1)}
                                                        >
                                                            View
                                              {/* <i className="fa-regular fa-pen-to-square"></i> */}
                                              </button>
                                              <button
                                              type="submit"
                                              id="editStudent"
                                              className="edit-btn"
                                              onClick={() => handleApprove(student1)}
                                                        >
                                                            Approve
                                              {/* <i className="fa-regular fa-pen-to-square"></i> */}
                                              </button>
                                              <button
                                              type="submit"
                                              id="deleteStudent"
                                            className="delete-btn"
                                            onClick={() => handleReject(student1)}
                                              // onClick={() => handleDelete(studentId)}
                                                        >
                                                            Reject
                                              {/* <i className="fa-regular fa-trash-can"></i> */}
                                              </button>
                                          </td>
                                          </tr>
                                      </tbody>
                                      </table>
                                </div>
                              </>
                              );
                          })
                     : <h1>No Data Found</h1>}    
              </div>
            </>
            }

            {/* if click view student it render below component */}

            {viewStudent &&
                <ViewStudent studentDetail={studentDetail} setviewStudent={setviewStudent} />}

      </>
  )
}
