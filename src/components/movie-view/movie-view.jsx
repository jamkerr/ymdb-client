import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'

import './movie-view.scss';

export class MovieView extends React.Component {
    render() {
        const { movieData, onBackClick } = this.props;
        return (
            <Card className='movie-view' bg='secondary'>
                    <Card.Body className='d-flex flex-column'>
                        <Card.Title className='movie-title'>{movieData.Title}</Card.Title>
                        <Card.Text className='movie-description'>{movieData.Description}</Card.Text>
                        <Card.Img crossOrigin="anonymous" className='movie-image mx-auto' src={movieData.ImageURL}/>
                        <Button variant='info' className='mt-2' onClick={() => { onBackClick(null); }}>Back</Button>
                    </Card.Body>
            </Card>
        );
    }
}

MovieView.propTypes = {
    movieData: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        ImageURL: PropTypes.string
    }).isRequired,
    onBackClick: PropTypes.func.isRequired
};