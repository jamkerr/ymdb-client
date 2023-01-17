import React, { useEffect } from 'react';
import axios from 'axios';

import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';

import { Row, Col, Container } from 'react-bootstrap';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MoviesList } from '../movies-list/movies-list';
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

    // Use redux toolkit to get state of movies and user
    const movies = useSelector((state) => state.movies.list);
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    // Token is stored in local storage
    const token = localStorage.getItem('token');

    // Use axios to make API call to get movies array. Requires token.
    const getMovies = (token) => {
        axios.get('https://ymdeebee.herokuapp.com/movies', {
            headers: {Authorization: `Bearer ${token}`}
        })
        .then(response => {
            // Assign the movies array to state
            dispatch(setMovies(response.data));
        })
        .catch(error => {
            console.log(error);
        });
    }

    // When logged in, save token to local storage, and set user to state
    const onLoggedIn = (authData) => {
        localStorage.setItem('token', authData.token);
        dispatch(setUser(authData.user));
    }

    // When token changes and exists, use it to get movies
    useEffect(() => {
        if (token !== null) {
            getMovies(token);
        }
    }, [token]);

    return (
        <BrowserRouter>
            <MenuBar />
            <Container>
                <Row className='main-view mx-1'>
                    <Routes>
                        {/* If no user in state, show login page. Otherwise, show the main movies list. */}
                        <Route path='/' element={
                            <>
                            {!user ? (
                                    <LoginView onLoggedIn={authResponse => onLoggedIn(authResponse)} />
                                ) : (
                                    <MoviesList />
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
                                    <RegistrationView />
                                )}
                            </>
                        } />
                        {/* Movie view: show MovieView for a single movie. */}
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