import React, { useContext, useState, useEffect, createContext } from 'react';
import axios from 'axios';


const AuthContext = createContext();

const AuthContextComponent = ({ children }) => {
    const [user, setUser] = useState(null);


    useEffect(() => {
        const getUser = async () => {
            const { data } = await axios.get('/api/users/getcurrentuser');
            setUser(data);
        }
        getUser();
    }, [])


    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);

export default AuthContextComponent;

