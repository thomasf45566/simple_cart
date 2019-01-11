import { ADD_ITEM, REDUCE_ITEM, CHANGE_ITEM, REMOVE_ITEM, LOAD_LIST } from "../constants/action-types";

const initialState = {
  products: [],
  cart: {},
  total: 0
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM:
      let newQuantity = state[action.payload] + 1 || 1;
      let newCart = { ...state.cart, [action.payload]: newQuantity };
      let newTotal = state.total + state.products[action.payload].price;
      return { ...state, cart: newCart, total: newTotal };
    case REDUCE_ITEM:
      newQuantity = state[action.payload] - 1;
      newCart = { ...state.cart };
      newTotal = state.total - state.products[action.payload].price;
      if (newQuantity <= 0) {
        delete newCart[action.payload];
      } else {
        newCart[action.payload] = newQuantity;
      }
      return { ...state, cart: newCart, total: newTotal };
    case CHANGE_ITEM:
      newQuantity = action.payload.num;
      newCart = { ...state.cart };
      newTotal = state.total + state.products[action.payload.itemID].price * (action.payload.num - state.cart[action.payload.itemID]);
      if (newQuantity <= 0) {
        delete newCart[action.payload.itemID];
      } else {
        newCart[action.payload.itemID] = newQuantity;
      }
      return { ...state, cart: newCart, total: newTotal };
    case REMOVE_ITEM:
      newCart = { ...state.cart };
      newTotal = state.total - state.products[action.payload].price * state.cart[action.payload];
      delete newCart[action.payload];
      return { ...state, cart: newCart, total: newTotal };
    case LOAD_LIST:
      let total = Object.keys(state.cart).reduce((total, itemID) => (
        total + state.products[itemID].price * state.cart[itemID]
      ), 0);
      return { ...state, ...action.payload, total };
    default:
      return state;
  }
};

export default rootReducer;