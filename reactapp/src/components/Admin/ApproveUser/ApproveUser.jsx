import React, { useEffect, useState } from 'react'
import Navbar from "../Navbar/Navbar";
import Studentservice from '../../../api/Studentservice';
import ViewStudent from './ViewStudent';
import { getCourses } from "../../../api/courseApi"
import { getFilters } from "../../../api/FilterService";
import { AdminGuard } from "../../../AuthGuard/AdminGuard";

export const ApproveUser = () => {

  const [data, setdata] = useState([])
  const [loading, setloading] = useState(true)
  const [viewStudent, setviewStudent] = useState(false)
  const [studentDetail, setStudentDetail] = useState({})
  const [courses, setCourses] = useState([])
  const [viewFilter, setViewFilter] = useState(false)
  const [selectedAction, setSelectedAction] = useState("");
  const [clearFilter, setClearFilter] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  useEffect(() => {
    setloading(true)

    Studentservice.getStudentsWithPagination(currentPage, pageSize).then((res) => {
      console.log(res, "logged data");
      setdata(res.content);
      setTotalPages(res.totalPages);
    }).catch((err) => {
      console.log(err);
    })


    getCourses().then((res) => {
      setCourses(res);
    }).catch((err) => {
      console.log(err);
    })

    setSelectedAction("")
    setloading(false);

  }, [clearFilter, currentPage, pageSize])


  const handleApprove = (student1) => {
    console.log("Approve");
    const student = { ...student1, status: "Approved" };
    console.log(student);
    Studentservice.editstudent(student1.id, student)
      .then(() => {
        console.log(data, "before mapping");
        let temp = data.map((student2) => student2.id === student1.id ? student : student2)
        console.log(temp, "we mapped data");
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


  const hadleToggle = () => {
    setViewFilter(!viewFilter);
  }


  const handleActionChange = (event) => {
    setSelectedAction(event.target.value);
    console.log(event.target.value);
    hadleToggle()
    setloading(true)
    getFilters(event.target.value).then((res) => {
      setdata(res);
    })
    setloading(false)
  };

  const handleClear = () => {
    setClearFilter(!clearFilter)
    setSelectedAction("")
    setViewFilter(false)
  }

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };


  return (
    <AdminGuard>
      <Navbar></Navbar>

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
          {/* table */}
          <div className="student-heading mt-20"  >
            <h1> <i className="fa-solid fa-users-line"></i> List of Applications</h1>
          </div>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">

            <div className="flex  items-center justify-between  pb-12">
              <div>

                <label className='ml-4 mr-2' htmlFor="">Page size</label>
                <input type="number" min="1" max="50"
                  className="border-2 w-20  border-gray-300  h-10 px-5  rounded-lg text-sm focus:outline-none"
                  onChange={(e) => setPageSize(e.target.value)} value={pageSize}
                />

                <button onClick={hadleToggle} id="dropdownRadioButton" data-dropdown-toggle="dropdownRadio" className="inline-flex bg-blue-500 text-white right-40 text-xl absolute items-center text-gray-500 border border-gray-300  hover:bg-blue-600  font-medium rounded-lg text-sm px-3 py-1.5 mr-4 " type="button">
                  Filter
                  <svg className="w-3 h-3 ml-2" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                </button>
                <button onClick={handleClear} className="inline-flex bg-red-500 text-white right-0 text-xl absolute items-center text-gray-500 border border-gray-300  hover:bg-red-600  font-medium rounded-lg text-sm px-3 py-1.5 mr-4 " type="button">
                  clear filter
                </button>
                {/* <!-- Dropdown menu --> */}
                {viewFilter &&
                  <div id="dropdownRadio" className=" absolute top-12 right-0 z-10 w-20 h-42 overflow-y-auto overflow-x-hidden z-10  w-48 bg-gray-200 mr-36   divide-y divide-gray-100 rounded-lg shadow " data-popper-reference-hidden="" data-popper-escaped="" data-popper-placement="top" >
                    <ul className="p-3 space-y-1 text-sm text-gray-700 " aria-labelledby="dropdownRadioButton">
                      <li>
                        <div className="flex items-center p-2 rounded hover:bg-gray-100 ">
                          <input id="filter-radio-example-1" checked={selectedAction === "approved"} onChange={handleActionChange} type="radio" value="approved" name="filter-radio" className="w-4 h-4  bg-gray-100 border-gray-300 focus:ring-blue-500  focus:ring-2 " />
                          <label for="filter-radio-example-1" className="w-full ml-2  text-black text-xl font-medium  rounded ">Approved</label>
                        </div>
                      </li>
                      <li>
                        <div className="flex items-center p-2 rounded hover:bg-gray-100 ">
                          <input id="filter-radio-example-2" checked={selectedAction === "rejected"} onChange={handleActionChange} type="radio" value="rejected" name="filter-radio" className="w-4 h-4  bg-gray-100 border-gray-300 focus:ring-blue-500  focus:ring-2  " />
                          <label for="filter-radio-example-2" className="w-full ml-2 text-xl font-medium text-black rounded ">Rejected</label>
                        </div>
                      </li>
                      <li>
                        <div className="flex items-center p-2 rounded hover:bg-gray-100 ">
                          <input id="filter-radio-example-3" checked={selectedAction === "pending"} onChange={handleActionChange} type="radio" value="pending" name="filter-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500  focus:ring-2  " />
                          <label for="filter-radio-example-3" className="w-full ml-2 text-xl font-medium text-gray-900 rounded ">pending</label>
                        </div>
                      </li>

                    </ul>
                  </div>
                }
              </div>

            </div>

            <table className="w-full text-sm text-left text-gray-700 h-44 ">
              <thead className="text-xs text-white uppercase bg-gray-500 ">
                <tr className=''>
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

                {data &&

                  data.map((student1) => {
                    const { studentIdNumber, firstName, phoneNumber1, courseId, lastName, status } = student1;
                    let color;
                    if (status === "pending") {
                      color = "yellow";
                    } else if (status === "Approved") {
                      color = "green";
                    } else {
                      color = "red";
                    }
                    const course = courses.find((eachCourse) => {
                      return eachCourse.courseId === courseId;
                    });

                    return (

                      <tr key={student1.div} className="bg-white border-b   hover:bg-gray-50 ">

                        <td className="text-xl py-6 text-center ">
                          {studentIdNumber}
                        </td>
                        <th className=" text-xl text-gray-900  ">
                          {firstName + " " + lastName}
                        </th>
                        <td className=" text-xl">
                          {(course != null) ? course.courseName : "Course Not Found"}
                        </td>
                        <td className=" text-xl">
                          {phoneNumber1}
                        </td>
                        <td className="  text-center     text-lg   ">
                          <div className={`bg-${color}-300 text-${color}-600 border-${color}-500 border-2 font-semibold rounded-xl py-2 mr-4`}>
                            {status}
                          </div>
                        </td>
                        <td className=" text-xl">
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

                }

              </tbody>
            </table>

            {/* pagination  */}
            {data &&
              <div className='my-5 flex justify-center'>
                <button className={`bg-blue-500 text-white w-20 px-2 py-2 rounded hover:bg-blue-700 mr-4 ${currentPage === 0 && "cursor-not-allowed hover:bg-blue-500"}`} onClick={handlePrevPage} disabled={currentPage === 0}  >
                  Previous
                </button>
                <button className={`bg-blue-500 text-white w-20 px-2 py-2 rounded hover:bg-blue-700 ${currentPage === totalPages - 1 && "cursor-not-allowed hover:bg-blue-500"}`}
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages - 1}
                >
                  Next
                </button>
              </div>
            }
            {!data && <h1 className='text-3xl  w-full text-center  mb-20 font-bold '>
              No Student Found
            </h1>}
          </div>

          {/* end */}
        </>
      }

      {/* if click view student it render below component */}

      {viewStudent &&
        <ViewStudent studentDetail={studentDetail} setviewStudent={setviewStudent} />}

    </AdminGuard>
  )
}
