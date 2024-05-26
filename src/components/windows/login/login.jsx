import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setIsAuthenticated } from '../../../redux/features/logInLogout/authenticationSlice.jsx';
import { fetchProducts} from '../../../redux/features/products/productSlics.jsx';
import './login.css';

function LoginPage() {
    const [mobileNumber, setMobileNumber] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        try {
            const response = await axios.post('http://localhost:12000/api/v1/account/login', { mobileNumber });
            if (response.status === 200) {
                localStorage.setItem('userData', JSON.stringify(response.data.data.user));
                dispatch(setIsAuthenticated(true));
                dispatch(setIsAuthenticated(true));

                const pinCodesString = response.data.data.user && response.data.data.user.pinCodes 
                                    ? response.data.data.user.pinCodes.join(', ') : '';
                dispatch(fetchProducts({pinCodesString}));

                navigate("/");
            } else {
                setError('Login failed. Please check your mobile number and try again.');
            }
        } catch (error) {
            setError('Error: ' + (error.response?.data?.message || error.message));
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
                                <a href="https://www.google.com/">
                                    <i className="fa-brands fa-google-plus-g" aria-label="Google" />
                                </a>
                                <Link to="/">
                                    <i className="fa-brands fa-facebook-f" aria-label="Facebook" />
                                </Link>
                                <Link to="/">
                                    <i className="fa-brands fa-github" aria-label="GitHub" />
                                </Link>
                                <Link to="/">
                                    <i className="fa-brands fa-linkedin-in" aria-label="LinkedIn" />
                                </Link>
                            </div>
                            <label htmlFor="mobile-number" className="sr-only">Mobile Number</label>
                            <input
                                type="tel"
                                id="mobile-number"
                                placeholder="Mobile Number"
                                value={mobileNumber}
                                onChange={(e) => setMobileNumber(e.target.value)}
                                required
                            />
                            <Link to="/" id="forget-mobile-number">
                                Forgot your mobile number?
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
