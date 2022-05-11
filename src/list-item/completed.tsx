/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';

interface Props {
  title: string;
  onToggleCompleted: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export default ({ title, onToggleCompleted, onEdit, onDelete }: Props) => (
  <li className='completed'>
    <div className='view'>
      <input
        className='toggle'
        type='checkbox'
        checked
        onChange={() => onToggleCompleted()}
      />
      <label onDoubleClick={() => onEdit()}>{title}</label>
      <button type='button' className='destroy' onClick={onDelete} />
    </div>
  </li>
);
