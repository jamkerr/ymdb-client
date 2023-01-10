import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

import { useSelector } from "react-redux";

import './director-view.scss';

export function DirectorView() {

    const movies = useSelector((state) => state.movies.list);
    let { directorId } = useParams();
    let movieData = movies.find(m => m.Director.find(d => d._id === directorId));
    const navigate = useNavigate();

    return (
        <Card className='director-view' bg='dark'>
            <Card.Body>
                <Card.Title className='director-name'>Director: {movieData.Director.map(d => d.Name)}</Card.Title>
                <Card.Text className='director-bio'>{movieData.Director.map(d => d.Bio)}</Card.Text>
                <Button variant='outline-light' className='mt-2' onClick={() => navigate(-1)}>Back</Button>
            </Card.Body>
        </Card>
    );
}