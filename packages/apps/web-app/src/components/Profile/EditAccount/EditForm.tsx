import React, { FC } from 'react';
import { ProfileForm } from './ProfileForm/ProfileForm';

interface EditFormProps {
  edit: boolean;
}

export const EditForm: FC<EditFormProps> = ({ edit }) => {
  return (
    <>
      <ProfileForm edit={edit} />

      <hr className="my-6" />

      {/* TODO: add section to edit password */}
      {/*<h1 className="text-xl text-gray-600 mb-2">Password section</h1>*/}
      {/*<PasswordForm edit={edit} />*/}
    </>
  );
};
