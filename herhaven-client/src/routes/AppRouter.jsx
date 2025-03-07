import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from '../Layout/MainLayout';
import AuthLayout from '../Layout/AuthLayout';
import Home from '../pages/Home';
import Forum from '../pages/Forum';
import SignUp from '../components/SignUp/SignUp';
import Login from '../components/Login';

function AppRouter() {
  return (
    <Router>
      <Routes>

        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/forum" element={<Forum />} />
        </Route>


        <Route element={<AuthLayout />}>
          <Route path="/signup" element={<SignUp />} />
          <Route path='/login' element={<Login/>}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default AppRouter;
