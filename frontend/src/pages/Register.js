import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css'; // Make sure to create a corresponding CSS file for styling

const Register = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        try {
            const response = await axios.post('https://url-shortener-pdfd.onrender.com/auth/register', {
                email,
                password,
            });

            console.log('Registration Successful');
            localStorage.setItem('token', response.data.token);
            navigate('/login');
        } catch (error) {
            console.error(error.response.data.error);
            // Handle registration error here
        }
    };

    return (
        <div className="register-container">
            <h2 className="center-text">Register</h2>
            <input className='email' type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <input className='password' type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <button className='button' onClick={handleRegister}>Register</button>
        </div>
    );
};

export default Register;
