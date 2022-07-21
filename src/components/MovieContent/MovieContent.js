import React, { Component } from 'react';
import MovieDb from '../../services/MovieDB';


export default class MovieContent extends Component
{
    state = {
        img: null,
        popularity: null,
        text: null,
        title: null
    }
    movieDB = new MovieDb()

    movieTitle = () =>
    {
        this.movieDB.getResponseMovieDBAll().then((el) =>
        {
            return el.forEach((element) =>
            {
                let title = document.title.innerHTML(`<h2>${element.title}</h2>`)
                return title
            })
        })
    }

    render ()
    {
        const { img, popularity, text, title } = this.state
        const { movieTitle } = this.props
        return (
            <div>
                <h1>Movie DB</h1>
                <div className="row mb2">
                    <div className="col-md-6">
                        { movieTitle }
                    </div>
                </div>
            </div >
        );
    }
}