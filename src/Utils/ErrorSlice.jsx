import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
    name: 'errors',
    initialState: { error: {} },
    reducers: {
        setErrors: (state, { payload: payload }) => {
            state.error = payload;
        },
    },
});

export const { setErrors } = slice.actions;

export default slice.reducer;

export const getError = (state) => state.auth.error;