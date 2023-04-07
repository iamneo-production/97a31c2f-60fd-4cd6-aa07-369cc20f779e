import React from 'react'
import { Navigate } from 'react-router-dom'

const Homepage = () => {

  if (!localStorage.getItem('token')) { 
        return <Navigate to="/login" />
    }

  return (
      <>
          <div>Homepage</div>
          <p>you logged in</p>
      </>
  )
}

export default Homepage