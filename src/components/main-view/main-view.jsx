import React, { useEffect, useState } from 'react';
import axios from 'axios';

import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';

import { Row, Col, Container } from 'react-bootstrap';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { MenuBar } from '../navbar/navbar';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';


import './main-view.scss';

export function MainView () {

    // const storedUser = JSON.parse(localStorage.getItem('user'));
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');

    const [ movies, setMovies ] = useState([]);
    const [ user, setUser ] =  useState(storedUser ? storedUser : null);
    const [ token, setToken ] = useState(storedToken ? storedToken : null);
    const [ favoriteMovies, setFavoriteMovies ] = useState([]);

    const getMovies = (token) => {
        axios.get('https://ymdeebee.herokuapp.com/movies', {
            headers: {Authorization: `Bearer ${token}`}
        })
        .then(response => {
            // Assign the result to state
            setMovies(response.data);
        })
        .catch(error => {
            console.log(error);
        });
    }

    const onLoggedIn = (authData) => {
        setUser( authData.user.Username );
        setFavoriteMovies( authData.user.FavoriteMovies );

        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);

        setToken(localStorage.getItem('token'));
    }

    useEffect(() => {
        if (token !== null) {
            setUser( localStorage.getItem('user') );
            getMovies(token);
        }
    }, [token]);

    return (
        <BrowserRouter>
            <MenuBar user={user}></MenuBar>
            <Container className='mt-5'>
                <Row className='main-view g-5'>
                    <Routes>
                        {/* Card list: Show MovieCards for each movie, make movieData prop available */}
                        <Route path='/' element={
                            <>
                            {!user ? (
                                        <LoginView onLoggedIn={user => onLoggedIn(user)} />
                                    ) : movies.length === 0 ? (
                                        <Row className='main-view'><h2 className='mt-5'>Loading movies...</h2></Row>
                                    ) : (
                                        movies.map(m => (
                                            <Col key={m._id} md={4}>
                                                <MovieCard movieData={m} favoriteMovies={favoriteMovies} />
                                            </Col>
                                        ))
                                    )                               
                            }
                            </>
                        } />
                        {/* Registration view */}
                        <Route path='/register' element={
                            <>
                                {user ? (
                                    <Navigate to='/' />
                                ) : (
                                    <Col>
                                        <RegistrationView />
                                    </Col>
                                )}
                            </>
                        } />
                        {/* Movie view: show MovieView for that movie, make that movieData prop available */}
                        <Route path='/movies/:movieId' element={
                            <>
                                { movies.length === 0 ? (
                                    <Row className='main-view'></Row>
                                ) : (
                                <Col>
                                    <MovieView
                                        movies={movies}
                                    />
                                </Col>
                                )}
                            </>
                        } />

                        {/* Director view */}
                        <Route path='/directors/:directorId' element={
                            <>
                                { movies.length === 0 ? (
                                    <Row className='main-view'><h2 className='mt-5'>Loading director info...</h2></Row>
                                ) : (
                                <Col>
                                    <DirectorView
                                        movies={movies}
                                    />
                                </Col>
                                )}
                            </>
                        } />
                        {/* Genre view */}
                        <Route path='/genres/:genreId' element={
                            <>
                                { movies.length === 0 ? (
                                    <Row className='main-view'><h2 className='mt-5'>Loading genre info...</h2></Row>
                                ) : (
                                <Col>
                                    <GenreView
                                        movies={movies}
                                    />
                                </Col>
                                )}
                            </>
                        } />
                        {/* Profile view */}
                        <Route path='/users/:username' element={
                            <Col>
                                <ProfileView
                                    movies={movies}
                                />
                            </Col>
                        } />
                    </Routes>
                </Row>
            </Container>
        </BrowserRouter>
    );

}