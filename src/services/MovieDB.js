import React, { Component } from 'react';
import ReactDOM from 'react-dom/client';

export default class MovieDB extends Component
{
    // img = "https://image.tmdb.org/t/p/w500"
    getResponseMovieDB ()
    {
        fetch('https://api.themoviedb.org/3/search/movie?api_key=c8e44c65deebb0118bbf6902d87d51e0&language=en-US&query=return&page=20&include_adult=false')
            .then(function (data)
            {
                if (data.status >= 400 && data.status < 600)
                {
                    throw new Error("Bad response from server");
                }
                return Promise.resolve(data)
            }).then(function (data)
            {
                return data.json()
            }).then(function (dataInfo)
            {
                return dataInfo.results.map((el) =>
                {
                    console.log(el.poster_path)
                })
            }).catch((err) =>
            {
                console.log("Could not fetch", err)
            })

    }
    getResponseMovieDBImg ()
    {

    }
    getResponseMovieDBText ()
    {

    }
    getResponseMovieDBHeader ()
    {

    }
}