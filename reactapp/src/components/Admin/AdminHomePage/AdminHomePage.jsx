import React,{ useState } from 'react'
import { UseLogout } from '../../../hooks/UseLogout'

const AdminHomePage = () => {

<<<<<<< HEAD
    const [redirectCheck, setRedirectCheck] = useState(false)
    const [currentPage, setCurrentPage] = useState('home');

    const handleNavigation = (page) => {
        setCurrentPage(page);
      }

    const handleLogout = () => { 
        localStorage.removeItem('token')
        localStorage.removeItem('role')
        setRedirectCheck(true)
    }
=======
    const [currentPage, setCurrentPage] = useState('home');
>>>>>>> 9577f7929f3f2617104907e4bdf98410925a3a7a

    const handleNavigation = (page) => {
        setCurrentPage(page);
      }

<<<<<<< HEAD
=======
      const { logout } = UseLogout()
      const handleLogout = () => { 
          logout()
      }
>>>>>>> 9577f7929f3f2617104907e4bdf98410925a3a7a
 
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
<<<<<<< HEAD
      <AuthGuard>
          <div>AdminHomePage</div>
          <button data-testid="logout" name='logout' onClick={handleLogout} >logout</button>
          {redirectCheck && <Navigate to="/login" />}
      </AuthGuard>
=======
      
          <div>AdminHomePage</div>
          <button data-testid="logout" name='logout' onClick={handleLogout} >logout</button>

>>>>>>> 9577f7929f3f2617104907e4bdf98410925a3a7a
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
      
<<<<<<< HEAD
      {redirectCheck && <Navigate to="/login" />}
=======
>>>>>>> 9577f7929f3f2617104907e4bdf98410925a3a7a
    </>
  )
}

export default AdminHomePage


