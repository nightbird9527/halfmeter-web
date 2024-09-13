import React from 'react';
import {useThemeStore} from 'src/zustand';
import './index.scss';

const Footer = () => {
  const {themeFlag} = useThemeStore();
  return <div className={`footer ${themeFlag}`}>Footer</div>;
};

export default Footer;
