import React, { useEffect, useState } from "react";
import NavBar from "/NavBar";

const Main = ({ isLoggedIn }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [books, setBooks] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        // Pobierz wszystkie książki po załadowaniu komponentu
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            const response = await fetch('/api/book/');
            const data = await response.json();
            setBooks(data);
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    };

    const handleSearch = async () => {
        try {
            // Wyszukaj książki na podstawie searchTerm
            const response = await fetch(`/api/book/?searchTerm=${searchTerm}`);
            const data = await response.json();
            setBooks(data);
        } catch (error) {
            console.error('Error searching books:', error);
        }
    };

    const handleAddToCart = (book) => {
        // Dodaj książkę do koszyka
        setCart([...cart, book]);
    };

    return (
        <div>
            <NavBar isLoggedIn={isLoggedIn} />

            <div>
                <h2>Main Page</h2>

                {/* Search Bar */}
                <div>
                    <img src="/img/search.png" alt="Search Icon" />
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button onClick={handleSearch}>Search</button>
                </div>

                {/* List of Books */}
                <ul>
                    {books.map((book) => (
                        <li key={book.id}>
                            <h3>{book.title}</h3>
                            <p>Author: {book.author.name}</p>
                            <p>Release Date: {book.releaseDate}</p>
                            <p>Categories: {book.categories.map(category => category.name).join(', ')}</p>
                            <p>Price: {book.price}</p>
                            {isLoggedIn && <button onClick={() => handleAddToCart(book)}>Add to Cart</button>}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Main;
