import React from 'react';
import 'antd/dist/antd.css';
import { Pagination } from 'antd';


const PaginationAll = () => <Pagination defaultCurrent={ 1 } total={ 5 } />;

export default PaginationAll;