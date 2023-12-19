import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import './index.css';
import globals from '../globals'

function FavoriteAuthors() {
    const [authors, setAuthors] = useState([]);
    const [favoriteAuthors, setFavoriteAuthors] = useState([]);

    useEffect(() => {
        // Pobierz wszystkich autorów po załadowaniu komponentu
        fetchAuthors();
    }, []);

    const fetchAuthors = async () => {
        try {
            const response = await fetch(globals.get("backend") + '/author/');
            const data = await response.json();
            setAuthors(data);
        } catch (error) {
            console.error('Error fetching authors:', error);
        }
    };

    const handleFavoriteAuthor = async (authorId) => {
        try {
            // Wyślij zapytanie PATCH, aby oznaczyć autora jako ulubionego
            const response = await fetch(`/api/author/${authorId}?favorite=true`, {
                method: 'PATCH',
            });

            if (response.ok) {
                // Zaktualizuj lokalny stan ulubionych autorów
                setFavoriteAuthors([...favoriteAuthors, authorId]);
            } else {
                console.error('Error adding author to favorites');
            }
        } catch (error) {
            console.error('Error favoriting author:', error);
        }
    };

    return (
        <div>
            <div>
                <h2>Favorite Authors</h2>

                {/* List of Authors */}
                <ul>
                    {authors.map((author) => (
                        <li key={author.id}>
                            <h3>{author.name}</h3>
                            <p>Country: {author.country}</p>
                            <p>Birth Date: {author.birthDate}</p>
                            <button
                                onClick={() => handleFavoriteAuthor(author.id)}
                                disabled={favoriteAuthors.includes(author.id)}
                            >
                                {favoriteAuthors.includes(author.id)
                                    ? 'Favorited'
                                    : 'Favorite'}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default FavoriteAuthors;
