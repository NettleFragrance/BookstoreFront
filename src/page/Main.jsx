import React, { useEffect, useState } from "react";
import './index.css';
import globals from '../globals'

const Main = ({ isLoggedIn }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [books, setMovies] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        // Pobranie wszystkich filmów
        fetchMovies();
    }, []);

    const fetchMovies = async () => {
        try {
            const response = await fetch('/api/movie/');
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
            setBooks(data);
        } catch (error) {
            console.error('Error searching movies:', error);
        }
    };

    const handleAddToCart = (movie) => {
        // Dodaj książkę do koszyka
        setCart([...cart, movie]);
    };

    return (
        <div>
            <div>
                <h2>Welcome to the movie store</h2>

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
                            <p>Director: {movie.author.name}</p>
                            <p>Release Date: {movie.releaseDate}</p>
                            <p>Categories: {movie.categories.map(category => category.name).join(', ')}</p>
                            {isLoggedIn && <button onClick={() => handleAddToCart(movie)}>Add to Cart</button>}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Main;
