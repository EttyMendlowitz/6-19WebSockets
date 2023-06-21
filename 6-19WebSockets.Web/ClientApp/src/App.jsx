import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AuthContextComponent from './authContext';
import PrivateRoute from './PrivateRoute';
import Layout from './Layout';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import Logout from './Logout';

const App = () => {
    return (
        <AuthContextComponent>
            <Layout>
                <Routes>
                    <Route exact path='/' element={
                        <PrivateRoute>
                            <Home />
                        </PrivateRoute>} />
                    <Route exact path='/login' element={<Login />} />
                    <Route exact path='/signup' element={<Signup />} />
                    <Route exact path='/Logout' element={
                        <PrivateRoute>
                            <Logout />
                        </PrivateRoute>} />
                </Routes>
            </Layout>
        </AuthContextComponent>
    )
}

export default App;