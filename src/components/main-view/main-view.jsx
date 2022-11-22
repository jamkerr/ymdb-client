import React from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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
        this.getMovies(authData.token);
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
            <Row className='main-view g-5'>
                {selectedMovie
                // if a movie is selected, show MovieView for that movie, make that movieData prop available, and make the onBackClick prop available
                ? (
                    <Col>
                        <MovieView movieData={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
                    </Col>
                )
                // if the selected movie is null, show MovieCards for each movie, make movieData prop available, and make onMovieClick prop available 
                : movies.map(movie => (
                    <Col  key={movie._id} md={4}>
                        <MovieCard movieData={movie} onMovieClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie) }} />
                    </Col>
                ))
            }    
            </Row>
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