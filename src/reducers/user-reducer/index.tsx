import {ACTION_TYPES} from 'constants/action-types';

export const initialUserState: any = {
  data: null,
  token: '',
};

export const userReducer = (state: any, action: any) => {
  switch (action.type) {
    case ACTION_TYPES.SET_TOKEN:
      return {...state, token: action.token};
    case ACTION_TYPES.SET_USER:
      return {...state, data: action.data};
    default:
      return state;
  }
};
