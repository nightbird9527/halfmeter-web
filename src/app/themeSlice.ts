import { createSlice } from '@reduxjs/toolkit';

export const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        antdToken: {
            colorPrimary: '#00b96b'
        },
    },
    reducers: {
        getCyan: (state) => {
            state.antdToken.colorPrimary = 'cyan'
        },
        getYellow: (state) => {
            state.antdToken.colorPrimary = 'cyan'
        },
        changeTheme: (state, action) => {
            state.antdToken.colorPrimary = action.payload
        },
        // incrementByAmount: (state, action) => {
        //     state.value += action.payload
        // },
    },
})

// Action creators are generated for each case reducer function
export const { getCyan, getYellow, changeTheme } = themeSlice.actions

export default themeSlice.reducer