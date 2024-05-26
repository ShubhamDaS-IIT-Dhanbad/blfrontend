import React, { useState, useEffect } from 'react';
import "./navbarCss.css";
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaCloudversify, FaSearch } from "react-icons/fa";
import { FaBarsStaggered } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { setIsAuthenticated } from '../../../redux/features/logInLogout/authenticationSlice.jsx';
import { searchedProducts } from '../../../redux/features/products/productSlics.jsx';
import { setUser } from '../../../redux/features/userData/userDataSlice.jsx';

function Navbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [searchQuery, setSearchQuery] = useState('');
    const [userData, setUserData] = useState({ fullName: "Guest" });
    const [isLoading, setIsLoading] = useState(true);
    const [menu, setMenu] = useState("");
    
    const { isAuthenticated } = useSelector(state => state.Authentication);
    useEffect(() => {
        dispatch(setIsAuthenticated());
        dispatch(setUser());
        const fetchData = async () => {
            try {
                const storedUserData = JSON.parse(localStorage.getItem('userData'));
                if (isAuthenticated) {
                    setUserData(storedUserData);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
            setIsLoading(false);
        };
        fetchData();
      fetchData();
    }, [isAuthenticated]);
    
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            if (searchQuery == '') {
                navigate(`/products`);
            }else{
                dispatch(searchedProducts(searchQuery));
                navigate(`/search/${searchQuery}`);
                console.log("Search initiated by Enter key for:", searchQuery);
            }

        }
    };

    const submitButton = () => {
        dispatch(searchedProducts(searchQuery));
        navigate(`/search/${searchQuery}`);
        console.log("Search initiated by button click for:", searchQuery);};

    const handleInputChange = (e) => {
        setSearchQuery(e.target.value);};

    return (
        <>
            <div id='navbar-front-block'></div>
            <div id='navbar-container'>
                <div className='navbar'>
                    <div className='nav-logo'>
                        <div id='FaCloudversify'><FaCloudversify id="FaCloudversify" /></div>
                        <p><Link to="/" className="link-properties">Bharat | Linker</Link></p>
                    </div>
                    <div className="search-box">
                        <button id='home-FaSearch' onClick={submitButton}><FaSearch id='home-FaSearchIcon' /></button>
                        <input id='input-search' type="search"
                            placeholder='Search for products, brands, and more'
                            value={searchQuery}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown} 
                            />
                     
                            { isAuthenticated && (!isLoading)&&(
                                  <div className='pincode-container'>
                                    {
                                    userData?.pinCodes?.map((pinCode, index) => (
                                        <div className='pin-code-list' key={index}>{console.log("ko",pinCode)}{pinCode}+</div>
                                    ))}
                               </div>
                            )}
                       
                    </div>
                    <ul className='nav-menu-right'>
                        {isAuthenticated ? (
                            <div className='logged-in-div'>
                                <li>
                                    <Link to="/account" id="logged-in-div-1" className="link-properties">
                                        <p id='welcome'>Welcome,</p>
                                        <p id='user-name'>{userData?.fullName?.toUpperCase()}</p>
                                    </Link>
                                </li>
                                <li id="logged-in-div-2">
                                    <Link to="/cart" className="link-properties">
                                        <FaShoppingCart id='FaShoppingCart' />
                                        <div id='nav-cart-count' style={{ display: "none" }}>5</div>
                                    </Link>
                                </li>
                                <li id="logged-in-div-3">
                                    <div id='FaBarsStaggered'><FaBarsStaggered id='FaBarsStaggered' /></div>
                                </li>
                            </div>
                        ) : (
                            <div className="log-in-log-out">
                                <li><Link to="/login" className="link-properties">LOGIN</Link></li>
                                <li>|</li>
                                <li><Link to="/signup" className="link-properties">SIGN UP</Link></li>
                            </div>
                        )}
                    </ul>
                </div>
                <ul className='nav-menu-left'>
                    <li onClick={() => setMenu("HOME")}>
                        <Link className="link-properties" to="/">HOME</Link>
                        {menu === "HOME" && <div className='nav-menu-left-hr-line' style={{ backgroundColor: "red" }}></div>}
                    </li>
                    <li onClick={() => setMenu("PRODUCTS")}>
                        <Link className="link-properties" to="/products">PRODUCTS</Link>
                        {menu === "PRODUCTS" && <div className='nav-menu-left-hr-line' style={{ backgroundColor: "#59adf6" }}></div>}
                    </li>
                    <li onClick={() => setMenu("MEN")}>
                        <Link className="link-properties" to="/category/men">MEN</Link>
                        {menu === "MEN" && <div className='nav-menu-left-hr-line' style={{ backgroundColor: "#5c3c92" }}></div>}
                    </li>
                    <li onClick={() => setMenu("WOMEN")}>
                        <Link className="link-properties" to="/category/women">WOMEN</Link>
                        {menu === "WOMEN" && <div className='nav-menu-left-hr-line' style={{ backgroundColor: "#42d6a4" }}></div>}
                    </li>
                    <li onClick={() => setMenu("KIDS")}>
                        <Link className="link-properties" to="/category/kids">KIDS</Link>
                        {menu === "KIDS" && <div className='nav-menu-left-hr-line' style={{ backgroundColor: "#d9138a" }}></div>}
                    </li>
                    <li onClick={() => setMenu("RETAILER")}>
                        <Link className="link-properties" to="/retailer/login">RETAILER</Link>
                        {menu === "RETAILER" && <div className='nav-menu-left-hr-line' style={{ backgroundColor: "#ffb480" }}></div>}
                    </li>
                    <li onClick={() => setMenu("SHOP")}>
                        <Link className="link-properties" to={"/shop"}>SHOP</Link>
                        {menu === "SHOP" && <div className='nav-menu-left-hr-line' style={{ backgroundColor: "red" }}></div>}
                    </li>
                    <li onClick={() => setMenu("TESTIMONIAL")}>
                        <Link className="link-properties">TESTIMONIAL</Link>
                        {menu === "TESTIMONIAL" && <div className='nav-menu-left-hr-line' style={{ backgroundColor: "#9d94ff" }}></div>}
                    </li>
                    <li onClick={() => setMenu("CONTACT")}>
                        <Link className="link-properties" to="/contact">CONTACT</Link>
                        {menu === "CONTACT" && <div className='nav-menu-left-hr-line' style={{ backgroundColor: "#c780e8" }}></div>}
                    </li>
                </ul>
            </div>
        </>
    );
}
export default Navbar;







