import { ADD_TO_CART, ADD_ONE, REMOVE_ONE, CLEAR_CART } from './constants';

export function addToCart(item) {
  return {
    type: ADD_TO_CART,
    item,
  };
}

export function addOneMore(item) {
  return {
    type: ADD_ONE,
    item,
  };
}

export function substractOneMore(item) {
  return {
    type: REMOVE_ONE,
    item,
  };
}

export function clearCart() {
  return {
    type: CLEAR_CART,
  }
}
