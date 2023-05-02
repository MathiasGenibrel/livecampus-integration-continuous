import { useAuthRepository } from './useAuthRepository';
import { useContext } from 'react';
import { AUTH_CONTEXT_DISPATCHER } from '../contexts/auth/auth-context';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { ConnectionCredential } from '../types/connection-credential';
import { AuthActionType } from '../contexts/auth/auth-types';

export const useLogin = () => {
  const authRepository = useAuthRepository();
  const authContextDispatcher = useContext(AUTH_CONTEXT_DISPATCHER);
  const navigate = useNavigate();

  const { isLoading, isError, isSuccess, mutate } = useMutation(
    ['login'],
    (content: ConnectionCredential) =>
      authRepository.connect(content.email, content.password),
    {
      onSuccess: async (data) => {
        authContextDispatcher &&
          authContextDispatcher({
            type: AuthActionType.CONNECT,
            credential: { ...data },
            token: data.token,
          });

        navigate('/');
      },
    }
  );

  return { mutate, isLoading, isError, isSuccess };
};
