import React from 'react';
import NavBar from '/NavBar';

const Order = ({ cart }) => {
    return (
        <div>
            <NavBar />

            <div>
                <h2>Order Page</h2>

                {/* Display Cart Items */}
                <ul>
                    {cart.map((item, index) => (
                        <li key={index}>
                            <h3>{item.title}</h3>
                            <p>Author: {item.author.name}</p>
                            <p>Price: {item.price}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Order;
