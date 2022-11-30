import React from 'react';
import axios from 'axios';

import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

import './main-view.scss';

export class MainView extends React.Component {

    constructor() {
        super();
        this.state = {
            movies: [],
            selectedMovie: null,
            user: null,
            registered: null
        };
    }

    // Helper function to change which movie is selected
    setSelectedMovie(newSelectedMovie) {
        this.setState({
            selectedMovie: newSelectedMovie
        });
    }

    getMovies(token) {
        axios.get('https://ymdeebee.herokuapp.com/movies', {
            headers: {Authorization: `Bearer ${token}`}
        })
        .then(response => {
            // Assign the result to state
            this.setState({
                movies: response.data
            });
        })
        .catch(error => {
            console.log(error);
        });
    }

    onLoggedIn(authData) {
        console.log(authData);
        this.setState({
            user: authData.user.Username
        });

        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        // this.getMovies(authData.token);
    }

    onLoggedOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.setState({
            user: null
        });
    }

    onRegistered(registered) {
        this.setState({
            registered
        });
    }

    render() {
        const { movies, selectedMovie, user, registered } = this.state;

        if (!registered) return <RegistrationView onRegistered={registered => this.onRegistered(registered)} />;

        if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

        if (movies.length === 0) return <Row className='main-view' />

        return (
            <Router>
                <Button onClick={() => { this.onLoggedOut() }}>Sign out</Button>
                <Row className='main-view g-5'>
                    {/* Show MovieCards for each movie, make movieData prop available */}
                    <Route exact path='/' render={()=> {
                        return movies.map(m => (
                            <Col key={m._id} md={4}>
                                <MovieCard movieData={m} />
                            </Col>
                        ))
                    }} />
                    {/* show MovieView for that movie, make that movieData prop available */}
                    <Route path='/movies/:movieId' render={({match, history}) => {
                        return <Col>
                            <MovieView movieData={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
                        </Col>
                    }} />
                </Row>
            </Router>
        );
    }

    componentDidMount(){
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            this.setState({
                user: localStorage.getItem('user')
            });
            this.getMovies(accessToken);
        }
    }
}