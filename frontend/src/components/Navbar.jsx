import React from "react";
import { Link } from "react-router-dom";

export default function Navbar({ user, logout }) {
  return (
    <nav className="nav">
      <div className="nav-left"><Link to="/" className="brand">MyBlog</Link></div>
      <div className="nav-right">
        {user ? (
          <>
            <span className="nav-user">Hi, {user.name || user.email}</span>
            <Link to="/create" className="btn">Create</Link>
            <button className="btn" onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn">Login</Link>
            <Link to="/signup" className="btn">Sign up</Link>
          </>
        )}
      </div>
    </nav>
  );
}
