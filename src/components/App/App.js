import React, { Component } from 'react';
import MovieContent from '../MovieContent/MovieContent';
import "./App.css"

export default class App extends Component
{
    render ()
    {
        return (
            <div className='conteiner'>
                < MovieContent />
            </div>

        )
    }
};