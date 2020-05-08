import { Tab, Tabs } from '@material-ui/core/';
import PublishedProducts from './published-products';
import SoldProducts from './sold-products';
import PriceProducts from './price-products';
import { TrendContext } from '../../context/trend-context';

import styles from './DashBoard.module.styl';

export default function DashBoard() {
  const { filter, countries } = React.useContext(TrendContext);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <section className={styles.dashboard}>
      <Tabs
        variant='fullWidth'
        value={value}
        indicatorColor='primary'
        textColor='primary'
        onChange={handleChange}
        aria-label='tabs dashboard'
        className={styles.tabs}
      >
        <Tab label='Publicados' {...a11yProps(0)} />
        <Tab label='Vendidos' {...a11yProps(1)} />
        <Tab label='Precio' {...a11yProps(2)} />
      </Tabs>

      {value === 0 && <PublishedProducts />}
      {value === 1 && <SoldProducts />}
      {value === 2 &&
        (!!filter['country'] ? (
          <PriceProducts country={countries[filter['country']]} />
        ) : (
          countries.map((country) => {
              if (country != 'Todos'){
                return <PriceProducts country={country} />;
              }
          })
        ))}
    </section>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
