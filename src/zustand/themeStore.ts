import {create} from 'zustand';
import {darkToken, lightToken} from '@/constants';

type ThemeFlag = 'dark' | 'light';
type Store = {
  themeFlag: ThemeFlag;
  setThemeFlag: (themeFlag: string) => void;
  antdToken: any;
  setAntdToken: (themeFlag: string) => void;
};

const useThemeStore = create<Store>((set) => {
  return {
    themeFlag: 'dark',
    setThemeFlag: (themeFlag: ThemeFlag) => {
      set((state) => {
        return {...state, themeFlag: themeFlag};
      });
    },

    antdToken: darkToken,
    setAntdToken: (themeFlag: ThemeFlag) => {
      set((state) => {
        return {...state, antdToken: themeFlag === 'dark' ? darkToken : lightToken};
      });
    },
  };
});

export default useThemeStore;
