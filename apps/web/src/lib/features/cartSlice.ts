// features/cart/cartSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem, CartState } from '../cart.types';

const initialState: CartState = {
  cartItems: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartItems: (state, action: PayloadAction<CartItem[]>) => {
      state.cartItems = action.payload;
    },
  },
});

export const { setCartItems } = cartSlice.actions;
export default cartSlice.reducer;
