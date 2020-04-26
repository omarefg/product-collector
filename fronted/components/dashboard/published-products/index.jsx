import { useContext } from 'react';
import { Card, CardContent, CardHeader } from '@material-ui/core';

import { result } from '../../../mocks';
import { TrendContext } from '../../../context/trend-context';
import dateFilters from '../../../utils/date-filters';
import useRequestData from '../../../hooks/useRequestData';
import AveragePublishedProducts from './average-published-products';
import QtyPublishedProducts from './qty-published-products';

import styles from './PublishedProducts.module.styl';

export default function PublishedProducts() {
  const { keywords, filter } = useContext(TrendContext);
  const { startAt, endAt } = dateFilters[filter['date'] || 0];
  const {
    data: { countries },
  } = result;
  const countryExists = !!filter['country'];

  const query = `
      {
        productsCount(
          keyWord: [${keywords.map((k) => `"${k}"`)}]
          start_date: "${startAt}"
          end_date: "${endAt}"
          ${countryExists ? `country: "${countries[filter['country']]}"` : ``}
        ) {
          _id
          count
        }
      }
    `;

  console.log(`query ${query}`);
  const data = useRequestData(query, keywords, filter);

  return (
    <Card variant='outlined'>
      <CardHeader
        title='Productos publicados'
        subheader={`Fuente: mercadolibre.com - Fecha: ${startAt} a ${endAt}`}
      />
      <CardContent className={styles.cardContent}>
        <AveragePublishedProducts productsCount={data.productsCount} />
        <QtyPublishedProducts />
      </CardContent>
    </Card>
  );
}
