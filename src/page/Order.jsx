import React, { useState } from 'react';
import './index.css';
import globals from '../globals';

const Order = ({ cart, updateCart }) => {
    const [isRemoving, setIsRemoving] = useState(false);

    const handleRemoveFromTransaction = async (itemId) => {
        try {
            // Usuwanie przedmiot z transakcji za pomocą endpointu /removefromtransaction
            await fetch(globals.get("backend") + `/removefromtransaction/${itemId}`, {
                method: 'DELETE',
            });

            // Aktualizacja koszyka lokalnego po usunięciu
            updateCart();
        } catch (error) {
            console.error('Error removing item from transaction:', error);
        }
    };

    const handleFinalizeTransaction = async () => {
        try {
            // Finalizuj transakcję za pomocą endpointu /finalizetransaction
            await fetch(globals.get("backend") + '/finalizetransaction', {
                method: 'POST',
            });

            // Zaktualizuj koszyk lokalny po finalizacji
            updateCart();
        } catch (error) {
            console.error('Error finalizing transaction:', error);
        }
    };

    return (
        <div>
            <div>
                {cart && cart.length > 0 ? (
                    <div>
                        <ul>
                            {cart.map((item, index) => (
                                <li key={index}>
                                    <h3>{item.title}</h3>
                                    <button
                                        onClick={() => handleRemoveFromTransaction(item.id)}
                                        disabled={isRemoving}
                                    >
                                        {isRemoving ? 'Removing...' : 'Remove'}
                                    </button>
                                </li>
                            ))}
                        </ul>
                        <button onClick={handleFinalizeTransaction} disabled={isRemoving}>
                            {isRemoving ? 'Processing...' : 'Finalize Transaction'}
                        </button>
                    </div>
                ) : (
                    <p>Your cart is empty.</p>
                )}
            </div>
        </div>
    );
};

export default Order;
