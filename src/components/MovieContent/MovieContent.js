import React, { Component } from 'react';
import MovieDb from '../../services/MovieDB';
import './MovieContent.css'
import ErrorIndicator from '../error-indicator/error-indicator';
import Spinner from '../spinner/Spinner';

export default class MovieContent extends Component
{
    state = {
        movieElement: [],
        loading: true
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
                    })
                })
            }).catch(this.onError)
    }

    onMovieDbLoaded = (movieElement) =>
    {
        this.setState({
            movieElement,
            loading: false,
            error: false
        });
    };

    onError = (err) =>
    {
        this.setState({
            error: true,
            loading: false
        })
    }

    render ()
    {
        const { movieElement, loading, error } = this.state

        const hasData = !(loading || error)

        const errorMessage = error ? < ErrorIndicator /> : null;
        const spinner = loading ? <Spinner /> : null;
        // //onst content = hasData ? <MovieDbView movieElement={ movieElement } /> : null;

        return (
            <div>
                { errorMessage }
                { spinner }
                {
                
                <div> 
                    <h1 className='movieCartHeader'>Movie DB</h1>
                    <div className="movieCart">
                     { 
                        movieElement.map(function (itemTitle)
                        {
                            return <div>
                                    <h2 className='movieHeader'>{ itemTitle[0] }</h2>
                                    <img className='movieImg' src={ `https://image.tmdb.org/t/p/original${itemTitle[2]}` } />
                                    <p className='movieAverage'>{ itemTitle[3] } &#9733;</p>
                                    <p className='movieDescription'>{ itemTitle[1] }</p>
                                </div>
                        }) 
                    }
                    </div>
                </div>   
            }  
            </div>
        );
    }
}

// const MovieDbView = () =>
// {
//     const { movieElement, loading, error } = this.state
//     return (
//         <React.Fragment>
//             <div>
                
//             </div >
//         </React.Fragment>
//     )
// }