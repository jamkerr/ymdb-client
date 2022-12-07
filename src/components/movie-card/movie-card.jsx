import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';

import { Link } from 'react-router-dom';

import { FavoriteButton } from '../favorite-button/favorite-button';

import './movie-card.scss';

export function MovieCard(props) {
    const { movieData, favoriteMovies } = props;

    return (
        <Card bg='secondary' className='movie-card h-100'>
            <Card.Img src={movieData.ImageURL} />
            <FavoriteButton movie={movieData} favoriteMovies={favoriteMovies} />
            <Card.Body className='d-flex flex-column'>
                <Card.Title>{movieData.Title}</Card.Title>
                <Link to={`/movies/${movieData._id}`}>
                    <Button className='mt-auto' variant='info'>Open</Button>
                </Link>
            </Card.Body>
        </Card>
    );    
}

MovieCard.propTypes = {
    movieData: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        ImageURL: PropTypes.string
    }).isRequired
};