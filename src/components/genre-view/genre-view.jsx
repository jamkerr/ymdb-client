import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

import { useSelector } from "react-redux";

import './genre-view.scss';

export function GenreView() {

    const movies = useSelector((state) => state.movies.list);
    let { genreId } = useParams();
    let movieData = movies.find(m => m.Genre.find(g => g._id === genreId));
    const navigate = useNavigate();

    return (
        <Card className='director-view' bg='secondary'>
                <Card.Body className='d-flex flex-column'>
                    <Card.Title className='genre-name'>{movieData.Genre.map(g => g.Name)}</Card.Title>
                    <Card.Text className='genre-description'>{movieData.Genre.map(g => g.Description)}</Card.Text>
                    <Button variant='info' className='mt-2' onClick={() => navigate(-1)}>Back</Button>
                </Card.Body>
        </Card>
    );
}
