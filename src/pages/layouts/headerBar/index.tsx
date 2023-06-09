import React, { useState } from 'react';
import { Layout, Dropdown, Button, Radio, Space } from 'antd';
import { useAppDispatch } from 'src/redux/hooks';
import { getCyan, getYellow, changeTheme } from 'src/app/themeSlice';

const { Header } = Layout;

const HeaderBar = () => {
    const [value, setValue] = useState('');
    const dispatch = useAppDispatch();

    const handleThemeChange = (e) => {
        setValue(e.target.value)
        dispatch(changeTheme(e.target.value));
    }

    const menuItems = [
        {
            key: '00',
            label:
                <Radio.Group onChange={handleThemeChange} value={value}>
                    <Space direction="vertical">
                        <Radio value='yellow'>黄色</Radio>
                        <Radio value='cyan'>蓝色</Radio>
                    </Space>
                </Radio.Group>
        },
    ]
    return (
        <Header className='header' style={{ backgroundColor: '#999' }}>
            <div className="header-theme">
                <Dropdown menu={{ items: menuItems }}><Button>主题</Button></Dropdown>
            </div>
        </Header>
    )
}

export default HeaderBar;