import React from 'react'

const ViewStudent = ({passStudentData,handleBackList}) => {
  return (
    <>
        <div className="p-4 md:px-4 md:mx-10 mx-5 mt-12  rounded-xl">
          <div className="flex justify-center text-green-500">
            <h2 className="text-2xl fa-solid fa-users-line mt-6 mb-4 font-bold ">Student Details</h2>
          </div>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
            <div>
              <div className="flex">
                <p className="font-bold">ID:</p>
                <p>{passStudentData.id}</p>
              </div>
              <div className="flex">
                <p className="font-bold">Student ID Number:</p>
                <p>{passStudentData.studentIdNumber}</p>
              </div>
              <div className="flex">
                <p className="font-bold">First Name:</p>
                <p>{passStudentData.firstName}</p>
              </div>
              <div className="flex">
                <p className="font-bold">Last Name:</p>
                <p>{passStudentData.lastName}</p>
              </div>
              <div className="flex">
                <p className="font-bold">Email ID: </p>
                <p>{passStudentData.emailId}</p>
              </div>

              <div className="flex">
                <p className="font-bold">Course ID: </p>
                <p>{passStudentData.courseId}</p>
              </div>



            </div>

            <div>

              <div className="flex">
                <p className="font-bold">Student DOB:</p>
                <p>{new Date(passStudentData.studentDOB).toLocaleDateString()}</p>
              </div>
              <div className="flex">
                <p className="font-bold">Father's Name: </p>
                <p>{passStudentData.fatherName}</p>
              </div>
              <div className="flex">
                <p className="font-bold">Mother's Name:</p>
                <p>{passStudentData.motherName}</p>
              </div>
              <div className="flex">
                <p className="font-bold">Phone Number 1:</p>
                <p>{passStudentData.phoneNumber1}</p>
              </div>
              <div className="flex">
                <p className="font-bold">Phone Number 2:</p>
                <p>{passStudentData.phoneNumber2}</p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 grid-cols-1  gap-4 mt-4">
            <div>
              <div className="flex">
                <p className="font-bold">SSLC:</p>
                <p>{passStudentData.sslc}</p>
              </div>

              <div className="flex">
                <p className="font-bold">HSC:</p>
                <p>{passStudentData.hsc}</p>
              </div>
              <div className="flex">
                <p className="font-bold">Diploma: </p>
                <p>{passStudentData.diploma ? "Yes" : "No"}</p>
              </div>

            </div>

            <div>
              <div className="flex">
                <p className="font-bold">House Number:</p>
                <p>{passStudentData.houseNumber}</p>
              </div>
              <div className="flex">
                <p className="font-bold">Street Name:</p>
                <p>{passStudentData.streetName}</p>
              </div>
              <div className="flex">
                <p className="font-bold ">Area Name</p>
                <p >: {passStudentData.areaName}</p>
              </div>
              <div className="flex">
                <p className="font-bold">State:</p>
                <p>{passStudentData.state}</p>
              </div>

              <div className="flex">
                <p className="font-bold">Pincode:</p>
                <p>{passStudentData.pincode}</p>
              </div>
              <div className="flex">
                <p className="font-bold">Nationality:</p>
                <p>{passStudentData.nationality}</p>
              </div>


            </div>
          </div>

          {/* /back button */}
          <button onClick={handleBackList} className=" mt-2 px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded-xl ">
            back
          </button>
        </div>

      </>
  )
}

export default ViewStudent