import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: []
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload.product;
      const amount = action.payload.amount;
      const existingItem = state.cart.find((item) => item.id === product.id);
      if (existingItem) {
        existingItem.quantity += amount;
        if (existingItem.quantity == 0) {
          state.cart = state.cart.filter((item) => item.id != product.id);
        }
      } else {
        state.cart.push({ ...product, quantity: amount });
      }
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },
    clearCart: (state) => {
      state.cart = [];
    }
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

export const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
  },
});

export const selectCart = (state) => state.cart.cart;
export const selectCartTotalAmount = (state) => selectCart(state).reduce((total, item) => total + item.quantity, 0)
export const selectTotalPrice = (state) => selectCart(state).reduce((total, item) => total + item.quantity * item.price, 0)
