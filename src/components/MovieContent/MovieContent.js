import React, { Component } from 'react';

import MovieDb from '../../services/MovieDB';
import './MovieContent.css'
import ErrorIndicator from '../error-indicator/error-indicator';
import Spinner from '../spinner/Spinner';

import { Pagination } from "antd";
import "antd/dist/antd.css";

import SearchInput from '../searchInput/SearchInput';
import RateM from '../Rate/Rate';
import MovieContentCookie from '../MovieContentCookie/movieContentCookie';
import Genres from '../genres/genres';

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
        warning: false,
        notFound: false,
        searchData: null,
        rate: false,
        movieRated: [],
        tabRated: false
    }

    componentDidMount ()
    {
        this.searchMovie()
    }

    onWarn = () =>
    {
        setTimeout(() =>
        {
            if (this.state.loading)
            {
                this.setState({
                    warning: true,
                });
                if (!this.state.notFound)
                {
                    this.onWarn();
                }
            } else if (!this.state.notFound)
            {
                this.setState({
                    warning: false,
                });
            }
        }, 7000);
    }

    searchMovie = (searchData) =>
    {

        let movieDBSearch = new MovieDb()

        movieDBSearch.getResponseMovieDB(searchData).then((element) =>
        {
            if (!searchData)
            {
                return;
            }

            if (element === undefined || element.results.length === 0)
            {
                this.setState({
                    movieElement: [],
                    notFound: true,
                    loading: true

                })
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
                warning: false,
                error: false,
                loading: false,
                searchData: element
            })

        }).catch((err) =>
        {
            console.log(err);
            this.setState({
                movieElement: [],
                loading: false,
                error: true,
            });
        });
        this.onWarn();
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

    render ()
    {
        const { movieElement, loading, error, current, minIndex, maxIndex, tabRated } = this.state

        //const errorMessage = error ? < ErrorIndicator /> : null;

        const changeRateMovies = this.changeRateMovie
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

                            {

                                error ? < ErrorIndicator /> : loading ? <Spinner /> :
                                    <div className='movieCartConteiner'>
                                        {
                                            <div className="movieCart">
                                                {
                                                    movieElement.map(function (itemTitle, index)
                                                    {
                                                        let maxLength = 28;
                                                        let ShortOverview = itemTitle[1].split(' ');

                                                        const date = new Date(itemTitle[5]);
                                                        const formatDate = format(date, 'MMMM d, Y');
                                                        let finalDate = formatDate;

                                                        //Логика рейтинга(цифры в хедере)
                                                        let ratingColor
                                                        if (itemTitle[3] >= 0 && itemTitle[3] < 3) ratingColor = 'bad';
                                                        if (itemTitle[3] >= 3 && itemTitle[3] < 5) ratingColor = 'not-bad';
                                                        if (itemTitle[3] >= 5 && itemTitle[3] < 7) ratingColor = 'good';
                                                        if (itemTitle[3] >= 7) ratingColor = 'wonderful'

                                                        //Сокращаем дескриптион(описание фильма)
                                                        if (ShortOverview.length >= maxLength)
                                                        {
                                                            ShortOverview.length = maxLength;
                                                            ShortOverview.push('...');
                                                        }
                                                        ShortOverview = ShortOverview.join(' ');

                                                        //логика для пагинации и отрисовка элемента movieCart render
                                                        return index >= minIndex &&
                                                            index < maxIndex && (
                                                                <div key={ itemTitle[4] } className="movieCart-cart">
                                                                    <img className='movieImg' alt={ itemTitle[4] } src={ `https://image.tmdb.org/t/p/original${itemTitle[2]}` } />
                                                                    <div className='movieCart-cart-content'>
                                                                        <div className='movieCart-cart-content-header'>
                                                                            <h2 className='movieHeader'>{ itemTitle[0] }</h2>
                                                                            <div className={ 'movieHeader-rate' + ' ' + ratingColor }>{ itemTitle[3] }</div>
                                                                        </div>
                                                                        <div className="movie-card-date">{ finalDate }</div>
                                                                        <Genres genreIds={ itemTitle[6] } />
                                                                        <p className='movieDescription'>{ ShortOverview }</p>
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