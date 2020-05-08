import { useEffect, useContext } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core';
import { TrendContext } from '../../context/trend-context';
import useRequestData from '../../hooks/useRequestData';
import dateFilters from '../../utils/date-filters';

import styles from './Filters.module.styl';

export default function Filters() {
  const { filter, setFilter, countries, setCountries } = useContext(
    TrendContext
  );
  const { control, errors, setValue } = useForm();

  const query = `
    {
      countries
    }
  `;

  const requestData = useRequestData(query);

  useEffect(() => {
    if (requestData.countries) {
      const values = ['Todos', ...requestData.countries];
      setCountries(values);
    }
  }, [JSON.stringify(requestData)]);

  useEffect(() => {
    Object.entries(filter).map(([key, value]) => {
      setValue(key, value);
    });
  }, [filter.toString()]);

  const handleChange = ([event]) => {
    const {
      target: { name, value },
    } = event;
    const currentFilter = { [name]: value };
    setFilter({ ...filter, ...currentFilter });
    return value;
  };

  return (
    <section className={styles.filters}>
      <FormControl
        className={styles.formControl}
        error={Boolean(errors.country)}
      >
        <InputLabel>Por país</InputLabel>
        <Controller
          as={
            <Select>
              {countries.map((item, index) => (
                <MenuItem key={index} value={index}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          }
          name='country'
          rules={{ required: 'Valor requerido' }}
          control={control}
          defaultValue={0}
          onChange={handleChange}
        />
        <FormHelperText>
          {errors.country && errors.country.message}
        </FormHelperText>
      </FormControl>
      <FormControl className={styles.formControl} error={Boolean(errors.date)}>
        <InputLabel>Por fecha</InputLabel>
        <Controller
          as={
            <Select>
              {dateFilters.map(({ label }, index) => (
                <MenuItem key={index} value={index}>
                  {label}
                </MenuItem>
              ))}
            </Select>
          }
          name='date'
          rules={{ required: 'Valor requerido' }}
          control={control}
          defaultValue={0}
          onChange={handleChange}
        />
        <FormHelperText>{errors.date && errors.date.message}</FormHelperText>{' '}
      </FormControl>
    </section>
  );
}
