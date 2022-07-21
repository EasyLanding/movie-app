import React, { Component } from 'react';

export default class MovieDB extends Component
{
    url = "https://api.themoviedb.org/3/search/movie?api_key=c8e44c65deebb0118bbf6902d87d51e0&language=en-US&query=return&page=20&include_adult=false"
    async getResponseMovieDB ()
    {
        const res = await fetch(`${this.url}`)

        if (!res.ok)
        {
            throw new Error(`Could not fetch ${this.url}` + `, received${res.status}`)
        }

        const body = await res.json()
        return body
    }


    async getResponseMovieDBAll ()
    {
        // const data = this.getResponseMovieDB().then((el) =>
        // {
        //     return el.map((img) =>
        //     {
        //         return img.poster_path
        //     })
        // })
        // return data
        const data = await this.getResponseMovieDB()
        return data.results
    }
    // getResponseMovieDBText ()
    // {
    //     return this.getResponseMovieDB().then((el) =>
    //     {
    //         return el.map((text) =>
    //         {
    //             return text.overview
    //         })
    //     })
    // }
    // getResponseMovieDBHeader ()
    // {
    //     return this.getResponseMovieDB().then((el) =>
    //     {
    //         return el.map((header) =>
    //         {
    //             return header.title
    //         })
    //     })
    // }
    // getResponseMovieDBPopularity ()
    // {
    //     return this.getResponseMovieDB().then((el) =>
    //     {
    //         return el.map((reiting) =>
    //         {
    //             return reiting.popularity
    //         })
    //     })
    // }
}

const movie = new MovieDB()
movie.getResponseMovieDBAll().then((img) =>
{
    img.forEach((el) =>
    {
        console.log(el.poster_path)
    })
})