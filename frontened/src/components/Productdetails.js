// ProductDetail.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { NavLink} from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
const ProductDetail = () => {
    const [product, setProduct] = useState(null);
    const [cartBtn, setCartBtn] = useState("Add to Cart");

   
    const { id } = useParams();

    useEffect(() => {
        fetchProduct();
    }, []);

    const fetchProduct = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/books/${id}`);
            setProduct(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleCart = async () => {
        try {
            if (cartBtn === "Add to Cart") {
                await axios.post(`http://localhost:8080/cart/add`, { productId: id });
               
            } else {
                // Handle remove from cart functionality if needed
            }
        } catch (error) {
            console.error(error);
        }
    };

    if (!product) {
        return <div>Loading...</div>;
    }

    return <>
    <Header/>
    <div className="container py-5">
            <div className="row py-5">
                <div className="col-md-6" style={{ position: 'relative', bottom: '60px' }}>
                    <img
                        src={`http://localhost:8080${product.imageURL}`}
                        style={{ marginTop: '50px' }}
                        alt={product.genre}
                        width="400px"
                        height="500px"
                    />
                </div>
                <div className="col-md-6">
                    <h4 className="text-uppercase text-black-50">{product.genre}</h4>
                    <h1 className="display-5">{product.title}</h1>
                    
                    <h3 className="display-6 fw-bold my-4"> ${product.price}</h3>
                    <p className="lead">{product.description}</p>
                    <button className="btn btn-outline-dark px-4 py-2" onClick={handleCart}>{cartBtn}</button>
                    <NavLink to="/cart" className="btn btn-outline-dark mx-3 px-2 py-2">Go to Cart</NavLink>
                </div>
            </div>
        </div>
    </>
};

export default ProductDetail;
