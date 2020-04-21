import { Card, CardContent, CardHeader } from '@material-ui/core';

import AveragePublishedProducts from './average-published-products';
import QtyPublishedProducts from './qty-published-products';

import styles from './DashBoard.module.styl';

export default function DashBoard() {
  return (
    <section className={styles.dashboard}>
      <Card variant='outlined'>
        <CardHeader
          title='Productos publicados'
          subheader= "Fuente: mercadolibre.com"
        />
        <CardContent className={styles.cardContent}>
          <AveragePublishedProducts />
          <QtyPublishedProducts />
        </CardContent>
      </Card>
    </section>
  );
}
