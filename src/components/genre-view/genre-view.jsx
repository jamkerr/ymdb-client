import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';

import './genre-view.scss';

export function GenreView(props) {
    const { movieData, onBackClick } = props;
    return (
        <Card className='director-view' bg='secondary'>
                <Card.Body className='d-flex flex-column'>
                    <Card.Title className='genre-name'>{movieData.Genre.map(g => g.Name)}</Card.Title>
                    <Card.Text className='genre-description'>{movieData.Genre.map(g => g.Description)}</Card.Text>
                    <Button variant='info' className='mt-2' onClick={() => { onBackClick(); }}>Back</Button>
                </Card.Body>
        </Card>
    );
}

GenreView.propTypes = {
    movieData: PropTypes.shape({
        Genre: PropTypes.array.isRequired
    }).isRequired,
    onBackClick: PropTypes.func.isRequired
};