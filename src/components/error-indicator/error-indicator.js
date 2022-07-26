import React from 'react';
import { Alert } from 'antd';
import 'antd/dist/antd.css';
import './error-indicator.css';
import icon from './death-star.png';

const ErrorIndicator = () =>
{
    return (
        <div className="error-indicator">
            <img src={ icon } alt="error icon" />
            <Alert className="error-indicator-text" message="Упс... Похоже на какие-то не поладки, проверьте подключение интернет" type="error" />
        </div>
    );
};

export default ErrorIndicator;