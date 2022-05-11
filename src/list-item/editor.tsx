/* eslint-disable jsx-a11y/no-autofocus */
import React, { ChangeEvent, KeyboardEvent, useState } from 'react';

interface Props {
  title: string;
  onDismiss: () => void;
  onUpdate: (change: string) => void;
}

export default ({ title, onDismiss, onUpdate }: Props) => {
  const [value, setValue] = useState<string>(title);

  return (
    <li className='editing'>
      <input
        className='edit no-focusborder'
        value={value}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          setValue(event.target.value)
        }
        onKeyDown={(event: KeyboardEvent<HTMLInputElement>) => {
          if (event.key === 'Escape') {
            onDismiss();
          }
        }}
        onKeyPress={(event: KeyboardEvent<HTMLInputElement>) => {
          if (event.key === 'Enter') {
            onUpdate(value.trim());
            onDismiss();
          }
        }}
        onBlur={onDismiss}
        autoFocus
      />
    </li>
  );
};
