import { SubmitHandler, useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { Button, toaster } from 'evergreen-ui';
import { FC, useContext } from 'react';
import * as Joi from 'joi';
import clsx from 'clsx';

import { CART_CONTEXT_DISPATCHER } from '../../contexts/cart/cart-context';

import { Products } from '../../types/products';
import { CartAction } from '../../contexts/cart/cart-types';

interface ProductForm {
  quantity: number;
}

const schema = Joi.object({
  quantity: Joi.number().min(1).max(99).required(),
});

export const ProductContent: FC<Products> = (product) => {
  const updateCart = useContext(CART_CONTEXT_DISPATCHER);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductForm>({
    resolver: joiResolver(schema),
  });

  const onSubmit: SubmitHandler<ProductForm> = (data, event) => {
    if (!event) throw new ReferenceError('Event is undefined');

    event.preventDefault();

    updateCart &&
      updateCart({
        type: CartAction.ADD,
        id: product.id,
        product: { quantity: data.quantity },
      });

    toaster.success(
      `You have just added ${data.quantity} ${product.name} to your cart`,
      {
        duration: 1.5,
      }
    );
  };

  // Display toast error for on each refresh of the component if the quantity input has an error (anonymous function)
  (() => errors.quantity && toaster.danger(errors.quantity.message))();

  return (
    <>
      <img
        className={'aspect-square object-scale-down container mt-4'}
        src={product.image_link}
        alt={product.name}
      />
      <section className={'flex justify-between w-full mt-4'}>
        <h1
          className={
            'text-2xl font-medium w-3/4 whitespace-nowrap overflow-hidden text-ellipsis'
          }
        >
          {product.name}
        </h1>
        <span className={'text-xl font-medium w-1/4 text-ellipsis text-right'}>
          {product.price} $
        </span>
      </section>

      <section className={'flex flex-col gap-2 my-4'}>
        <h3 className={'text-xl font-medium'}>Description</h3>
        <p className={'text-sm opacity-[0.65]'}>{product.description}</p>
      </section>

      <form
        className={'flex gap-4 justify-between'}
        onSubmit={handleSubmit(onSubmit)}
        noValidate={true}
      >
        <Button appearance={'primary'} height={40} className={'w-3/4'}>
          Add to cart
        </Button>
        <input
          className={clsx(
            'w-1/4 px-4 py-2 border rounded text-sm',
            errors.quantity && 'border-red-500 bg-red-500/10'
          )}
          {...register('quantity')}
          type={'number'}
          defaultValue={1}
          min={1}
          max={99}
        />
      </form>
    </>
  );
};
