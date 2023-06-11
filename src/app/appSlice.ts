import { createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
    name: 'app',
    initialState: {
        theme: 'default'
    },
    reducers: {
        changeTheme: (state, action) => {
            state.theme = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { changeTheme } = appSlice.actions

export default appSlice.reducer