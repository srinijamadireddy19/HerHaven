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
import Post from "../pages/Post";
import NewPost from "../pages/NewPost";
import PostDetail from "../components/PostDetail";

function AppRouter() {
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    {/* Main layout */}
                    <Route element={<MainLayout />}>
                        <Route index element={<Home />} />
                        <Route path="/forum" element={<Forum />} />
                        <Route path="/post" element={<Post />} />
                        <Route path="/post/:id" element={<PostDetail />} />
                        <Route path="/new-post" element={<NewPost />} />
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