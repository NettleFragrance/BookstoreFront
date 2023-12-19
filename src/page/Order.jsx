import React from 'react';
import NavBar from './NavBar';
import './index.css';
import globals from '../globals'

const Order = ({ cart }) => {
    return (
        <div>
            <div>
                <h2>Order Page</h2>
                {cart ? (
                    <ul>
                        {cart.map((item, index) => (
                            <li key={index}>
                                <h3>{item.title}</h3>
                                <p>Author: {item.author.name}</p>
                                <p>Price: {item.price}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Your cart is empty.</p>
                )}
            </div>
        </div>
    );
};

export default Order;
