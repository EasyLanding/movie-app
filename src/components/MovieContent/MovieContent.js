import React, { Component } from 'react';

import MovieDb from '../../services/MovieDB';
import './MovieContent.css'
import ErrorIndicator from '../error-indicator/error-indicator';
import Spinner from '../spinner/Spinner';
import SearchInput from '../searchInput/SearchInput';
import RateM from '../Rate/Rate';
import MovieContentCookie from '../MovieContentCookie/movieContentCookie';
import Genres from '../genres/genres';

import { Pagination } from "antd";
import "antd/dist/antd.css";
import { format } from 'date-fns';


const pageSize = 1;

export default class MovieContent extends Component
{
    state = {
        movieElement: [],
        totalPage: 0,
        current: 1,
        minIndex: 0,
        maxIndex: 0,
        error: false,
        loading: false,
        searchData: null,
        rate: false,
        tabRated: false
    }

    componentDidMount ()
    {
        this.searchMovie()
    }

    searchMovie = (searchData) =>
    {
        this.setState({ loading: true })
        let movieDBSearch = new MovieDb()
        movieDBSearch.getResponseMovieDB(searchData).then((element) =>
        {
            if (!searchData)
            {
                this.setState({ loading: false })
                return;
            }
            this.setState({
                movieElement: element.results.map(element =>
                {
                    return [element.title, element.overview, element.poster_path, element.vote_average, element.id, element.release_date, element.genre_ids]
                }),
                totalPage: element.length / pageSize,
                minIndex: 0,
                maxIndex: pageSize,
                error: false,
                loading: false,
                searchData: element
            })

            if (element.results.length === 0)
            {
                this.setState({ error: true })
            }
        }).catch((err) =>
        {
            localStorage.clear()
            console.log(err);
            this.setState({
                movieElement: [],
                loading: false,
                error: true,
            });
        });
    }

    handleChange = (page) =>
    {
        this.setState({
            current: page,
            minIndex: (page - 1) * pageSize,
            maxIndex: page * pageSize
        });
    };

    onSearchChange = (text) =>
    {
        this.setState({ searchData: text })
    }



    setRate = () =>
    {
        this.setState({
            rate: true,
        });
    };

    toggleTabRate = () =>
    {

        this.setState({
            tabRated: true,
        })
    };

    toggleTabSearch = () =>
    {
        this.setState({
            tabRated: false,
        })
    };
    changeRateMovie = (id) =>
    {
        const newArr = this.state.movieElement

        const idx = newArr.findIndex((el) => el[4] === id)

        // localStorage.clear()
        let newArrString = JSON.stringify(newArr[idx])
        localStorage.setItem(1, newArrString)
    };

    shortDescriptionMovie = (item) =>
    {
        let maxLength = 28;
        let ShortOverview = item.split(' ');
        if (ShortOverview.length >= maxLength)
        {
            ShortOverview.length = maxLength;
            ShortOverview.push('...');
        }
        ShortOverview = ShortOverview.join(' ');
        return ShortOverview
    }
    movieRaitingNumber = (item) =>
    {
        let ratingColor
        if (item >= 0 && item < 3) ratingColor = 'bad';
        if (item >= 3 && item < 5) ratingColor = 'not-bad';
        if (item >= 5 && item < 7) ratingColor = 'good';
        if (item >= 7) ratingColor = 'wonderful'
        return ratingColor
    }
    movieDate = (item) =>
    {
        let date = new Date(item);
        const formatDate = format(date, 'MMMM d, Y');
        let finalDate = formatDate;
        return finalDate
    }
    render ()
    {
        const { movieElement, loading, error, current, minIndex, maxIndex, tabRated } = this.state

        const errorMessage = error ? < ErrorIndicator /> : null;

        const changeRateMovies = this.changeRateMovie
        const shortDescriptionMovie = this.shortDescriptionMovie
        const movieRaitingNumber = this.movieRaitingNumber
        const movieDate = this.movieDate

        return (

            < div >
                {
                    tabRated ? <MovieContentCookie
                        toggleTabSearch={ this.toggleTabSearch
                        }
                        toggleTabRate={ this.toggleTabRate }
                    /> :
                        <div className='conteinerDiv'>
                            <div className="movieCartConteinerHeader">
                                <div className="movieCartButton">
                                    <button
                                        className='search-button'
                                        onClick={ this.toggleTabSearch }
                                    >Search</button>
                                    <button
                                        className='rate-button'
                                        onClick={ this.toggleTabRate }
                                    >Rate</button>
                                </div>
                                <SearchInput
                                    searchMovie={ this.searchMovie }
                                />
                                <h1 className='movieCartHeader'>Movie DB</h1>
                            </div>
                            { errorMessage }
                            {
                                loading ? <Spinner /> :
                                    <div className='movieCartConteiner'>
                                        {
                                            <div className="movieCart">
                                                {
                                                    movieElement.map(function (itemTitle, index)
                                                    {
                                                        //логика для пагинации и отрисовка элемента movieCart render
                                                        return index >= minIndex &&
                                                            index < maxIndex && (
                                                                <div key={ itemTitle[4] } className="movieCart-cart">
                                                                    <img className='movieImg' alt={ itemTitle[4] } src={ `https://image.tmdb.org/t/p/original${itemTitle[2]}` } />
                                                                    <div className='movieCart-cart-content'>
                                                                        <div className='movieCart-cart-content-header'>
                                                                            <h2 className='movieHeader'>{ itemTitle[0] }</h2>
                                                                            <div className={ 'movieHeader-rate' + ' ' + movieRaitingNumber(itemTitle[3]) }>{ itemTitle[3] }</div>
                                                                        </div>
                                                                        <div className="movie-card-date">{ movieDate(itemTitle[5]) }</div>
                                                                        <Genres genreIds={ itemTitle[6] } />
                                                                        <p className='movieDescription'>{ shortDescriptionMovie(itemTitle[1]) }</p>
                                                                        <div className='rate-movie-cart'>
                                                                            <RateM
                                                                                id={ itemTitle[4] }
                                                                                changeRateMovies={ changeRateMovies }
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )
                                                    })
                                                }

                                            </div>
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
                }
            </div>
        );
    }
}