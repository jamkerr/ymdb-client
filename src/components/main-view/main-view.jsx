import React from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
export class MainView extends React.Component {

    constructor() {
        super();
        this.state = {
            movies: [
                { _id: 1, Title: 'Picnic at Hanging Rock', Description: 'Picnic at Hanging Rock is a 1975 Australian mystery film produced by Hal and Jim McElroy, directed by Peter Weir, and starring Rachel Roberts, Dominic Guard, Helen Morse, Vivean Gray and Jacki Weaver. It was adapted by Cliff Green from the 1967 novel of the same name by Joan Lindsay. The plot involves the disappearance of several schoolgirls and their teacher during a picnic at Hanging Rock, Victoria on Valentine\'s Day in 1900, and the subsequent effect on the local community.', ImagePath: 'https://www.flixster.com/movie/picnic-at-hanging-rock/e1a76f84-53aa-3ddd-a303-68467a97bd2d'},
                { _id: 2, Title: 'The Truman Show', Description: 'The Truman Show is a 1998 American psychological satirical comedy-drama film directed by Peter Weir, produced by Scott Rudin, Andrew Niccol, Edward S. Feldman, and Adam Schroeder, and written by Niccol. The film stars Jim Carrey as Truman Burbank, a man who grew up living an ordinary life that—unbeknownst to him—takes place on a large set populated by actors for a television show about him.', ImagePath: 'https://www.flixster.com/movie/the-truman-show/b3c8ddca-01bf-3f39-a501-e43cc8f0ff75'},
                { _id: 3, Title: 'The Rocky Horror Picture Show', Description: 'The Rocky Horror Picture Show is a 1975 musical comedy horror film by 20th Century Fox, produced by Lou Adler and Michael White and directed by Jim Sharman. The production is a parody tribute to the science fiction and horror B movies of the 1930s through to the early 1960s.', ImagePath: 'https://www.flixster.com/movie/the-rocky-horror-picture-show/0199c2ac-1023-367e-8f58-ff256dc090fc'}
            ],
            selectedMovie: null
        };
    }

    // Helper function to change which movie is selected
    setSelectedMovie(newSelectedMovie) {
        this.setState({
            selectedMovie: newSelectedMovie
        });
    }

    render() {
        const { movies, selectedMovie } = this.state;

        if (movies.length === 0) return <div className='main-view'>The list is empty!</div>

        return (
            <div className='main-view'>
                {selectedMovie
                // if a movie is selected, show MovieView for that movie, make that movieData prop available, and make the onBackClick prop available
                ? <MovieView movieData={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
                // if the selected movie is null, show MovieCards for each movie, make movieData prop available, and make onMovieClick prop available 
                : movies.map(movie => <MovieCard key={movie._id} movieData={movie} onMovieClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie) }} /> )}
            </div>
        );
    }
}