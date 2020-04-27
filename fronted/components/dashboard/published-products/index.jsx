import { useState, useEffect, useContext } from 'react';
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
          _id{
            keyWord
            country
          }
          count
        }
        productsByDate(
          keyWord: [${keywords.map((k) => `"${k}"`)}]
          start_date: "${startAt}"
          end_date: "${endAt}"
          ${countryExists ? `country: "${countries[filter['country']]}"` : ``}
        ) {
          _id {
            keyWord
            date
          }
          count
        }
      
      }
    `;

  const requestData = useRequestData(query, keywords, filter);
  const [productsCount, setProductsCount] = useState([]);

  useEffect(() => {
    const data = keywords.map((keyword) => {
      let total = 0;
      if (Array.isArray(requestData.productsCount)) {
        const products = requestData.productsCount.filter(
          (item) => item._id.keyWord === keyword
        );
        total = products.reduce((a, b) => a + b.count, 0);
      }
      return { _id: keyword, cantidad: total };
    });

    setProductsCount(data);
  }, [JSON.stringify(requestData)]);

  return (
    <Card variant='outlined'>
      <CardHeader
        title='Productos publicados'
        subheader={`Fuente: mercadolibre.com - Fecha: ${startAt} a ${endAt}`}
      />
      <CardContent className={styles.cardContent}>
        <AveragePublishedProducts productsCount={productsCount} />
        <QtyPublishedProducts />
      </CardContent>
    </Card>
  );
}
