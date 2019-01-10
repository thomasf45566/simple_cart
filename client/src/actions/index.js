import { ADD_ITEM, REMOVE_ITEM, LOAD_LIST } from "../constants/action-types";

export const addItem = itemID => ({ type: ADD_ITEM, payload: itemID });
export const reduceItem = itemID => ({ type: ADD_ITEM, payload: itemID });
export const changeItem = (itemID, num) => ({ type: ADD_ITEM, payload: { itemID, num }});
export const removeItem = itemID => ({ type: REMOVE_ITEM, payload: itemID });
export const loadList = list => ({ type: LOAD_LIST, payload: list});