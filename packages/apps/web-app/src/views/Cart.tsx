import React, { useContext } from 'react';
import { Headers } from '../components/Header/Headers';
import { Spinner } from 'evergreen-ui';
import { useQuery } from 'react-query';
import { CART_CONTEXT } from '../contexts/cart/cart-context';
import { ListCard } from '../components/Cart/ListCard';
import { Submenu } from '../components/Cart/Submenu';
import { useProductsRepository } from '../hooks/useProductsRepository';

export const Cart = () => {
  const cart = useContext(CART_CONTEXT);
  const productsRepository = useProductsRepository();

  // Set cache time to 0, to check all data of product (price, stock, ...)
  const { data, isLoading } = useQuery(
    'cart',
    () => productsRepository.findAll([...cart.keys()]),
    {
      cacheTime: 0,
    }
  );

  if (!isLoading && !data) throw new Error('test');

  return (
    <>
      <Headers />

      {isLoading ? (
        <div className="flex justify-center py-16">
          <Spinner />
        </div>
      ) : (
        <main>
          <article className={'px-4'}>
            <h1 className="text-center text-2xl my-4">Shopping Cart</h1>
            <ListCard data={data} />
          </article>

          <hr className="my-6" />

          <Submenu data={data} />
        </main>
      )}
    </>
  );
};
