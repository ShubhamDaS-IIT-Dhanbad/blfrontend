// RetailerNavbar.jsx
import React, { useState } from 'react';
import "./retailerNavBarCss.css";
import { Link, useNavigate } from 'react-router-dom';
import { FaCloudversify, FaSearch } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";

function RetailerNavbar({ shopData }) {
    const navigate = useNavigate();

    const Logout = (() => {
        alert("Logging Out")
        localStorage.removeItem('retailerData');
        navigate('/');
    });

    const [searchQuery, setSearchQuery] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const [menu, setMenu] = useState('');

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            if (searchQuery === '') {
                navigate('/products');
            } else {
                navigate(`/search/${searchQuery}`);
                console.log("Search initiated by Enter key for:", searchQuery);
            }
        }
    };

    return (
        <>
            <div id='retailer-navbar-front-block'></div>
            <div id='retailer-navbar-container'>
                <div className='retailer-navbar'>
                    <div className='retailer-nav-logo'>
                        <div id='retailer-FaCloudversify'><FaCloudversify id="retailer-FaCloudversify" /></div>
                        <p><Link to="/" className="retailer-link-properties">Bharat | Shop</Link></p>
                    </div>
                    <div className="retailer-search-box">
                        <button id='retailer-FaSearch'><FaSearch id='retailer-FaSearchIcon' /></button>
                        <input
                            id='retailer-input-search'
                            type="search"
                            placeholder='Search product by ID'
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                    </div>
                    <ul className='retailer-nav-menu-right'>
                        {isAuthenticated ? (
                            <>
                                <div className='retailer-logged-in-div'>
                                    <li>
                                        <Link to="/account" id="retailer-logged-in-div-1" className="retailer-link-properties">
                                            <p id='retailer-welcome'>Welcome,</p>
                                            <p id='retailer-user-name'>{shopData?.shopName?.toUpperCase()}</p>
                                        </Link>
                                    </li>
                                </div>
                                <div id='retailer-logout-div-icon' onClick={Logout}><IoIosLogOut size={30} /> </div>
                            </>
                        ) : (
                            { Logout }
                        )}
                    </ul>
                </div>
                <ul className='retailer-nav-menu-left'>
                    <li onClick={() => setMenu("RETAILER")}>
                        <Link className="retailer-link-properties" to="#" aria-label="Retailer">RETAILER</Link>
                        {menu === "RETAILER" && <div className='retailer-nav-menu-left-hr-line' style={{ backgroundColor: "#9d94ff" }}></div>}
                    </li>
                    <li onClick={() => setMenu("PRODUCTS")}>
                        <Link className="retailer-link-properties" to="/retailer/products" aria-label="Products">PRODUCTS</Link>
                        {menu === "PRODUCTS" && <div className='retailer-nav-menu-left-hr-line' style={{ backgroundColor: "#59adf6" }}></div>}
                    </li>
                    <li onClick={() => setMenu("ADD")}>
                        <Link className="retailer-link-properties" to="/retailer/upload" aria-label="Upload">UPLOAD</Link>
                        {menu === "ADD" && <div className='retailer-nav-menu-left-hr-line' style={{ backgroundColor: "#5c3c92" }}></div>}
                    </li>
                    {shopData?.category && shopData?.category?.includes("pharmacy") && (
                        <li onClick={() => setMenu("PRESCRIPTION")}>
                            <Link className="retailer-link-properties" to="retailer/retailer/login" aria-label="Prescription">PRESCRIPTION</Link>
                            {menu === "PRESCRIPTION" && <div className='retailer-nav-menu-left-hr-line' style={{ backgroundColor: "#ffb480" }}></div>}
                        </li>
                    )}
                    <li onClick={() => setMenu("SHOP")}>
                        <Link className="retailer-link-properties" to={"retailer/shop"} aria-label="Shop">SHOP</Link>
                        {menu === "SHOP" && <div className='retailer-nav-menu-left-hr-line' style={{ backgroundColor: "red" }}></div>}
                    </li>
                    <li onClick={() => setMenu("CONTACT")}>
                        <Link className="retailer-link-properties" to="/contact" aria-label="Contact">CONTACT</Link>
                        {menu === "CONTACT" && <div className='retailer-nav-menu-left-hr-line' style={{ backgroundColor: "#c780e8" }}></div>}
                    </li>
                </ul>

            </div>
        </>
    );
}

export default RetailerNavbar;
