import 'antd/dist/antd.css';
import { Spin } from 'antd';
import React from 'react';
import './Spinner.css';

const Spinner = () => (
    <div className="example">

        <Spin size="large" tip="Loading..." />

    </div>
);


export default Spinner;