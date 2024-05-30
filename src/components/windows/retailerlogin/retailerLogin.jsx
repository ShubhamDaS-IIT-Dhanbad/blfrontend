import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './retailerLoginCss.css';

function LoginPage() {
    const [phoneNumber, setMobileNumber] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const response = await axios.post('https://bharat-lbackend.vercel.app/api/v1/retailer/login', { phoneNumber, password });
            if (response.status === 200) {
                console.log(response)
                localStorage.setItem('retailerData', JSON.stringify(response));
                navigate("/retailer/products");
            } else {
                setError('Login failed. Please check your phone number and try again.');
            }
        } catch (error) {
            setError(`Error: ${error.response?.data?.message || error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div id="login-parent-container">
            <div id="container">
                <div id="login-container">
                    <div id="left-form">
                        <form id="left-form-form" onSubmit={handleSubmit}>
                            <h1>Log In</h1>
                            {error && <div className="error">{error}</div>}
                            <div id="social-media-logo">
                                <a href="https://www.google.com/" aria-label="Google">
                                    <i className="fa-brands fa-google-plus-g" />
                                </a>
                                <Link to="/" aria-label="Facebook">
                                    <i className="fa-brands fa-facebook-f" />
                                </Link>
                                <Link to="/" aria-label="GitHub">
                                    <i className="fa-brands fa-github" />
                                </Link>
                                <Link to="/" aria-label="LinkedIn">
                                    <i className="fa-brands fa-linkedin-in" />
                                </Link>
                            </div>
                            <label htmlFor="phone-number" className="sr-only">Mobile Number</label>
                            <input
                                type="tel"
                                id="phone-number"
                                placeholder="Mobile Number"
                                value={phoneNumber}
                                onChange={(e) => setMobileNumber(e.target.value)}
                                required
                            />
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <Link to="/" id="forget-phone-number">
                                Forgot your phone number?
                            </Link>
                            <button type="submit" id="login-button" disabled={isLoading}>
                                {isLoading ? 'Logging in...' : 'Log In'}
                            </button>
                        </form>
                    </div>
                    <div className="signup-class">
                        <button id="toggle-signup-button">
                            <Link className="login-link-properties" to="/signup">SIGN UP</Link>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
