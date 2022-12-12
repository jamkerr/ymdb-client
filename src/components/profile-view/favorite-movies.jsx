import React from 'react';
import { Col } from 'react-bootstrap';

import { MovieCard } from '../movie-card/movie-card';

export function FavoriteMovies(props) {
    let { favoriteMoviesList, favoriteMovies } = props;

    return (
        <>
            <h2>Favorite Movies</h2>
            {favoriteMoviesList.map(m => (
                <Col key={m._id} md={3}>
                    <MovieCard movieData={m} favoriteMovies={favoriteMovies} />
                </Col>
            ))}

        </>
    )
}