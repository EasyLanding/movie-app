import React, { Component } from 'react';
import './rate.css';
import { Rate } from "antd";
import "antd/dist/antd.css";

export default class RateM extends Component
{
    render ()
    {

        return (
            <div className='rate-movie-cart'>
                <Rate
                    count={ 10 }
                    allowHalf
                    onChange={ (e) => this.props.changeRateMovies(this.props.id) }
                ></Rate>
            </div>
        )
    }
}