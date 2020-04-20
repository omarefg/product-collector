import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { TrendContext } from '../context/trend-context';

import Page from '../components/page';
import CompareKeywords from '../components/compare-keywords';
import Filters from '../components/filters';
import Test from '../components/test';

export default function ExplorePage() {
  const router = useRouter();
  const { setKeywords } = useContext(TrendContext);

  useEffect(() => {
    const { search } = router.query;
    setKeywords([search]);
  }, []);

  return (
    <Page>
      <>
        <CompareKeywords />
        <Filters />
        <section className='dashboard'>
          <Test />
          {/* 
          <section>Gráfico - Cantidad Productos publicados</div>
          <div>Gráfico - Cantidad Productos vendidos (?)</div>
          <div>Gráfico - Precio Promedio - Por País</div>
          <div>Gráfico - Búsquedas - Por País</div>
          <div>Lista - Productos relacionados</div>
        */}
        </section>
      </>
    </Page>
  );
}
