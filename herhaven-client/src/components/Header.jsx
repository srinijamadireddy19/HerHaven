import React from 'react'
import logo from '../assets/logo.png';

function Header() {
  return (
    <>
        <div className='Header'>
        <img src={logo} alt="Logo" className='logo' />
        <h2>HerHaven</h2>
        <h4>Women Community Forum </h4>
        </div>
    </>
  )
}

export default Header