/* eslint-disable jsx-a11y/no-autofocus */
import React from 'react';

import Completed from './completed';
import Normal from './normal';
import Editor from './editor';

interface Props {
  editing: boolean;
  title: string;
  completed: boolean;
  onEdit: () => void;
  onDismiss: () => void;
  onUpdate: (attrs: { title?: string; completed?: boolean }) => void;
  onDelete: () => void;
}

export default ({
  editing,
  title,
  completed,
  onEdit,
  onDismiss,
  onUpdate,
  onDelete,
}: Props) => (
  <>
    {editing && (
      <Editor
        title={title}
        onDismiss={onDismiss}
        onUpdate={(change) => {
          if (change.length === 0) {
            onDelete();
          } else {
            onUpdate({ title: change });
          }
        }}
      />
    )}
    {!editing && (
      <>
        {completed ? (
          <Completed
            title={title}
            onToggleCompleted={() => onUpdate({ completed: !completed })}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ) : (
          <Normal
            title={title}
            onToggleCompleted={() => onUpdate({ completed: !completed })}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        )}
      </>
    )}
  </>
);
