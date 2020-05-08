import { useState, useEffect, useContext } from 'react';
import { Card, CardContent, CardHeader } from '@material-ui/core';

import { TrendContext } from '../../../context/trend-context';
import dateFilters from '../../../utils/date-filters';
import useRequestData from '../../../hooks/useRequestData';
import TotalPublishedProducts from '../total-products';
import DateQtyProducts from '../qty-products';

import styles from '../DashBoard.module.styl';

export default function PriceProducts({ country }) {
  const { keywords, filter } = useContext(TrendContext);
  const { startAt, endAt } = dateFilters[filter['date'] || 0];

  const [avgTotal, setAvgTotal] = useState();
  const [avgByDate, setAvgByDate] = useState();

  const query = `
      {
        productsAvgPrice(
          keyWord: [${keywords.map((k) => `"${k}"`)}]
          start_date: "${startAt}"
          end_date: "${endAt}"
          country: "${country}"
        ) {
          _id{
            keyWord
            country
          }
          avg
        }
        productsAvgByDate(
          keyWord: [${keywords.map((k) => `"${k}"`)}]
          start_date: "${startAt}"
          end_date: "${endAt}"
          country: "${country}"
        ) {
          _id {
            keyWord
            date
          }
          avg
        }
      
      }
    `;
  const requestData = useRequestData(query);

  function productsAvgPrice() {
    const data = keywords.map((keyword) => {
      let total = 0;
      let qty = 0;
      if (Array.isArray(requestData.productsAvgPrice)) {
        const products = requestData.productsAvgPrice.filter(
          (item) => item._id.keyWord === keyword
        );
        total = products.reduce((a, b) => a + b.avg, 0);
        qty += 1;
      }
      return { _id: keyword, promedio: Number((total / qty).toFixed(2)) };
    });
    setAvgTotal(data);
  }

  function productsAvgByDate() {
    const data = new Map();
    if (Array.isArray(requestData.productsAvgByDate)) {
      requestData.productsAvgByDate.forEach((item) => {
        const {
          _id: { date, keyWord },
          avg,
        } = item;
        data.set(date, {
          ...data.get(date),
          date,
          [`"${keyWord}"`]: Number(avg.toFixed(2)),
        });
      });
    }
    const dataAsc = new Map([...data.entries()].sort());
    setAvgByDate(Array.from(dataAsc.values()));
  }

  useEffect(() => {
    productsAvgPrice();
    productsAvgByDate();
  }, [JSON.stringify(requestData)]);

  return (
    <Card variant='outlined'>
      <CardHeader
        title={`Precio promedio ${country}`}
        subheader={`Fuente: mercadolibre.com - Desde: ${startAt} a ${endAt}`}
      />
      <CardContent className={styles.cardContent}>
        <TotalPublishedProducts products={avgTotal} dataKey={'promedio'} />
        <DateQtyProducts products={avgByDate} keywords={keywords} />
      </CardContent>
    </Card>
  );
}
