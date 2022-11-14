import React from 'react';

export class MovieView extends React.Component {
    render() {
        const { movieData, onBackClick } = this.props;
        return <div className='movie-view'>
                <div className='movie-title'>{movieData.Title}</div>
                <div className='movie-description'>{movieData.Description}</div>
                <div className='movie-image'>
                    <img src={movieData.ImagePath}/>
                </div>
                {/* If back button is clicked, pass null via onBackClick to selectedMovie state, which switches from MovieView to MovieCard  */}
                <button onClick={() => { onBackClick(null); }}>Back</button>          
            </div>;
    }
}