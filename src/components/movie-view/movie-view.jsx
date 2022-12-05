import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button, Link } from 'react-bootstrap';

import './movie-view.scss';

export function MovieView(props) {
    const { movieData, onBackClick } = props;
    return (
        <Card className='movie-view' bg='secondary'>
            <Card.Body className='d-flex flex-column'>
                <Card.Title className='movie-title'>{movieData.Title}</Card.Title>
                <Card.Text className='movie-description'>{movieData.Description}</Card.Text>
                <Button variant="link" href={`/directors/${movieData.Director.map(d => d._id)}`}>{movieData.Director.map(d => d.Name)}</Button>
                <Button variant="link" href={`/genres/${movieData.Genre.map(g => g._id)}`}>{movieData.Genre.map(g => g.Name)}</Button>
                <Card.Img className='movie-image mx-auto' src={movieData.ImageURL}/>
                <Button variant='info' className='mt-2' onClick={() => { onBackClick(); }}>Back</Button>
            </Card.Body>
        </Card>
    );
}

MovieView.propTypes = {
    movieData: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        ImageURL: PropTypes.string.isRequired,
        Director: PropTypes.array.isRequired,
        Genre: PropTypes.array.isRequired
    }).isRequired,
    onBackClick: PropTypes.func.isRequired
};