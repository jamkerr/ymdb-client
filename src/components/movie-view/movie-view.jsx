import React from 'react';
import { Card, Button, Link } from 'react-bootstrap';
import { useNavigate, useParams, Link } from 'react-router-dom';

import { useSelector } from "react-redux";

import { FavoriteButton } from '../favorite-button/favorite-button';

import './movie-view.scss';
export function MovieView(props) {
    const { favoriteMovies } = props;
    const movies = useSelector((state) => state.movies);
    let { movieId } = useParams();
    let movieData = movies.find(m => m._id === movieId);

    const navigate = useNavigate();

    return (
        <Card className='movie-view' bg='secondary'>
            <Card.Body className='d-flex flex-column align-items-center'>
                <Card.Title className='movie-title'>{movieData.Title}</Card.Title>
                <Card.Text className='movie-description'>{movieData.Description}</Card.Text>
                <Link to={`/directors/${movieData.Director.map(d => d._id)}`}>
                    <Button variant='info'>{movieData.Director.map(d => d.Name)}</Button>
                </Link>
                <Link to={`/genres/${movieData.Genre.map(g => g._id)}`}>
                    <Button variant='info'>{movieData.Genre.map(g => g.Name)}</Button>
                </Link>
                <Card.Img className='movie-image mx-auto' src={movieData.ImageURL}/>
                <FavoriteButton movie={movieData} favoriteMovies={favoriteMovies} />
                <Button variant='info' className='mt-2' onClick={() => navigate(-1)}>Back</Button>
            </Card.Body>
        </Card>
    );
}
