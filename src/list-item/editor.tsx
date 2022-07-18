import React, { useState } from 'react';

import Input from '../components/input';

interface Props {
  title: string;
  onDismiss: () => void;
  onUpdate: (change: string) => void;
}

export default ({ title, onDismiss, onUpdate }: Props) => {
  const [value, setValue] = useState<string>(title);

  return (
    <li className='editing'>
      <Input
        className='edit no-focusborder'
        value={value}
        onChange={(change: string) => setValue(change)}
        onDiscard={onDismiss}
        onCommit={() => {
          onUpdate(value.trim());
          onDismiss();
        }}
        autoFocus
      />
    </li>
  );
};
