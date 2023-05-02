import { Button, TextInputField } from 'evergreen-ui';
import React, { FC, ReactNode, useContext, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AUTH_CONTEXT } from '../../../../contexts/auth/auth-context';
import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';
import { EditCredential } from '../../../../repository/auth/repository';
import { useProfileEdit } from './useProfileEdit';

interface ProfileFormProps {
  edit: boolean;
}

const schema = Joi.object({
  email: Joi.string().email({ tlds: false }),
  firstname: Joi.string(),
  lastname: Joi.string(),
});

export const ProfileForm: FC<ProfileFormProps> = ({ edit }) => {
  const [loading, setLoading] = useState(false);
  const auth = useContext(AUTH_CONTEXT);
  const { mutate } = useProfileEdit({ auth, setLoading });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditCredential>({ resolver: joiResolver(schema) });

  const submitHandler: SubmitHandler<EditCredential> = (data, event) => {
    if (!event) throw new TypeError('Event cannot be undefined');
    event.preventDefault();

    setLoading(true);
    mutate(data);
  };

  return (
    <form className="mt-4" onSubmit={handleSubmit(submitHandler)}>
      <TextInputField
        {...register('email')}
        isInvalid={!!errors.email}
        hint={errors.email?.message as ReactNode}
        label={'Email'}
        defaultValue={auth.email ?? ''}
        disabled={!edit}
      />
      <TextInputField
        {...register('firstname')}
        isInvalid={!!errors.firstname}
        hint={errors.firstname?.message as ReactNode}
        label={'Firstname'}
        defaultValue={auth.firstname ?? ''}
        autoComplete="given-name"
        disabled={!edit}
      />
      <TextInputField
        {...register('lastname')}
        isInvalid={!!errors.lastname}
        hint={errors.lastname?.message as ReactNode}
        label={'Lastname'}
        defaultValue={auth.lastname ?? ''}
        autoComplete="family-name"
        disabled={!edit}
      />

      <Button
        className="w-full"
        appearance="primary"
        disabled={!edit}
        isLoading={loading}
      >
        Update Profile
      </Button>
    </form>
  );
};
