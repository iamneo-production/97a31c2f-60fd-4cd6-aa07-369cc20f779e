import React,{ useState } from 'react'
import { UseLogout } from '../../../hooks/UseLogout'
import "./Userpage.css"

const Homepage = () => {
  
  const [searchValue, setSearchValue] = useState('');

  const { logout } = UseLogout()
  const handleLogout = () => { 
      logout()
  }
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
      </div>
    );
  }
  export default Homepage;
