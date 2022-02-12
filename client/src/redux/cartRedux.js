import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart", 
  initialState: {
    products: [], 
    quantity: 0, 
    total: 0, 
  },
  reducers: {
    addProduct: (state, action) => {
      const existingProduct = state.products.find(product => product._id === action.payload._id);
      if (existingProduct) {
        state.quantity += 1;
        existingProduct.quantity += 1;
        state.total += action.payload.price * action.payload.quantity;
      } else {
        state.quantity += action.payload.quantity;
        state.products.push(action.payload);
        state.total += action.payload.price * action.payload.quantity;
      }
      
    }, 
    incrementQuantity: (state, action) => {
      const existingProduct = state.products.find(product => product._id === action.payload._id); 
      if (existingProduct) {
        existingProduct.quantity += 1;
        state.total += action.payload.price * action.payload.quantity;
        state.quantity += 1;
      }
    },
    decreaseQuantity: (state, action) => {
      const existingProduct = state.products.find(product => product._id === action.payload._id);
      if (existingProduct) {
        if (existingProduct.quantity === 1) {
          state.products = state.products.filter(product => product._id !== action.payload._id);
          state.total -= action.payload.price * action.payload.quantity;
        } else {
          existingProduct.quantity -= 1;
          state.total -= action.payload.price * action.payload.quantity;
        }
        state.quantity -= 1;
      }
    },
  }
})

export const { addProduct, incrementQuantity, decreaseQuantity } = cartSlice.actions; 
export default cartSlice.reducer;