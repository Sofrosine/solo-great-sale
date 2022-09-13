import {ACTION_TYPES} from 'constants/action-types';

export const setToken = (token: any) => {
  return {
    type: ACTION_TYPES.SET_TOKEN,
    token,
  };
};

export const setUser = (data: any) => {
  return {
    type: ACTION_TYPES.SET_USER,
    data,
  };
};
