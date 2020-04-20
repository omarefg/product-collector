import { useContext, useEffect } from 'react';
import Router, { useRouter } from 'next/router';
import { TrendContext } from '../context/trend-context';

import Page from '../components/page';
import CompareKeywords from '../components/compare-keywords';
import Filters from '../components/filters';

let renderCount = 0;

export default function ExplorePage() {
  const router = useRouter();
  const { keywords, setKeywords } = useContext(TrendContext);

  useEffect(() => {
    const { search } = router.query;
    search && setKeywords(search.split(','));
  }, [router.query.search]);

  useEffect(() => {
    const valuesString = keywords.join(',');
    Router.push({
      pathname: router.pathname,
      query: { search: valuesString },
    });
  }, [keywords.join(',')]);

  renderCount += 1;
  return (
    <Page>
      <>
        <CompareKeywords />
        <Filters />
        <section className='dashboard'>
          <div>Gráfico - Cantidad Productos publicados</div>
          <div>Gráfico - Cantidad Productos vendidos (?)</div>
          <div>Gráfico - Precio Promedio - Por País</div>
          <div>Gráfico - Búsquedas - Por País</div>
          <div>Lista - Productos relacionados</div>
        </section>
        <h1>{renderCount}</h1>
      </>
    </Page>
  );
}
