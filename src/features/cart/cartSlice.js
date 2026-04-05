import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  // cart: [
  //   {
  //     pizzaId: 12,
  //     name: "Mediterranean",
  //     quantity: 2,
  //     unitPrice: 16,
  //     totalPrice: 32,
  //   },
  //   {
  //     pizzaId: 6,
  //     name: "Vegetale",
  //     quantity: 1,
  //     unitPrice: 13,
  //     totalPrice: 13,
  //   },
  //   {
  //     pizzaId: 11,
  //     name: "Spinach and Mushroom",
  //     quantity: 1,
  //     unitPrice: 15,
  //     totalPrice: 15,
  //   },
  // ],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      // payload ==> item
      state.cart.push(action.payload);
    },
    removeItem(state, action) {
      // payload ==> id of item
      const pizzaIdFromPayload =
        typeof action.payload === "object"
          ? action.payload.pizzaId
          : action.payload;

      state.cart = state.cart.filter(
        (item) => item.pizzaId !== pizzaIdFromPayload,
      );
    },
    updateQuantity: {
      prepare(pizzaId, operation) {
        return {
          payload: {
            pizzaId,
            operation,
          },
        };
      },
      reducer(state, action) {
        // find item first then update quantity and total price
        const item = state.cart.find(
          (item) => item.pizzaId === action.payload.pizzaId,
        );

        if (action.payload.operation === "inc") item.quantity++;
        if (action.payload.operation === "dec") {
          item.quantity--;
          item.totalPrice = item.unitPrice * item.quantity;
          if (item.quantity === 0) {
            cartSlice.caseReducers.removeItem(state, action);
          }
        }
      },
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const { addItem, removeItem, updateQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;

export const getCart = (state) => state.cart.cart;

export const getTotalCartQuantity = (state) =>
  state.cart.cart.reduce((accu, cur) => accu + cur.quantity, 0);

export const getTotalPrice = (state) =>
  state.cart.cart.reduce((accu, cur) => accu + cur.totalPrice, 0);

export const getCurrentQuantityById = (id) => (state) =>
  state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;
