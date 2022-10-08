import { React, Suspense } from 'react';
import { Loading } from '../components/Loading';
import { ShowLotes } from '../components/ShowLotes';

export const VerStockProduccion = () => {
  return (<div>
    <Suspense fallback={<Loading />}>
      <ShowLotes type={"Product"} />
    </Suspense>
  </div>)

}