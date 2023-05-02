export interface CartContextProviderProps {
  children: JSX.Element[] | JSX.Element;
}

export enum CartAction {
  ADD = 'add',
  REMOVE = 'remove',
  INCREASE = 'increase',
  DECREASE = 'decrease',
}

export interface Cart {
  quantity: number;
}

export interface ActionProduct {
  quantity: number;
}

export interface Action {
  type: CartAction;
  id: number;
  product?: ActionProduct;
}

export type State = Map<number, Cart>;
