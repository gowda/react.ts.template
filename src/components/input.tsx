import React, { ChangeEvent, KeyboardEvent } from 'react';

interface Props {
  className?: string;
  placeholder?: string;
  autoFocus?: boolean;
  value: string;
  onChange: (change: string) => void;
  onDiscard: () => void;
  onCommit: () => void;
}

type InputChangeEvent = ChangeEvent<HTMLInputElement>;
type InputKeyboardEvent = KeyboardEvent<HTMLInputElement>;

export default ({
  className,
  placeholder,
  autoFocus = false,
  value,
  onChange,
  onDiscard,
  onCommit,
}: Props) => (
  <input
    className={className}
    placeholder={placeholder}
    value={value}
    onChange={({ target: { value: change } }: InputChangeEvent) =>
      onChange(change)
    }
    onKeyDown={({ key }: InputKeyboardEvent) => {
      if (key === 'Escape') {
        onDiscard();
      }
    }}
    onKeyPress={({ key }: InputKeyboardEvent) => {
      if (key === 'Enter') {
        onCommit();
      }
    }}
    onBlur={onDiscard}
    // eslint-disable-next-line jsx-a11y/no-autofocus
    autoFocus={autoFocus}
  />
);
