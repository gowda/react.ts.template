/* eslint-disable jsx-a11y/no-autofocus */
import React, { ChangeEvent, KeyboardEvent, useState } from 'react';

import { useCreateTodoMutation } from './queries';

export default () => {
  const { mutateAsync } = useCreateTodoMutation();
  const [value, setValue] = useState<string>('');

  return (
    <input
      className='new-todo no-focusborder'
      value={value}
      placeholder='What needs to be done?'
      autoFocus
      onChange={(event: ChangeEvent<HTMLInputElement>) =>
        setValue(event.target.value)
      }
      onKeyDown={(event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Escape') {
          setValue('');
        }
      }}
      onKeyPress={(event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
          if (value.trim().length !== 0) {
            mutateAsync(value.trim()).then(() => setValue(''));
          } else {
            setValue('');
          }
        }
      }}
    />
  );
};
