import React from 'react'
import { NavLink } from "react-router-dom";
function NavigationBar() {
  return (
    <>
    <div className='nav-bar'>
        <ul className='nav-options'>
            <li> <NavLink to="/">Home</NavLink> </li>
            <li><NavLink to="/Forum">Forum</NavLink></li>
            <li><NavLink to="/login">Login</NavLink></li>
            <li><NavLink to="/signup">SignUp</NavLink></li>
        </ul>
    </div>
    </>
  )
}

export default NavigationBar