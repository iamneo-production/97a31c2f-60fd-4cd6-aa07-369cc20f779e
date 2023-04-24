import React,{ useState } from 'react'
<<<<<<< HEAD
import { Navigate } from 'react-router-dom'
=======
import { UseLogout } from '../../../hooks/UseLogout'
>>>>>>> 9577f7929f3f2617104907e4bdf98410925a3a7a
import "./Userpage.css"

const Homepage = () => {
  
<<<<<<< HEAD
  const [redirectCheck, setRedirectCheck] = useState(false)
=======
>>>>>>> 9577f7929f3f2617104907e4bdf98410925a3a7a
  const [searchValue, setSearchValue] = useState('');

  const { logout } = UseLogout()
  const handleLogout = () => { 
      logout()
  }
<<<<<<< HEAD
  
  if (!localStorage.getItem('token')) { 
    return <Navigate to="/login" />  }
=======

>>>>>>> 9577f7929f3f2617104907e4bdf98410925a3a7a
    return (
      <div>
        <div>
          <button data-testid="logout" name='logout' onClick={handleLogout} >Logout</button>
          <button data-testid="institute" name='institute'>Institute</button>
          <button data-testid="enrolled-courses" name='enrolled-courses'>Enrolled Courses</button>
        </div>
        <div>
          <input type="text" placeholder="Search" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
          <button data-testid="search-button" name='search-button'>Search</button>
        </div>
        <div>
          <p>User has  logged in</p>
        </div>
<<<<<<< HEAD
        {redirectCheck && <Navigate to="/login" />}
=======
>>>>>>> 9577f7929f3f2617104907e4bdf98410925a3a7a
      </div>
    );
  }
  export default Homepage;
