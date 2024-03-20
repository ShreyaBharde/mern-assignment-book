
import React from 'react'


import { useNavigate } from "react-router-dom";

const Logout = () => {
    const navigate = useNavigate();

  // Handle the logout logic
  const handleLogout = () => {
    // Perform any additional logout logic (clearing session, etc.) here
    // For example, you might want to clear user authentication token from local storage

    // Redirect the user to the login page after logout
    navigate("/");}
    return (
        <>
           <button className='btn btn-outline-primary ms-2' onClick={handleLogout}>Logout</button>
        </>
    )
}

export default Logout
