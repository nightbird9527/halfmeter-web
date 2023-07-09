import React, { useState } from 'react';
import { Layout, Dropdown, Button, Radio, Space } from 'antd';
import { DownOutlined, BulbFilled } from '@ant-design/icons';
import { useAppDispatch } from 'src/redux/hooks';
import { useNavigate } from "react-router-dom";
import { changeTheme } from 'src/myApp/appSlice';
import { themeConfig } from 'src/constants'

const { Header } = Layout;

const HeaderBar = (props) => {
	const { backGroundColor } = props;
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	// 切换主题
	const handleThemeChange = (theme) => {
		dispatch(changeTheme(theme));
	}

	// 退出登陆
	const handleQuit = () => {
		navigate('/login')
	}

	const themeMenuItems = Object.keys(themeConfig).map((item, index) => {
		return {
			key: index,
			label: <Button type='text' onClick={() => { handleThemeChange(item) }}>{item}</Button>
		}
	})
	const userMenuItems = [
		{
			key: '00',
			label: <Button type='text'>用户资料</Button>
		},
		{
			key: '01',
			label: <Button type='text' onClick={handleQuit}>退出登陆</Button>
		},
	]
	return (
		<Header className='header' style={{ backgroundColor: backGroundColor }}>
			<div className="header-theme">
				<Dropdown menu={{ items: themeMenuItems }} placement="bottomLeft"><Button type='text'><BulbFilled />Theme</Button></Dropdown>
			</div>
			<div className="header-user">
				<Dropdown menu={{ items: userMenuItems }} placement="bottomRight"><Button type='link' size='large'>admin<DownOutlined /></Button></Dropdown>
			</div>
			<div className="header-weather">
				晴
			</div>
		</Header>
	)
}

export default HeaderBar;