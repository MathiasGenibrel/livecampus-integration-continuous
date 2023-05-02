import React, { FC, useContext } from 'react';
import { Button } from 'evergreen-ui';
import { ArrowRight } from 'react-bootstrap-icons';

import { State } from '../../contexts/cart/cart-types';
import { Products } from '../../types/products';
import { CART_CONTEXT } from '../../contexts/cart/cart-context';

const getTotalPrice = (cart: State, data: Products[]) => {
  let sum = 0;

  data.forEach((product) => {
    const currentProductCart = cart.get(product.id);

    if (currentProductCart) sum += product.price * currentProductCart.quantity;
  });

  // Round 2 decimal
  return Math.round(sum * 100) / 100;
};

interface SubmenuProps {
  data: Products[];
}

export const Submenu: FC<SubmenuProps> = ({ data }) => {
  const cart = useContext(CART_CONTEXT);

  return (
    <article className={'flex flex-col gap-4 px-4'}>
      <section className={'flex justify-between'}>
        <h2>Subtotal</h2>
        <span>${getTotalPrice(cart, data)}</span>
      </section>
      <span className={'mt-2 text-center'}>
        Free US shipping on orders $150+
      </span>
      <Button appearance={'primary'} size="large" className="flex gap-4 w-full">
        Go to Checkout <ArrowRight />
      </Button>
    </article>
  );
};
