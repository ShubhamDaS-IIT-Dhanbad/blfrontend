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
                            Berhampore, Murshidabad 
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
                    <div className="text">
                    Feel free to contact us   for assistance. 
                    Please understand that as we're in the development phase, 
                    our response time may be delayed.
                    </div>
                </div>
                <div className="col">
                    <div className="title">Our Aim</div>
                    <div className="text">
                    Our aim is to connect and centralize all rural 
                retailer shops so that people can see their products 
                online. This will make it easy for everyone to find 
                shops as well as the products they are selling in their locality.
                    </div>
                </div>
                <div className="col">
                    <div className="title">Suggestion</div>
                    <div className="text">For the best user experience,
                     we recommend using a laptop or PC. If you're using a mobile device,
                      please utilize desktop mode for optimal viewing. Mobile optimization is 
                      currently under development, 
                    and we'll soon be back with a more user-friendly update. Thank you for your understanding!
                    </div>
                </div>
              

            </div>
        </div>
        </>
    );
};

export default Footer;
