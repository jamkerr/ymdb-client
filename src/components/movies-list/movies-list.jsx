import React from "react";
import { useSelector} from "react-redux";
import { MovieCard } from "../movie-card/movie-card";
import { MoviesFilter } from "../movies-filter/movies-filter";
import { Col, Container, Row } from "react-bootstrap";

export function MoviesList() {
    const movies = useSelector((state) => state.movies.list);
    const filter = useSelector((state) => state.movies.filter).trim().toLowerCase();
    const filteredMovies = movies.filter((movie) =>
        movie.Title.toLowerCase().includes(filter)
    );

    return (
        <>
            <Row className='my-2'>
                <Col md={5}>
                    <MoviesFilter />
                </Col>
            </Row>
            <Container>
                <Row>
                    {movies.length === 0 ? (
                        <Row className='main-view'><h2 className='mt-5'>Loading movies...</h2></Row>
                    ) : (
                        filteredMovies.map((movie) => (
                            <Col className='d-flex mb-4' key={movie._id} md={4} xl={3}>
                                <MovieCard movieData={movie} />     
                            </Col>
                        ))
                    )}
                </Row>
            </Container>
        </>
    );
};