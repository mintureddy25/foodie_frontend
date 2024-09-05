import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
    name: 'cartItems',
    initialState: { cartItems: null, error: null },
    reducers: {
        setCartItems: (state, { payload: cartItems }) => {
            try {
                // Save the JWT in session storage
                localStorage.setItem('cartItems', JSON.stringify(cartItems));
                state.cartItems = cartItems;
                
            } catch (e) {
                console.log(e);
                // What to do here?
            }
        },
        unsetCartItems: (state) => {
            try {
                // log the user out by unsetting everything
                localStorage.removeItem('cartItems');
                state.cartItems = null;
            } catch (e) {
                console.log(e);
                // What to do here?
            }
        }
    },
});

export const { setCartItems, unsetCartItems } = slice.actions;

export default slice.reducer;