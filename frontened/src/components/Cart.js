// CartPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import Header from './Header';
const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        fetchCartItems();
    }, []);

    const fetchCartItems = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/cart`);
            setCartItems(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const removeFromCart = async (itemId) => {
        try {
            await axios.delete(`http://localhost:8080/cart/${itemId}`);
            // After deletion, fetch updated cart items
            fetchCartItems();
        } catch (error) {
            console.error(error);
        }
    };

    return <>
    <Header />

    <div className="container py-5">
            <h1 className="mb-4">Cart</h1>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <ul className="list-group">
                    {cartItems.map(item => (
                        <li key={item._id} className="list-group-item d-flex justify-content-between align-items-center">
                            <div>
                                <img
                                    src={`http://localhost:8080${item.productId.imageURL}`}
                                    alt={item.productId.genre}
                                    style={{ width: '100px', height: 'auto', marginRight: '20px' }}
                                />
                                <span>{item.productId.title}</span>
                            </div>
                            <button  className="btn btn-primary" onClick={() => removeFromCart(item._id)}>Remove</button>
                        </li>
                    ))}
                </ul>
            )}
                          {cartItems.length !== 0 ?   <NavLink to='/checkout' style={{position:'relative',top:'50px'}}><button className="btn btn-primary">Checkout</button></NavLink>:''}

        </div>
    </>
};

export default CartPage;
