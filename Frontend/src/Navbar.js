// Navbar.js
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import onlinebank from '../src/onlinebank.png';
import "./Navbar.css";

function Navbar() {
    const navigate = useNavigate();
    const { isAuthenticated, logout } = useContext(AuthContext);

    const handleLogout = () => {
        localStorage.removeItem('currentUser');
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar-container">
            <div className="left-side">
                <Link to="/about" className="about-link"><i className="fa fa-info-circle"></i> About</Link>
                <Link to="/customer-care" className="customer-care-link"><i className="fa fa-headset"></i> Customer Care</Link>
            </div>
            <Link to="/"><img src={onlinebank} alt="Lion" className="navbar-logo" /></Link>
            <div className="auth-links">
                {!isAuthenticated && <Link to="/register"><i className="fa fa-user-plus"></i> Signup</Link>}
                {!isAuthenticated && <Link to="/login"><i className="fa fa-sign-in"></i> Login</Link>}
                {isAuthenticated && <Link to="/deposit"><i className="fa fa-money"></i> Deposit</Link>}
                {isAuthenticated && <Link to="/withdraw"><i className="fa fa-money"></i> Withdraw</Link>}
                {isAuthenticated && <Link to="/customer-data"><i className="fa fa-users"></i> Customer Data</Link>}
                {isAuthenticated && <button onClick={handleLogout}><i className="fa fa-sign-out"></i> Logout</button>}
            </div>
        </nav>
    );
}

export default Navbar;
