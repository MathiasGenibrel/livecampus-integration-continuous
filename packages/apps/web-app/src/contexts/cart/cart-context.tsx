import { createContext, Dispatch, FC, useReducer } from 'react';
import {
  Action,
  ActionProduct,
  CartAction,
  CartContextProviderProps,
  State,
} from './cart-types';
import { environment } from '../../environment/environment';

/**
 * Update or insert data in current state, to not erase previous quantity
 * @param currentMap Corresponding to the current state of the dispatcher
 * @param key Key of the saved product
 * @param value Value of the saved product
 */
const upsert = (currentMap: State, key: number, value: ActionProduct) => {
  const existingValue = currentMap.get(key);

  if (!existingValue) return currentMap.set(key, value);
  currentMap.set(key, { quantity: existingValue.quantity + value.quantity });
};

const increaseQuantity = (currentMap: State, id: number) => {
  const existingValue = currentMap.get(id);

  if (!existingValue)
    throw new ReferenceError('Product does not exist on cart');
  return currentMap.set(id, { quantity: existingValue.quantity + 1 });
};

const decreaseQuantity = (currentMap: State, id: number) => {
  const existingValue = currentMap.get(id);

  if (!existingValue)
    throw new ReferenceError('Product does not exist on cart');

  const newQuantity = existingValue.quantity - 1;

  if (newQuantity === 0) return currentMap.delete(id);

  return currentMap.set(id, { quantity: existingValue.quantity - 1 });
};

const cartDispatcher = (state: State, action: Action): State => {
  const currentState = new Map(state);

  switch (action.type) {
    case CartAction.ADD:
      if (!action.product)
        throw new ReferenceError('Action product cannot be undefined or null');

      upsert(currentState, action.id, action.product);
      localStorage.setItem(
        environment.localStorageKeys.cart,
        JSON.stringify([...currentState])
      );
      return currentState;

    case CartAction.REMOVE:
      currentState.delete(action.id);
      localStorage.setItem(
        environment.localStorageKeys.cart,
        JSON.stringify(currentState)
      );
      return currentState;

    case CartAction.INCREASE:
      increaseQuantity(currentState, action.id);
      localStorage.setItem(
        environment.localStorageKeys.cart,
        JSON.stringify([...currentState])
      );
      return currentState;

    case CartAction.DECREASE:
      decreaseQuantity(currentState, action.id);
      localStorage.setItem(
        environment.localStorageKeys.cart,
        JSON.stringify([...currentState])
      );
      return currentState;

    default:
      console.error('Action type is not defined');
      return currentState;
  }
};

// Get saved cart in local storage.
const localStorageCart = localStorage.getItem(
  environment.localStorageKeys.cart
);

// Create map for the default context value
const initCart: State = localStorageCart
  ? (new Map(JSON.parse(localStorageCart)) as State)
  : new Map();

export const CART_CONTEXT = createContext<State>(initCart);
export const CART_CONTEXT_DISPATCHER = createContext<Dispatch<Action> | null>(
  null
);

export const CartContextProvider: FC<CartContextProviderProps> = ({
  children,
}) => {
  const [cart, dispatch] = useReducer(cartDispatcher, initCart);

  return (
    <CART_CONTEXT.Provider value={cart}>
      <CART_CONTEXT_DISPATCHER.Provider value={dispatch}>
        {children}
      </CART_CONTEXT_DISPATCHER.Provider>
    </CART_CONTEXT.Provider>
  );
};
