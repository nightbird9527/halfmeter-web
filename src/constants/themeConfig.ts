import {theme} from 'antd';
import {IThemeConfig, ITheme} from './interface'

const {darkAlgorithm} = theme;

const themeConfig: IThemeConfig<ITheme> = {
    dark: {
        antdTheme: {
            token: {
                colorPrimary: '#F8AC75',
                colorPrimaryBg: '#F8AC75'
            },
            algorithm: darkAlgorithm,
        },
        headerStyle: {
            headerBgColor: '#242525',
            headerTextColor: '#ffffff',
            headerBorderColor: '#333333',
        },
        siderStyle: {
            siderBgColor: '#242525',
            siderTextColor: '#ffffff',
            siderBorderColor: '#333333',
        },
        contentStyle: {
            contentBgColor: '#242525',
            contentTextColor: '#ffffff',
        },
        footerStyle: {
            footerBgColor: '#242525',
            footerTextColor: '#ffffff',
            footerBorderColor: '#333333'
        },
    },
    light: {
        antdTheme: {
            token: {
                colorPrimary: '#5FE5F5',
                colorPrimaryBg: '#5FE5F5'
            },
        },
        headerStyle: {
            headerBgColor: '#ffffff',
            headerTextColor: '#000000',
            headerBorderColor: '#dddddd',
        },
        siderStyle: {
            siderBgColor: '#ffffff',
            siderTextColor: '#000000',
            siderBorderColor: '#dddddd',
        },
        contentStyle: {
            contentBgColor: '#ffffff',
            contentTextColor: '#000000',
        },
        footerStyle: {
            footerBgColor: '#ffffff',
            footerTextColor: '#000000',
            footerBorderColor: '#dddddd'
        },
    }
}

export default themeConfig