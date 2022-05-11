import React from 'react';
import { Filter } from '../filter';
import { useActiveCount, useClearCompletedMutation } from '../queries';

interface Props {
  filter: Filter;
  onUpdateFilter: (filter: Filter) => void;
}

export default ({ filter, onUpdateFilter }: Props) => {
  const { data: activeCount } = useActiveCount();
  const { mutateAsync: clearCompleted } = useClearCompletedMutation();

  return (
    <footer className='footer'>
      <span className='todo-count'>
        <strong>{activeCount}</strong> {activeCount === 1 ? 'item' : 'items'}{' '}
        left
      </span>
      <ul className='filters'>
        <li>
          <a
            className={`no-focusborder ${filter === 'all' ? 'selected' : ''}`}
            href='#/'
            onClick={() => onUpdateFilter('all')}
          >
            All
          </a>
        </li>
        <li>
          <a
            className={`no-focusborder ${
              filter === 'active' ? 'selected' : ''
            }`}
            href='#/active'
            onClick={() => onUpdateFilter('active')}
          >
            Active
          </a>
        </li>
        <li>
          <a
            className={`no-focusborder ${
              filter === 'completed' ? 'selected' : ''
            }`}
            href='#/completed'
            onClick={() => onUpdateFilter('completed')}
          >
            Completed
          </a>
        </li>
      </ul>
      <button
        type='button'
        className='clear-completed no-focusborder'
        onClick={() => clearCompleted()}
      >
        Clear completed
      </button>
    </footer>
  );
};
