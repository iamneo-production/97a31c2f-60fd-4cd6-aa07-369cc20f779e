import React from 'react'
import { Navigate } from 'react-router-dom'
import { useState } from 'react'
import { AuthGuard } from '../../../utils/AuthGuard'

const AdminHomePage = () => {

    const [redirectCheck, setRedirectCheck] = useState(false)
    const handleLogout = () => { 
        localStorage.removeItem('token')
        localStorage.removeItem('role')
        setRedirectCheck(true)
    }


  return (
      <AuthGuard>
          <div>AdminHomePage</div>
          <button data-testid="logout" name='logout' onClick={handleLogout} >logout</button>
          {redirectCheck && <Navigate to="/login" />}
      </AuthGuard>
  )
}

export default AdminHomePage