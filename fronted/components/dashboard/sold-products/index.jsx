import { useState, useEffect, useContext } from 'react';
import { Card, CardContent, CardHeader } from '@material-ui/core';

import { TrendContext } from '../../../context/trend-context';
import dateFilters from '../../../utils/date-filters';
import useRequestData from '../../../hooks/useRequestData';
import TotalPublishedProducts from '../total-products';
import QtyPublishedProducts from '../qty-products';

import styles from '../DashBoard.module.styl';

export default function SoldProducts() {
  const { keywords, filter, countries } = useContext(TrendContext);
  const { startAt, endAt } = dateFilters[filter['date'] || 0];
  const countryExists = !!filter['country'];

  const [totalSold, setTotalSold] = useState();
  const [qtySold, setQtySold] = useState();

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
          sumSold
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
          sumSold
        }
      
      }
    `;
  const requestData = useRequestData(query);

  function productsSold() {
    const data = keywords.map((keyword) => {
      let total = 0;
      if (Array.isArray(requestData.productsCount)) {
        const products = requestData.productsCount.filter(
          (item) => item._id.keyWord === keyword
        );
        total = products.reduce((a, b) => a + b.sumSold, 0);
      }
      return { _id: keyword, valor: total };
    });
    setTotalSold(data);
  }

  function productsByDate() {
    const data = new Map();
    if (Array.isArray(requestData.productsByDate)) {
      requestData.productsByDate.forEach((item) => {
        const {
          _id: { date, keyWord },
          sumSold,
        } = item;
        data.set(date, { ...data.get(date), date, [`"${keyWord}"`]: sumSold });
      });
    }
    const dataAsc = new Map([...data.entries()].sort());
    setQtySold(Array.from(dataAsc.values()));
  }

  useEffect(() => {
    productsSold();
    productsByDate();
  }, [JSON.stringify(requestData)]);

  return (
    <Card variant='outlined'>
      <CardHeader
        title='Productos vendidos'
        subheader={`Fuente: mercadolibre.com - Desde: ${startAt} a ${endAt}`}
      />
      <CardContent className={styles.cardContent}>
        <TotalPublishedProducts products={totalSold} dataKey={'valor'} />
        <QtyPublishedProducts products={qtySold} keywords={keywords} />
      </CardContent>
    </Card>
  );
}
