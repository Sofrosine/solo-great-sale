import {ACTION_TYPES} from 'constants/action-types';

export const initialCartState: any = {
  data: [],
};

export const cartReducer = (state: any, action: any) => {
  switch (action.type) {
    case ACTION_TYPES.SET_CART:
      return {...state, data: action?.data};
    case ACTION_TYPES.EMPTY_CART:
      return {...initialCartState};
    default:
      return state;
  }
};
