import React from 'react';
import { Layout, Dropdown, Button } from 'antd';
import { DownOutlined, BulbFilled } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import { USER_INFO, themeConfig } from 'src/constants'
import {localStore} from 'src/utils'

const { Header } = Layout;

const HeaderBar = () => {
	const navigate = useNavigate();
	const userInfo = localStore.get(USER_INFO);

	// 切换主题
	const handleThemeChange = (item) => {
		console.log(item);
	}

	// 退出登陆
	const handleQuit = () => {
		localStore.remove(USER_INFO)
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
		<Header className='header'>
			<div className="header-theme">
				<Dropdown menu={{ items: themeMenuItems }} placement="bottomLeft"><Button type='text'><BulbFilled />Theme</Button></Dropdown>
			</div>
			<div className="header-user">
				<Dropdown menu={{ items: userMenuItems }} placement="bottomRight"><Button type='link' size='large'>{userInfo.user_name}<DownOutlined /></Button></Dropdown>
			</div>
			<div className="header-weather">
				晴
			</div>
		</Header>
	)
}

export default HeaderBar;