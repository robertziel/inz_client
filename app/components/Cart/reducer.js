import produce from 'immer';

import { ADD_ONE, ADD_TO_CART, REMOVE_ONE } from './constants';

export const initialState = {
  cart: {},
};

const cartProviderReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case ADD_TO_CART:
        draft.cart = state.cart;
        const prevItem = draft.cart[action.item.id];
        const prevAmount = parseInt(prevItem && prevItem.amount) || 0;
        draft.cart[action.item.id] = {
          ...action.item,
          amount: prevAmount + parseInt(action.item.amount),
        };
        break;
      case ADD_ONE:
        draft.cart[action.item.id].amount += 1;
        break;
      case REMOVE_ONE:
        draft.cart[action.item.id].amount -= 1;
        if (draft.cart[action.item.id].amount == 0) {
          delete draft.cart[action.item.id];
        }
        break;
    }
  });

export default cartProviderReducer;
