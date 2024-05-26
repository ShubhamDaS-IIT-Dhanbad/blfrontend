import React, { useState, useEffect } from 'react';
import "./singleShopCss.css";

import { Helmet } from 'react-helmet';

import { useSelector } from 'react-redux';
import SingleShopCard from "../../../components/windows/singleShopCard/singleShopCard.jsx"

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
            <SingleShopCard />
        </div>
    );
};

export default SingleProduct;