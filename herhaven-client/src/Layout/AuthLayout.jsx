import React from 'react';
import { Outlet } from 'react-router-dom';

function AuthLayout() {
  return (
    <div className="auth-layout">
      <header className="auth-header">
        <h1>Women's Empowerment Forum</h1>
        <p>Empowering Women, One Conversation at a Time</p>
      </header>
      <main className="auth-main">
        <Outlet />  
      </main>
    </div>
  );
}

export default AuthLayout;
