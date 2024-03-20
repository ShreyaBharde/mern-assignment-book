import React from 'react'
import { NavLink } from 'react-router-dom'
import Admin from './buttons/Admin'
import CartBtn from './buttons/Cartbutton'
import Logout from './buttons/Logout'
const Header = () => {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid py-2">
                    
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item mt-2">
                                <NavLink className="nav-link fw-bold fs-30" aria-current="page" to="/home">Home</NavLink>
                            </li>
                            <li className="nav-item mt-2">
                                <NavLink className="nav-link fw-bold fs-30" to="/about">About</NavLink>
                            </li>
                            <li className="nav-item mt-2">
                                <NavLink className="nav-link fw-bold fs-30" to="/product">Product</NavLink>
                            </li>
                            
                    <NavLink className="navbar-brand mx-auto fw-bold " to="/"><img src='booklish.png' alt='booklish' style={{height:'50px',width:'200px',marginLeft:'450px'}}></img></NavLink>
                            
                            
                            
                        </ul>
                    <CartBtn/>
                    <Admin/>
                    <Logout/>
                    
                    </div>
                </div>
            </nav>
        
        </>
    )
}

export default Header
