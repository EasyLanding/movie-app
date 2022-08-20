import React from 'react';
import { Alert } from 'antd';
import 'antd/dist/antd.css';
import './error-indicator.css';

const ErrorIndicator = () =>
{
    return (
        <div className="error-indicator">
            <Alert className="error-indicator-text" message="По Вашему запросу ничего не найдено" type="error" />
        </div>
    );
};

export default ErrorIndicator;