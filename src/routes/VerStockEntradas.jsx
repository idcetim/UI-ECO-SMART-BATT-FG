import { React, Suspense } from 'react';
import { Loading } from '../components/Loading';
import { ShowEntryLotes } from '../components/ShowEntryLotes';

export const VerStockEntradas = () => {

  return (<div>
    <Suspense fallback={<Loading />}>
      <ShowEntryLotes />
    </Suspense>
  </div>)
}