import React, { useState } from 'react';
import "./retailerProductCardCss.css";
import { useNavigate } from 'react-router-dom';
import Rating from "react-rating-stars-component";
import { FaEye } from "react-icons/fa";
import { MdDeleteSweep } from "react-icons/md";
import axios from 'axios'; // Import axios

function RetailerProductCard({ id, image, title, price }) {
    const navigate = useNavigate();
    const [isDeleting, setIsDeleting] = useState(false); // State for managing the loading state

    const handleDeleteProduct = async () => {
        const confirmDeletion = window.confirm("Are you sure you want to delete this product?");
        if (confirmDeletion) {
            setIsDeleting(true); // Set the loading state to true
            try {
                const response = await axios.post(`https://bharat-lbackend.vercel.app/api/v1/product/deleteproduct/${id}`);
                console.log("Product deleted successfully");
                alert("Product deleted successfully");
            } catch (error) {
                console.error("Error deleting product:", error);
            } finally {
                setIsDeleting(false); // Set the loading state back to false
            }
        }
    };

    return (
        <div className={`retailer-product-card ${isDeleting ? 'deleting' : ''}`}>
            <div className="retailer-product-card-top" onClick={() => navigate(`/retailer/update/${id}`)}>
                <img className="retailer-product-card-top-image" src={image} alt={title} />
            </div>
            <div className='retailer-product-card-bottom'>
                <div className="retailer-product-card-shop-price">
                    <div className='retailer-product-card-shop-name-div'>
                        <span className='retailer-product-card-shop'>
                            <div style={{ display: "flex", gap: "2.9%", alignItems: "center" }}>
                                ₹{price}
                                <FaEye className='faeye' size={19} onClick={() => navigate(`/product/${id}`)} />
                                <MdDeleteSweep className='faeye' size={19} onClick={handleDeleteProduct} />
                            </div>
                            <Rating
                                count={5}
                                size={15}
                                value={4}
                                activeColor="#ffd700"
                                emptyColor="black"
                                edit={true}
                                margin="10px"
                                isHalf={true}
                                emptyIcon={<i className="far fa-star"></i>}
                                halfIcon={<i className="fa fa-star-half-alt"></i>}
                                filledIcon={<i className="fas fa-star"></i>}
                            />
                        </span>
                        <span className='retailer-product-card-shop-name'>{`${title.substr(0, 45)}..`}</span>
                    </div>
                </div>
                <div className="retailer-product-card-shop-detail">
                    <span className="shoe-name"></span>
                </div>
                {isDeleting && <p>Deleting...</p>} {/* Show deleting message */}
            </div>
        </div>
    );
}

export default RetailerProductCard;

