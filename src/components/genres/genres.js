import React, { Component } from 'react';
import MovieDb from '../../services/MovieDB';
import './genres.css'

export default class Genres extends Component
{
    state = {
        genreList: []
    }
    componentDidMount ()
    {
        let movieDB = new MovieDb()
        movieDB.getResponseGenreMovieDB().then((res) =>
        {
            const newArr = [...res.genres];
            this.setState({
                genreList: newArr,
            });
        })
    }


    render ()
    {
        const { genreIds } = this.props
        const { genreList } = this.state

        return (
            <div className="movie-card-genre-conteiner">{
                genreList.map((genre) =>
                {
                    let genreNames
                    genreIds.forEach((genreId) =>
                    {
                        if (genre.id === genreId)
                        {
                            genreNames = genre.name
                        }
                    })
                    if (genreNames)
                    {
                        return (
                            <div key={ genre.id } className="movie-card-genre">
                                { genreNames }
                            </div>
                        );
                    }
                })
            }
            </div>
        );
    }
}