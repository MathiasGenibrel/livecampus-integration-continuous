import { useMutation, useQueryClient } from 'react-query';
import { AuthActionType } from '../../../contexts/auth/auth-types';
import { Dispatch, SetStateAction, useContext } from 'react';
import { AUTH_CONTEXT_DISPATCHER } from '../../../contexts/auth/auth-context';
import { useAuthRepository } from '../../../hooks/useAuthRepository';
import { useNavigate } from 'react-router-dom';

interface DisplayManager {
  setDeleteDialog: Dispatch<SetStateAction<boolean>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

/**
 * Call the repository to delete user account, update the **auth context**.
 * @param displayManager State Action, contains two methods, to update the display of the application
 */
export const useDelete = (displayManager: DisplayManager) => {
  const navigate = useNavigate();
  const authDispatcher = useContext(AUTH_CONTEXT_DISPATCHER);
  const authRepository = useAuthRepository();
  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    'deleteAccount',
    (token: string) => authRepository.delete(token),
    {
      onSuccess: async () => {
        authDispatcher && authDispatcher({ type: AuthActionType.DISCONNECT });
        await queryClient.resetQueries('getSessionCredential');
        displayManager.setDeleteDialog(false);
        displayManager.setLoading(false);
        navigate('/');
      },
    }
  );

  return { mutate };
};
