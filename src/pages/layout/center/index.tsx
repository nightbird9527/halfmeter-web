import React, {useState, useEffect} from 'react';
import {Link, useLocation, Outlet} from 'react-router-dom';
import {Menu, Breadcrumb} from 'antd';
import {HomeOutlined} from '@ant-design/icons';
import {crumbsMap} from '@/routes';
import {useThemeStore} from '@/zustand';
import routesList from './routesList';
import './index.scss';

const Center = () => {
  const {themeFlag} = useThemeStore();
  const location = useLocation();
  const pathSnippets = location.pathname.split('/').filter((i) => i);

  // #region Menu逻辑
  // 获取menu items
  const getMenuItems = (routesList: any, prePath = '') => {
    return routesList.map((route: any) => {
      const fullPath = `${prePath}/${route.path}`;
      const menuItem: any = {
        key: fullPath,
        label: (
          <Link to={fullPath}>
            <span style={{paddingRight: '10px'}}>{route.icon}</span>
            <span>{route.label}</span>
          </Link>
        ),
      };
      if (route.children) {
        menuItem.children = getMenuItems(route.children, fullPath);
        menuItem.label = (
          <div>
            <span style={{paddingRight: '10px'}}>{route.icon}</span>
            <span>{route.label}</span>
          </div>
        );
      }
      return menuItem;
    });
  };
  const menuItems = getMenuItems(routesList);

  // 选中菜单
  const [selectedMenuKeys, setSelectedMenuKeys] = useState<string[]>([]);
  const handleSelectChange = ({key}) => {
    setSelectedMenuKeys([key]);
  };

  // 子菜单打开/关闭
  const [openedMenuKeys, setOpenedMenuKeys] = useState<string[]>([]);
  const handleOpenChange = (openKeys: string[]) => {
    setOpenedMenuKeys(openKeys);
  };

  useEffect(() => {
    // location改变时激活对应菜单
    setSelectedMenuKeys([location.pathname]);

    // location改变时展开对应菜单
    const currentOpenedKeys = pathSnippets.reduce((prev: string[], curr: string) => {
      if (curr !== pathSnippets[pathSnippets.length - 1]) {
        prev.push(prev.length ? `${prev[prev.length - 1]}/${curr}` : `/${curr}`);
      }
      return prev;
    }, []);
    setOpenedMenuKeys(currentOpenedKeys);
  }, [location]);
  // #endregion

  // #region 面包屑导航
  const breadcrumbItems = pathSnippets.reduce(
    (prev, curr) => {
      const url = prev[prev.length - 1].key === '/' ? `/${curr}` : `${prev[prev.length - 1].key}/${curr}`;
      prev.push({
        key: url,
        title: <Link to={url}>{crumbsMap[url]}</Link>,
      });
      return prev;
    },
    [
      {
        key: '/',
        title: (
          <Link to="/">
            <HomeOutlined />
          </Link>
        ),
      },
    ]
  );
  // #endregion

  return (
    <div className={`center ${themeFlag}`}>
      <div className={`center-sider ${themeFlag}`}>
        <Menu
          mode="inline"
          items={menuItems}
          selectedKeys={selectedMenuKeys}
          onSelect={handleSelectChange}
          openKeys={openedMenuKeys}
          onOpenChange={handleOpenChange}
        />
      </div>
      <div className="center-main">
        <div className={`center-main-breadcrumb ${themeFlag}`}>
          <Breadcrumb items={breadcrumbItems} />
        </div>
        <div className="center-main-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Center;
