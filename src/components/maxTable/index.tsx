import React from 'react';
import { Table, type TableProps} from 'antd';
import './index.scss'

interface IMaxTableProps extends TableProps<any> {
    bar?: React.ReactNode,
}

const MyTable: React.FC<IMaxTableProps> = (props) => {
    const {bar, ...restProps} = props;

    return <div className='max-table'>
        <div className='max-table-bar'>
            {bar}
        </div>
        <div className='max-table-content'>
            <Table {...restProps}/>
        </div>
    </div>
}

export default MyTable;