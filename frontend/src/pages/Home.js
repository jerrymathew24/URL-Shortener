import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'

const Home = () => {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        // Navigate to the login page
        navigate('/login');
    };

    const handleRegisterClick = () => {
        // Navigate to the register page
        navigate('/register');
    };

    const handleUrlShortenClick = () => {
        // Navigate to the UrlShorten page
        navigate('/shortUrls');
    };

    const handleLogoutClick = () => {
        // Remove the token from localStorage or perform any other logout logic
        localStorage.removeItem('token');
        // Navigate to the home page or login page, depending on your application flow
        navigate('/');
    };

    // Check if the user is logged in based on the presence of the token
    const isLoggedIn = !!localStorage.getItem('token');

    return (
        <div className="home-container">
            <h1 className="center-text">URL Shortener</h1>
            {isLoggedIn ? (
                <>
                    <button onClick={handleUrlShortenClick}>Shorten URL</button>
                    <button onClick={handleLogoutClick}>Logout</button>
                </>
            ) : (
                <>
                    <button onClick={handleLoginClick}>Login</button>
                    <button onClick={handleRegisterClick}>Register</button>
                </>
            )}
        </div>
    );
};

export default Home;
