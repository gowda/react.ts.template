import React, { useState } from 'react';

import Header from './header';
import ToggleAllButton from './toggle-all-button';
import List from './list';
import ListFooter from './list/footer';
import Footer from './footer';
import { Filter } from './filter';
import { useAllCount } from './queries';

export default () => {
  const [filter, setFilter] = useState<Filter>('all');
  const { data: count } = useAllCount();

  return (
    <>
      <section className='todoapp'>
        <Header />
        <section className='main'>
          {count !== 0 ? <ToggleAllButton /> : null}
          {count !== 0 ? <List filter={filter} /> : null}
        </section>
        {count !== 0 && (
          <ListFooter
            filter={filter}
            onUpdateFilter={(change) => setFilter(change)}
          />
        )}
      </section>
      <Footer />
    </>
  );
};
