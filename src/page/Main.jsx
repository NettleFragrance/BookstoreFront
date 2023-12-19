import React, { useEffect, useState } from "react";
import './index.css';
import globals from '../globals'

const Main = ({ isLoggedIn }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [movies, setMovies] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        // Pobranie wszystkich filmów
        fetchMovies();
    }, []);

    const fetchMovies = async () => {
        try {
            const response = await fetch(globals.get("backend") + '/movie/');
            const data = await response.json();
            setMovies(data);
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    };

    const handleSearch = async () => {
        try {
            // Wyszukaj filmy na podstawie searchTerm
            const response = await fetch(globals.get("backend") + `/movie/?searchTerm=${searchTerm}`);
            const data = await response.json();
            setMovies(data);
        } catch (error) {
            console.error('Error searching movies:', error);
        }
    };

    const handleAddToCart = async (movie) => {
        try {
            // Tworzenie obiektu JSON zawierającego id filmu i ilość
            const cartItem = {
                movieId: String(movie.id),
                quantity: String(1), // Możesz dostosować ilość według własnych potrzeb
            };

            // Dodaj film do koszyka lokalnego
            setCart([...cart, cartItem]);

            // Wysyłanie obiektu JSON do endpointu /addtotransaction
            await fetch(globals.get("backend") + '/transaction/addtotransaction', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
										"Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify(cartItem),
            });

            console.log('Item added to transaction:', cartItem);
        } catch (error) {
            console.error('Error adding item to transaction:', error);
        }
    };

    return (
        <div>
            <div>
                <h2>Welcome to the movie store!</h2>

                {/* Search Bar */}
                <div>
                    <img src="../img/search.png" alt="Search Icon" />
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button onClick={handleSearch}>Search</button>
                </div>

                {/* List of Movies */}
                <ul>
                    {movies.map((movie) => (
                        <li key={movie.id}>
                            <h3>{movie.title}</h3>
                            <p>Director: {movie.director.name}</p>
                            <p>Release Date: {movie.releaseDate}</p>
                            <p>Categories: {movie.categories.map(category => category.name).join(', ')}</p>
                            {!!localStorage.getItem('token') && <button onClick={() => handleAddToCart(movie)}>Add to Cart</button>}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Main;
