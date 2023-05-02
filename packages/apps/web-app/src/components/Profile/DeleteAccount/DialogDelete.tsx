import { Dialog } from 'evergreen-ui';
import React, {
  Dispatch,
  FC,
  SetStateAction,
  useContext,
  useState,
} from 'react';
import { AUTH_CONTEXT } from '../../../contexts/auth/auth-context';
import { useDelete } from './useDelete';

interface DialogDeleteProps {
  deleteDialog: boolean;
  setDeleteDialog: Dispatch<SetStateAction<boolean>>;
}

export const DialogDelete: FC<DialogDeleteProps> = ({
  deleteDialog,
  setDeleteDialog,
}) => {
  const [loading, setLoading] = useState(false);
  const { mutate } = useDelete({ setDeleteDialog, setLoading });
  const auth = useContext(AUTH_CONTEXT);

  return (
    <Dialog
      isShown={deleteDialog}
      title="Delete Account"
      onConfirm={() => {
        setLoading(true);
        mutate(auth.token as string);
      }}
      onCloseComplete={() => setDeleteDialog(false)}
      confirmLabel="Delete my account"
      intent={'danger'}
      isConfirmLoading={loading}
    >
      <p>Are you sure you want to delete your account?</p>
      <p>
        This action is irreversible, you will not be able to recover your
        account after this operation.
      </p>
    </Dialog>
  );
};
