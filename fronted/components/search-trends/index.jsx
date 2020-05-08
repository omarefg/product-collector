import { useForm } from 'react-hook-form';
import { Button } from '@material-ui/core';
import Router from 'next/router';

import styles from './SearchTrends.module.styl';

const SearchTrends = () => {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    const { search } = data;
    Router.push({
      pathname: '/explore',
      query: { search },
    });
  };

  return (
    <div className={styles.searchTrends}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Consulta las tendencias</h1>
        <div>
          <input
            type='text'
            name='search'
            placeholder='Ingrese el producto a buscar'
            ref={register({ required: true })}
          />
          <Button type='submit'>Buscar</Button>
        </div>
        {errors.search && (
          <div className={styles.error}>El producto es requerida</div>
        )}
      </form>
      <div className={styles.footer}>
        <img src='images/datviz.png' alt='Datviz' />
      </div>
    </div>
  );
};

export default SearchTrends;
