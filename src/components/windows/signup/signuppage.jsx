import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import "./signuppagecss.css";
import { useNavigate } from "react-router-dom";



function SignUp_page({setIsAuthenticated}) {
    // function loginclickeffect(){
    //     console.log("k");
    //     {
    //         const container=document.getElementById("/container");
    //         container.style.backgroundColor="red";
    //         console.log("hi");
    //     }
    // }
    const navigate = useNavigate();
    return (
        <>
            <div id="signup-parentcontainer"></div>
            <div id="signup-container">
                <div id="signupcontainer">
                    <div className="login-class" id="login-class">
                        <button id="toggle-login-button"><Link className="signuplink_properties" to="/login">LOG IN</Link></button>
                    </div>
                    <div id="signupform">
                        <form id="signupformform">
                            <h1>Create Account</h1>
                            <div id="social_media_logo">
                                <Link to="/" href="https://www.google.com/">
                                    <i className="fa-brands fa-square-google-plus" />
                                </Link>
                                <Link to="/" href="https://www.facebook.com/">
                                    <i className="fa-brands fa-square-facebook" />
                                </Link>
                                <Link to="/" href="https://www.github.com/">
                                    <i className="fa-brands fa-square-github" />
                                </Link>
                                <Link to="/" href="https://www.Linkedin.com/">
                                    <i className="fa-brands fa-Linkedin" />
                                </Link>
                            </div>
                            <span>or use your email for registration</span>
                            <input type="text" id="fname" placeholder="First Name" />
                            <input type="text" id="lname" placeholder="Last Name" />
                            <input type="email" placeholder="Email" />
                            <input type="password" placeholder="Password" />
                            <input type="password" placeholder="Confirm Password" />
                            <button id="signup-button">SIGN UP</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignUp_page