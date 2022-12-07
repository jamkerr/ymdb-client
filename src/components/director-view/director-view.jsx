import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

import './director-view.scss';

export function DirectorView(props) {

    const { movies } = props;
    let { directorId } = useParams();
    let movieData = movies.find(m => m.Director.find(d => d._id === directorId));
    const navigate = useNavigate();

    return (
        <Card className='director-view' bg='secondary'>
                <Card.Body className='d-flex flex-column'>
                    <Card.Title className='director-name'>{movieData.Director.map(d => d.Name)}</Card.Title>
                    <Card.Text className='director-bio'>{movieData.Director.map(d => d.Bio)}</Card.Text>
                    <Button variant='info' className='mt-2' onClick={() => navigate(-1)}>Back</Button>
                </Card.Body>
        </Card>
    );
}

DirectorView.propTypes = {
    movies: PropTypes.shape({
        Director: PropTypes.array.isRequired
    }).isRequired
};