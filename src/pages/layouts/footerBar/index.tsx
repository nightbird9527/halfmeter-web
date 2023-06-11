import React from 'react';
import { Layout } from 'antd';

const { Footer } = Layout;

const FooterBar = (props) => {
    const {backGroundColor} = props;
    return (
        <Footer style={{ backgroundColor: backGroundColor }}>FooterBar</Footer>
    )
}

export default FooterBar;