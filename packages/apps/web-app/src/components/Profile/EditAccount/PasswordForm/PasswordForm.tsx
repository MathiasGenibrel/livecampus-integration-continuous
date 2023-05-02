import React, { FC } from 'react';
import { Button, TextInputField } from 'evergreen-ui';
import { useForm } from 'react-hook-form';

interface PasswordFormProps {
  edit: boolean;
}

export const PasswordForm: FC<PasswordFormProps> = ({ edit }) => {
  const { register } = useForm();

  return (
    <form>
      <TextInputField
        {...register('currentPassword')}
        label={'Current Password'}
        type={'password'}
        autoComplete={'current-password'}
        disabled={!edit}
      />
      <TextInputField
        {...register('newPassword')}
        label={'New Password'}
        autoComplete={'new-password'}
        disabled={!edit}
      />
      <TextInputField
        {...register('confirmNewPassword')}
        label={'Confirm New Password'}
        autoComplete={'new-password'}
        disabled={!edit}
      />

      <Button className="w-full" appearance="primary" disabled={!edit}>
        Create a new password
      </Button>
    </form>
  );
};
