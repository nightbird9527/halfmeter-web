export interface ITheme {
    antdTheme: {
        token: any,
        algorithm?: any,
        components?: any
    },
    headerStyle: {
        headerBgColor: string, // 背景颜色
        headerTextColor: string, // 文本颜色
        headerBorderColor: string, // 边框颜色
    },
    siderStyle: {
        siderBgColor: string,
        siderTextColor: string,
        siderBorderColor: string,
    },
    contentStyle: {
        contentBgColor: string,
        contentTextColor: string,
    },
    footerStyle: {
        footerBgColor: string,
        footerTextColor: string,
        footerBorderColor: string
    },
}

export type ThemeFlagType = 'dark' | 'light';

export interface IThemeConfig<T> {
    dark: T,
    light: T
}