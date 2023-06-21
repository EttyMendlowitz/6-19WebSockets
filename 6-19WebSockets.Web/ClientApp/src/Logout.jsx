import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './authContext';

const Logout = () => {

    const { setUser } = useAuth();
    const navigate = useNavigate();


    useEffect(() => {
        const userLogout = async () => {
            await axios.post('/api/users/logout');
            setUser(null);
            navigate('/login');
        }
        userLogout();
    }, []);

    return (<></>);
}

export default Logout;