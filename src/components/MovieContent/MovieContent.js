import React, { Component } from 'react';
import MovieDb from '../../services/MovieDB';


export default class MovieContent extends Component
{
    movieDB = new MovieDb()
    render ()
    {
        return (
            <div>
                <h1>Movie DB</h1>
                <div className="row mb2">
                    <div className="col-md-6">
                        <h2>123</h2>
                        <div></div>
                    </div>
                    <div className="col-md-6">
                        <h2>456</h2>
                    </div>
                </div>
            </div >
        );
    }
}