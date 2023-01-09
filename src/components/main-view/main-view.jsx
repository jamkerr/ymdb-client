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

import { useSelector, useDispatch } from "react-redux";
import { setMovies } from "../../redux/reducers/movies";
import { setUser } from "../../redux/reducers/user";

import './main-view.scss';

export function MainView () {

    const movies = useSelector((state) => state.movies);
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const token = localStorage.getItem('token');

    const getMovies = (token) => {
        axios.get('https://ymdeebee.herokuapp.com/movies', {
            headers: {Authorization: `Bearer ${token}`}
        })
        .then(response => {
            // Assign the result to state
            dispatch(setMovies(response.data));
        })
        .catch(error => {
            console.log(error);
        });
    }

    const onLoggedIn = (authData) => {
        dispatch(setUser(authData.user));

        localStorage.setItem('token', authData.token);
    }

    useEffect(() => {
        if (token !== null) {
            getMovies(token);
        }
    }, [token]);

    return (
        <BrowserRouter>
            <MenuBar />
            <Container className='mt-5'>
                <Row className='main-view g-5'>
                    <Routes>
                        {/* Card list: Show MovieCards for each movie, make movieData prop available */}
                        <Route path='/' element={
                            <>
                            {!user ? (
                                        <LoginView onLoggedIn={authResponse => onLoggedIn(authResponse)} />
                                    ) : movies.length === 0 ? (
                                        <Row className='main-view'><h2 className='mt-5'>Loading movies...</h2></Row>
                                    ) : (
                                        movies.map(m => (
                                            <Col key={m._id} md={4}>
                                                <MovieCard movieData={m} />
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
                                    <MovieView />
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
                                    <DirectorView />
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
                                    <GenreView />
                                </Col>
                                )}
                            </>
                        } />
                        {/* Profile view */}
                        <Route path='/users/:username' element={
                            <Col>
                                <ProfileView />
                            </Col>
                        } />
                    </Routes>
                </Row>
            </Container>
        </BrowserRouter>
    );

}