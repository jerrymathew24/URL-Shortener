import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const validateEmail = () => {
        // Basic email validation for Gmail
        const emailRegex = /\S+@\S+\.\S+/;
        return emailRegex.test(email.toLowerCase());
    };

    const validatePassword = () => {
        // Basic password validation for a 4-digit password
        return /^[0-9]{4,}$/.test(password);
    };

    const handleLogin = async () => {
        try {
            if (!validateEmail()) {
                setError('Please enter a valid Gmail address.');
                return;
            }

            if (!validatePassword()) {
                setError('Please enter a 4-digit password.');
                return;
            }

            const response = await axios.post('https://url-shortener-pdfd.onrender.com/auth/login', {
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
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default Login;
