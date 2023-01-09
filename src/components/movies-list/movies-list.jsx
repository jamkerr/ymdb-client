import React from "react";
import { useSelector} from "react-redux";
import { MovieCard } from "../movie-card/movie-card";
import { MoviesFilter } from "../movies-filter/movies-filter";
import { Col, Row } from "react-bootstrap";

export function MoviesList() {
    const movies = useSelector((state) => state.movies.list);
    const filter = useSelector((state) => state.movies.filter).trim().toLowerCase();
    const filteredMovies = movies.filter((movie) =>
        movie.Title.toLowerCase().includes(filter)
    );

    return (
        <>
            <Row>
                <MoviesFilter />
            </Row>
            <Row>
                {movies.length === 0 ? (
                    <Row className='main-view'><h2 className='mt-5'>Loading movies...</h2></Row>
                ) : (
                    filteredMovies.map((movie) => (
                        <Col key={movie._id} md={4}>
                            <MovieCard movieData={movie} />     
                        </Col>
                    ))
                )}
            </Row>
        </>
    );
};