import React from 'react';
import './bannerCss.css';


const Banner = ({ imageUrl, title, subtitle }) => {
    return (
        <div className="banner-container">
            <img src={imageUrl} alt="Banner" className="banner-image" />
            <div className="banner-content">
                <h1 className="banner-title">{title}</h1>
                <p className="banner-subtitle">{subtitle}</p>
            </div>
        </div>
    );
};
export default Banner;
