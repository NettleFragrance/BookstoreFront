import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import './index.css';
import globals from '../globals'

function Orders() {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        // Pobierz wszystkie transakcje po załadowaniu komponentu
        fetchTransactions();
    }, []);

    const fetchTransactions = async () => {
        try {
            const response = await fetch(globals.get("backend") + '/transaction/');
            const data = await response.json();
            setTransactions(data);
        } catch (error) {
            console.error('Error fetching transactions:', error);
        }
    };

    return (
        <div>
            <div>
                <h2>My Orders</h2>

                {/* List of Transactions */}
                <ul>
                    {transactions.map((transaction) => (
                        <li key={transaction.id}>
                            <h3>Transaction ID: {transaction.id}</h3>
                            <p>Confirmed: {transaction.confirmed ? 'Yes' : 'No'}</p>
                            <p>Transaction Date: {transaction.transactionDate}</p>
                            <p>Total Price: {transaction.totalPrice}</p>

                            {/* List of Transaction Elements */}
                            <ul>
                                {transaction.transactionElements.map((element) => (
                                    <li key={element.id}>
                                        <h4>{element.book.title}</h4>
                                        <p>Quantity: {element.quantity}</p>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Orders;
