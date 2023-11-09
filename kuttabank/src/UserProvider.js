import React, { useState, useEffect } from 'react';
import UserContext from './UserContext';
import axios from 'axios';

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null); // <-- State for error handling

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('/api/user');
                setUser(response.data);
            } catch (err) {
                console.error("Failed to fetch user data:", err.response.data);
                setError(err.response.data); // <-- Set the error state if the request fails
            }
        };

        fetchUserData();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, error }}> {/* <-- Pass the error as well */}
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
