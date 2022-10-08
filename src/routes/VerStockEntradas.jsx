import { React, Suspense } from 'react';
import { Loading } from '../components/Loading';
import { ShowLotes } from '../components/ShowLotes';

export const VerStockEntradas = () => {

  return (<div>
    <Suspense fallback={<Loading />}>
      <ShowLotes type={"Entry"} />
    </Suspense>
  </div>)
}