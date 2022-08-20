import React, { Component } from 'react';
import MovieDb from '../../services/MovieDB';
import './MovieContent.css'
import ErrorIndicator from '../error-indicator/error-indicator';
import Spinner from '../spinner/Spinner';
import { Pagination } from "antd";
import { Rate } from "antd";
import "antd/dist/antd.css";
import SearchInput from '../searchInput/SearchInput';
import Genres from '../genres/genres';
import { format } from 'date-fns';

const pageSize = 2;

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
        searchData: null
    }

    componentDidMount ()
    {
        this.setState({ loading: true })
        let movieDB = new MovieDb()
        movieDB.getResponseMovieDBAll()
            .then((element) =>
            {
                if (!element)
                {
                    return;
                }
                if (element.results === null || element.results.length === 0)
                {
                    this.setState({
                        movieElement: [],
                        notFound: true,
                        loading: false,
                        warning: true,
                    })
                    return;
                }
                this.setState({
                    movieElement: element.map(element =>
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
        this.onWarn()
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
        this.setState({ loading: true })
        let movieDBSearch = new MovieDb()


        movieDBSearch.getResponseGenreMovieDB().then((el) =>
        {
            console.log(el)
        })


        movieDBSearch.getResponseMovieDB(searchData).then((element) =>
        {
            if (!searchData)
            {
                return;
            }
            if (element.results === undefined || element.results.length === 0)
            {
                this.setState({
                    movieElement: [],
                    notFound: true,
                    loading: false,
                    warning: true,
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

    render ()
    {
        const { movieElement, loading, error, current, minIndex, maxIndex } = this.state

        const errorMessage = error ? < ErrorIndicator /> : null;

        return (
            <div className='conteinerDiv'>

                <div className="movieCartConteinerHeader">
                    <div className="movieCartButton">
                        <button className='search-button'>Search</button>
                        <button className='rate-button'>Reate</button>
                    </div>
                    <SearchInput
                        searchMovie={ this.searchMovie }
                    />
                    <h1 className='movieCartHeader'>Movie DB</h1>
                </div>
                { errorMessage }
                {
                    <div className='movieCartConteiner'>
                        {
                            loading ? <Spinner /> :
                                <div className="movieCart">
                                    {
                                        movieElement.map(function (itemTitle, index)
                                        {
                                            let maxLength = 28;
                                            let ShortOverview = itemTitle[1].split(' ');

                                            const date = new Date(itemTitle[5]);
                                            const formatDate = format(date, 'MMMM d, Y');
                                            let finalDate = formatDate;

                                            if (ShortOverview.length >= maxLength)
                                            {
                                                ShortOverview.length = maxLength;
                                                ShortOverview.push('...');
                                            }
                                            ShortOverview = ShortOverview.join(' ');

                                            return index >= minIndex &&
                                                index < maxIndex && (
                                                    <div key={ itemTitle[4] } className="movieCart-cart">
                                                        <img className='movieImg' alt={ itemTitle[4] } src={ `https://image.tmdb.org/t/p/original${itemTitle[2]}` } />
                                                        <div className='movieCart-cart-content'>
                                                            <div className='movieCart-cart-content-header'>
                                                                <h2 className='movieHeader'>{ itemTitle[0] }</h2>
                                                                <div className={ 'movieHeader-rate' }>{ itemTitle[3] }</div>
                                                            </div>
                                                            <div className="movie-card-date">{ finalDate }</div>
                                                            <Genres genreIds={ itemTitle[6] } />
                                                            <p className='movieDescription'>{ ShortOverview }</p>
                                                            <div className='rate-movie-cart'>
                                                                <Rate
                                                                    count={ 10 }
                                                                    allowHalf


                                                                ></Rate>
                                                            </div>
                                                        </div>
                                                    </div>



                                                    // <div className="movies__card movie-card">
                                                    // <img className='movieImg' alt={ itemTitle[4] } src={ `https://image.tmdb.org/t/p/original${itemTitle[2]}` } />
                                                    //     <div className="movie-card__info">
                                                    //         <div className="movie-card__head">
                                                    //         <h2 className="movie-card__title">{ itemTitle[0] }</h2>
                                                    //             {/* <span className={ 'movie-card__head-rate' + ' ' + ratingColor }>{ rating }</span> */}
                                                    //         </div>
                                                    //         {/* <span className="movie-card__release-date">{ finalDate }</span> */}
                                                    //         {/* <div className="movie-card__body-wrapper">
                                                    //             <span className="movie-card__description">{ cutHandler() }</span>
                                                    //             <Rate
                                                    //                 count={ 10 }
                                                    //                 allowHalf
                                                    //                 value={ userRate }
                                                    //                 onChange={ (e) =>
                                                    //                 {
                                                    //                     rate(id, e);
                                                    //                     setRate();
                                                    //                 } }
                                                    //             ></Rate>
                                                    //         </div> */}
                                                    //     </div>
                                                    // </div>
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
        );
    }
}