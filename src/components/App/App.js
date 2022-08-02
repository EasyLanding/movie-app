import React, { Component } from 'react';
import ReactDOM from 'react-dom/client';
import MovieContent from '../MovieContent/MovieContent';

export default class App extends Component
{
    render ()
    {
        return (
            <div>
                < MovieContent />
            </div>
        )
    }
};