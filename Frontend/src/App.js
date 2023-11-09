import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import Register from './Register';
import Login from './Login';
import Deposit from './Deposit';
import Withdraw from './Withdraw';
import CustomerData from './CustomerData';
import PrivateRoute from './PrivateRoute';
import { AuthProvider } from './AuthContext';
import About from './About';
import CustomerCare from './Customercare';

function App() {
    return (
        <Router>
            <AuthProvider>
                <div className="container">
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/customer-care" element={<CustomerCare />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/deposit" element={<PrivateRoute><Deposit /></PrivateRoute>} />
                        <Route path="/withdraw" element={<PrivateRoute><Withdraw /></PrivateRoute>} />
                        <Route path="/customer-data" element={<PrivateRoute><CustomerData /></PrivateRoute>} />
                    </Routes>
                </div>
            </AuthProvider>
        </Router>
    );
}

export default App;
