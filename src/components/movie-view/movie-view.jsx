import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'

import './movie-view.scss';

export class MovieView extends React.Component {
    render() {
        const { movieData, onBackClick } = this.props;
        return (
            <Card className='movie-view' bg='secondary'>
                    <Card.Body>
                        <Card.Title className='movie-title'>{movieData.Title}</Card.Title>
                        <Card.Text className='movie-description'>{movieData.Description}</Card.Text>
                        <Card.Img className='movie-image' src={movieData.ImagePath}/>
                        <Button variant='info' onClick={() => { onBackClick(null); }}>Back</Button>
                    </Card.Body>     
            </Card>
        );
    }
}