import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {

    const navigate = useNavigate();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSigning, setIsSigning] = useState(false);


    const onSubmit = async e => {
        setIsSigning(true);
        e.preventDefault();
        await axios.post('/api/users/add', { firstName, lastName, email, password });
        navigate('/login')
        setIsSigning(false);
    }

    return (
        <div className="container" style={{ marginTop: 80 }}>
            <main role="main" className="pb-3">
                <div
                    className="row"
                    style={{ minHeight: "80vh", display: "flex", alignItems: "center" }}
                >
                    <div className="col-md-6 offset-md-3 bg-light p-4 rounded shadow">
                        <h3>Sign up for a new account</h3>
                        <form onSubmit={onSubmit}>
                            <input
                                type="text"
                                name="firstName"
                                onChange={e => setFirstName(e.target.value)}
                                placeholder="First Name"
                                className="form-control"
                                defaultValue={firstName}
                            />
                            <br />
                            <input
                                type="text"
                                name="lastName"
                                placeholder="Last Name"
                                className="form-control"
                                value={lastName}
                                onChange={e => setLastName(e.target.value)}
                            />
                            <br />
                            <input
                                type="text"
                                name="email"
                                placeholder="Email"
                                className="form-control"
                                defaultValue={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                            <br />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                className="form-control"
                                defaultValue={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                            <br />
                            <button className="btn btn-primary" disabled={isSigning} >{isSigning ? 'Signing Up...' : 'Signup'}</button>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Signup;