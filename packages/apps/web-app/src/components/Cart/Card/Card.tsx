import { Button } from 'evergreen-ui';
import React, { FC, useContext } from 'react';
import { Products } from '../../../types/products';
import { CART_CONTEXT_DISPATCHER } from '../../../contexts/cart/cart-context';
import { CartAction } from '../../../contexts/cart/cart-types';

interface CardProps {
  product: Products;
  quantity: number;
}

export const Card: FC<CardProps> = ({ product, quantity }) => {
  const updateCart = useContext(CART_CONTEXT_DISPATCHER);
  const price = Math.round(product.price * quantity * 100) / 100;

  const clickHandler = (type: CartAction) => {
    updateCart && updateCart({ type, id: product.id });
  };

  return (
    <section className="flex gap-2">
      <img
        className={'aspect-square object-scale-down w-1/4'}
        src={product.image_link}
        alt={product.name}
      />
      <div className="flex flex-col gap-2 w-full">
        <span>{product.name}</span>

        <div className="flex justify-between items-center">
          <div className={'flex gap-1'}>
            <Button onClick={() => clickHandler(CartAction.DECREASE)}>-</Button>
            <span className="flex justify-center items-center border border-[#c1c4d6] rounded w-16">
              {quantity}
            </span>
            <Button onClick={() => clickHandler(CartAction.INCREASE)}>+</Button>
          </div>

          <div className="flex flex-col items-end">
            <span>${price}</span>
            <span className="text-xs opacity-50">
              {quantity} x ${product.price}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
