import { React, Suspense } from 'react';
import { Loading } from '../components/Loading';
import { ShowProductLotes } from '../components/ShowProductLotes';

export const VerStockProduccion = () => {
  return (<div>
    <Suspense fallback={<Loading />}>
      <ShowProductLotes />
    </Suspense>
  </div>)

}