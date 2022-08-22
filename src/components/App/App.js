import React, { Component } from 'react';
import MovieContent from '../MovieContent/MovieContent';
import "./App.css"

export default class App extends Component
{
    render ()
    {
        return (
            <div className='conteiner'>
                <div className='img-conteiner'>
                    <img className='left-img-movies' alt="movies" src="./3d_movies_folder_20527.png" />
                    <img className='left-img-movies-plenka' alt="movies" src="./kinoplenka.png" />
                    <img className='left-img-movies-plenka' alt="movies" src="./kinoplenka.png" />
                    <img className='left-img-movies-plenka' alt="movies" src="./kinoplenka.png" />
                    <img className='left-img-movies-plenka' alt="movies" src="./kinoplenka.png" />
                </div>
                < MovieContent />
                <div className='img-conteiner'>
                    <img className='right-img-movies' alt="movies" src="./3d_movies_folder_20527.png" />
                    <img alt="movies" className='right-img-movies-plenka' src="./kinoplenka.png" />
                    <img alt="movies" className='right-img-movies-plenka' src="./kinoplenka.png" />
                    <img alt="movies" className='right-img-movies-plenka' src="./kinoplenka.png" />
                    <img alt="movies" className='right-img-movies-plenka' src="./kinoplenka.png" />
                </div>
            </div>

        )
    }
};