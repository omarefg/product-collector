import PublishedProducts from './published-products';

import styles from './DashBoard.module.styl';

export default function DashBoard() {
  return (
    <section className={styles.dashboard}>
      <PublishedProducts />
      <div>Productos Vendidos</div>
      <div>Precio promedio por país</div>
      <div>Productos relacionados</div>
    </section>
  );
}
