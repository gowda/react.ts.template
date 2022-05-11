/* eslint-disable jsx-a11y/no-autofocus */
import React from 'react';
import { useToggleAllCompletedMutation } from './queries';

export default () => {
  const { mutateAsync: toggleAll } = useToggleAllCompletedMutation();

  return (
    <>
      <input
        id='toggle-all'
        className='toggle-all no-focusborder'
        type='checkbox'
        onClick={() => toggleAll()}
      />
      <label htmlFor='toggle-all' className='no-focusborder'>
        Mark all as complete
      </label>
    </>
  );
};
