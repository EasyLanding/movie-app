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

    render ()
    {
        let newArr = JSON.parse(localStorage.getItem(1))
        const { toggleTabSearch } = this.props
        const { minIndex, maxIndex } = this.state

        let maxLength = 28;
        let ShortOverview = newArr[1].split(' ');

        const date = new Date(newArr[5]);
        const formatDate = format(date, 'MMMM d, Y');
        let finalDate = formatDate;

        //Логика рейтинга(цифры в хедере)
        let ratingColor
        if (newArr[3] >= 0 && newArr[3] < 3) ratingColor = 'bad';
        if (newArr[3] >= 3 && newArr[3] < 5) ratingColor = 'not-bad';
        if (newArr[3] >= 5 && newArr[3] < 7) ratingColor = 'good';
        if (newArr[3] >= 7) ratingColor = 'wonderful'

        //Сокращаем дескриптион(описание фильма)
        if (ShortOverview.length >= maxLength)
        {
            ShortOverview.length = maxLength;
            ShortOverview.push('...');
        }
        ShortOverview = ShortOverview.join(' ');

        return (
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
                        {
                            //логика для пагинации и отрисовка элемента movieCart render                            
                            <div key={ newArr[4] } className="movieCart-cart">
                                <img className='movieImg' alt={ newArr[4] } src={ `https://image.tmdb.org/t/p/original${newArr[2]}` } />
                                <div className='movieCart-cart-content'>
                                    <div className='movieCart-cart-content-header'>
                                        <h2 className='movieHeader'>{ newArr[0] }</h2>
                                        <div className={ 'movieHeader-rate' + ' ' + ratingColor }>{ newArr[3] }</div>
                                    </div>
                                    <div className="movie-card-date">{ finalDate }</div>
                                    <Genres genreIds={ newArr[6] } />
                                    <p className='movieDescription'>{ ShortOverview }</p>
                                    <div className='rate-movie-cart'>
                                        <RateM

                                        />
                                    </div>
                                </div>
                            </div>
                        }

                    </div>
                </div>
            </div>
        )
    }
}