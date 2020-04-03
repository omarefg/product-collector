import Header from "../components/header";
import SearchTrends from '../components/search-trends'

import styles from "../styles/app.styl";

const IndexPage = () => (
  <div className={styles.container}>
    <Header />
    <main>
      <SearchTrends />
    </main>
  </div>
);

export default IndexPage;
