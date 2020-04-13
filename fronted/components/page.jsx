import Header from './header';
import styles from '../styles/app.styl';

export default function Page({ children }) {
  return (
    <div className={styles.container}>
      <Header />
      <main>{children}</main>
    </div>
  );
}
