import React, {useEffect, useState} from 'react';
import {Dropdown, Switch, Space, Button, theme} from 'antd';
import {BsFillSunFill, BsFillMoonFill} from 'react-icons/bs';
import {FaUserLarge, FaLocationDot, FaTemperatureFull} from 'react-icons/fa6';
import {TiWeatherCloudy} from 'react-icons/ti';
import {useNavigate} from 'react-router-dom';
import {USER_INFO} from 'src/constants';
import {useThemeStore} from 'src/zustand';
import {reqFetchWeather} from 'src/services';
import './index.scss';

const Header = () => {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem(USER_INFO) || '{}');

  // #region 天气查询
  const [weatherInfo, setWeatherInfo] = useState({
    city: '',
    name: '',
    text: '',
    wind: '',
    temp: '',
  });
  const fetchWeather = () => {
    reqFetchWeather()
      .then((res) => {
        const {forecasts, location, now} = res.data.result;
        console.log('forecasts', forecasts);
        // console.log('location', location);
        // console.log('now', now);
        setWeatherInfo({
          city: location.city || '',
          name: location.name || '',
          text: now.text || '',
          wind: `${now.wind_dir} ${now.wind_class}` || '',
          temp: now.temp || '',
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchWeather();
  }, []);
  // #endregion

  // #region 主题切换
  const {themeFlag, setThemeFlag, setAntdToken} = useThemeStore();
  const handleThemeSwitchChange = (checked: boolean) => {
    if (checked) {
      return setThemeFlag('dark'), setAntdToken('dark');
    }
    setThemeFlag('light'), setAntdToken('light');
  };
  const {
    token: {colorPrimary},
  } = theme.useToken();
  // #endregion

  // 用户资料
  const handleUserProfileClick = (e) => {
    if (e) {
      e.preventDefault();
    }
  };

  // 退出登陆
  const handleLogoutClick = (e) => {
    if (e) {
      e.preventDefault();
    }
    setThemeFlag('dark');
    localStorage.removeItem(USER_INFO);
    navigate('/login');
  };

  // 用户下拉框内容
  const userDropDownRender = () => {
    return (
      <div
        className={themeFlag}
        style={{
          padding: '10px 10px',
          borderWidth: '1px',
          borderStyle: 'solid',
          borderRadius: '10px',
        }}
      >
        <Space direction="vertical">
          <Button onClick={handleUserProfileClick}>用户资料</Button>
          <Button onClick={handleLogoutClick}>退出登陆</Button>
        </Space>
      </div>
    );
  };

  return (
    <div className={`header ${themeFlag}`}>
      <div className="header-logo">
        <h1>
          <a href="http://localhost:3000/">半米之内</a>
        </h1>
      </div>
      <div className="header-theme">
        <Switch
          checkedChildren={<BsFillMoonFill color="yellow" />}
          unCheckedChildren={<BsFillSunFill color="yellow" />}
          defaultChecked
          onChange={handleThemeSwitchChange}
        ></Switch>
      </div>
      <div className="header-weather">
        {weatherInfo.city && weatherInfo.name && (
          <span className="header-weather-position">
            <FaLocationDot style={{color: colorPrimary, margin: '0 5px'}} />
            {`${weatherInfo.city} ${weatherInfo.name}`}
          </span>
        )}
        {weatherInfo.text && weatherInfo.wind && (
          <span className="header-weather-detail">
            <TiWeatherCloudy style={{color: colorPrimary, margin: '0 5px'}} />
            {`${weatherInfo.text} ${weatherInfo.wind}`}
          </span>
        )}
        {weatherInfo.temp && (
          <span className="header-weather-temperature">
            <FaTemperatureFull style={{color: colorPrimary, margin: '0 5px'}} />
            {`${weatherInfo.temp}℃`}
          </span>
        )}
      </div>
      <div className="header-user">
        <Dropdown dropdownRender={userDropDownRender} placement="bottom">
          <span className="header-user-detail">
            <FaUserLarge style={{color: colorPrimary, margin: '0 5px'}} />
            {userInfo && userInfo.userName}
          </span>
        </Dropdown>
      </div>
    </div>
  );
};

export default Header;
