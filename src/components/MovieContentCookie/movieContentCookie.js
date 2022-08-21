import React, { Component } from 'react';
import '../MovieContent/MovieContent.css'

export default class MovieContentCookie extends Component
{
    render ()
    {
        const { toggleTabSearch } = this.props
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
            </div>
        )
    }
}