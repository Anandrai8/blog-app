import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import BlogList from "./pages/BlogList";
import BlogDetail from "./pages/BlogDetail";
import CreateEditBlog from "./pages/CreateEditBlog";
import API from "./api";

export default function App() {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !user) {
      API.get("/auth/me")
        .then(res => {
          localStorage.setItem("user", JSON.stringify(res.data.user));
          setUser(res.data.user);
        })
        .catch(() => {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        });
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <>
      <Navbar user={user} logout={logout} />
      <div className="container">
        <Routes>
          <Route path="/" element={<BlogList />} />
          <Route path="/signup" element={<Signup onAuth={setUser} />} />
          <Route path="/login" element={<Login onAuth={setUser} />} />
          <Route path="/create" element={<CreateEditBlog user={user} />} />
          <Route path="/edit/:id" element={<CreateEditBlog user={user} edit />} />
          <Route path="/blogs/:id" element={<BlogDetail user={user} />} />
        </Routes>
      </div>
    </>
  );
}
