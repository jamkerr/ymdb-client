import React from 'react';
import { Col } from 'react-bootstrap';

import { MovieCard } from '../movie-card/movie-card';

export function FavoriteMovies({ favoriteMoviesList, toggleFavorite }) {
    return (
        <div>
            <h2>Favourite Movies</h2>
            {favoriteMoviesList.map(m => (
                <Col key={m._id} md={4}>
                    <MovieCard movie={m} toggleFavorite={toggleFavorite} />
                </Col>
            ))}

        </div>
    )
}