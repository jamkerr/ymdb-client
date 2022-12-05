import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';

import './director-view.scss';

export function DirectorView(props) {
    const { movieData, onBackClick } = props;
    return (
        <Card className='director-view' bg='secondary'>
                <Card.Body className='d-flex flex-column'>
                    <Card.Title className='director-name'>{movieData.Director.map(d => d.Name)}</Card.Title>
                    <Card.Text className='director-bio'>{movieData.Director.map(d => d.Bio)}</Card.Text>
                    <Button variant='info' className='mt-2' onClick={() => { onBackClick(); }}>Back</Button>
                </Card.Body>
        </Card>
    );
}

DirectorView.propTypes = {
    movieData: PropTypes.shape({
        Director: PropTypes.array.isRequired
    }).isRequired,
    onBackClick: PropTypes.func.isRequired
};