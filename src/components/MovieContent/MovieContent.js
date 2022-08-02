import React, { Component } from 'react';
import MovieDb from '../../services/MovieDB';
import './MovieContent.css'
import ErrorIndicator from '../error-indicator/error-indicator';
import Spinner from '../spinner/Spinner';
import { Pagination } from "antd";
import "antd/dist/antd.css";
import SearchInput from '../searchInput/SearchInput';

const pageSize = 2;

export default class MovieContent extends Component
{
    state = {
        movieElement: [],
        loading: true,
        totalPage: 0,
        current: 1,
        minIndex: 0,
        maxIndex: 0,
        term: 'Foretop'
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

    onSearchChange = (term) =>
    {
        this.setState({ term })
    }

    search (items, term)
    {
        if (term.length === 0)
        {
            return items;
        }

        return items.map((items) =>
        {
            return items.filter((item) =>
            {
                // if (typeof item === 'string')
                // {
                // console.log(item)
                // return item.indexOf(term.toLowerCase()) > -1;
                //}
            });
        })
    }

    render ()
    {
        const { movieElement, loading, error, current, minIndex, maxIndex, term } = this.state

        const visibleItems = this.search(movieElement, term)
        console.log(visibleItems)

        const errorMessage = error ? < ErrorIndicator /> : null;
        const spinner = loading ? <Spinner /> : null;

        return (
            <div className='conteinerDiv'>
                { errorMessage }
                { spinner }
                <SearchInput
                    onSearchChange={ this.onSearchChange } />
                <div className="movieCartConteinerHeader">
                    <h1 className='movieCartHeader'>Movie DB</h1>
                </div>
                {
                    <div className='movieCartConteiner'>
                        {
                            !(loading || error) ?
                                <div className="movieCart">
                                    {
                                        movieElement.map(function (itemTitle, index)
                                        {
                                            return index >= minIndex &&
                                                index < maxIndex && (<div key={ itemTitle[4] } className="movieCart-cart">
                                                    <img className='movieImg' alt={ itemTitle[4] } src={ `https://image.tmdb.org/t/p/original${itemTitle[2]}` } />
                                                    <div className='movieCart-cart-content'>
                                                        <h2 className='movieHeader'>{ itemTitle[0] }</h2>
                                                        <p className='movieAverage'>{ itemTitle[3] } &#9733;</p>
                                                        <p className='movieDescription'>{ itemTitle[1] }</p>
                                                    </div>
                                                </div>)
                                        })
                                    }
                                </div>
                                : null
                        }
                    </div>
                }
                <div className='paginationConteiner'>
                    <Pagination
                        pageSize={ pageSize }
                        current={ current }
                        total={ movieElement.length }
                        onChange={ this.handleChange }
                        style={ { bottom: "0px" } }
                    />
                </div>
            </div>
        );
    }
}