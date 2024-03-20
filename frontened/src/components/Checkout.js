// CheckoutPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
const CheckoutPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
  

    useEffect(() => {
        fetchCartItems();
    }, []);

    useEffect(() => {
        calculateTotalPrice();
    }, [cartItems]);

    const fetchCartItems = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/cart`);
            setCartItems(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const calculateTotalPrice = () => {
        let total = 0;
        cartItems.forEach(item => {
            total += item.productId.price;
        });
        setTotalPrice(total);
    };

    const handleCheckout = async () => {
        try {
            await axios.post(`http://localhost:8080/orders`, { cartItems, totalPrice });
            // Optionally, you can clear the cart after successful checkout
            await axios.delete(`http://localhost:8080/cart`);
            setCartItems([])
        } catch (error) {
            console.error(error);
        }
    };

    return<>
    <Header />
    <div className="container py-5">
            <h1 className="mb-4">Checkout</h1>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div>
                    <ul className="list-group mb-4">
                        {cartItems.map(item => (
                            <li key={item._id} className="list-group-item">
                                <div>
                                    <img
                                        src={`http://localhost:8080${item.productId.imageURL}`}
                                        alt={item.productId.genre}
                                        style={{ width: '100px', height: 'auto', marginRight: '20px' }}
                                    />
                                    <span>{item.productId.title}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <p>Total Price: ${totalPrice}</p>
                    <button className="btn btn-primary ml-19"  onClick={handleCheckout}>Checkout</button>
                </div>
            )}
        </div>
    </>
};

export default CheckoutPage;
