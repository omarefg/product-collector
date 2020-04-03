import styles from "./SearchTrends.module.styl";

const SearchTrends = () => (
  <div className={styles.searchTrends}>
    <form>
      <h1>Consulta las tendencias</h1>
      <div>
        <input
          type="text"
          name="trend"
          placeholder="Ingrese la palabra clave a buscar"
        />
        <button type="submit">Buscar</button>
      </div>
    </form>
    <div className={styles.footer}>
      <img src="images/datviz.png" alt="Datviz" />
    </div>
  </div>
);

export default SearchTrends;
