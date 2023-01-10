import React from 'react';
import { Col } from 'react-bootstrap';

import { MovieCard } from '../movie-card/movie-card';

export function FavoriteMovies(props) {
    let { favoriteMoviesList } = props;

    return (
        <>
            <h2>Favorite Movies</h2>
            {favoriteMoviesList.map(m => (
                <Col className='d-flex mb-4' key={m._id} md={3}>
                    <MovieCard movieData={m} />
                </Col>
            ))}
        </>
    )
}