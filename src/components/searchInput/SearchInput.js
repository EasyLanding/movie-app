import React, { Component } from 'react';
import './SearchInput.css';
import UseDebounce from '../../hooks/hooks';

export default class SearchInput extends Component
{
    state = {
        value: '',
    };

    onToggleInput = (e) =>
    {
        const inputText = e.target.value;
        this.setState((state) =>
        {
            return {
                value: inputText,
            };
        });
    };

    render ()
    {
        return (
            <div className='searchInput'>
                <span className="icon"><i className="fa fa-search"></i></span>
                <Input
                    text={ this.state.value }
                    onToggleInput={ this.onToggleInput }
                    searchMovie={ this.props.searchMovie }
                />
            </div>
        )
    }
}

function Input ({ text, onToggleInput, searchMovie })
{
    const debounced = UseDebounce(searchMovie, 700);
    return (
        <input
            type={ 'search' }
            className='searchInput-search'
            placeholder="Type to search..."
            value={ text }
            onChange={ (e) =>
            {
                if (e.target.value.charAt(0) === ' ')
                {
                    e.target.value = '';
                }
                onToggleInput(e);
                debounced(e.target.value);
            } }
        />
    );
}
