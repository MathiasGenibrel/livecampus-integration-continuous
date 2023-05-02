import { BagFill, DoorOpenFill, PersonCircle } from 'react-bootstrap-icons';
import { Link, useNavigate } from 'react-router-dom';
import { Pill } from 'evergreen-ui';
import { useContext } from 'react';
import { CART_CONTEXT } from '../../contexts/cart/cart-context';
import { State } from '../../contexts/cart/cart-types';
import {
  AUTH_CONTEXT,
  AUTH_CONTEXT_DISPATCHER,
} from '../../contexts/auth/auth-context';
import { AuthActionType } from '../../contexts/auth/auth-types';

const getCartProductQuantity = (cart: State): string => {
  const cartProductQuantity = [...cart.values()]
    .map((product) => product.quantity)
    .reduce((prev, current) => prev + current);

  if (cartProductQuantity > 99) return '99+';

  return String(cartProductQuantity);
};

export const Headers = () => {
  const cart = useContext(CART_CONTEXT);
  const auth = useContext(AUTH_CONTEXT);
  const authDispatcher = useContext(AUTH_CONTEXT_DISPATCHER);
  const navigate = useNavigate();

  const quantity = cart.size && getCartProductQuantity(cart);

  const clickHandler = () => {
    authDispatcher && authDispatcher({ type: AuthActionType.DISCONNECT });
    navigate('/');
  };

  const pill = quantity ? (
    <Pill
      display="inline-flex"
      className={'absolute bottom-2.5 right-[-0.75rem]'}
    >
      {quantity}
    </Pill>
  ) : null;

  return (
    <article className="sticky top-0 flex justify-between items-center px-4 py-2 bg-white z-10">
      <Link to={'/'} title="Home">
        <h1 className="text-3xl font-medium">LOGO</h1>
      </Link>
      <section className="flex justify-between items-center gap-4">
        <Link
          to={auth.token ? '/profile' : '/login'}
          className={'flex items-center gap-2'}
        >
          {auth.token && (
            <span className="text-xs text-gray-500">{auth.email}</span>
          )}
          <PersonCircle className="text-xl" />
        </Link>
        <Link to={'/cart'} className={'relative'}>
          <BagFill className="text-xl" />
          {pill}
        </Link>
        {auth.token && (
          <DoorOpenFill
            className="text-xl cursor-pointer"
            onClick={clickHandler}
          />
        )}
      </section>
    </article>
  );
};
