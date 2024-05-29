import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MdOutlineAddLocationAlt } from "react-icons/md";
import "./shopCardCss.css"; // Renamed CSS file

import p1 from "./shopimg.jpeg";

function ShopCard({ shop }) {
    const navigate = useNavigate();

    const redirectToMap = () => {
        const shopLat = shop?.location?.lat; // Latitude
        const shopLon = shop?.location?.lon; // Longitude
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const userLat = position.coords.latitude;
                    const userLon = position.coords.longitude;
                    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${userLat},${userLon}&destination=${shopLat},${shopLon}&travelmode=driving`;
                    window.location.href = googleMapsUrl;
                },
                (error) => {
                    console.error("Error getting location", error);
                    alert("Unable to retrieve your location. Please ensure location services are enabled.");
                }
            );
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    };

    return (
        <div className={`shop-card`}>
             {/* ${shop.shopStatus ? 'shop-card-active' : 'shop-card-inactive'} */}
            <div className="shop-card-top" onClick={() => navigate(`/shop/${shop._id}`)}>
                <img className="shop-card-image" src={shop?.image[0]} alt="Product" />
            </div>
            <div className="shop-card-shop-name-div">
                <span className="shop-card-shop-name">{shop?.shopName?.toUpperCase()}</span>
                <span onClick={redirectToMap} className="shop-card-map-icon">
                    <MdOutlineAddLocationAlt size={25} fontWeight={700} />
                </span>
            </div>
        </div>
    );
}

export default ShopCard;


