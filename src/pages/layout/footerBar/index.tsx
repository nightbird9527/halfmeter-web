import React from 'react';
import { Layout } from 'antd';
import "./index.scss"

const { Footer } = Layout;

interface IFooterBarProps {
    footerStyle: any
}
const FooterBar: React.FC<IFooterBarProps> = (props) => {
    const { footerStyle } = props;
    const {footerBgColor, footerBorderColor} = footerStyle;
    return (
        <Footer className='footer' style={{backgroundColor: footerBgColor, borderTop: `1px solid ${footerBorderColor}`}}>FooterBar</Footer>
    )
}

export default FooterBar;