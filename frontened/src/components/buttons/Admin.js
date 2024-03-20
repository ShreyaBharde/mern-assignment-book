
import React from 'react'
import { NavLink } from 'react-router-dom'


const Admin = () => {
   
    return (
        <>
            <NavLink to="/admin" className="btn btn-outline-primary ms-2">
                <span className="fa fa-shopping-cart me-1"></span> Admin
            </NavLink>
        </>
    )
}

export default Admin
