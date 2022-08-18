import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectCart = state => state.cart || initialState;

/**
 * Select the language locale
 */

const getCart = () => createSelector(selectCart, cartState => cartState.cart);

export { selectCart, getCart };
