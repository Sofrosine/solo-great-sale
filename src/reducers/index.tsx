import {createContext, useReducer} from 'react';
import {cartReducer, initialCartState} from './cart-reducer';
import {initialUserState, userReducer} from './user-reducer';

type Props = {
  children: any;
};

export const Store = createContext<any>(null);

export const StoreProvider = (props: Props) => {
  const mainReducer = {
    cart: useReducer(cartReducer, initialCartState),
    user: useReducer(userReducer, initialUserState),
  };
  return <Store.Provider value={mainReducer}>{props.children}</Store.Provider>;
};
