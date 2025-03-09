import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import AuthLayout from "../Layout/AuthLayout";
import Home from "../pages/Home";
import Forum from "../pages/Forum";
import SignUp from "../components/SignUp/SignUp";
import Login from "../components/Login";
import { ProtectedRoute } from "./ProtectedRoute"; 
import { AuthProvider } from "../context/AuthContext"; 
import Profile from "../pages/Profile";
import EditProfile from "../components/EditProfile";

function AppRouter() {
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    {/* Main layout */}
                    <Route element={<MainLayout />}>
                        <Route index element={<Home />} />
                        <Route path="/forum" element={<Forum />} />
                        <Route path="/profile" element={
                            <ProtectedRoute> 
                                 <Profile/>
                            </ProtectedRoute>
                        }/>
                        <Route path="/edit-profile" element={
                            <ProtectedRoute>
                               <EditProfile/>
                            </ProtectedRoute>
                        }/>
                        
                        
                    </Route>

                    {/* Auth layout */}
                    <Route element={<AuthLayout />}>
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/login" element={<Login />} />
                    </Route>
                </Routes>
            </AuthProvider>
        </Router>
    );
}

export default AppRouter;
