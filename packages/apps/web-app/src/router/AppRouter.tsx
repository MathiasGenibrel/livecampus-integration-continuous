import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import { Landing } from '../views/Landing';
import { NotFoundError } from '../views/errors/NotFoundError';
import { Product } from '../views/Product';
import { InternalServerError } from '../views/errors/InternalServerError';
import { Cart } from '../views/Cart';
import { Login } from '../views/Login';
import { Register } from '../views/Register';
import { Profile } from '../views/Profile';

export const AppRouter = createBrowserRouter([
  {
    path: '/',
    element: <Landing />,
  },
  {
    path: '/product/:id',
    element: <Product />,
    errorElement: <InternalServerError />,
  },
  {
    path: '/cart',
    element: <Cart />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/profile',
    element: <Profile />,
  },
  {
    path: '/*',
    element: <NotFoundError />,
  },
]);
