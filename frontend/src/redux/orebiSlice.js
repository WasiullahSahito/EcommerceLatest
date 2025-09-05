import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: [],
  products: [],
  wishlist: [], // Wishlist state added
};

export const orebiSlice = createSlice({
  name: "orebi",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = state.products.find(
        (item) => item._id === action.payload._id
      );
      if (item) {
        item.quantity += action.payload.quantity;
      } else {
        state.products.push(action.payload);
      }
    },
    increaseQuantity: (state, action) => {
      const item = state.products.find(
        (item) => item._id === action.payload._id
      );
      if (item) {
        item.quantity++;
      }
    },
    drecreaseQuantity: (state, action) => {
      const item = state.products.find(
        (item) => item._id === action.payload._id
      );
      if (item.quantity === 1) {
        item.quantity = 1;
      } else {
        item.quantity--;
      }
    },
    deleteItem: (state, action) => {
      state.products = state.products.filter(
        (item) => item._id !== action.payload
      );
    },
    resetCart: (state) => {
      state.products = [];
    },
    // ================== Wishlist Actions Start here =================
    toggleWishlist: (state, action) => {
      const item = state.wishlist.find(
        (item) => item._id === action.payload._id
      );
      if (item) {
        state.wishlist = state.wishlist.filter(
          (item) => item._id !== action.payload._id
        );
      } else {
        state.wishlist.push(action.payload);
      }
    },
    // ================== Wishlist Actions End here ===================
  },
});

export const {
  addToCart,
  increaseQuantity,
  drecreaseQuantity,
  deleteItem,
  resetCart,
  toggleWishlist, // Export the new action
} = orebiSlice.actions;
export default orebiSlice.reducer;