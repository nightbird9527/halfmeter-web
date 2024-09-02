import React, {useEffect, useState} from 'react';
import {Layout, Dropdown, Switch, Space, Button, theme} from 'antd';
import {BsFillSunFill, BsFillMoonFill} from 'react-icons/bs';
import {FaUserLarge, FaLocationDot, FaTemperatureFull} from 'react-icons/fa6';
import {TiWeatherCloudy} from 'react-icons/ti';
import {useNavigate} from 'react-router-dom';
import constants from 'src/constants';
import {localStore} from 'src/utils';
import {useThemeStore} from 'src/zustand';
import {reqFetchWeather} from 'src/services';
import './index.scss';
import Login from 'src/pages/login';

const {Header} = Layout;
const {USER_INFO} = constants;

interface IHeaderBarProps {
  headerStyle: any;
}
const HeaderBar: React.FC<IHeaderBarProps> = (props) => {
  const {
    headerStyle: {headerBgColor, headerTextColor, headerBorderColor},
  } = props;

  const navigate = useNavigate();
  const {
    token: {colorPrimary},
  } = theme.useToken();
  const userInfo = localStore.get(USER_INFO);
  const setTheme = useThemeStore((state) => state.setTheme);
  const [weatherInfo, setWeatherInfo] = useState({
    city: '',
    name: '',
    text: '',
    wind: '',
    temp: '',
  });

  // 天气查询接口请求函数
  const fetchWeather = () => {
    reqFetchWeather()
      .then((res) => {
        const {
          resOutput: {
            result: {forecasts, location, now},
          },
        } = res;
        console.log('forecasts', forecasts);
        console.log('location', location);
        console.log('now', now);
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

  // 主题开关
  const handleThemeSwitchChange = (checked) => {
    if (checked) {
      return setTheme('dark');
    }
    setTheme('light');
  };

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
    setTheme('dark');
    localStore.remove(USER_INFO);
    navigate('/login');
  };

  // 用户下拉框内容
  const userDropDownRender = () => {
    return (
      <div
        style={{
          padding: '10px 10px',
          backgroundColor: headerBgColor,
          border: `1px solid ${headerBorderColor}`,
          borderRadius: '10px',
        }}
      >
        <Space direction="vertical">
          <Button style={{color: headerTextColor}} onClick={handleUserProfileClick}>
            用户资料
          </Button>
          <Button style={{color: headerTextColor}} onClick={handleLogoutClick}>
            退出登陆
          </Button>
        </Space>
      </div>
    );
  };

  return (
    <Header
      className="header"
      style={{color: headerTextColor, backgroundColor: headerBgColor, borderBottom: `1px solid ${headerBorderColor}`}}
    >
      <div className="header-logo">
        <h1>
          <a href="http://localhost:3000/" style={{color: headerTextColor}}>
            半米之内
          </a>
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
          <span style={{color: headerTextColor}} className="header-user-detail">
            <FaUserLarge style={{color: colorPrimary, margin: '0 5px'}} />
            {userInfo && userInfo.userName}
          </span>
        </Dropdown>
      </div>
    </Header>
  );
};

export default HeaderBar;
