import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setIsAuthenticated } from '../../../redux/features/logInLogout/authenticationSlice.jsx';
import { clearUser, setUser } from '../../../redux/features/userData/userDataSlice.jsx';
import { fetchProducts } from '../../../redux/features/products/productSlics.jsx';
import pr from './profile-avatar.jpeg';
import './user.css';

function Userspage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(state => state.Authentication.isAuthenticated);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const storedUserData = JSON.parse(localStorage.getItem('userData'));
        if (isAuthenticated) {
            setUserData(storedUserData);
            dispatch(setUser(storedUserData));
        }
        // Scroll to the top of the page instantly when the component mounts
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, [isAuthenticated, dispatch]);

    const handleLogout = () => {
        if (window.confirm("Log Out?")) {
            localStorage.clear();
            dispatch(setIsAuthenticated(false));
            dispatch(clearUser());
            dispatch(fetchProducts(""));
            navigate("/");
        }
    };

    const leftMenuItems = [
        {
            id: 'user-myorder-div',
            icon: 'fa-folder',
            color: 'Dodgerblue',
            label: 'MY ORDERS',
            onClick: () => navigate("/orders")
        },
        {
            id: 'user-accountsettings-div',
            icon: 'fa-user',
            color: 'Dodgerblue',
            label: 'ACCOUNT SETTINGS',
            subItems: [
                'Profile Information',
                'Manage Address',
                'Pan Card Information'
            ]
        },
        {
            id: 'user-payment-div',
            icon: 'fa-wallet',
            color: 'Dodgerblue',
            label: 'PAYMENTS',
            subItems: [
                'Gift Cards',
                'UPI Information',
                'Saved Cards'
            ]
        },
        {
            id: 'user-mystuff-div',
            icon: 'fa-user-secret',
            color: 'Dodgerblue',
            label: 'MY STUFFS',
            subItems: [
                'My Coupons',
                'My Review And Ratings',
                'All Notification',
                'My WishList'
            ]
        },
        {
            id: 'user-logout-div',
            icon: 'fa-right-from-bracket',
            color: 'Dodgerblue',
            label: 'LOG OUT',
            onClick: handleLogout
        }
    ];

    return (
        <div id='user-outer-div'>
            <div id='user-left-div'>
                <div id='user-profile-div'>
                    <div id='user-profile-pic-div'>
                        <img src={pr} alt="Profile" />
                    </div>
                    <div id='user-profile-name-div'>
                        <div id='user-profile-name-div-1'><p>Hello,</p></div>
                        <div id='user-profile-name-div-2'><p>{userData?.name}</p></div>
                    </div>
                </div>

                {leftMenuItems.map(item => (
                    <div
                        key={item.id}
                        className={`class-user-left-child-divs${item.subItems ? '' : '-single-element'}`}
                        id={item.id}
                        onClick={item.onClick}
                    >
                        <div className="class-user-left-child-divs-c1">
                            <i className={`fa-solid ${item.icon} fa-2xl`} style={{ color: item.color }}></i>
                            <p>{item.label}</p>
                        </div>
                        {item.subItems && (
                            <div className="class-user-left-child-divs-c2">
                                {item.subItems.map((subItem, index) => (
                                    <p key={index}>{subItem}</p>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <div id='user-right-div'>HELLO THIS IS RIGHT DIV</div>
        </div>
    );
}

export default Userspage;
