import { useState, useEffect, useContext } from 'react';
import { Card, CardContent, CardHeader } from '@material-ui/core';

import { TrendContext } from '../../../context/trend-context';
import dateFilters from '../../../utils/date-filters';
import useRequestData from '../../../hooks/useRequestData';
import TotalPublishedProducts from '../total-products';
import QtyPublishedProducts from '../qty-products';

import styles from '../DashBoard.module.styl';

export default function PublishedProducts() {
  const { keywords, filter, countries } = useContext(TrendContext);
  const { startAt, endAt } = dateFilters[filter['date'] || 0];
  const countryExists = !!filter['country'];

  const [totalPublished, setTotalPublished] = useState();
  const [qtyPublished, setQtyPublished] = useState();

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
  const requestData = useRequestData(query);

  function productsCount() {
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
    setTotalPublished(data);
  }

  function productsByDate() {
    const data = new Map();
    if (Array.isArray(requestData.productsByDate)) {
      requestData.productsByDate.forEach((item) => {
        const {
          _id: { date, keyWord },
          count,
        } = item;
        data.set(date, { ...data.get(date), date, [`"${keyWord}"`]: count });
      });
    }
    const dataAsc = new Map([...data.entries()].sort());
    setQtyPublished(Array.from(dataAsc.values()));
  }

  useEffect(() => {
    productsCount();
    productsByDate();
  }, [JSON.stringify(requestData)]);

  return (
    <Card variant='outlined'>
      <CardHeader
        title='Productos publicados'
        subheader={`Fuente: mercadolibre.com - Desde: ${startAt} a ${endAt}`}
      />
      <CardContent className={styles.cardContent}>
        <TotalPublishedProducts products={totalPublished} dataKey={'cantidad'} />
        <QtyPublishedProducts products={qtyPublished} keywords={keywords} />
      </CardContent>
    </Card>
  );
}
