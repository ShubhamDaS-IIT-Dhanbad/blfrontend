import React from 'react';
import { useProductContext } from "../../../redux/actions/productContext.jsx";
import FeaturedProductCard from "./featuredProductCard/featuredProductCard.jsx";
import "./featuredProductCss.css";

function FeaturedBrands() {
    const { isLoading, featuredProducts } = useProductContext();

    return (
        <div className="featured-brands-container">
            <p className="featured-brands-heading">FEATURED PRODUCTS</p>
            <div className="featured-products">
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    featuredProducts.map((product) => (
                        <FeaturedProductCard key={product.id} {...product} />
                    ))
                )}
            </div>
        </div>
    );
}

export default FeaturedBrands;
