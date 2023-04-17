import React,{ useState } from 'react'
import { Navigate } from 'react-router-dom'
import "./Userpage.css"

const Homepage = () => {
  
  const [redirectCheck, setRedirectCheck] = useState(false)
  const [searchValue, setSearchValue] = useState('');

  const handleLogout = () => { 
    localStorage.removeItem('token')
    setRedirectCheck(true)
  }
  
  if (!localStorage.getItem('token')) { 
    return <Navigate to="/login" />  }
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
        {redirectCheck && <Navigate to="/login" />}
      </div>
    );
  }
  export default Homepage;