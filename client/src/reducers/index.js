import { ADD_ITEM, REDUCE_ITEM, CHANGE_ITEM, REMOVE_ITEM, LOAD_LIST } from "../constants/action-types";

const initialState = {
  products: [],
  cart: {},
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM:
      let newQuantity = state[action.payload] + 1 || 1;
      let newCart = { ...state.cart, [action.payload]: newQuantity };
      return { ...state, cart: newCart };
    case REDUCE_ITEM:
      newQuantity = state[action.payload] - 1;
      newCart = { ...state };
      if (newQuantity <= 0) {
        delete newCart[action.payload];
      } else {
        newCart[action.payload] = newQuantity;
      }
      return { ...state, cart: newCart };
    case CHANGE_ITEM:
      newQuantity = action.payload.num;
      newCart = { ...state };
      if (newQuantity <= 0) {
        delete newCart[action.payload.itemID];
      } else {
        newCart[action.payload.itemID] = newQuantity;
      }
      return { ...state, cart: newCart };
    case REMOVE_ITEM:
      newCart = { ...state };
      delete newCart[action.payload];
      return { ...state, cart: newCart };
    case LOAD_LIST:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default rootReducer;