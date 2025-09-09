import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // CORRECTED: Check localStorage for existing user session. Default to null if not found.
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
  products: [], // Represents the shopping cart
  wishlist: [],
};

export const orebiSlice = createSlice({
  name: "orebi",
  initialState,
  reducers: {
    // ============== User Authentication Reducers ===============
    loginUser: (state, action) => {
      state.userInfo = action.payload;
      // Save user info to localStorage to persist the session
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    logoutUser: (state) => {
      state.userInfo = null;
      // Remove user info from localStorage on logout
      localStorage.removeItem("userInfo");
      // Clear cart and wishlist for a clean logout
      state.products = [];
      state.wishlist = [];
    },

    // ================== Cart Reducers ========================
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

    // ================== Wishlist Reducers =================
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
  },
});

export const {
  loginUser,
  logoutUser,
  addToCart,
  increaseQuantity,
  drecreaseQuantity,
  deleteItem,
  resetCart,
  toggleWishlist,
} = orebiSlice.actions;

export default orebiSlice.reducer;