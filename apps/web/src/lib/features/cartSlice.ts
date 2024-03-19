// features/cart/cartSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem, CartState, UpdateQuantityPayload } from '../cart.types';

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

    updateCartItemQuantity: (
      state,
      action: PayloadAction<UpdateQuantityPayload>,
    ) => {
      const { cartItemId, quantity } = action.payload;
      const index = state.cartItems.findIndex((item) => item.id === cartItemId);
      if (index !== -1) {
        state.cartItems[index].quantity = quantity;
      }
    },
    removeCartItem: (state, action: PayloadAction<number>) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload,
      );
    },
    addItemToCart: (state, action: PayloadAction<CartItem>) => {
      const newItem = action.payload;
      const existingItemIndex = state.cartItems.findIndex(
        (item) => item.id === newItem.id,
      );
      if (existingItemIndex !== -1) {
        // If the item exists, update the quantity
        state.cartItems[existingItemIndex].quantity += newItem.quantity;
      } else {
        // If the item doesn't exist, add it to the cart
        state.cartItems.push(newItem);
      }
    },
  },
});
export const {
  setCartItems,
  updateCartItemQuantity,
  removeCartItem,
  addItemToCart,
} = cartSlice.actions;
export default cartSlice.reducer;
