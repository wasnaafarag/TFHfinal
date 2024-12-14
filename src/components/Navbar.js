import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Create this CSS file to style the Navbar

function Navbar() {
    return (
        <nav className="navbar">
            <div className="logo">
                <Link to="/">The Fragrance Hub</Link>
            </div>
            <div className="nav-links">
                <Link to="/login" className="nav-link">Login</Link>
                <Link to="/signup" className="nav-link">Sign Up</Link>
            </div>
        </nav>
    );
}

export default Navbar;
   