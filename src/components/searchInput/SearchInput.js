import React, { Component } from 'react';
import './SearchInput.css'
import ErrorIndicator from '../error-indicator/error-indicator';
import Spinner from '../spinner/Spinner';

export default class SearchInput extends Component
{
    render ()
    {
        return (
            <input className='searchInput' />
        )
    }
}
