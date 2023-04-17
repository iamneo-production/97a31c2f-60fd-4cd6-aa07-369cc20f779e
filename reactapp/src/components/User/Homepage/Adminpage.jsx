import React,{ useState } from 'react'
import { Navigate } from 'react-router-dom'
import "./Adminpage.css"
import "./Institutepage.jsx"
const Homepage = () => {
  
  const [redirectCheck, setRedirectCheck] = useState(false)
  const [currentPage, setCurrentPage] = useState('home');

  const handleLogout = () => { 
    localStorage.removeItem('token')
    setRedirectCheck(true)
  }
  
  const handleNavigation = (page) => {
    setCurrentPage(page);
  }

  if (!localStorage.getItem('token')) { 
    return <Navigate to="/login" />  
  }
  
  return (
    <>
      <nav>
        <ul>
          <li onClick={() => handleNavigation('home')}>Home</li>
          <li onClick={() => handleNavigation('add-institute')}>Add Institute</li>
          <li onClick={() => handleNavigation('add-course')}>Add Course</li>
          <li onClick={() => handleNavigation('add-student')}>Add Student</li>
        </ul>
      </nav>
      
      {currentPage === 'home' && (
        <div>
          <p>Admin has logged in</p>
          <button data-testid="logout" name='logout' onClick={handleLogout}>Logout</button>
        </div>
      )}
      
      {currentPage === 'add-institute' && (
        <div>
          <h2>Add Institute</h2>
          <form>
            <label htmlFor="institute-name">Institute Name:</label>
            <input type="text" id="institute-name" name="institute-name" />
            <button type="submit">Submit</button>
          </form>
          <button onClick={() => handleNavigation('Institutepage')}>Back</button>
        </div>
      )}
      
      {currentPage === 'add-course' && (
        <div>
          <h2>Add Course</h2>
          <form>
            <label htmlFor="course-name">Course Name:</label>
            <input type="text" id="course-name" name="course-name" />
            <button type="submit">Submit</button>
          </form>
          <button onClick={() => handleNavigation('home')}>Back</button>
        </div>
      )}
      
      {currentPage === 'add-student' && (
        <div>
          <h2>Add Student</h2>
          <form>
            <label htmlFor="student-name">Student Name:</label>
            <input type="text" id="student-name" name="student-name" />
            <button type="submit">Submit</button>
          </form>
          <button onClick={() => handleNavigation('home')}>Back</button>
        </div>
      )}
      
      {redirectCheck && <Navigate to="/login" />}
    </>
  )
}

export default Homepage