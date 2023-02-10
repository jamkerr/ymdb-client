import React from 'react';
import { Card, Button, Link, Badge } from 'react-bootstrap';
import { useNavigate, useParams, Link } from 'react-router-dom';

import { useSelector } from "react-redux";

import { FavoriteButton } from '../favorite-button/favorite-button';

import './movie-view.scss';
export function MovieView() {
    const navigate = useNavigate();

    const movies = useSelector((state) => state.movies.list);
    let { movieId } = useParams();
    // Find movie data that matches particular movie
    let movieData = movies.find(m => m._id === movieId);

    return (
        <Card className='movie-view' bg='dark'>
            <Card.Body className='d-flex flex-column align-items-center'>
                <Card.Title className='movie-title'>{movieData.Title}</Card.Title>
                <div className='d-flex gap-2 mb-2'>
                    <Link to={`/directors/${movieData.Director.map(d => d._id)}`}>
                        <Badge pill bg="light" text="dark">{movieData.Director.map(d => d.Name)}</Badge>
                    </Link>
                    <Link to={`/genres/${movieData.Genre.map(g => g._id)}`}>
                        <Badge pill bg="light" text="dark">{movieData.Genre.map(g => g.Name)}</Badge>
                    </Link>
                </div>
                <Card.Text className='movie-description px-5'>{movieData.Description}</Card.Text>
                <Card.Img className='movie-image mx-auto' src={movieData.ImageURL}/>
                <div className='d-flex gap-2 m-2 align-items-center'>
                    <Button variant='outline-light' className='mt-2' onClick={() => navigate(-1)}>Back</Button>
                    <FavoriteButton movie={movieData} />
                </div>
            </Card.Body>
        </Card>
    );
}
