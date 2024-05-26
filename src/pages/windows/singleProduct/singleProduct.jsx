import React, { useState, useEffect } from 'react';
import "./singleProductCss.css";

import { Helmet } from 'react-helmet';

import { useSelector } from 'react-redux';
import { fetchProducts } from '..//../../redux/features/products/productSlics.jsx';
import SingleProductCard from "../../../components/windows/singleProductCard/singleProductCard.jsx"

const SingleProduct = () => {
    const { products } = useSelector(state => state.products);
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'instant',
        });
    }, []);

    return (

        <div className="single-product">
            <Helmet>
                <title>Product Page</title>
                <meta name="description" content="Description of your product page" />
            </Helmet>
            <SingleProductCard products={products} />
        </div>
    );
};

export default SingleProduct;