import React, { useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from "react-redux";

import { favoriteAdded, favoriteRemoved } from '../../redux/reducers/user';

import { Button } from 'react-bootstrap';

export function FavoriteButton(props) {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    let { movie } = props;

    const [favorite, setFavorite] = useState(user.FavoriteMovies.includes(movie._id));

    const token = localStorage.getItem("token");
    const username = user.Username;

    // Favorite and Unfavorite content
    const favIcon = 'Favorite';
    const unfavIcon = 'Unfavorite';

    const toggleFavorite = async () => {
        // Delete movie if id exists in Favorite movies
        if (favorite === true) {
            try {
                setFavorite((prev) => !prev);
                dispatch(favoriteRemoved(movie._id));
                await axios.delete(`https://ymdeebee.herokuapp.com/users/${username}/favorites/${movie.Title}`, {
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
                dispatch(favoriteAdded(movie._id));
                await axios.put(`https://ymdeebee.herokuapp.com/users/${username}/favorites/${movie.Title}`, {}, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            } catch (error) {
                console.error(error, 'Could not add movie to favorites');
            }
        }
    }

    return (
        <Button
            onClick={() => toggleFavorite()}
            className="favorite-button"
            key={movie._Id}
        >
            {favorite === true ? unfavIcon : favIcon}
        </Button>
    )
}