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
import dateFilters from '../../utils/date-filters';

import styles from './Filters.module.styl';

import { result } from '../../mocks';

export default function Filters() {
  const {
    data: { countries, categories },
  } = result;

  const { filter, setFilter } = useContext(TrendContext);
  const { control, errors, setValue } = useForm();

  useEffect(() => {
    Object.entries(filter).map(([key, value]) => {
      setValue(key, value);
    });
  });

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
        <FormHelperText>{errors.date && errors.date.message}</FormHelperText>
      </FormControl>
      {/* 
      <FormControl
        className={styles.formControl}
        error={Boolean(errors.category)}
      >
        <InputLabel>Por categoría</InputLabel>
        <Controller
          as={
            <Select>
              {categories.map((item, index) => (
                <MenuItem key={index} value={index}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          }
          name='category'
          rules={{ required: 'Valor requerido' }}
          control={control}
          defaultValue={0}
          onChange={handleChange}
        />
        <FormHelperText>
          {errors.category && errors.category.message}
        </FormHelperText>
      </FormControl> 
      */}
    </section>
  );
}
