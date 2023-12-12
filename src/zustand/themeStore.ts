import { create } from 'zustand'
import {themeConfig, ITheme, ThemeFlagType} from 'src/constants'

interface IThemeState extends ITheme {
    setTheme: (themeFlag: ThemeFlagType) => void
}
const useThemeStore = create<IThemeState>((set) => {
    const themeStyle = themeConfig.dark;
    const {antdTheme, headerStyle, siderStyle, contentStyle, footerStyle} = themeStyle
    return {
        antdTheme,
        headerStyle,
        siderStyle,
        contentStyle,
        footerStyle,
        setTheme: (themeFlag) => {
            return set(() => {
                const {antdTheme, headerStyle, siderStyle, contentStyle, footerStyle} = themeConfig[themeFlag];
                return {
                    antdTheme,
                    headerStyle,
                    siderStyle,
                    contentStyle,
                    footerStyle,
                }
            })
        }
    }
})

export default useThemeStore