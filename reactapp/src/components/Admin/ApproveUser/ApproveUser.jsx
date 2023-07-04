import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';
import Studentservice from '../../../api/Studentservice';
import ViewStudent from './ViewStudent';
import { getCourses } from '../../../api/courseApi';

export const ApproveUser = () => {
  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(true);
  const [viewStudent, setviewStudent] = useState(false);
  const [studentDetail, setStudentDetail] = useState({});
  const [courses, setCourses] = useState([]);
  const [rejectReason, setRejectReason] = useState('');

  useEffect(() => {
    Studentservice.getStudents()
      .then((res) => {
        console.log(res, 'logged data');
        setdata(res);
      })
      .catch((err) => {
        console.log(err);
      });

    getCourses()
      .then((res) => {
        setCourses(res);
      })
      .catch((err) => {
        console.log(err);
      });

    setloading(false);
  }, []);

  const handleApprove = (student1) => {
    console.log('Approve');
    const student = { ...student1, status: 'Approved' };
    console.log(student);
    Studentservice.editstudent(student1.id, student)
      .then(() => {
        console.log(data, 'before mapping');
        let temp = data.map((student2) => (student2.id === student1.id ? student : student2));
        console.log(temp, 'we mapped data');
        setdata(temp);
        // Save the data to the database
        handleSaveData(student);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleViewStudent = (student1) => {
    console.log('View Student');
    setStudentDetail(student1);
    setviewStudent(true);
  };

  const handleReject = (student1) => {
    console.log('Reject');

    const reason = prompt('Enter the reason for rejection:');
    if (reason === null || reason.trim() === '') {
      alert('Please enter a reason for rejection.');
      return;
    }

    const student = { ...student1, status: 'Rejected', reason };
    console.log(student);

    Studentservice.editstudent(student1.id, student)
      .then(() => {
        console.log(data, 'before mapping');
        let temp = data.map((student2) => (student2.id === student1.id ? student : student2));
        console.log(temp, 'we mapped data');
        setdata(temp);
        // Save the data to the database
        handleSaveData(student);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSaveData = async (student) => {
    try {
      // Assuming the backend API endpoint is available at '/admin/addreason'
      const response = await axios.post('https://8080-deacebeebcbbfafccdddedcceaefeeadb.project.examly.io/admin/addreason', student);
      console.log('Data saved successfully!', response.data);
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  return (
    <>
      <Navbar></Navbar>

      <div className="student-heading mt-20">
        <h1>
          <i className="fa-solid fa-users-line"></i> List of Applications
        </h1>
      </div>

      {loading && (
        <div className="flex justify-center">
          <div className="loadingio-spinner-double-ring-amot1w4ku1j">
            <div className="ldio-14cancim8ocq">
              <div></div>
              <div></div>
              <div>
                <div></div>
              </div>
              <div>
                <div></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {!loading && !viewStudent && (
        <>
          <div className="student-heading mt-20"  >
            <h1> <i className="fa-solid fa-users-line"></i> List of Applications</h1>
          </div>

          {/* table */}
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <div className="flex items-center justify-between pb-4"></div>
            <table className="w-full text-sm text-left text-gray-700">
              <thead className="text-xs text-white uppercase bg-gray-500">
                <tr className="">
                  <th scope="col" className="px-6 py-6 text-xl">
                    Student ID
                  </th>
                  <th scope="col" className="px-6 py-4 text-xl">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-xl">
                    Course Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-xl">
                    Phone Number
                  </th>
                  <th scope="col" className="px-6 py-3 text-xl">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-xl">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.length > 0 ? (
                  data.map((student1) => {
                    const { studentIdNumber, firstName, phoneNumber1, courseId, lastName, status } =
                      student1;
                    let color;
                    if (status === "pending") {
                      color = "yellow";
                    } else if (status === "Approved") {
                      color = "green";
                    } else {
                      color = "red";
                    }
                    const course = courses.find((eachCourse) => eachCourse.courseId === courseId);

                    return (
                      <tr key={student1.id} className="bg-white border-b hover:bg-gray-50">
                        <td className="text-xl py-6 text-center">{studentIdNumber}</td>
                        <th className="text-xl text-gray-900 ">{firstName + " " + lastName}</th>
                        <td className="text-xl">{course != null ? course.courseName : "Course Not Found"}</td>
                        <td className="text-xl">{phoneNumber1}</td>
                        <td className="text-center text-lg">
                          <div className={`bg-${color}-300 text-${color}-600 border-${color}-500 border-2 font-semibold rounded-xl py-2 mr-4`}>
                            {status}
                          </div>
                        </td>
                        <td className="text-xl">
                          <button
                            type="submit"
                            id="editStudent"
                            className="edit-btn"
                            onClick={() => handleViewStudent(student1)}
                          >
                            View
                          </button>
                          <button
                            type="submit"
                            id="editStudent"
                            className="edit-btn"
                            onClick={() => handleApprove(student1)}
                          >
                            Approve
                          </button>
                          <button
                            type="submit"
                            id="deleteStudent"
                            className="delete-btn"
                            onClick={() => handleReject(student1)}
                          >
                            Reject
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center">
                      <h1>No Data Found</h1>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {/* end */}
        </>
      )}

      {viewStudent && <ViewStudent studentDetail={studentDetail} setviewStudent={setviewStudent} />}
    </>
  );
};
