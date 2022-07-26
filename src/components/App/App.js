import React from 'react';
import ReactDOM from 'react-dom/client';
import MovieContent from '../MovieContent/MovieContent';
import SearchInput from '../searchInput/SearchInput';

const App = () =>
{
    return (
        <div>
            <SearchInput />
            < MovieContent />
        </div>
    )
};

export default App;