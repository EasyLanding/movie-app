import { Component } from 'react';


export default class MovieDB extends Component
{
    searchData = null
    async getResponseMovieDB (searchData)
    {
        this.searchData = searchData
        const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=c8e44c65deebb0118bbf6902d87d51e0&language=en-US&query=${searchData}&include_adult=false`)

        if (!res.ok)
        {
            throw new Error(`Could not fetch ${`https://api.themoviedb.org/3/search/movie?api_key=c8e44c65deebb0118bbf6902d87d51e0&language=en-US&query=${searchData}&include_adult=false`}` + `, received${res.status}`)
        }

        const body = await res.json()

        return body
    }


    async getResponseMovieDBAll ()
    {
        const data = await this.getResponseMovieDB()
        return data.results
    }

    async getResponseGenreMovieDB ()
    {
        const res = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=c8e44c65deebb0118bbf6902d87d51e0`)

        if (!res.ok)
        {
            throw new Error(`Could not fetch ${`https://api.themoviedb.org/3/genre/movie/list?api_key=c8e44c65deebb0118bbf6902d87d51e0`}` + `, received${res.status}`)
        }

        const body = await res.json()

        return body
    }
}






// const movie = new MovieDB()
// movie.getResponseMovieDBAll().then((img) =>
// {
//     img.forEach((el) =>
//     {
//         console.log(el)
//     })
// })
// movie.getResponseGenreMovieDB().then((el) =>
// {
//     console.log(el)
// })