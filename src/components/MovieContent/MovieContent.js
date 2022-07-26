import React, { Component } from 'react';
import MovieDb from '../../services/MovieDB';
import './MovieContent.css'
import ErrorIndicator from '../error-indicator/error-indicator';
import Spinner from '../spinner/Spinner';
import { Pagination } from "antd";
import "antd/dist/antd.css";

const pageSize = 6;

export default class MovieContent extends Component
{
    state = {
        movieElement: [],
        loading: true,
        totalPage: 0,
        current: 1,
        minIndex: 0,
        maxIndex: 0
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
                        return [element.title, element.overview, element.poster_path, element.vote_average, element.id]
                    }),
                    totalPage: element.length / pageSize,
                    minIndex: 0,
                    maxIndex: pageSize
                })
            }).then(this.onMovieDbLoaded).catch(this.onError)
    }

    onMovieDbLoaded = () =>
    {
        this.setState({
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

    handleChange = (page) =>
    {
        this.setState({
            current: page,
            minIndex: (page - 1) * pageSize,
            maxIndex: page * pageSize
        });
    };

    render ()
    {
        const { movieElement, loading, error, current, minIndex, maxIndex } = this.state

        const errorMessage = error ? < ErrorIndicator /> : null;
        const spinner = loading ? <Spinner /> : null;

        return (
            <div>
                { errorMessage }
                { spinner }
                {
                    <div>
                        <h1 className='movieCartHeader'>Movie DB</h1>

                        {
                            !(loading || error) ?
                                <div className="movieCart">
                                    {
                                        movieElement.map(function (itemTitle, index)
                                        {
                                            return index >= minIndex &&
                                                index < maxIndex && (<div key={ itemTitle[4] }>
                                                    <h2 className='movieHeader'>{ itemTitle[0] }</h2>
                                                    <img className='movieImg' src={ `https://image.tmdb.org/t/p/original${itemTitle[2]}` } />
                                                    <p className='movieAverage'>{ itemTitle[3] } &#9733;</p>
                                                    <p className='movieDescription'>{ itemTitle[1] }</p>
                                                </div>)
                                        })
                                    }
                                </div>
                                : null
                        }
                    </div>
                }
                <Pagination
                    pageSize={ pageSize }
                    current={ current }
                    total={ movieElement.length }
                    onChange={ this.handleChange }
                    style={ { bottom: "0px" } }
                />
            </div>
        );
    }
}