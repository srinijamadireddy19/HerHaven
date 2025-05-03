import React from 'react'
import { NavLink } from "react-router-dom";
import { useAuth } from '../context/AuthContext';

function NavigationBar() {
  const {state, logout} = useAuth();
  return (
    <>
    <div className='nav-bar'>
        <ul className='nav-options'>
            <li> <NavLink to="/">Home</NavLink> </li>
            <li><NavLink to="/Forum">Forum</NavLink></li>
            {!state.isAuthenticated ? (
                    <>
                        <li><NavLink to="/login">Login</NavLink></li>
                        <li><NavLink to="/signup">Signup</NavLink></li>
                    </>
                ) : (
                    <>
                        <li><NavLink to="/post">Post</NavLink></li>
                        <li><NavLink to="/profile">Profile</NavLink></li>
                        <li><button onClick={logout}>Logout</button></li>
                    </>
                )}
        </ul>
    </div>
    </>
  )
}

export default NavigationBar