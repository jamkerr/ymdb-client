import React from 'react';

export class MovieView extends React.Component {
    render() {
        const { movieData } = this.props;
        return <div className='movie-view'>
                <div className='movie-title'>{movieData.Title}</div>
                <div className='movie-description'>{movieData.Description}</div>
                <div className='movie-image'>
                    <img src={movieData.ImagePath}/>
                </div>          
            </div>;
    }
}