import React, { FC, useContext } from 'react';
import { Card } from './Card/Card';
import { Products } from '../../types/products';
import { CART_CONTEXT } from '../../contexts/cart/cart-context';

interface ListCardProps {
  data: Products[];
}

export const ListCard: FC<ListCardProps> = ({ data }) => {
  const cart = useContext(CART_CONTEXT);

  return (
    <ul className={'flex flex-col gap-4'}>
      {data.map((product) => {
        const productCart = cart.get(product.id);

        if (productCart)
          return (
            <li key={product.id}>
              <Card product={product} quantity={productCart.quantity} />
            </li>
          );

        return null;
      })}
    </ul>
  );
};
