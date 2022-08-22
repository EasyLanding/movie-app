import React, { Component } from 'react';
import '../MovieContent/MovieContent.css'
import RateM from '../Rate/Rate';
import Genres from '../genres/genres';
import { format } from 'date-fns';


export default class MovieContentCookie extends Component
{
    state = {
        minIndex: 0,
        moviesRated: [],
        maxIndex: 0
    }
    storageRaitingNumber = (item) =>
    {
        let ratingColor
        if (item >= 0 && item < 3) ratingColor = 'bad';
        if (item >= 3 && item < 5) ratingColor = 'not-bad';
        if (item >= 5 && item < 7) ratingColor = 'good';
        if (item >= 7) ratingColor = 'wonderful'
        return ratingColor
    }
    storageShortDescription = (item) =>
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
    storageDate = (item) =>
    {
        let date = new Date(item);
        const formatDate = format(date, 'MMMM d, Y');
        let finalDate = formatDate;
        return finalDate
    }

    render ()
    {
        let newArr = JSON.parse(localStorage.getItem(1))
        const { toggleTabSearch } = this.props

        return (
            <div>
                {
                    localStorage.length > 0 ?
                        <div className='conteinerDiv'>
                            <div className="movieCartConteinerHeader">
                                <div className="movieCartButton">
                                    <button
                                        className='search-button'
                                        onClick={ toggleTabSearch }
                                    >Search</button>
                                    <button
                                        className='rate-button'
                                    >Rate</button>
                                </div>
                            </div>

                            <div className='movieCartConteiner'>
                                <div className="movieCart">
                                    <div key={ newArr[4] } className="movieCart-cart">
                                        <img className='movieImg' alt={ newArr[4] } src={ `https://image.tmdb.org/t/p/original${newArr[2]}` } />
                                        <div className='movieCart-cart-content'>
                                            <div className='movieCart-cart-content-header'>
                                                <h2 className='movieHeader'>{ newArr[0] }</h2>
                                                <div className={ 'movieHeader-rate' + ' ' + this.storageRaitingNumber(newArr[3]) }>{ newArr[3] }</div>
                                            </div>
                                            <div className="movie-card-date">{ this.storageDate(newArr[5]) }</div>
                                            <Genres genreIds={ newArr[6] } />
                                            <p className='movieDescription'>{ this.storageShortDescription(newArr[1]) }</p>
                                            <div className='rate-movie-cart'>
                                                <RateM

                                                />
                                            </div>
                                        </div>
                                    </div>


                                </div>
                            </div>
                        </div>

                        : <div className='conteinerDiv'>
                            <div className="movieCartConteinerHeader">
                                <div className="movieCartButton">
                                    <button
                                        className='search-button'
                                        onClick={ toggleTabSearch }
                                    >Search</button>
                                    <button
                                        className='rate-button'
                                    >Rate</button>
                                </div>
                            </div>
                        </div>
                }
            </div>
        )
    }
}