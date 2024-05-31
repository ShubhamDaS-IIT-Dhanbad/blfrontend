import React, { useState, useRef } from 'react';
import axios from 'axios';
import { FaCloudUploadAlt } from "react-icons/fa";
import './uploadCss.css';

function UploadProduct({ id, pinCodes }) {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        discountedPrice: '',
        quantityAvailable: '',
        genderTarget: '',
        category: '',
        brand: '',
        featuredProduct: false,
        keywords: '',
        images: [],
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        if (type === 'checkbox') {
            setFormData(prevData => ({ ...prevData, [name]: checked }));
        } else if (type === 'file') {
            setFormData(prevData => ({ ...prevData, [name]: Array.from(files) }));
        } else {
            setFormData(prevData => ({ ...prevData, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const {
            title,
            description,
            price,
            discountedPrice,
            quantityAvailable,
            category,
            brand,
            images,
            genderTarget,
            featuredProduct,
            keywords,
        } = formData;

        const mandatoryFields = [title, description, price, discountedPrice, quantityAvailable, category, brand];
        if (mandatoryFields.some(field => !field)) {
            setErrorMessage('Please fill in all mandatory fields.');
            return;
        }

        setIsUploading(true);
        const data = new FormData();
        data.append('title', title);
        data.append('description', description);
        data.append('price', price);
        data.append('discountedPrice', discountedPrice);
        data.append('quantityAvailable', quantityAvailable);
        data.append('genderTarget', genderTarget);
        data.append('brand', brand);
        data.append('featuredProduct', featuredProduct);
        data.append('shop', id);

        pinCodes?.forEach((pincode, index) => {
            data.append(`pinCodes[${index}]`, pincode);
        });

        category?.split(',').forEach((cat, index) => {
            data.append(`category[${index}]`, cat.trim());
        });

        keywords?.split(',').forEach((keyword, index) => {
            data.append(`keyWords[${index}]`, keyword.trim());
        });

        images.forEach((image) => {
            data.append('images', image);
        });

        // Log the form data for debugging
        for (let [key, value] of data.entries()) {
            console.log(key, value);
        }

        try {
            const response = await axios.post(`http://localhost:12000/api/v1/product/addproduct`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setFormData({
                title: '',
                description: '',
                price: '',
                discountedPrice: '',
                quantityAvailable: '',
                genderTarget: '',
                category: '',
                brand: '',
                featuredProduct: false,
                keywords: '',
                images: [],
            });
            setErrorMessage('');
            setShowSuccessAlert(true);
            setTimeout(() => {
                setShowSuccessAlert(false);
            }, 2000);
        } catch (error) {
            console.error('Failed to upload product', error.response);
            setErrorMessage('Failed to upload product. Please try again.');
        } finally {
            setIsUploading(false);
        }
    };

    const { title, description, price, discountedPrice, quantityAvailable, genderTarget, category, brand, featuredProduct, keywords } = formData;
    const fileInputRef = useRef(null);

    const handleClick = () => {
        fileInputRef.current.click();
    };

   
    return (
        <div className="upload-container">
            <form className="row g-3 upload-form-container" onSubmit={handleSubmit}>
                <div className="upload-container-form-div">
                    <header className='upload-container-form-div-header'>
                        <h1>STAND OUT: UPLOAD YOUR PRODUCT LISTING HERE!</h1>
                        {errorMessage && <div className="error-message">{errorMessage}</div>}
                        {showSuccessAlert && <div className="success-message">{alert("Product uploaded successfully!")}</div>}
                        <div className="set">
                            <div className="pets-name">
                                <label htmlFor="pets-name">TITLE</label>
                                <input id="pets-name" placeholder="Product Title" type="text" name="title" value={title} onChange={handleChange} required />
                            </div>
                            <div className="upload-container-photo">
                                <label htmlFor="pets-upload">UPLOAD IMAGES(MAX-5)</label>
                                <FaCloudUploadAlt size={45} className="FaCloudUploadAlt" color='white' onClick={handleClick}/>
                                <input
                                    type="file"
                                    name="images"
                                    ref={fileInputRef}
                                    onChange={handleChange}
                                    multiple
                                    style={{ display: 'none' }}
                                    required
                                />
                            </div>
                        </div>
                        <div className="set">
                            <div className="pets-breed">
                                <label htmlFor="pets-breed">DESCRIPTION</label>
                                <textarea
                                    id="pets-breed"
                                    placeholder="Write description"
                                    name="description"
                                    value={description}
                                    onChange={handleChange}
                                    required
                                    rows="5"
                                    style={{ resize: 'vertical' }}
                                />
                            </div>
                            <div className="pets-birthday">
                                <label htmlFor="pets-birthday">QUANTITY AVAILABLE</label>
                                <input id="pets-birthday" type="number" name="quantityAvailable" value={quantityAvailable} onChange={handleChange} required placeholder="0" />
                            </div>
                        </div>
                        <div className="set">
                            <div className="upload-gender-target">
                                <label htmlFor="pet-gender-female">GENDER TARGET (optional)</label>
                                <div className="upload-gender-target-radio-container">
                                    <input id="pet-gender-male" type="radio" value="M" name="genderTarget" checked={genderTarget === 'M'} onChange={handleChange} />
                                    <label htmlFor="pet-gender-male">Male</label>
                                    <input id="pet-gender-female" type="radio" value="F" name="genderTarget" checked={genderTarget === 'F'} onChange={handleChange} />
                                    <label htmlFor="pet-gender-female">Female</label>
                                    <input id="pet-gender-any" type="radio" value="any" name="genderTarget" checked={genderTarget === 'any'} onChange={handleChange} />
                                    <label htmlFor="pet-gender-any">Any</label>
                                </div>
                            </div>
                            <div className="upload-featured-produt-container">
                            <div className="checkbox-container">
                                    <input id="featuredProduct" name="featuredProduct" type="checkbox" checked={featuredProduct} onChange={handleChange} />
                                </div>
                                <label htmlFor="featuredProduct">FEATURED PRODUCT</label>
                                
                            </div>
                        </div>
                        <div className="set">
                            <div className="pets-breed">
                                <label htmlFor="price">PRICE</label>
                                <input id="price" type="number" placeholder="Price" name="price" value={price} onChange={handleChange} required />
                            </div>
                            <div className="pets-birthday">
                                <label htmlFor="discountedPrice">DISCOUNTED PRICE</label>
                                <input id="discountedPrice" type="number" name="discountedPrice" placeholder="Discounted Price" value={discountedPrice} onChange={handleChange} required />
                            </div>
                        </div>
                        <div className="set">
                            <div className="pets-breed">
                                <label htmlFor="category">CATEGORY (comma seperated)</label>
                                <input id="category" type="text" name="category" value={category} onChange={handleChange} required />
                            </div>
                            <div className="pets-birthday">
                                <label htmlFor="brand">BRAND</label>
                                <input id="brand" type="text" name="brand" value={brand} onChange={handleChange} required />
                            </div>
                        </div>
                        <div className="set">
                            <div className="pets-breed">
                                <label htmlFor="keywords">KEYWORDS (comma separated)</label>
                                <input id="keywords" type="text" name="keywords" value={keywords} onChange={handleChange} />
                            </div>
                        </div>
                    </header>
                    <footer className='upload-footer'>
                        <button type="submit" disabled={isUploading}>{isUploading ? 'Uploading...' : 'Submit'}</button>
                    </footer>
                </div>
            </form>
        </div>
    );
}

export default UploadProduct;
