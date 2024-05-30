import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './retailerLoginCss.css';

function LoginPage() {
    const [phoneNumber, setMobileNumber] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const validatePhoneNumber = (phone) => {
        const phoneRegex = /^[6-9]\d{9}$/;
        return phoneRegex.test(phone);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (!validatePhoneNumber(phoneNumber)) {
            setError('Please enter a valid 10-digit phone number.');
            return;
        }
        setIsLoading(true);
        try {
            const response = await axios.post(
                `https://bharat-lbackend.vercel.app/api/v1/retailer/login`, 
                { phoneNumber, password }
            );
            if (response.status === 200) {
                localStorage.setItem('retailerData', JSON.stringify(response));
                navigate("/retailer/products");
            } else {
                setError('Login failed. Please check your phone number and password.');
            }
        } catch (error) {
            setError(`Error: ${error.response?.data?.message || error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div id='retailer-login-container'>
        <div id="retailee-left-form">
            <form id="left-form-form" onSubmit={handleSubmit}>
                <h1>LogIn - RETAILER</h1>
                {error && <div className="error">{error}</div>}
                <input
                    type="tel"
                    id="phone-number"
                    placeholder="Mobile Number"
                    value={phoneNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    required
                />
                <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" id="login-button" disabled={isLoading}>
                    {isLoading ? 'Logging in...' : 'Log In'}
                </button>
            </form>
        </div>
        </div>
    );
}
export default LoginPage;
