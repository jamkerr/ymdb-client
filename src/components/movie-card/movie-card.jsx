import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import './movie-card.scss';

export class MovieCard extends React.Component {
    render() {
        const { movieData, onMovieClick } = this.props;

        return (
            <Card bg='secondary' className='movie-card h-100'>
                <Card.Img src={movieData.ImageURL} />
                <Card.Body className='d-flex flex-column'>
                    <Card.Title>{movieData.Title}</Card.Title>
                    <Button className='mt-auto' variant='info' onClick={() => onMovieClick(movieData)}>Open</Button>
                </Card.Body>
            </Card>
        );
    }
    
}

MovieCard.propTypes = {
    movieData: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        ImageURL: PropTypes.string
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
};