import React, { FC, ReactEventHandler, useContext } from 'react';
import { NavigateFunction } from 'react-router-dom';
import { Products } from '../../types/products';
import { Button, toaster } from 'evergreen-ui';
import { CART_CONTEXT_DISPATCHER } from '../../contexts/cart/cart-context';
import { CartAction } from '../../contexts/cart/cart-types';

interface CardProps {
  product: Products;
  navigate: NavigateFunction;
}

export const Card: FC<CardProps> = ({ product, navigate }) => {
  const updateCart = useContext(CART_CONTEXT_DISPATCHER);
  const addToCart = (id: number) => {
    updateCart &&
      updateCart({ type: CartAction.ADD, id, product: { quantity: 1 } });

    toaster.success(`You have just added 1 ${product.name} to your cart`, {
      duration: 1.5,
    });
  };

  const clickHandler: ReactEventHandler<HTMLElement> = (element) => {
    const target = element.target as HTMLElement;

    // Redirect user only if is not click on "add to cart" button.
    if (target.tagName !== 'BUTTON') return navigate(`/product/${product.id}`);
  };

  return (
    <li>
      <section
        onClick={(e) => clickHandler(e)}
        title={product.name}
        className={'flex flex-col my-2 gap-2 cursor-pointer'}
      >
        <img
          src={product.image_link}
          alt={product.name}
          className={'aspect-square object-scale-down'}
        />

        <article className={'flex items-center justify-between'}>
          <h3 className={'text-lg font-medium'}>{product.name}</h3>
          <span className={'font-medium'}>{product.price} $</span>
        </article>

        <p className={'line-clamp-2'}>{product.description}</p>

        <Button
          onClick={() => addToCart(product.id)}
          appearance={'primary'}
          className={'w-fit'}
        >
          Add to cart
        </Button>
      </section>
    </li>
  );
};
