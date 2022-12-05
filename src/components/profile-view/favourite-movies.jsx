import React from 'react';
import { Col } from 'react-bootstrap';

import { MovieCard } from '../movie-card/movie-card';

export function FavouriteMovies({ favouriteMoviesList, toggleFavorite, favouriteMovies }) {
    return (
        <div>
            <h2>Favourite Movies</h2>
            {favouriteMoviesList.map(m => (
                <Col key={m._id} md={4}>
                    <MovieCard movieData={m} toggleFavorite={toggleFavorite} favouriteMovies={favouriteMovies} />
                </Col>
            ))}

        </div>
    )
}