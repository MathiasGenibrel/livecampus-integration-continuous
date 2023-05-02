import { Button, Spinner } from 'evergreen-ui';
import React, { FC } from 'react';

interface FormButtonProps {
  isLoading: boolean;
  children: string;
}

export const FormButton: FC<FormButtonProps> = ({ isLoading, children }) => {
  if (isLoading)
    return (
      <Button className="w-full">
        <Spinner size={16} />
      </Button>
    );

  return (
    <Button className="w-full mt-4" appearance="primary">
      {children}
    </Button>
  );
};
