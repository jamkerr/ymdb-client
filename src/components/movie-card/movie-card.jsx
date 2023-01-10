import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

import { Link } from 'react-router-dom';

import { FavoriteButton } from '../favorite-button/favorite-button';

import './movie-card.scss';

export function MovieCard(props) {
    const { movieData } = props;

    return (
        <Card bg='dark' className='movie-card'>
            <Card.Body className='d-flex flex-column'>
                <Link to={`/movies/${movieData._id}`} className='movie-details-link'>
                    <Card.Img src={movieData.ImageURL} />
                    <Card.Title className='mt-3 mb-0'>
                        {movieData.Title}
                    </Card.Title>
                </Link>
            </Card.Body>
            <div className='mt-auto m-3'>
                <FavoriteButton movie={movieData} />
            </div>
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