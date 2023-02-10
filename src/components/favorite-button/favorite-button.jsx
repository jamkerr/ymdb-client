import React, { useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from "react-redux";

import { favoriteAdded, favoriteRemoved } from '../../redux/reducers/user';

import { Button } from 'react-bootstrap';

import './favorite-button.scss';

export function FavoriteButton(props) {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    let { movie } = props;

    const [favorite, setFavorite] = useState(user.FavoriteMovies.includes(movie._id));

    const token = localStorage.getItem("token");
    const username = user.Username;

    // Favorite and Unfavorite content
    const favIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
    </svg>;
    const unfavIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
    </svg>;



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
            variant="danger"
        >
            {favorite === true ? unfavIcon : favIcon}
        </Button>
    )
}