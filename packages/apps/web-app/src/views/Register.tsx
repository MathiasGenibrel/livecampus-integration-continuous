import React, { ReactNode } from 'react';
import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';

import { Headers } from '../components/Header/Headers';
import { TextInputField, toaster } from 'evergreen-ui';
import { Link } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ConnectionCredential } from '../types/connection-credential';
import { FormButton } from '../components/atoms/FormButton/FormButton';
import { useRegister } from '../hooks/useRegister';

const schema = Joi.object({
  email: Joi.string().email({ tlds: false }).required(),
  password: Joi.string().min(12).required(),
  confirmPassword: Joi.string().required().valid(Joi.ref('password')).messages({
    'any.only': 'Passwords do not match',
  }),
});

export const Register = () => {
  const { mutate, isLoading, isError, isSuccess } = useRegister();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(schema),
  });

  const submitHandler: SubmitHandler<any> = (
    data: ConnectionCredential,
    event
  ) => {
    if (!event) throw new ReferenceError('Event is undefined');
    event.preventDefault();

    mutate({ ...data });
    toaster.notify('Creation of your account !', { duration: 1 });
  };

  if (isError)
    toaster.danger('An error occurred, try again later', { duration: 2 });
  if (isSuccess) toaster.success('You have been connected', { duration: 1.5 });

  return (
    <>
      <Headers />

      <main className="px-4">
        <h1 className="text-2xl text-center my-4">Account Creation</h1>

        <form onSubmit={handleSubmit(submitHandler)} noValidate={true}>
          <TextInputField
            {...register('email')}
            label={'Email'}
            type="email"
            autoComplete="email"
            autoFocus={true}
            hint={errors.email?.message as ReactNode}
            isInvalid={!!errors.email}
          />

          <TextInputField
            {...register('password')}
            label={'Password'}
            type="password"
            autoComplete="new-password"
            hint={errors.password?.message as ReactNode}
            isInvalid={!!errors.password}
          />

          <TextInputField
            {...register('confirmPassword')}
            label={'Confirm Password'}
            type="password"
            autoComplete="new-password"
            hint={errors.confirmPassword?.message as ReactNode}
            isInvalid={!!errors.confirmPassword}
          />

          <FormButton isLoading={isLoading}>Create account</FormButton>
        </form>

        <span className="flex text-xs text-gray-500 justify-center p-2 gap-2">
          Already have an account ?
          <Link className="font-medium text-blue-500" to={'/login'}>
            Log in to your account
          </Link>
        </span>
      </main>
    </>
  );
};
