import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState(''); // Change state variable to email
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:5000/auth/login', {
                email,
                password,
            });

            console.log('Login Successful');
            localStorage.setItem('token', response.data.token);
            navigate('/');
        } catch (error) {
            if (error.response && error.response.status === 401) {
                console.error('Invalid credentials or token expired.');
                // Handle invalid credentials or token expiration here
            } else {
                console.error(error.response.data.error);
            }
        }
    };


    return (
        <div className="login-container">
            <h2 className="center-text">Login</h2>
            <input className='email' type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <input className='password' type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <button className='button' onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Login;




