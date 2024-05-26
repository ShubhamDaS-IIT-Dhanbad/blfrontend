import React from "react";
import "./footerCss.css";
import { FaLocationArrow, FaMobileAlt, FaEnvelope } from "react-icons/fa";
import Payment from "./payments.png";
const Footer = () => {
    return (
        <>
        <div className="footer">
            <div className="footer-content">
                <div className="col">
                    <div className="title">About Bharat Linker</div>
                    <div className="text">
                    Welcome to Bharat Linker, your one-stop platform 
                    designed specifically for retailers and local shop 
                    owners to seamlessly connect and centralize their 
                    businesses. At Bharat Linker, our mission is to empower 
                    local retailers by bringing their shops online, making 
                    them accessible to the community and beyond.
                    </div>
                </div>
                <div className="col">
                    <div className="title">Contact</div>
                    <div className="c-item">
                        <FaLocationArrow />
                        <div className="text">
                            Berhampore,Murshidabad 
                        </div>
                    </div>
                    <div className="c-item">
                        <FaMobileAlt />
                        <div className="text">Phone: +91 8250846979</div>
                    </div>
                    <div className="c-item">
                        <FaEnvelope />
                        <div className="text">Email: bharatlinker@gmail.com</div>
                    </div>
                    <div className="text">For any problem you are facing free feel to contact us we here to help you out</div>

                </div>
                <div className="col">
                    <div className="title">Categories</div>
                    <span className="text">Headphones</span>
                    <span className="text">Smart Watches</span>
                    <span className="text">Bluetooth Speakers</span>
                    <span className="text">Wireless Earbuds</span>
                    <span className="text">Home Theatre</span>
                    <span className="text">Projectors</span>
                </div>
                <div className="col">
                    <div className="title">Pages</div>
                    <span className="text">Home</span>
                    <span className="text">About</span>
                    <span className="text">Privacy Policy</span>
                    <span className="text">Returns</span>
                    <span className="text">Terms & Conditions</span>
                    <span className="text">Contact Us</span>
                </div>
            </div>
        </div>
        </>
    );
};

export default Footer;
