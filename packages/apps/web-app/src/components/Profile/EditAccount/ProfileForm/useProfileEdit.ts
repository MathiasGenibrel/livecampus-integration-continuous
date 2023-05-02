import { useMutation } from 'react-query';
import {
  AuthCredential,
  EditCredential,
  NullAuthCredential,
} from '../../../../repository/auth/repository';
import { AuthActionType } from '../../../../contexts/auth/auth-types';
import { Dispatch, SetStateAction, useContext } from 'react';
import { AUTH_CONTEXT_DISPATCHER } from '../../../../contexts/auth/auth-context';
import { useAuthRepository } from '../../../../hooks/useAuthRepository';

interface useProfileEditProps {
  auth: AuthCredential | NullAuthCredential;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

export const useProfileEdit = ({ auth, setLoading }: useProfileEditProps) => {
  const authDispatcher = useContext(AUTH_CONTEXT_DISPATCHER);
  const authRepository = useAuthRepository();

  const { mutate } = useMutation(
    ['editProfile'],
    async (credential: Partial<EditCredential>) => {
      // Used to not erase previous filled date with undefined
      const editCredential: EditCredential = {
        email: credential.email ?? (auth.email as string),
        firstname: credential.firstname ?? auth.firstname,
        lastname: credential.lastname ?? auth.lastname,
      };
      await authRepository.edit(editCredential, auth.token as string);

      // Pass the new edit credential to the onSuccess function, to update context
      return editCredential;
    },
    {
      onSuccess: (data) => {
        authDispatcher &&
          authDispatcher({
            type: AuthActionType.EDIT,
            editCredential: { ...data },
          });

        setLoading(false);
      },
    }
  );

  return { mutate };
};
