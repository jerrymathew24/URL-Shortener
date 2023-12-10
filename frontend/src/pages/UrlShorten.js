import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './UrlShorten.css';

const UrlShorten = ({ onShortUrlChange }) => {
    const navigate = useNavigate();
    const [full, setFull] = useState('');
    const [shortUrl, setShortUrl] = useState('');

    const handleShorten = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('Token not available. Redirecting to login.');
                navigate('/login');
                return;
            }

            const response = await axios.post(
                'https://url-shortener-pdfd.onrender.com/url/shortUrls',
                { full },
                { headers: { Authorization: token } }
            );

            console.log('Shortened URL response:', response.data);

            // Check if the response has the expected structure
            if (response.data && response.data.shortUrl) {
                console.log('Shortened URL:', response.data.shortUrl);
                setShortUrl(response.data.shortUrl);
                // Notify the parent component if needed
                if (onShortUrlChange) {
                    onShortUrlChange(response.data.shortUrl);
                }
            } else {
                console.error('Invalid response from server');
            }
        } catch (error) {
            console.error('Error during URL shortening:', error);

            if (error.response && error.response.status === 401) {
                console.error('Token expired. Redirecting to login.');
                navigate('/login');
            } else {
                console.error(error.response ? error.response.data.error : error.message);
            }
        }
    };

    const handleLogoutClick = () => {
        // Remove the token from localStorage or perform any other logout logic
        localStorage.removeItem('token');
        // Navigate to the home page or login page, depending on your application flow
        navigate('/');
    };

    return (
        <div className="url-container">
            <input
                className="url"
                type="text"
                placeholder="Enter URL"
                onChange={(e) => setFull(e.target.value)}
            />
            <button className="button" onClick={handleShorten}>
                Shorten URL
            </button>
            {shortUrl && (
                <div>
                    <p className="shortened-url-title">Shortened URL:</p>
                    <a href={shortUrl} target="_blank" className="shortened-url">
                        {shortUrl}
                    </a>
                </div>
            )}

            <button onClick={handleLogoutClick}>Logout</button>
        </div>
    );
};

export default UrlShorten;
