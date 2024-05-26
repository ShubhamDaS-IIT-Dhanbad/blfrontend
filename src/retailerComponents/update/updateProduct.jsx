import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './updateProductCss.css';

function UpdateProduct({ pinCodes }) {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [discountedPrice, setDiscountedPrice] = useState('');
    const [quantityAvailable, setQuantityAvailable] = useState('');
    const [genderTarget, setGenderTarget] = useState('');
    const [category, setCategory] = useState('');
    const [brand, setBrand] = useState('');
    const [featuredProduct, setFeaturedProduct] = useState(false);
    const [keywords, setKeywords] = useState('');
    const [images, setImages] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:12000/api/v1/product/${id}`);
                const product = response.data;

                setTitle(product.title);
                setDescription(product.description);
                setPrice(product.price);
                setDiscountedPrice(product.discountedPrice);
                setQuantityAvailable(product.quantityAvailable);
                setGenderTarget(product.genderTarget);
                setCategory(product.category.join(', '));
                setBrand(product.brand);
                setFeaturedProduct(product.featuredProduct);
                setKeywords(product.keywords.join(', '));
                setImages(product.images);
            } catch (error) {
                console.error('Failed to fetch product details', error.response);
            }
        };

        fetchProductDetails();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsUploading(true);

        // Construct form data
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('discountedPrice', discountedPrice);
        formData.append('quantityAvailable', quantityAvailable);
        formData.append('genderTarget', genderTarget);
        formData.append('brand', brand);
        if (pinCodes) formData.append('pinCodes', JSON.stringify(pinCodes));
        formData.append('featuredProduct', featuredProduct);
        formData.append('shop', id);

        // Handle categories and keywords
        formData.append('category', category);
        formData.append('keywords', keywords);

        // Append images
        images.forEach((image, index) => {
            formData.append('images', image);
        });

        try {
            const response = await axios.post(`http://localhost:12000/api/v1/product/updateproduct/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Product updated successfully', response.data);
            setShowSuccessAlert(true);
            setIsUploading(false);
        } catch (error) {
            console.error('Failed to update product', error.response);
            setErrorMessage('Failed to update product');
            setIsUploading(false);
        }
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImages(files);
    };

    return (
        <div className="upload-container">
            <form className="upload-form-container" onSubmit={handleSubmit}>
                <div className="form-header">
                    <h1>Update Your Product</h1>
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                    {showSuccessAlert && <div className="success-message">Product updated successfully!</div>}
                </div>
                <div className="form-fields">
                    <div className="set">
                        <div className="pets-name">
                            <label htmlFor="pets-name">Title</label>
                            <input id="pets-name" placeholder="Product Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </div>
                        <div className="pets-photo">
                            <button type="button" id="pets-upload" onClick={() => document.getElementById('file-input').click()}>
                                <i className="fas fa-camera-retro"></i>
                            </button>
                            <label htmlFor="pets-upload">Upload Images</label>
                            <input
                                type="file"
                                id="file-input"
                                style={{ display: 'none' }}
                                onChange={handleImageChange}
                                multiple
                            />
                        </div>
                    </div>
                    <div className="set">
                        <div className="pets-breed">
                            <label htmlFor="pets-breed">Description</label>
                            <textarea id="pets-breed" value={description} onChange={(e) => setDescription(e.target.value)} />
                        </div>
                        <div className="pets-birthday">
                            <label htmlFor="pets-birthday">Quantity Available</label>
                            <input id="pets-birthday" type="number" value={quantityAvailable} onChange={(e) => setQuantityAvailable(e.target.value)} />
                        </div>
                    </div>
                    <div className="set">
                        <div className="pets-gender">
                            <label>Gender Target (optional)</label>
                            <div className="radio-container">
                                <input id="pet-gender-male" type="radio" value="M" name="genderTarget" checked={genderTarget === 'M'} onChange={(e) => setGenderTarget(e.target.value)} />
                                <label htmlFor="pet-gender-male">Male</label>
                                <input id="pet-gender-female" type="radio" value="F" name="genderTarget" checked={genderTarget === 'F'} onChange={(e) => setGenderTarget(e.target.value)} />
                                <label htmlFor="pet-gender-female">Female</label>
                                <input id="pet-gender-any" type="radio" value="any" name="genderTarget" checked={genderTarget === 'any'} onChange={(e) => setGenderTarget(e.target.value)} />
                                <label htmlFor="pet-gender-any">Any</label>
                            </div>
                        </div>
                        <div className="pets-spayed-neutered">
                            <label htmlFor="featuredProduct">Featured Product</label>
                            <div className="checkbox-container">
                                <input id="featuredProduct" name="featuredProduct" type="checkbox" checked={featuredProduct} onChange={(e) => setFeaturedProduct(e.target.checked)} />
                            </div>
                        </div>
                    </div>
                    <div className="set">
                        <div className="pets-breed">
                            <label htmlFor="price">Price</label>
                            <input id="price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
                        </div>
                        <div className="pets-birthday">
                            <label htmlFor="discountedPrice">Discounted Price</label>
                            <input id="discountedPrice" type="number" value={discountedPrice} onChange={(e) => setDiscountedPrice(e.target.value)} />
                        </div>
                    </div>
                    <div className="set">
                        <div className="pets-breed">
                            <label htmlFor="category">Category</label>
                            <input id="category" type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
                        </div>
                        <div className="pets-birthday">
                            <label htmlFor="brand">Brand</label>
                            <input id="brand" type="text" value={brand} onChange={(e) => setBrand(e.target.value)} />
                        </div>
                    </div>
                    <div className="set">
                        <div className="pets-breed">
                            <label htmlFor="keywords">Keywords (comma separated)</label>
                            <input id="keywords" type="text" value={keywords} onChange={(e) => setKeywords(e.target.value)} />
                        </div>
                    </div>
                </div>
                <div className="form-footer">
                    <button type="submit" disabled={isUploading}>
                        {isUploading ? 'Uploading...' : 'Submit'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default UpdateProduct;




