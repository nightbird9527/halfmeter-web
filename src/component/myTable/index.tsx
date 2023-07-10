import React from 'react';
import { Table } from 'antd';
import type { TableProps } from 'antd';

interface IHMTableProps extends TableProps<> {
    config?: {}
}

const MyTable: React.FC<IHMTableProps> = () => {
    return <div className='hm-table'>
        123
    </div>
}

export default MyTable;