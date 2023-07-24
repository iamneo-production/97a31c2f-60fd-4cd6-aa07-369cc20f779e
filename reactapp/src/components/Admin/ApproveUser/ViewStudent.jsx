import React from 'react'

const ViewStudent = ({ studentDetail, setviewStudent }) => {

  return (
    <>
      <div className="p-4 md:px-4 md:mx-10 mx-5 mt-12  rounded-xl">
        <div className="flex justify-center text-green-700">
          <h2 className="text-4xl fa-solid fa-users-line mt-6 mb-4 font-bold ">Student Details</h2>
        </div>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          <div>
            <div className="flex">
              <p className="font-bold">ID:</p>
              <p>{studentDetail.id}</p>
            </div>
            <div className="flex">
              <p className="font-bold">Student ID Number:</p>
              <p>{studentDetail.studentIdNumber}</p>
            </div>
            <div className="flex">
              <p className="font-bold">First Name:</p>
              <p>{studentDetail.firstName}</p>
            </div>
            <div className="flex">
              <p className="font-bold">Last Name:</p>
              <p>{studentDetail.lastName}</p>
            </div>
            <div className="flex">
              <p className="font-bold">Email ID: </p>
              <p>{studentDetail.emailId}</p>
            </div>

            <div className="flex">
              <p className="font-bold">Course ID: </p>
              <p>{studentDetail.courseId}</p>
            </div>



          </div>

          <div>

            <div className="flex">
              <p className="font-bold">Student DOB:</p>
              <p>{new Date(studentDetail.studentDOB).toLocaleDateString()}</p>
            </div>
            <div className="flex">
              <p className="font-bold">Father's Name: </p>
              <p>{studentDetail.fatherName}</p>
            </div>
            <div className="flex">
              <p className="font-bold">Mother's Name:</p>
              <p>{studentDetail.motherName}</p>
            </div>
            <div className="flex">
              <p className="font-bold">Phone Number 1:</p>
              <p>{studentDetail.phoneNumber1}</p>
            </div>
            <div className="flex">
              <p className="font-bold">Phone Number 2:</p>
              <p>{studentDetail.phoneNumber2}</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 grid-cols-1  gap-4 mt-4">
          <div>
            <div className="flex">
              <p className="font-bold">SSLC:</p>
              <p>{studentDetail.sslc}</p>
            </div>

            <div className="flex">
              <p className="font-bold">HSC:</p>
              <p>{studentDetail.hsc}</p>
            </div>
            <div className="flex">
              <p className="font-bold">Diploma: </p>
              <p>{studentDetail.diploma ? "Yes" : "No"}</p>
            </div>

          </div>

          <div>
            <div className="flex">
              <p className="font-bold">House Number:</p>
              <p>{studentDetail.houseNumber}</p>
            </div>
            <div className="flex">
              <p className="font-bold">Street Name:</p>
              <p>{studentDetail.streetName}</p>
            </div>
            <div className="flex">
              <p className="font-bold ">Area Name</p>
              <p >: {studentDetail.areaName}</p>
            </div>
            <div className="flex">
              <p className="font-bold">State:</p>
              <p>{studentDetail.state}</p>
            </div>

            <div className="flex">
              <p className="font-bold">Pincode:</p>
              <p>{studentDetail.pincode}</p>
            </div>
            <div className="flex">
              <p className="font-bold">Nationality:</p>
              <p>{studentDetail.nationality}</p>
            </div>


          </div>
        </div>

        {/* /back button */}
        <button onClick={() => setviewStudent(false)} className=" mt-2 px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded-xl ">
          back
        </button>
      </div>

    </>
  )
}

export default ViewStudent