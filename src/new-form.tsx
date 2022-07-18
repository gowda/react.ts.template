import React, { useState } from 'react';

import Input from './components/input';
import { useCreateTodoMutation } from './queries';

export default () => {
  const { mutateAsync } = useCreateTodoMutation();
  const [value, setValue] = useState<string>('');

  return (
    <Input
      data-testid='new-todo'
      className='new-todo no-focusborder'
      value={value}
      placeholder='What needs to be done?'
      autoFocus
      onChange={(change: string) => setValue(change)}
      onDiscard={() => setValue('')}
      onCommit={() => {
        if (value.trim().length !== 0) {
          mutateAsync(value.trim()).then(() => setValue(''));
        } else {
          setValue('');
        }
      }}
    />
  );
};
