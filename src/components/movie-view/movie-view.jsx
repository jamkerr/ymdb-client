import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button, Link } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

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
            <Card.Body className='d-flex flex-column'>
                <Card.Title className='movie-title'>{movieData.Title}</Card.Title>
                <Card.Text className='movie-description'>{movieData.Description}</Card.Text>
                <Button variant="link" href={`/directors/${movieData.Director.map(d => d._id)}`}>{movieData.Director.map(d => d.Name)}</Button>
                <Button variant="link" href={`/genres/${movieData.Genre.map(g => g._id)}`}>{movieData.Genre.map(g => g.Name)}</Button>
                <Card.Img className='movie-image mx-auto' src={movieData.ImageURL}/>
                <FavoriteButton movie={movieData} favoriteMovies={favoriteMovies} />
                <Button variant='info' className='mt-2' onClick={() => navigate(-1)}>Back</Button>
            </Card.Body>
        </Card>
    );
}
