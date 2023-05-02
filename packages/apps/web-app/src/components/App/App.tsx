import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { AppRouter } from '../../router/AppRouter';
import { RouterProvider } from 'react-router-dom';
import { CartContextProvider } from '../../contexts/cart/cart-context';
import { AuthContextProvider } from '../../contexts/auth/auth-context';

export const App = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Auth Context, used to store auth credential for the application */}
      <AuthContextProvider>
        {/* Cart Context, used to store all product in cart, in the context of the application */}
        <CartContextProvider>
          {/* Browser router */}
          <RouterProvider router={AppRouter} />
        </CartContextProvider>
      </AuthContextProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};
