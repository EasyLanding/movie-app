import 'antd/dist/antd.css';
import { Space, Spin } from 'antd';
import React from 'react';
import './Spinner.css';

const Spinner = () => (
    <div className="example">
        <Space size="middle">
            <Spin size="small" />
            <Spin />
            <Spin size="large" />
        </Space>
    </div>
);


export default Spinner;