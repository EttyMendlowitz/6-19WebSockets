import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './authContext';

const Login = () => {

    const { setUser } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isValid, setIsValid] = useState(true);
    const [isLogging, setIsLogging] = useState(false);


    const onSubmit = async e => {
        setIsLogging(true);
        e.preventDefault();
        const { data } = await axios.post('/api/users/login', { email, password });
        const isValidLogin = !!data;
        setIsValid(isValidLogin);
        if (isValid) {
            setUser(data);
            navigate('/');
        }
        setIsLogging(false);
    }

    return (<div className="container" style={{ marginTop: 80 }}>
        <main role="main" className="pb-3">
            <div
                className="row"
                style={{ minHeight: "80vh", display: "flex", alignItems: "center" }}
            >
                <div className="col-md-6 offset-md-3 bg-light p-4 rounded shadow">
                    <h3>Log in to your account</h3>
                    <form onSubmit={onSubmit}>
                        <input
                            type="text"
                            name="email"
                            placeholder="Email"
                            className="form-control"
                            onChange={e => setEmail(e.target.value)}
                            defaultValue={email}
                        />
                        <br />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            className="form-control"
                            onChange={e => setPassword(e.target.value)}
                            defaultValue={password}
                        />
                        <br />
                        <button className="btn btn-primary" disabled={isLogging} >{isLogging ? 'Logging in...' : 'Login'}</button>
                    </form>
                    <Link to="/signup">Sign up for a new account</Link>
                </div>
            </div>
        </main>
    </div>
    )
}

export default Login;
