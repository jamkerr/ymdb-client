import React from 'react';
import axios from 'axios';

import { Button } from 'react-bootstrap';

export function FavoriteButton(props) {
    let { movie, favouriteMovies } = props;

    const isFavorite = favouriteMovies.includes(movie._id);
    const token = localStorage.getItem("token");
    const Username = localStorage.getItem("user");

    // Favorite and Unfavorite content
    const favIcon = 'Favourite';
    const unfavIcon = 'Unfavourite';

    const toggleFavorite = async (movieTitle) => {
        // Delete movie if id exists in Favorite movies
        if (isFavorite === true) {
            try {
                const response = await axios.delete(`https://ymdeebee.herokuapp.com/users/${Username}/favorites/${movieTitle}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            } catch (error) {
                console.error(error, 'Could not remove movie from favorites');
            }
        }
        // Add movie if id does not exist in Favorite movies
        if (isFavorite === false) {
            try {
                const response = await axios.put(`https://ymdeebee.herokuapp.com/users/${Username}/favorites/${movieTitle}`, {}, {
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
            {isFavorite === true ? unfavIcon : favIcon}
        </Button>
    )
}