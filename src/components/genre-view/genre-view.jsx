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
        <Card className='director-view' bg='dark'>
                <Card.Body className='px-5 pb-4'>
                    <Card.Title className='genre-name'>Genre: {movieData.Genre.map(g => g.Name)}</Card.Title>
                    <Card.Text className='genre-description'>{movieData.Genre.map(g => g.Description)}</Card.Text>
                    <Button variant='outline-light' className='mt-2' onClick={() => navigate(-1)}>Back</Button>
                </Card.Body>
        </Card>
    );
}
