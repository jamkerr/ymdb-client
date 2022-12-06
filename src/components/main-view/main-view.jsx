import React, { useEffect, useState } from 'react';
import axios from 'axios';

import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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

    const [ movies, setMovies ] = useState([]);
    const [ user, setUser ] = useState('');
    const [ favouriteMovies, setFavouriteMovies ] = useState('');

    // constructor() {
    //     super();
    //     this.state = {
    //         movies: [],
    //         user: null,
    //         favouriteMovies: []
    //     };
    // }

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
        setFavouriteMovies( authData.user.FavoriteMovies );

        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
    }

    useEffect(() => {
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            setUser( localStorage.getItem('user') );
            getMovies(accessToken);
        }
    }, [user]);

    return (
        <Router>
            <MenuBar user={user}></MenuBar>
            <Row className='main-view g-5'>
                {/* Card list: Show MovieCards for each movie, make movieData prop available */}
                <Route exact path='/' render={()=> {
                    if (!user) {
                        return (
                            <LoginView onLoggedIn={user => onLoggedIn(user)} />
                        )
                    } else {
                        if (movies.length === 0) {
                            return <Row className='main-view'><h2 className='mt-5'>Loading movies...</h2></Row>
                        } else {
                            return movies.map(m => (
                                <Col key={m._id} md={4}>
                                    <MovieCard movieData={m} favouriteMovies={favouriteMovies} />
                                </Col>
                            ))
                        }
                    }
                }} />
                {/* Registration view */}
                <Route path='/register' render={() => {
                    if (user) return <Redirect to='/' />
                    return <Col>
                        <RegistrationView />
                    </Col>
                }} />
                {/* Movie view: show MovieView for that movie, make that movieData prop available */}
                <Route path='/movies/:movieId' render={({match, history}) => {
                    if (movies.length === 0) {
                        return <Row className='main-view'></Row>
                    }
                    return <Col>
                        <MovieView
                            movieData={movies.find(m => m._id === match.params.movieId)}
                            onBackClick={() => history.goBack()}
                        />
                    </Col>
                }} />

                {/* Director view */}
                <Route path='/directors/:directorId' render={({match, history}) => {
                    if (movies.length === 0) {
                        return <Row className='main-view'><h2 className='mt-5'>Loading director info...</h2></Row>
                    }
                    return <Col>
                        <DirectorView
                            movieData={movies.find(m => m.Director.find(d => d._id === match.params.directorId))}
                            onBackClick={() => history.goBack()}
                        />
                    </Col>
                }} />
                {/* Genre view */}
                <Route path='/genres/:genreId' render={({match, history}) => {
                    if (movies.length === 0) {
                        return <Row className='main-view'><h2 className='mt-5'>Loading genre info...</h2></Row>
                    }
                    return <Col>
                        <GenreView
                            movieData={movies.find(m => m.Genre.find(g => g._id === match.params.genreId))}
                            onBackClick={() => history.goBack()}
                        />
                    </Col>
                }} />
                {/* Profile view */}
                <Route path='/users/:username' render={({match}) => {
                    return <Col>
                        <ProfileView
                            username={match.params.username}
                            movies={movies}
                        />
                    </Col>
                }} />
            </Row>
        </Router>
    );

}