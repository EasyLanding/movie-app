import React, { Component } from 'react';
import MovieDb from '../../services/MovieDB';
import './MovieContent.css'


export default class MovieContent extends Component
{
    state = {
        movieElement: []
    }
    movieDB = new MovieDb()
    componentDidMount ()
    {
        let elTitle = this.movieDB.getResponseMovieDBAll()
            .then((element) =>
            {
                this.setState({
                    movieElement: element.map(element =>
                    {
                        return [element.title, element.overview, element.poster_path, element.vote_average]
                    }),
                })
            })
    }


    render ()
    {
        const { movieElement } = this.state
        return (
            <div>
                <h1 className='movieCartHeader'>Movie DB</h1>
                <div className="movieCart">
                    { movieElement.map(function (itemTitle)
                    {
                        return <div>
                            <h2 className='movieHeader'>{ itemTitle[0] }</h2>
                            <img className='movieImg' src={ `https://image.tmdb.org/t/p/original${itemTitle[2]}` } />
                            <p className='movieAverage'>{ itemTitle[3] } &#9733;</p>
                            <p className='movieDescription'>{ itemTitle[1] }</p>
                        </div>
                    }) }
                </div>
            </div >
        );
    }
}