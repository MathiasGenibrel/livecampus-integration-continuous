import React, { ReactNode } from 'react';
import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';

import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { TextInputField, toaster } from 'evergreen-ui';
import { Headers } from '../components/Header/Headers';
import { ConnectionCredential } from '../types/connection-credential';
import { FormButton } from '../components/atoms/FormButton/FormButton';
import { useLogin } from '../hooks/useLogin';

const schema = Joi.object({
  email: Joi.string().email({ tlds: false }).required(),
  password: Joi.string().min(12).required(),
});

export const Login = () => {
  const { mutate, isLoading, isError, isSuccess } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ConnectionCredential>({
    resolver: joiResolver(schema),
  });

  const submitHandler: SubmitHandler<ConnectionCredential> = (
    data: ConnectionCredential,
    event
  ) => {
    if (!event) throw new ReferenceError('Event is undefined');
    event.preventDefault();

    mutate({ ...data });
    toaster.notify('Connection in progress', { duration: 1 });
  };

  if (isError)
    toaster.danger('An error occurred, try again later', { duration: 2 });
  if (isSuccess) toaster.success('You have been connected', { duration: 1.5 });

  return (
    <>
      <Headers />

      <main className="px-4">
        <h1 className="text-2xl text-center my-4">Account Login</h1>

        <form className="my-8" onSubmit={handleSubmit(submitHandler)}>
          <TextInputField
            {...register('email')}
            label={'Email'}
            type="email"
            autoComplete="email"
            hint={errors.email?.message as ReactNode}
            isInvalid={!!errors.email}
          />
          <TextInputField
            {...register('password')}
            label={'Password'}
            type="password"
            autoComplete="current-password"
            hint={errors.password?.message as ReactNode}
            isInvalid={!!errors.password}
          />
          <FormButton isLoading={isLoading}>Login</FormButton>
          <span className="flex text-xs text-gray-500 justify-center p-2 gap-2">
            You do not have an account ?
            <Link className="font-medium text-blue-500" to={'/register'}>
              Create an account
            </Link>
          </span>
        </form>
      </main>
    </>
  );
};
