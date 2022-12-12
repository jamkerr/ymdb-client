import React, { useState } from 'react';
import axios from 'axios';

import { Button } from 'react-bootstrap';

export function FavoriteButton(props) {
    let { movie, favoriteMovies } = props;

    const [favorite, setFavorite] = useState(favoriteMovies.includes(movie._id));

    const token = localStorage.getItem("token");
    const username = localStorage.getItem("user");

    // Favorite and Unfavorite content
    const favIcon = 'Favorite';
    const unfavIcon = 'Unfavorite';

    const toggleFavorite = async (movieTitle) => {
        // Delete movie if id exists in Favorite movies
        if (favorite === true) {
            try {
                setFavorite((prev) => !prev);
                await axios.delete(`https://ymdeebee.herokuapp.com/users/${username}/favorites/${movieTitle}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            } catch (error) {
                console.error(error, 'Could not remove movie from favorites');
            }
        }
        // Add movie if id does not exist in Favorite movies
        if (favorite === false) {
            try {
                setFavorite((prev) => !prev);
                await axios.put(`https://ymdeebee.herokuapp.com/users/${username}/favorites/${movieTitle}`, {}, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            } catch (error) {
                console.error(error, 'Could not add movie to favorites');
            }
        }
    }

    return (
        <Button
            onClick={() => toggleFavorite(movie.Title)}
            className="favorite-button"
            key={movie._Id}
        >
            {favorite === true ? unfavIcon : favIcon}
        </Button>
    )
}