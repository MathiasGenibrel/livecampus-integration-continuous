import { DialogDelete } from '../DeleteAccount/DialogDelete';
import { Button } from 'evergreen-ui';
import { EditForm } from '../EditAccount/EditForm';
import React, { useState } from 'react';

export const ProfileSection = () => {
  const [edit, setEdit] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);

  return (
    <>
      <DialogDelete
        deleteDialog={deleteDialog}
        setDeleteDialog={setDeleteDialog}
      />

      <article className={'mt-8'}>
        <section className="flex justify-between">
          <h1 className="text-2xl">Information</h1>
          <div className="flex gap-2">
            <Button
              onClick={() => setEdit((current) => !current)}
              appearance={edit ? 'primary' : 'default'}
              intent={edit ? 'danger' : 'none'}
            >
              {edit ? 'Cancel' : 'Edit'}
            </Button>
            <Button onClick={() => setDeleteDialog(true)} intent={'danger'}>
              Delete
            </Button>
          </div>
        </section>

        <EditForm edit={edit} />
      </article>
    </>
  );
};
