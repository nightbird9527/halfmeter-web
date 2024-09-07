import React, {useState} from 'react';
import {Dropdown, Button, Checkbox, Menu, Divider} from 'antd';
import {FilterOutlined} from '@ant-design/icons';
import {useThemeStore} from '@/zustand';
import './index.scss';

function ColumnOperator({columns}) {
  // 下拉打开/关闭
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // 勾选框状态改变时触发
  const handleGroupChange = (checkedValues: any) => {
    console.log('checked = ', checkedValues);
  };

  // 下拉框渲染内容
  const theme = useThemeStore((state) => state);
  const menuItems = columns?.map((column: any) => {
    return {
      key: column.dataIndex,
      label: <Checkbox value={column.dataIndex}>{column.title}</Checkbox>,
    };
  });
  const dropdownRender = () => {
    return (
      <div style={{border: '1px solid #ccc', borderRadius: '4px', backgroundColor: 'cyan'}}>
        <div style={{width: 'max-content'}}>
          <Checkbox.Group onChange={handleGroupChange}>
            <Menu items={menuItems}></Menu>
          </Checkbox.Group>
        </div>
        <Divider style={{margin: '0'}} />
        <div style={{padding: '8px'}}>
          <Checkbox>Select All</Checkbox>
        </div>
      </div>
    );
  };

  return (
    <div className="column-operator">
      <Dropdown trigger={['click']} open={dropdownOpen} dropdownRender={dropdownRender} onOpenChange={setDropdownOpen}>
        <Button icon={<FilterOutlined />}>列操作</Button>
      </Dropdown>
    </div>
  );
}

export default ColumnOperator;
