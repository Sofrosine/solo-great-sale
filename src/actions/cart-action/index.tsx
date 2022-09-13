import {ACTION_TYPES} from 'constants/action-types';

export const setCart = (data: any) => {
  return {
    type: ACTION_TYPES.SET_CART,
    data,
  };
};

export const emptyCart = () => {
  return {
    type: ACTION_TYPES.EMPTY_CART,
  };
};
