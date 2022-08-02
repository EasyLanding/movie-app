import React, { Component } from 'react';
import './SearchInput.css';


export default class SearchInput extends Component
{
    state = {
        value: '',
        setValue: ''
    }


    render ()
    {
        return (
            <div className='searchInput'>
                <span class="icon"><i class="fa fa-search"></i></span>
                <input
                    onChange={ (e) => console.log(e.target.value) }
                    placeholder="input search text"
                    className='searchInput-search'
                />
            </div>
        )
    }
}
