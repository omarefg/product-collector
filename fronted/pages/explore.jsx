import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { TendenceContext } from '../context/tendence-context';

import Page from '../components/page';
import CompareKeywords from '../components/compare-keywords';

export default function ExplorePage() {
  const router = useRouter();
  const { setKeywords } = useContext(TendenceContext);

  useEffect(() => {
    const { search } = router.query;
    setKeywords([search]);
  }, []);

  return (
    <Page>
      <>
        <CompareKeywords />
        {/* 
        <div>Barra Filtros {search}</div>
        <div className='dashboard'>
          <div>Grafico - Cantidad Productos publicados</div>
          <div>Grafico - Cantidad Productos vendidos (?)</div>
          <div>Grafico - Precio Promedio - Por Pais</div>
          <div>Grafico - Busquedas - Por Pais</div>
          <div>Lista - Productos relacionados</div>
        </div>
       */}
      </>
    </Page>
  );
}
